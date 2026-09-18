
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import * as React from "react";

import { doc, deleteDoc, getDoc } from "firebase/firestore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/config.js";

import { toast, ToastContainer } from "react-toastify";
import EditBlogModal from "./EditBlogModal.jsx";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;

  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",

  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),

  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export default function BlogCard({ data, getBlogsData }) {
  const [expanded, setExpanded] = React.useState(false);
  const [userId, setUserId] = React.useState(null);

  const [open, setOpen] = React.useState(false);

  const [blogData, setBlogData] = React.useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // Get currently logged-in user's UID
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Delete blog
  const deleteHandler = async (blogId) => {
    console.log("Deleting blog:", blogId);

    try {
      await deleteDoc(doc(db, "blogs", blogId));

      toast.success("Blog deleted successfully!");

      // Get updated blogs from Firestore
      getBlogsData();
    } catch (error) {
      console.log(error.message);
    }
  };

  // Get single blog data
  const getSingleBlogData = async (id) => {
    try {
      const docRef = doc(db, "blogs", id);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());

        setBlogData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Edit blog
  const editHandler = async () => {
    try {
      handleOpen();

      await getSingleBlogData(data.id);
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log("BlogCard Data:", data);
  console.log("Current User ID:", userId);

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="blog">
              {data.title ? data.title.charAt(0).toUpperCase() : "B"}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={data.title}
        />

        <CardMedia
          component="img"
          height="194"
          image={data.blogImgUrl}
          alt={data.title}
        />

        <CardContent>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {data.description}
          </Typography>
        </CardContent>

        {/* Show Edit/Delete only to blog owner */}
        {data.authorId === userId ? (
          <CardActions disableSpacing>
            <IconButton
              onClick={editHandler}
              aria-label="edit blog"
            >
              <EditIcon />
            </IconButton>

            <IconButton
              onClick={() => deleteHandler(data.id)}
              aria-label="delete blog"
            >
              <DeleteIcon />
            </IconButton>

            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
        ) : (
          ""
        )}
      </Card>

      <ToastContainer />

      {open && (
        <EditBlogModal
          data={data}
          blogData={blogData}
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
      )}
    </>
  );
}
