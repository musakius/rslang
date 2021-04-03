import React, {useState} from 'react';
import {NavLink, useHistory} from 'react-router-dom';

const Header = () => {

    const logoutHandler = (e) => {

        e.preventDefault()

        localStorage.removeItem('user')
        localStorage.removeItem('reduxState')

        window.location.reload()
    }

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

                        {localStorage.getItem('user') && localStorage.getItem('reduxState') !== null ?
                            (
                                <li className="nav-item border-right-0">
                                    <NavLink to='/'
                                             style={{
                                                 position: 'absolute',
                                                 right: '0'
                                             }}
                                             className="nav-link info"
                                             onClick={logoutHandler}>
                                        Выйти
                                    </NavLink>
                                </li>
                            )
                            :
                            (
                                <li className="nav-item">
                                    <NavLink
                                        style={{
                                            position: 'absolute',
                                            right: '0'
                                        }}
                                        className="nav-link"
                                        to='/login'>
                                        Войти
                                    </NavLink>
                                </li>
                            )
                        }

                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header;