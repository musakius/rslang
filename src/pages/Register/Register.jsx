import React, {useState, useMemo} from 'react'
import {Link} from 'react-router-dom'
import './Register.css'
import Service from "../../services";

const Register = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const api = useMemo(() => new Service(), [])

    const submitForm = (e) => {
        e.preventDefault()

        const data = {
            name, email, password
        }

        console.log(name, email, password);
        console.log("register")

    }

    return (
        <div className="register">
            <div className="row">
                <div className="col s4 offset-s3">
                    <form onSubmit={submitForm}>
                        <input
                            onChange={e => setName(e.target.value)}
                            value={name}
                            required='required'
                            type="text"
                            placeholder='Введите имя'
                            className='form-control form-group'/>

                        <input
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            required='required'
                            type="text"
                            placeholder='Введите email'
                            className='form-control form-group'/>

                        <input
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            required='required'
                            type="password"
                            placeholder='Введите пароль'
                            className='form-control form-group'/>

                        <button class="btn btn-primary">Регистрация</button>

                    </form>

                    <p>Уже есть аккаунт? <Link to={'/login'}>Войти</Link></p>

                </div>
            </div>
        </div>
    )
}

export default Register