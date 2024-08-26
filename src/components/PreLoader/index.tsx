import React from "react";
import { PreLoaderProps, PreLoaderOwnProps, PreLoaderStateProps } from './interface';
import { RootState } from '../../redux/store';
import { selectIsFetchingState } from '../../redux/user/user.selectors'
import { createStructuredSelector } from 'reselect'
import { connect, MapStateToProps } from 'react-redux';
import { Watch } from 'react-loader-spinner';
import './style.scss';

const PreLoader : React.FC<PreLoaderProps> = ({ isFetching, isLoading, className }) => {
  return (
    <div className={`preloader-container ${className}`}>
      <Watch
        visible={isFetching || isLoading}
        height="80"
        width="80"
        radius="48"
        color="black"
        ariaLabel="watch-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );  
}

const mapStateToProps: MapStateToProps<PreLoaderStateProps, PreLoaderOwnProps, RootState> = createStructuredSelector({
  isFetching: selectIsFetchingState,
});

export default connect(mapStateToProps)(PreLoader);
