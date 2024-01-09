import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

function LoginPage() {

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const router = useRouter();
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(credentials)
    const response = await axios.post('/api/auth/login', credentials)
    if (response.status == 200) {
      router.push('/dashboard')
    }
  }

  return (
    <div>
        <form>
            <input name="email" type='email'onChange={handleChange} placeholder='email'/>
            <input name="password" type='password'onChange={handleChange} placeholder='password'/>
            <button onClick={handleSubmit}>Login</button>
        </form>
    </div>
  )
}

export default LoginPage