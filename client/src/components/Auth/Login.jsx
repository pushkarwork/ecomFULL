import React, { useEffect, useState } from 'react'
import { useLoginMutation } from '../../Redux/Api/authApi'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const nav = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [login, { isLoading, error, data }] = useLoginMutation();
    // console.log("this is from Login :: ", data, isAuthenticated)

    useEffect(() => {
        if (isAuthenticated) {
            nav('/')
        }
        if (error) {
            // console.log("error here ", error)/
            toast.error(error?.data?.message)
        }
    }, [error, isAuthenticated])

    const handleSubmit = (e) => {
        e.preventDefault();
        const loginData = {
            email, password
        }
        login(loginData)
        // console.log(login)
    }

    return (
        <div>
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form
                        className="shadow rounded bg-body"
                        onSubmit={handleSubmit}
                    >
                        <h2 className="mb-4">Login</h2>
                        <div className="mb-3">
                            <label htmlFor="email_field" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password_field" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <Link to="/password/forgot" className="float-end mb-4">Forgot Password?</Link>

                        <button id="login_button" type="submit" className="btn w-100 py-2" disabled={isLoading}>
                            {isLoading ? "Authenticating...." : "LOGIN"}
                        </button>

                        <div className="my-3">
                            <a href="/register" className="float-end">New User?</a>
                        </div>
                    </form>
                </div>
            </div>


        </div>
    )
}

export default Login
