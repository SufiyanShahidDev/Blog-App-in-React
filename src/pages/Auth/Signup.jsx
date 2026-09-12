import { Box, Paper } from '@mui/material'
import React from 'react'
import Input from '../../Components/Input'

const Signup = () => {
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
          <Input label={"Enter Your Username"} type={"text"} />
          <Input label={"Enter Your email"} type={"email"} />
          <Input label={"Enter Your password"} type={"password"} />
        </Box>

        {/* </Paper> */}
      </Paper>
    </Box>
  )
}

export default Signup