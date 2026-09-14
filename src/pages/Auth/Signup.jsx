import { Box, Paper } from '@mui/material'
import React, { useState } from 'react'
import Input from '../../Components/Input'
import Button from '../../Components/Button'
import GoogleButtons from '../../Components/ContinueWithGoogleBtn'
import GoogleIcon from '@mui/icons-material/Google';


const Signup = () => {

  const [form, setForm] = useState({
    Email: "",
    Password: "",
    username: ""
  })

  const handleInputChange = (value, key) => {
    console.log("fn working...", value);

    setForm((prev) => ({ ...prev, [key]: value }))

  }

  const signupHandler = () => {

  }

  const signupWithGoogleHandler = () => {

  }


  return (
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

        <h1 className='font-bold text-3xl text-center mb-3'>Signup page</h1>

        <Box>
          <Input handler={handleInputChange} label={"Enter Your Username"} type={"username"} value={form.username} />
          <Input handler={handleInputChange} label={"Enter Your email"} type={"email"} value={form.Email} />
          <Input handler={handleInputChange} label={"Enter Your password"} type={"password"} value={form.Password} />
          <Box className="flex justify-center items-center mb-3">
            <GoogleButtons icon={<GoogleIcon />} title={"Signup With Google"}></GoogleButtons>
          </Box>
          <Box className="flex justify-center items-center mb-3">

            <Button title={"Signup"}></Button>
          </Box>

        </Box>

        {/* </Paper> */}
      </Paper>
    </Box>
  )
}

export default Signup