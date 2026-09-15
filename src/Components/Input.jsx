import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Input({label,type,handler,value}) {
    return (
        <Box className='mb-3 mt-5'
            component="form"
        >
            <TextField sx={{width: "100%"}} onChange={(e) => handler(e.target.value, type)} value={value} type={type} id="outlined-basic" label={label} variant="outlined" />
        </Box>
    );
}
