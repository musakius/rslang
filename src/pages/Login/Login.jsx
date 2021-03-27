import React, {useState} from "react"
import {Link} from "react-router-dom"
import "./Login.css"

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className="login">
            <div className="row">
                <div className="col s4 offset-s3">
                    <form>
                        <input
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            required='required'
                            type="text"
                            placeholder='Email'
                            className='form-control form-group'
                        />
                        <input
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            required='required'
                            type="password"
                            placeholder='Password'
                            className='form-control form-group'
                        />

                        <button class="btn btn-primary">Войти</button>

                    </form>

                    <p>Ещё нет аккаунта? <Link to={'/register'}>ЗАРЕГИСТРИРОВАТЬСЯ</Link></p>

                </div>
            </div>
        </div>
    )
}

export default Login