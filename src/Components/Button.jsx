import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButtons({title}) {
    return (
        <Stack spacing={2} direction="row">
            <Button variant="contained">{title}</Button>
        </Stack>
    );
}
