import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, Select, MenuItem, InputLabel, FormControl, FormHelperText } from '@mui/material';

function Signup() {
    const navigate = useNavigate();

    // Single state to store all form fields
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        role: ''
    });
    
    const [error, setError] = useState(null);

    // Generalized change handler for all form inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,  // Spread existing formData
            [name]: value  // Update the specific field being changed
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/users/signup', formData);
            if (response.status === 201) {
                localStorage.setItem('token',response.data.token);
                navigate('/home');  // Navigate to home on success
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const { msg } = error.response.data;
                if (msg) {
                    setError(msg);  // Show error message
                }
            }
        }
    };

    return (
        <Container maxWidth="m">
            <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center',flexDirection: 'column' }}>
                <Typography variant="h1" gutterBottom>Sign Up here</Typography>
                
                <div>
                    <form onSubmit={handleSubmit}>
                        {error && <Typography color="error" gutterBottom>{error}</Typography>}

                        <Typography gutterBottom>Name:</Typography>
                        <TextField 
                            id='name' 
                            name='name'  // Set the name attribute to match the form field in formData
                            label="Name" 
                            variant="outlined" 
                            required 
                            onChange={handleChange} 
                            value={formData.name}  // Set the value from formData
                        />

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

                        <Typography gutterBottom>What are you?:</Typography>
                        <FormControl required sx={{ minWidth: 220 }}>
                            <InputLabel id="role-label">Select your Role</InputLabel>
                            <Select
                                labelId="role-label"
                                id="role"
                                name='role'  // Set name attribute
                                value={formData.role}  // Bind to formData
                                label="Role"
                                onChange={handleChange}
                            >
                                <MenuItem value={'Instructor'}>Instructor</MenuItem>
                                <MenuItem value={'user'}>User</MenuItem>
                            </Select>
                            
                        </FormControl>

                        <Typography gutterBottom>Username:</Typography>
                        <TextField 
                            id="username" 
                            name='username' 
                            label="Username" 
                            variant="outlined" 
                            required 
                            onChange={handleChange} 
                            value={formData.username} 
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
    );
}

export default Signup;
