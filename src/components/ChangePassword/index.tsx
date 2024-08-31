import React, { useEffect, useState } from "react";
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { Dispatch } from 'redux';
import { ChangePasswordProps, ChangePasswordOwnProps, ChangePasswordDispatchProps, ChangePasswordRequest } from './interface';
import { useForm } from 'react-hook-form';
import { getPasswordRegex } from "../../utils/passwordRegex";
import { changePasswordStart } from "../../redux/user/user.actions";
import useFormPersist from "react-hook-form-persist";
import { NavigateFunction } from "react-router-dom";
import { useNavigateContext } from "../NavigateProvider";
import ErrorHandler from '../ErrorHandler';
import TogglePassword from "../TogglePassword";
import { changePasswordPage, titles } from "../../pages/route";
import { useTranslation } from "react-i18next";
import FormError from "../FormError";
import './style.scss';

const ChangePassword : React.FC<ChangePasswordProps> = ({ userData, changePasswordStart }) => {
    const { t } = useTranslation();
    const navigate = useNavigateContext();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        if(userData){
            setValue('email', userData.email)
        }
    }, [userData]);

    const { register, handleSubmit, setValue, watch, formState: { errors, isValid } } = useForm({
        mode: 'all',
        criteriaMode: 'all',
        shouldFocusError: true
    });

    useFormPersist("form-change-password", { watch, setValue });

    const password = watch("password");

    const onSubmit = (request : ChangePasswordRequest) => {
        userData && changePasswordStart(userData.id, request, navigate);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <aside className="container mt-5">
            <div className="form-transaction w-100">
                <ErrorHandler className="mb-4"/>

                <form onSubmit={handleSubmit((data) => onSubmit(data as ChangePasswordRequest))}>
                    {
                        userData && userData.authMethod !== 'LOCAL' ? 
                            userData.defaultPassword ?
                                <h4 className="h4 fw-normal text-center">Link your account with a password</h4>
                            :
                                <h4 className="h4 fw-normal text-center">{titles[changePasswordPage]}</h4>
                    : ''}

                    <div className="form-floating mt-3">
                        <input 
                            type="text"
                            className={`form-control`} 
                            id="email" 
                            disabled
                            {...register("email", {
                                required: true
                            })}
                        />
                        <label htmlFor="email">Email</label>
                    </div>

                    <div>
                        <div className="container-fluid p-0 d-flex align-items-center">
                            <div className="form-floating position-relative w-100">
                                <input 
                                    type="text"
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
                                        pattern: {
                                            value: getPasswordRegex(),
                                            message: t('InvalidPassword')
                                        },
                                    })}
                                />
                                <label htmlFor="password">Password *</label>

                                <TogglePassword showPassword={showPassword} toggleShowPassword={toggleShowPassword} errorMessage={errors.password?.message} />
                                <FormError errors={errors} fieldName="password" field="Password" />
                            </div>
                        </div>

                        <div className="container-fluid p-0 d-flex align-items-center">
                            <div className="form-floating position-relative w-100">
                                <input 
                                    type="text"
                                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} 
                                    id="confirmPassword" 
                                    autoComplete="confirmPassword"
                                    spellCheck="false"
                                    autoCapitalize="off"
                                    autoCorrect="off"
                                    {...register("confirmPassword", {
                                        required: {
                                            value: true,
                                            message: 'required',
                                        },
                                        validate: (value) => value === password
                                    })}
                                />
                                <label htmlFor="confirmPassword">Confirm Password *</label>   
                                <TogglePassword showPassword={showConfirmPassword} toggleShowPassword={toggleShowConfirmPassword} errorMessage={errors.confirmPassword?.message} />
                                <FormError errors={errors} fieldName="confirmPassword" field="Confirm Password" />
                            </div>
                        </div>
                    </div>

                    <button 
                        className="btn btn-primary py-2 mt-3 w-100"
                        type="submit"
                        disabled={!isValid}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </aside>
    )
}

const mapDispatchToProps : MapDispatchToPropsFunction<ChangePasswordDispatchProps, ChangePasswordOwnProps> = (dispatch: Dispatch) => ({
    changePasswordStart: (userId : number, data : ChangePasswordRequest, navigate : NavigateFunction) => dispatch(changePasswordStart(userId, data, navigate))
});
  
export default connect(null, mapDispatchToProps)(ChangePassword);
