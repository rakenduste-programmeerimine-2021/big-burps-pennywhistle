import './login.css';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';



function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [error, setError] = useState('')
  const navigate = useNavigate() 

  function handleEmailChange(e){
    setEmail(e.target.value);
  }
  function handlePasswordChange(e){
    setPassword(e.target.value);
  }
  const LogIn = async (e) => {
    const userData = {
      email: email,
      password: password
    }
    const res = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData),
    })

    const returnData = await res.json()

    if (returnData.token) {
      console.log("Successfully logged in")
      localStorage.setItem('user', returnData)
      navigate('/home'); 
    } else {
      let errors = ''
      if (returnData.error) {
        errors = returnData.error
      } else {
        for (let i = 0; i < returnData.msg.length; i++) {
          errors += returnData.msg[i].param[0].toUpperCase() + returnData.msg[i].param.slice(1) + ' ' + returnData.msg[i].msg + '\n'
        }
      }
      setError(errors);
      console.log(error);
    }
  }

  return (
    <div className="form-body">
      <div className="mainform">
        <div className="loginform">
          <label className="loginlabel">Login</label>
          <input className="input" label="E-mail" placeholder="E-mail" onChange={handleEmailChange} type="email" required />
          <input className="input" label="Password" placeholder="Password" onChange={handlePasswordChange} type="password" required />
          <button className="button" type="primary" onClick={LogIn}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Login