import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Container, Box, Typography, TextField, Button, Select, MenuItem, InputLabel, FormControl, FormHelperText } from '@mui/material';
import axios from "axios";
function Login() {
    const navigate=useNavigate();
    const [error,setError]=useState(null);
    const [formData,setFormData]=useState({
        email:'',
        password:''
    });
    const handleSubmit=async(event)=>{
        event.preventDefault();
        try{
            const response=await axios.post('http://localhost:5000/users/login',formData);
            if(response){
                console.log(response.data);
                localStorage.setItem('token',response.data.token);
                navigate('/home');
            }
        }catch(error){
            if (error.response && error.response.status === 400) {
                const { msg } = error.response.data;
                if (msg) {
                    setError(msg);  // Show error message
                }
            }
        }
    }
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    return (
        <div>
             <Container maxWidth="m">
            <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center',flexDirection: 'column' }}>
                <Typography variant="h1" gutterBottom>Login here</Typography>
                
                <div>
                    <form onSubmit={handleSubmit}>
                        {error && <Typography color="error" gutterBottom>{error}</Typography>}

                        <Typography gutterBottom>Email:</Typography>
                        <TextField 
                            id="email" 
                            name='email' 
                            label="Email" 
                            variant="outlined" 
                            required 
                            onChange={handleChange} 
                            value={formData.email} 
                        />
                        <Typography gutterBottom>Password:</Typography>
                        <TextField 
                            id="password" 
                            name='password' 
                            label="Password" 
                            variant="outlined" 
                            type="password"  // Password input type
                            required 
                            onChange={handleChange} 
                            value={formData.password} 
                        />
                        <br /><br />
                        <center>
                            <Button variant="contained" type='submit'>Submit</Button>
                        </center>
                    </form>
                </div>
            </Box>
        </Container>
        </div>
    )
}
export default Login;