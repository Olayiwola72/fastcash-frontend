import React from "react";
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import './style.scss';
import { Link } from "react-router-dom";
import { OverdraftAlertDispatchProps, OverdraftAlertOwnProps, OverdraftAlertProps } from "./interface";
import MyModal from "../MyModal";
import { setShowModal } from "../../redux/user/user.actions";
import { Dispatch } from 'redux';

const OverdraftAlert : React.FC<OverdraftAlertProps> = ({ account, setShowModal }) => {
  return (
    <React.Fragment>
      {
        account && account.allowOverdraft ?       
          <div className="text-danger mb-3" role="alert">
            <MyModal currentAccount={account}>
              <h5>
                  Are you sure you want to {account.allowOverdraft ? "disable" : "enable"} overdraft
              </h5>
            </MyModal>
            
            Overdraft is enabled on this debit account.&nbsp;
            <Link to="#" onClick={() => setShowModal()} className="alert-link">Click here to disable.</Link>
          </div>
      : '' }
    </React.Fragment>
  );  
}

const mapDispatchToProps : MapDispatchToPropsFunction<OverdraftAlertDispatchProps, OverdraftAlertOwnProps> = (dispatch: Dispatch) => ({
  setShowModal: () => dispatch(setShowModal())
});

export default connect(null, mapDispatchToProps)(OverdraftAlert);
