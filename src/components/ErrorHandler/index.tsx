import React from "react";
import { RootState } from '../../redux/store';
import { selectErrorDetailsState, selectIsFetchingState } from '../../redux/user/user.selectors'
import { createStructuredSelector } from 'reselect'
import { connect, MapStateToProps } from 'react-redux';
import './style.scss';
import { ErrorHandlerOwnProps, ErrorHandlerProps, ErrorHandlerStateProps } from "./interface";

const ErrorHandler : React.FC<ErrorHandlerProps> = ({ isFetching, errorDetails, className }) => {
  // Map through errors and add id with randomUUID
  const errorsWithIds =  errorDetails ? errorDetails.errors.map(error => ({
    ...error,
    id: crypto.randomUUID()
  })) : [];

  return (
    <React.Fragment>
      {
        !isFetching && errorsWithIds.length > 0  ? 
          <div className={`container mt-5 ${className || ''}`}>
            <div className="alert alert-danger" role="alert">
              <ul className="list-unstyled">
                  { errorsWithIds.map((errorsWithId) => 
                      <li key={errorsWithId.id}>{errorsWithId.errorMessage}</li>
                  )}
              </ul>
            </div>
          </div>
        : ''
      }
    </React.Fragment>
  );  
}

const mapStateToProps: MapStateToProps<ErrorHandlerStateProps, ErrorHandlerOwnProps, RootState> = createStructuredSelector({
  isFetching: selectIsFetchingState,
  errorDetails: selectErrorDetailsState,
});

export default connect(mapStateToProps)(ErrorHandler);
