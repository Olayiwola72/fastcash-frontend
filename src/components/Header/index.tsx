import React from "react";
import { HeaderProps, HeaderOwnProps, HeaderStateProps, HeaderDispatchProps } from './interface';
import { connect, MapStateToProps, MapDispatchToPropsFunction } from 'react-redux';
import { Dispatch } from 'redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { selectUserData } from '../../redux/user/user.selectors'
import { createStructuredSelector } from 'reselect';
import { indexPage, profilePage } from '../../pages/route';
import { signOutStart } from '../../redux/user/user.actions'
import './style.scss';
import Logo from "../Logo";

const Header : React.FC<HeaderProps> = ({ userData, signOutStart }) => {
    return (
        <header className="text-bg-dark">
            <div className="container header p-1">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

                    <Logo width="50px" className="d-flex align-items-center mb-lg-0" />

                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <Link to={indexPage} className="nav-link px-2 text-white">Home</Link>
                    </ul>

                    { userData ? 
                        <div className="dropdown text-end">
                            
                            <Link to="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <img 
                                    src={ userData.pictureUrl ? userData.pictureUrl : '' }
                                    alt="mdo" width="32" height="32" 
                                    className="rounded-circle img-fluid" 
                                />
                            </Link>
                            
                            <ul className="dropdown-menu text-small">
                                <li>
                                    <Link to={profilePage} className="dropdown-item">Update Profile</Link>
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <Link to={indexPage} className="dropdown-item" onClick={() => signOutStart()} >Sign out</Link>
                                </li>
                            </ul>
                        </div>
                        : 
                        ''
                    }
                </div>
            </div>
        </header>
    )
}

const mapStateToProps: MapStateToProps<HeaderStateProps, HeaderOwnProps, RootState> = createStructuredSelector({
    userData: selectUserData,
});

const mapDispatchToProps : MapDispatchToPropsFunction<HeaderDispatchProps, HeaderOwnProps> = (dispatch: Dispatch) => ({
    signOutStart: () => dispatch(signOutStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);