import axios from "axios";
import Navbar from './Navbar';
import { useState } from "react";

function  HomePage(){
  
    const [courses,setCourses]=useState(null);
    const userData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/course/courses', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log(response.data); 
            return response.data;
        } catch (error) {
            console.error("Error fetching data:", error.message);
            if (error.response && error.response.status === 401) {
                console.error("Unauthorized access - check your token.");
            }
        }
    };
    
    userData()
    return(
        <div>
            <Navbar></Navbar>
            <h1>Welcome to my home page</h1>
            <p>
                All User data will show here
                
            </p>
        </div>
    )
}
export default HomePage;