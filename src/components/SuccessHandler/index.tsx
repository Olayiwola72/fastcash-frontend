import React from "react";
import { RootState } from '../../redux/store';
import { selectIsFetchingState, selectSuccessMessage } from '../../redux/user/user.selectors'
import { createStructuredSelector } from 'reselect'
import { connect, MapStateToProps } from 'react-redux';
import './style.scss';
import { SuccessHandlerOwnProps, SuccessHandlerProps, SuccessHandlerStateProps } from "./interface";

const SuccessHandler : React.FC<SuccessHandlerProps> = ({ isFetching, successMessage, className }) => {
  return (
    <React.Fragment>
      {
        !isFetching && successMessage ? 
          <div className={`container mt-5 ${className || ''}`}>
            <div className="alert alert-success" role="alert">
              <h4 className="alert-heading">Success!</h4>
              <p>{successMessage}</p>
            </div>
          </div>
        : ''
      }
    </React.Fragment>
  );  
}

const mapStateToProps: MapStateToProps<SuccessHandlerStateProps, SuccessHandlerOwnProps, RootState> = createStructuredSelector({
  isFetching: selectIsFetchingState,
  successMessage: selectSuccessMessage,
});

export default connect(mapStateToProps)(SuccessHandler);
