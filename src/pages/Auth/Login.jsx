import { Box, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import Input from '../../Components/Input'
import Button from '../../Components/Button'
// import GoogleButtons from '../../Components/ContinueWithGoogleBtn'
// import GoogleIcon from '@mui/icons-material/Google';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom'
import GoogleButtons from '../../Components/ContinueWithGoogleBtn'
import { auth } from '../../firebase/config'
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";



const Login = () => {


  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const handleInputChange = (value, key) => {
    console.log("fn working...", value);

    setForm((prev) => ({ ...prev, [key]: value }))

  }

  const LoginHandler = async () => {
    console.log("Login handler is working..", form);

    console.log(form);


    try {

      let response = await signInWithEmailAndPassword(auth, form.email, form.password)

      console.log(response);

      if (response.user) {

        toast.success("Login Successfully")

      }



    } catch (error) {
      console.log(error.message);
      console.log(error.code);

      if (error.message == "Firebase: Error (auth/invalid-credential)." || error.code == "auth/invalid-credential") {
        toast.error("invalid credential")
      }

    }

  }

  // const LoginWithGoogleHandler = async () => {
  //   try {
  //     console.log("LoginWithGoogleHandler is running");

  //     const provider = new GoogleAuthProvider();

  //     let response = await signInWithPopup(auth, provider)

  //     console.log(response);


  //     if (response.user) {

  //       toast.success("Login Successfully")

  //     }

  //   } catch (error) {
  //     toast.error(error, message);

  //   }
  // }


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

          <h1 className='font-bold text-3xl text-center mb-3'>Login page</h1>

          <Box>
            <Input handler={handleInputChange} label={"Enter Your email"} type={"email"} value={form.email} />
            <Input handler={handleInputChange} label={"Enter Your password"} type={"password"} value={form.password} />
            <Box className="flex justify-center items-center mb-3">
              <GoogleButtons title={"Continue With Google"} />
            </Box>
            <Box className="flex justify-center items-center mb-3">

              <Button handler={LoginHandler} title={"Login"}></Button>
            </Box>


            <Link to={"/signup"}><Typography className='flex justify-center items-center text-blue-900 hover:text-blue-500 hover:underline'>Go to Signup Page</Typography></Link>

          </Box>

          {/* </Paper> */}
        </Paper>
      </Box>

      <ToastContainer />

    </>
  )
}

export default Login