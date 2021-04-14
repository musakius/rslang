import React, {useState, useMemo} from 'react'
import {connect} from "react-redux"
import {Link} from 'react-router-dom'
import './Register.css'
import Service from "../../services";
import {Redirect} from "react-router";
import {setUserInfo} from "../../redux/actions";

const Register = ({setUserInfo}) => {

    const [validate, setValidate] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const api = useMemo(() => new Service(), [])

    const submitForm = (e) => {
        e.preventDefault()

        const data = {
            name, email, password
        }

        api
            .postCreateUser('users', data)
            .then((data) => {

                if (localStorage.getItem('user') === null) {

                    if (data !== undefined) {

                        const user = {
                            email,
                            password
                        }

                        api
                            .login("signin", user)
                            .then((response) => {
                                
                                const userMain = {
                                    "userId" : data.id,
                                    "name" : data.name,
                                    "email" : data.email,
                                    "token" : response.token,
                                }

                                setUserInfo([response])

                                localStorage.setItem('user', JSON.stringify(userMain))
                                setValidate(true)
                            })
                    }
                } else {
                    console.log("Вы уже в системе")
                }

            })
            .catch(err => {
                console.log("Auth service err", err)
                throw err
            })
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

                        {validate ? (
                            <Redirect to={"/"}/>
                        ) : (
                            <Redirect to={"/register"}/>
                        )}

                    </form>

                    <p>Уже есть аккаунт? <Link to={'/login'}>Войти</Link></p>

                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = {
    setUserInfo,
}

export default connect(null, mapDispatchToProps)(Register)