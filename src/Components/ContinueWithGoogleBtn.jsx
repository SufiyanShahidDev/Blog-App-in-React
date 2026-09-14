import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function GoogleButtons({ title, icon }) {
    return (
        <Stack sx={{
            color: "#162456",
            fontWeight: "900"
        }} className="bg-blue-100" direction="row" spacing={2}>
            <Button startIcon={icon} variant="outlined">{title}</Button>

        </Stack>
    );
}
