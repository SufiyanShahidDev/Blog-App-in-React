import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { toast } from 'react-toastify';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import GoogleIcon from '@mui/icons-material/Google';
import { saveDataIntoDB } from '../pages/Auth/Signup';
import { auth } from '../firebase/config.js';


export default function GoogleButtons({ title }) {


    const signupWithGoogleHandler = async () => {
        try {
            console.log("signupWithGoogleHandler is running");

            const provider = new GoogleAuthProvider();

            let response = await signInWithPopup(auth, provider)

            console.log(response);

            saveDataIntoDB("",response.user)
            if (response.user) {

                toast.success("Signup Successfully")

            }

        } catch (error) {
            toast.error(error.message);

        }
    }

    return (
        <Stack className="bg-blue-100" direction="row" spacing={2}>
            <Button
                startIcon={<GoogleIcon />}
                onClick={signupWithGoogleHandler}
                variant="outlined">{title}</Button>

        </Stack>
    );
}

