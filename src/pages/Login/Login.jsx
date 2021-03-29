import React, {useState, useMemo} from "react"
import {Link} from "react-router-dom"
import "./Login.css"
import Service from "../../services";
import {Redirect} from "react-router";

const Login = () => {

    const [validate, setValidate] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const api = useMemo(() => new Service(), [])

    const submitForm = (e) => {
        e.preventDefault()

        const data = {
            email, password
        }

        api
            .login('signin', data)
            .then(response => {

                if (localStorage.getItem('user') === null) {
                    console.log(response);
                    localStorage.setItem('user', JSON.stringify(response))
                    setValidate(true)
                } else {
                    console.log("Вы уже в системе")
                }

            })
            .catch(err => {
                console.log(err)
            })

    }

    return (
        <div className="login">
            <div className="row">
                <div className="col s4 offset-s3">
                    <form onSubmit={submitForm}>
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

                        {validate ? (
                            <Redirect to={"/"}/>
                        ) : (
                            <Redirect to={"/login"}/>
                        )}

                    </form>

                    <p>Ещё нет аккаунта? <Link to={'/register'}>ЗАРЕГИСТРИРОВАТЬСЯ</Link></p>

                </div>
            </div>
        </div>
    )
}

export default Login