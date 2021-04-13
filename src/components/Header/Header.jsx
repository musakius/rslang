import React, {useState} from 'react';
import {NavLink, useHistory} from 'react-router-dom';

const Header = () => {

    const logoutHandler = (e) => {

        e.preventDefault()

        localStorage.removeItem('user')
        localStorage.removeItem('reduxState')

        window.location.reload()
    }

    const user = JSON.parse(localStorage.getItem('user'))

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink to='/' className="navbar-brand">
                    RSLang
                </NavLink>
                <div className="collapse navbar-collapse" id="navbarColor03">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink to='/textbook' className="nav-link">
                                Учебник
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/games' className="nav-link">
                                Мини-игры
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/stat' className="nav-link">
                                Статистика
                            </NavLink>
                        </li>

                    </ul>

                    {localStorage.getItem('user') && localStorage.getItem('reduxState') !== null ?
                        (
                            <div className="form-inline my-2 my-lg-0">
                                <span className="mr-sm-2">Приветствуем Вас, {user.name} !</span>
                                <NavLink
                                    to='/'
                                    onClick={logoutHandler}
                                    className="btn btn-secondary my-2 my-sm-0">
                                    <i className="fas fa-sign-out-alt"></i>Выйти
                                </NavLink>
                            </div>
                        )
                        :
                        (
                            <div>
                                <NavLink
                                    to='/login'
                                    className="btn btn-secondary my-2 my-sm-0"
                                >
                                    <i className="fas fa-sign-in-alt"></i>Войти
                                </NavLink>
                            </div>
                        )
                    }

                </div>
            </nav>
        </header>
    );
}

export default Header;