import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password, setPassword] =useState('');
    const [ConfirmPassword, setConfirmPassword]=useState('');
    const [address,setAddress] = useState('');
    const [role,setRole] = useState('normal');
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();

        if(password!==ConfirmPassword){
            alert('Password do not match');
            return;
        }
        if (password.length < 8 || !/[A-Z]/.test(password) || !/[!@#$%^&*()]/.test(password)) {
            alert('Password must be at least 8 characters and contain an uppercase letter and a special character.');
            return;
        }
        try{
            const result=await axios.post('http://localhost:8000/user/register',{
                name,
                email,
                password,
                address,
                role
            })

            if(result.status === 200){
                alert('Registration successful')
                navigate('/login')
            }
        }catch(err){
            console.log(err);          
            alert('Error during registration');   
        }
    }


  return (
    <>
     <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Confirm Password</label>
          <input
            type="password"
            className="form-control"
            value={ConfirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-3">
          <label>Address</label>
          <input
            type="text"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Role</label>
          <select
            type="text"
            className="form-control"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="normal">Normal User</option>
            <option value="admin">Admin</option>
            <option value="store_owner">Store owner</option>

          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>

       </form>

        </div>
      
    </>
  )
}

export default Register
