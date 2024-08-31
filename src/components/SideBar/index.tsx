import React from "react";
import { SideBarDispatchProps, SideBarOwnProps, SideBarProps } from './interface';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { Dispatch } from 'redux';
import { signOutStart, removeSuccessMessage, removeErrorMessage } from "../../redux/user/user.actions";
import { indexPage, homePage, ownAccountTransferPage, interTransferPage, transactionsPage, accountsPage, profilePage, transactionsHistoryPage, changePasswordPage, intraTransferPage, titles } from '../../pages/route';
import { Link } from 'react-router-dom';
import './style.scss';
import Logo from "../Logo";
import { APP_NAME } from "../../constants/env";

const SideBar : React.FC<SideBarProps> = ({ signOutStart, removeSuccessMessage, removeErrorMessage }) => {
  const clearMessages = () => {
    removeSuccessMessage();
    removeErrorMessage();
  }

  return (
    <div className="side-bar col-md-3 col-lg-2 border h-100">
      <div className="m-3">
      <Logo width="50px" className="fs-5 fw-semibold text-success d-flex align-items-center mb-2 link-body-emphasis text-decoration-none border-bottom">
        {APP_NAME}
      </Logo>
      <ul className="list-unstyled ps-0">
        <li className="mb-1">
          <button className="btn d-inline-flex align-items-center rounded border-0 collapsed">
            <Link to={homePage} className="nav-link link-body-emphasis">
              <i className="fa fa-dashboard bi pe-none me-2" aria-hidden="true"></i>
              Dashboard
            </Link>
          </button>
        </li>
        <li className="mb-1">
          <button className="btn d-inline-flex align-items-center rounded border-0 collapsed">
            <Link to={transactionsHistoryPage} className="nav-link link-body-emphasis">
              <i className="fa fa-history bi pe-none me-2" aria-hidden="true"></i>
              {titles[transactionsHistoryPage]}
            </Link>
          </button>
        </li>
        <li className="mb-1">
          <button className="btn d-inline-flex align-items-center rounded border-0 collapsed">
            <Link to={accountsPage} className="nav-link link-body-emphasis">
              <i className="fa fa-google-wallet bi pe-none me-2" aria-hidden="true"></i>
              {titles[accountsPage]}
            </Link>
          </button>
        </li>
        <li className="mb-1">
          <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
            Transfer
          </button>
          <div className="collapse" id="orders-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <Link to={ownAccountTransferPage} className="link-body-emphasis d-inline-flex text-decoration-none rounded" onClick={() => clearMessages()}>
                  {titles[ownAccountTransferPage]}
                </Link>
              </li>
              <li>
                <Link to={intraTransferPage} className="link-body-emphasis d-inline-flex text-decoration-none rounded" onClick={() => clearMessages()}>
                  {titles[intraTransferPage]}
                </Link>
              </li>
              <li>
                <Link to={interTransferPage} className="link-body-emphasis d-inline-flex text-decoration-none rounded" onClick={() => clearMessages()}>
                  {titles[interTransferPage]}
                </Link>
              </li>
            </ul>
          </div>
        </li>
        <li className="mb-1">
          <button className="btn d-inline-flex align-items-center rounded border-0 collapsed">
            <Link to={transactionsPage} className="nav-link link-body-emphasis">
              <i className="fa fa-list bi pe-none me-2" aria-hidden="true"></i>
              {titles[transactionsPage]}
            </Link>
          </button>
        </li>
        <li className="border-top my-3"></li>
        <li className="mb-1">
          <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
            Account
          </button>
          <div className="collapse" id="account-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <Link to={changePasswordPage} className="link-body-emphasis d-inline-flex text-decoration-none rounded" onClick={() => clearMessages()}>
                  {titles[changePasswordPage]}
                </Link>
              </li>
              <li>
                <Link to={profilePage} className="link-body-emphasis d-inline-flex text-decoration-none rounded" onClick={() => clearMessages()}>
                  {titles[profilePage]}
                </Link>
              </li>
            </ul>
          </div>
        </li>
        <li className="border-top my-3"></li>
        <li className="mb-1">
          <button className="btn d-inline-flex align-items-center rounded border-0 collapsed">
            <Link to={indexPage} className="nav-link link-body-emphasis" onClick={() => signOutStart()}>
              <i className="fa fa-sign-out bi pe-none me-2" aria-hidden="true"></i>
              Sign Out
            </Link>
          </button>
        </li>
      </ul>
    </div>
    </div>
  );  
}

const mapDispatchToProps : MapDispatchToPropsFunction<SideBarDispatchProps, SideBarOwnProps> = (dispatch: Dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
  removeSuccessMessage: () => dispatch(removeSuccessMessage()),
  removeErrorMessage: () => dispatch(removeErrorMessage())
});

export default connect(null, mapDispatchToProps)(SideBar);
