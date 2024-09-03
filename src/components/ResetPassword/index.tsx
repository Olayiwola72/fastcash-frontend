import React, { useEffect, useState } from "react";
import { MapDispatchToPropsFunction, connect } from 'react-redux';
import { Dispatch } from 'redux';
import { useTranslation } from 'react-i18next';
import { forgotPasswordStart, removeErrorMessage, resetPasswordStart } from '../../redux/user/user.actions';
import { ForgotPasswordRequest, PasswordRequest, ResetPasswordDispatchProps, ResetPasswordOwnProps, ResetPasswordProps, ResetPasswordRequest } from './interface';
import ErrorHandler from '../ErrorHandler';
import { useForm } from "react-hook-form";
import './style.scss';
import { getPasswordRegex } from "../../utils/passwordRegex";
import { useNavigateContext } from "../NavigateProvider";
import { NavigateFunction } from "react-router-dom";
import { resetPasswordPage, titles } from "../../pages/route";
import FormError from "../FormError";

const RecentPassword : React.FC<ResetPasswordProps> = ({ forgotPasswordStart, resetPasswordStart }) => {
    const { t } = useTranslation();
    const [token, setToken] = useState("");
    const navigate = useNavigateContext();

    const currentUrl = window.location.href;

    useEffect(() => {
        // Create a URL object from the string
        const urlObj = new URL(currentUrl);

        // Use the URLSearchParams API to get the value of the "token" parameter
        const tokenFromUrl = urlObj.searchParams.get("token");
        tokenFromUrl && setToken(tokenFromUrl);
    }, [currentUrl, setToken]);

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const password = watch("password");

    const onSubmit = (request : PasswordRequest ) => {
        if(token){
            const resetPasswordRequest : ResetPasswordRequest = request as ResetPasswordRequest;
            resetPasswordRequest.token = token;
            resetPasswordStart(resetPasswordRequest, navigate);
        }else{
            forgotPasswordStart(request as ForgotPasswordRequest);
        }
    };
    
    return (
        <div className="content-container">
            <div className="reset-password w-100 m-auto">
                <ErrorHandler className="mb-4"/>

                <form onSubmit={handleSubmit((data) => onSubmit(data as PasswordRequest))}>
                    <h1 className="h3 mt-5 mb-3 fw-normal text-center">
                        {titles[resetPasswordPage]}
                    </h1>

                    { !token ?
                        <div className="form-floating">
                            <input 
                                type="text"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
                                id="email" 
                                autoComplete="off"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: 'required',
                                    },
                                    pattern: {
                                        value:
                                        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: t('InvalidEmail'),
                                    },
                                })}
                            />
                            <label htmlFor="email">Email *</label>
                            <FormError errors={errors} fieldName="email" field="Email" />
                        </div>
                    :
                        <div>
                            <div className="container-fluid p-0 d-flex align-items-center">
                                <div className="form-floating position-relative w-100">
                                    <input 
                                        type="text"
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`} 
                                        id="password" 
                                        {...register("password", {
                                            required: {
                                                value: true,
                                                message: 'required',
                                            },
                                            pattern: {
                                                value: getPasswordRegex(),
                                                message: t('InvalidPassword')
                                            },
                                        })}
                                    />
                                    <label htmlFor="password">Password *</label>
                                    <FormError errors={errors} fieldName="password" field="Password" />
                                </div>
                            </div>

                            <div className="container-fluid p-0 d-flex align-items-center">
                                <div className="form-floating position-relative w-100">
                                    <input 
                                        type="text"
                                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} 
                                        id="confirmPassword" 
                                        {...register("confirmPassword", {
                                            required: {
                                                value: true,
                                                message: 'required',
                                            },
                                            validate: (value) => value === password
                                        })}
                                    />
                                    <label htmlFor="confirmPassword">Confirm Password *</label>
                                    <FormError errors={errors} fieldName="confirmPassword" field="Confirm Password" />
                                </div>
                            </div>
                        </div>
                    }

                    <button 
                        className="btn btn-primary py-2 mt-3 w-100"
                        type="submit"
                    >
                        Reset password
                    </button>
                </form>
            </div>
        </div>
    )
}

const mapDispatchToProps : MapDispatchToPropsFunction<ResetPasswordDispatchProps, ResetPasswordOwnProps> = (dispatch: Dispatch) => ({
    forgotPasswordStart: (data : ForgotPasswordRequest) => dispatch(forgotPasswordStart(data)),
    resetPasswordStart: (data : ResetPasswordRequest, navigate : NavigateFunction) => dispatch(resetPasswordStart(data, navigate)),
    removeErrorMessage: () => dispatch(removeErrorMessage())
});
  
export default connect(null, mapDispatchToProps)(RecentPassword);
