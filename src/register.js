import { useState, useEffect, useContext} from "react"
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Box, Typography, Grid, } from '@mui/material';
import { useForm } from 'react-hook-form';
  
const Register = () => {
const [shouldRedirect, setShouldRedirect]  = useState(false)
const { register, handleSubmit, formState: {errors} } = useForm();
const theme = useContext()
const navigate = useNavigate()

const handleFormSubmit = (formData) => {
    if(formData){ // check for valid data
        setShouldRedirect(true)
    }
};

useEffect(() => {
    if(shouldRedirect) {
        navigate('/list')
    }
}, [shouldRedirect])


return (
    <>
    <Container component="main" maxWidth="xs">
        <Box
        sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}
        >
        <Typography component="h1" varient="h5">
            Register
        </Typography>
        <Box
            component="form"
            onSubmit={handleSubmit(handleFormSubmit)}
            noValidate
            sx={{ mt: 3 }}
        >
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                autoComplete="given-email"
                name="email"
                required
                fullWidth
                id="email"
                label="Email"
                autoFocus
                error={errors.email}
                {...register('email', {required: true, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                name="password"
                required
                fullWidth
                id="password"
                label="Password"
                type="password"
                error={errors.password}
                {...register('password', {required: true})}
                />
            </Grid>
            </Grid>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            >
            Register
            </Button>
        </Box>
        </Box>
    </Container>
    </>
);
};
  
  export default Register;
  