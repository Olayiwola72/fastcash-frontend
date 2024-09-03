import React from "react";
import { HeaderProps, HeaderOwnProps, HeaderStateProps, HeaderDispatchProps } from './interface';
import { connect, MapStateToProps, MapDispatchToPropsFunction } from 'react-redux';
import { Dispatch } from 'redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { selectUserData } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { indexPage, profilePage } from '../../pages/route';
import { removeErrorMessage, signOutStart } from '../../redux/user/user.actions';
import './style.scss';
import Logo from "../Logo";

const Header: React.FC<HeaderProps> = ({ userData, signOutStart, removeErrorMessage }) => {
    return (
        <header className="bg-dark text-white">
            <div className="container-fluid">
                <nav className="navbar navbar-expand-lg navbar-dark">
                    <div className="container">
                        <Link className="navbar-brand" to={indexPage}>
                            <Logo width="45px" className="d-inline-block" />
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link 
                                        to={indexPage} 
                                        className="nav-link"
                                        onClick={() => removeErrorMessage()}
                                    >
                                        Home
                                    </Link>
                                </li>
                            </ul>

                            { userData && (
                                <div className="d-flex align-items-center ms-auto">
                                    <div className="dropdown">
                                        <Link className="d-block link-body-emphasis text-decoration-none dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <img 
                                                src={userData?.pictureUrl || ''} 
                                                alt="User" 
                                                width="32" 
                                                height="32" 
                                                className="rounded-circle" 
                                            />
                                        </Link>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <li><Link to={profilePage} className="dropdown-item">Update Profile</Link></li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li><Link to={indexPage} className="dropdown-item" onClick={() => signOutStart()}>Sign out</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
}

const mapStateToProps: MapStateToProps<HeaderStateProps, HeaderOwnProps, RootState> = createStructuredSelector({
    userData: selectUserData,
});

const mapDispatchToProps: MapDispatchToPropsFunction<HeaderDispatchProps, HeaderOwnProps> = (dispatch: Dispatch) => ({
    signOutStart: () => dispatch(signOutStart()),
    removeErrorMessage: () => dispatch(removeErrorMessage())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
