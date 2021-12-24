import React,{ useState } from "react"
import {useNavigate} from 'react-router-dom'

function Login() {
    const [credentials,setcredential] = useState({Email:"",Password:""})
    let history = useNavigate();
    const host = "http://localhost:5000"
    const handlesubmit = async(e) => {
        e.preventDefault()
        const url = `${host}/api/auth/login`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:credentials.Email,password:credentials.Password})
        });
        const json = await response.json();
        console.log(json)

        if(json.success)
        {
            localStorage.setItem('token',json.token)
            history("/")
        }
        else
        {
            alert("Invalid Credentials")
        }
    }

    const onchange = (e) =>{
        setcredential({...credentials,[e.target.name]:e.target.value})
    }

    return (
        <>
            <div className="container my-3">
                <form onSubmit={handlesubmit}>
                    <div className="mb-3">
                        <label htmlFor="Email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="Email" name="Email" onChange={onchange} value={credentials.Email}   aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="Password" onChange={onchange} value={credentials.Password} name="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Login
