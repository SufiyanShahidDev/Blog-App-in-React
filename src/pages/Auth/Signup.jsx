
import { Box, Paper, Typography } from '@mui/material'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import BasicButtons from '../../components/Button'
import GoogleButtons from '../../components/ContinueWithGoogleBtn'
import Input from '../../components/Input'
import { auth, db } from '../../firebase/config.js'


export const saveDataIntoDB = async (name = "", data) => {

  try {
    await setDoc(doc(db, "users", data.uid), {
      email: data.email,
      name: data.displayName ? data.displayName : name,
      photoUrl: data.photoURL ? data.photoURL : "",
      role: "user"
    })

  } catch (error) {
    toast.error(error.message)
  }
}


const Signup = () => {

  const [form, setForm] = useState({
    email: "",
    password: "",
    username: ""
  })


  const handleInputChange = (key, value) => {
    

    setForm((prev) => ({ ...prev, [key]: value }))
  }


  const signupHandler = async () => {

    try {

      let response = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      )

      console.log(response)

      if (response.user) {

        saveDataIntoDB(form.username, response.user)

        toast.success("Signup Successfully")
      }


    } catch (error) {

      console.log(error.message)
      console.log(error.code)

      if (
        error.message == "Firebase: Error (auth/email-already-in-use)." ||
        error.code == "auth/email-already-in-use"
      ) {
        toast.error("Email already exist")
      }
    }
  }


  return (
    <>

      <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>

        <Paper elevation={2} sx={{
          padding: "10px",
          width: "400px"
        }}>

          <h1 className='font-bold text-3xl text-center mb-3'>
            Signup page
          </h1>

          <Box>

            <Input
              handler={handleInputChange}
              label={"Enter Your Username"}
              type={"text"}
              id="username"
              value={form.username}
            />

            <Input
              handler={handleInputChange}
              label={"Enter Your email"}
              type={"email"}
              id="email"
              value={form.email}
            />

            <Input
              handler={handleInputChange}
              label={"Enter Your password"}
              type={"password"}
              id="password"
              value={form.password}
            />

            <Box className="flex justify-center items-center mb-3">
              <GoogleButtons title={"Signup With Google"} />
            </Box>

            <Box className="flex justify-center items-center mb-3">

              <BasicButtons
                handler={signupHandler}
                title={"Signup"}
              />

            </Box>

            <Link to={"/login"}>
              <Typography className='flex justify-center items-center text-blue-900 hover:text-blue-500 hover:underline'>
                Go to Login Page
              </Typography>
            </Link>

          </Box>

        </Paper>

      </Box>

      <ToastContainer />

    </>
  )
}

export default Signup

