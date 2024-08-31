import React, { useState } from "react";
import { MapDispatchToPropsFunction, connect } from 'react-redux';
import { Dispatch } from 'redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getAuthTokenStart, removeErrorMessage } from '../../redux/user/user.actions';
import { SignInProps, SignInOwnProps, SignInDispatchProps, SignInRequest } from './interface';
import ErrorHandler from '../ErrorHandler';
import GoogleOAuth from '../GoogleOAuth';
import { getPasswordRegex } from "../../utils/passwordRegex";
import { useForm } from "react-hook-form";
import { resetPasswordPage } from "../../pages/route";
import './style.scss';
import TogglePassword from "../TogglePassword";

const SignIn : React.FC<SignInProps> = ({ getAuthTokenStart, removeErrorMessage }) => {
    const { t } = useTranslation();

    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'all'
    });

    const onSubmit = (request : SignInRequest) => {
        getAuthTokenStart(request);
    };
    
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <aside className="content-container" id="sign-in">
            <div className="form-signin p-0 w-100 m-auto">
                <ErrorHandler className="mb-4"/>
                <GoogleOAuth />

                <form onSubmit={handleSubmit((data) => onSubmit(data as SignInRequest))}>
                    <div className = "header-signin mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="72" height="57" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                        </svg>
                    </div>

                    <h1 className="h3 mt-2 mb-3 fw-normal text-center">Please sign in</h1>

                    <div className="form-floating">
                        <input 
                            type="text"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            id="email" 
                            autoComplete="off"
                            {...register("email", {
                                required: true,
                                pattern: {
                                    value:
                                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: "Invalid email address",
                                },
                            })}
                        />
                        <label htmlFor="email">Email *</label>
                        {errors?.email?.type === 'required' && <div className="invalid-feedback">{t('Required', {field: 'Email'})}</div> }
                        {errors?.email?.type === 'pattern' && <div className="invalid-feedback">{t('InvalidEmail')}</div> }
                    </div>
                    
                    <div className="container-fluid p-0 d-flex align-items-center">
                        <div className="form-floating position-relative w-100">
                            <input 
                                type={showPassword ? 'text' : 'password'}
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`} 
                                id="password" 
                                autoComplete="password"
                                spellCheck="false"
                                autoCapitalize="off"
                                autoCorrect="off"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: 'required',
                                    },
                                    pattern: getPasswordRegex(),
                                })}
                            />
                            <label htmlFor="password">Password *</label>
                            {errors?.password?.type === 'required' && <div className="invalid-feedback">{t('Required', {field: 'Password'})}</div> }
                            {errors?.password?.type === 'pattern' && <div className="invalid-feedback">{t('InvalidPassword')}</div> }
                            
                            <TogglePassword showPassword={showPassword} toggleShowPassword={toggleShowPassword} errorMessage={errors.password?.message} />
                        </div>                   
                    </div>

                    <button 
                        className="btn btn-primary py-2 mt-3 w-100"
                        type="submit"
                        aria-label="Sign in"
                        aria-labelledby="sign-in"
                    >
                        Sign in
                    </button>

                    <p className="mt-3 mb-3 text-start text-body-secondary">
                        Forgot your password? 
                        <Link onClick={removeErrorMessage} to={resetPasswordPage} className="px-2 text-primary">
                            Reset Password
                        </Link>
                    </p>
                </form>
            </div>
        </aside>
    );
}

const mapDispatchToProps : MapDispatchToPropsFunction<SignInDispatchProps, SignInOwnProps> = (dispatch: Dispatch) => ({
    getAuthTokenStart: (data : SignInRequest) => dispatch(getAuthTokenStart(data)),
    removeErrorMessage: () => dispatch(removeErrorMessage())
});
  
export default connect(null, mapDispatchToProps)(SignIn);
