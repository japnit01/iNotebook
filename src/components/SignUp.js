import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [credentials,setcredential] = useState({Name:"", Email:"",Password:"",CPassword:""})
    let history = useNavigate();
    const host = "http://localhost:5000"
    const handlesubmit = async(e) => {
        e.preventDefault()
        const url = `${host}/api/auth/createuser`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name:credentials.Name,email:credentials.Email,password:credentials.Password})
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
                        <label htmlFor="Name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="Name" name="Name" onChange={onchange} value={credentials.Name}   aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="Email" name="Email" onChange={onchange} value={credentials.Email}   aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="Password" onChange={onchange} value={credentials.Password} name="Password" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="CPassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="CPassword" onChange={onchange} value={credentials.CPassword} name="CPassword" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default SignUp
