import React from "react";
import { LogoProps } from './interface';
import { Link } from 'react-router-dom';
import image from '../../assets/logo.png';
import './style.scss';
import { indexPage } from "../../pages/route";
import { APP_NAME } from "../../constants/env";

const Logo : React.FC<LogoProps> = ({ width, children, className }) => {
    return (
        <Link to={indexPage} className={`p-2 ${className}`} aria-label={`${APP_NAME} logo`}>
            <img 
                className="img-fluid" 
                src={image} alt={`${APP_NAME} logo`} 
                width={width}
                fetchPriority="high"
            />
            {children}
        </Link>
    )
}

export default (Logo);
