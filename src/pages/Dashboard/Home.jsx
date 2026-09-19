import React from "react";
import Navbar from "../../components/Navbar";
import BlogCard from "../../components/BlogCard";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config.js";

const Home = () => {
  const [allBlogs, setAllBlogs] = React.useState([]);

  console.log("All Blogs:", allBlogs);

  const getBlogsData = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, "blogs")
      );

      const blogs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Firestore Blogs:", blogs);

      setAllBlogs(blogs);
    } catch (error) {
      console.log(error.message);
    }
  };

  React.useEffect(() => {
    getBlogsData();
  }, []);

  return (
    <>
      <Navbar />

      <h1 className="font-bold text-2xl text-center mt-5 underline">
        All Blogs!
      </h1>

      <div className="flex flex-wrap justify-evenly gap-5 p-5">
        {allBlogs.length > 0
          ? allBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                getBlogsData={getBlogsData}
                data={blog}
              />
            ))
          : "blog finding"}
      </div>
    </>
  );
};

export default Home;
