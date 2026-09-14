import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Input({label,type,handler}) {
    return (
        <Box className='mb-3 mt-5'
            component="form"
            // sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
            // noValidate
            // autoComplete="off"
        >
            <TextField sx={{width: "100%"}} onChange={(e) => handler(e.target.value)} type={type} id="outlined-basic" label={label} variant="outlined" />
        </Box>
    );
}
