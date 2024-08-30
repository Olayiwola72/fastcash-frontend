import React from "react";
import { MapDispatchToPropsFunction, connect } from 'react-redux';
import { Dispatch } from 'redux';
import { LogoDispatchProps, LogoOwnProps, LogoProps } from './interface';
import { Link } from 'react-router-dom';
import image from '../../assets/logo.png';
import './style.scss';
import { indexPage } from "../../pages/route";
import { APP_NAME } from "../../constants/env";
import { removeErrorMessage } from "../../redux/user/user.actions";

const Logo : React.FC<LogoProps> = ({ width, children, className, removeErrorMessage }) => {
    return (
        <Link to={indexPage} className={`p-2 ${className}`} aria-label={`${APP_NAME} logo`} onClick={() => removeErrorMessage()}>
            <img 
                role="presentation"
                className="img-fluid" 
                src={image} alt={`${APP_NAME} logo`} 
                width={width}
                fetchPriority="high"
            />
            {children}
        </Link>
    )
}

const mapDispatchToProps : MapDispatchToPropsFunction<LogoDispatchProps, LogoOwnProps> = (dispatch: Dispatch) => ({
    removeErrorMessage: () => dispatch(removeErrorMessage())
});
  
export default connect(null, mapDispatchToProps)(Logo);
