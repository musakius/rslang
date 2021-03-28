import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = () => {
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
                </div>
            </nav>
        </header>
    );
}

export default Header;