import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function BasicButtons({title, handler}) {
    return (
        <Stack spacing={2} direction="row">
            <Button onClick={handler} variant="contained">{title}</Button>
        </Stack>
    );
}
