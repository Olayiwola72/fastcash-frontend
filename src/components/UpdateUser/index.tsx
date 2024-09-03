import React, { useEffect } from "react";
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { Dispatch } from 'redux';
import { UpdateUserDispatchProps, UpdateUserOwnProps, UpdateUserProps, UpdateUserRequest } from './interface';
import { useForm } from 'react-hook-form';
import { setShowModal, updateUserStart } from "../../redux/user/user.actions";
import MyModal from "../MyModal";
import useFormPersist from "react-hook-form-persist";
import { NavigateFunction } from "react-router-dom";
import { useNavigateContext } from "../NavigateProvider";
import ErrorHandler from '../ErrorHandler';
import SuccessHandler from "../SuccessHandler";
import './style.scss';
import { profilePage, titles } from "../../pages/route";
import FormError from "../FormError";

const UpdateUser : React.FC<UpdateUserProps> = ({ userData, setShowModal, updateUserStart }) => {
    const navigate = useNavigateContext();

    useEffect(() => {
        if(userData){
            const {  email, name } = userData;

            setValue('email', email)
            setValue('name', name)
        }
    }, [userData]);

    const { register, handleSubmit, setValue, watch, formState: { errors, isValid } } = useForm({
        criteriaMode: 'all',
        shouldFocusError: true
    });

    useFormPersist("form-account-settings", { watch, setValue });

    const onSubmit = (request : UpdateUserRequest) => {
        userData && updateUserStart(userData.id, request, navigate);
    };

    const handleShow = () => {
        setShowModal();
    };

    return (
        <aside className="container mt-5">
            <div className="form-transaction w-100 mt-5">
                <ErrorHandler className="mb-4"/>
                <SuccessHandler className="mb-4"/>

                <form onSubmit={handleSubmit((data) => onSubmit(data as UpdateUserRequest))}>
                    <h1 className="h3 fw-normal text-center">{titles[profilePage]}</h1>

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

                    <div className="container-fluid p-0 d-flex align-items-center">
                        <div className="form-floating position-relative w-100">
                            <input 
                                type="text"
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`} 
                                id="name" 
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: 'required',
                                    },
                                    maxLength: 35,
                                    validate: (value) => value !== userData?.name
                                })}
                            />
                            <label htmlFor="name">Name *</label>
                            <FormError errors={errors} value="35" fieldName="name" field="Name" />
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
            <hr className="mt-5 mb-5"/>
            <div className="mt-5">
                <MyModal userData={userData}>
                    <h5>
                        Are you sure you want to delete your account?
                    </h5>
                </MyModal>

                <button 
                    type="button" 
                    className="btn btn-danger"
                    onClick={() => handleShow()}
                >
                    Delete your account
                </button>
            </div>
        </aside>
    )
}

const mapDispatchToProps : MapDispatchToPropsFunction<UpdateUserDispatchProps, UpdateUserOwnProps> = (dispatch: Dispatch) => ({
    setShowModal: () => dispatch(setShowModal()),
    updateUserStart: (userId : number, data : UpdateUserRequest, navigate : NavigateFunction) => dispatch(updateUserStart(userId, data, navigate))
});
  
export default connect(null, mapDispatchToProps)(UpdateUser);
