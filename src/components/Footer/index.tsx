import React from "react";
import { FooterProps } from './interface';
import { Link } from 'react-router-dom';
import { indexPage } from '../../pages/route';
import SocialFollow from "../SocialFollow";
import Logo from "../Logo";
import { APP_NAME } from "../../constants/env";
import { getYear } from "../../utils/dateUtil";
import './style.scss';

const Footer : React.FC<FooterProps> = () => {
    return (
        <div className="container">
            <footer className="d-flex flex-wrap justify-content-center align-items-center border-top p-3 mt-5">
                <p className="col-md-4 mb-0 text-body-secondary">
                    &copy; { getYear() }
                    <Logo width="40px" className="text-decoration-none text-body-secondary">
                        {APP_NAME}
                    </Logo>
                </p>

                <SocialFollow />

                <ul className="nav col-md-4 justify-content-end align-items-center">
                    <li className="nav-item">
                        <Link 
                            to={indexPage} 
                            className="nav-link px-2 text-body-secondary"
                            aria-label="Home"
                        >
                            Home
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link 
                            to={indexPage} 
                            className="nav-link px-2 text-body-secondary"
                            aria-label="Features"
                        >
                            Features
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link 
                            to={indexPage} 
                            className="nav-link px-2 text-body-secondary"
                            aria-label="FAQs"
                        >
                            FAQs
                        </Link>
                    </li>
                </ul>

            </footer>
        </div>
    )
}

export default (Footer);
