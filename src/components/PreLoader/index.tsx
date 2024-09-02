import React, { useRef } from "react";
import { PreLoaderProps, PreLoaderOwnProps, PreLoaderStateProps } from './interface';
import { RootState } from '../../redux/store';
import { selectIsFetchingState } from '../../redux/user/user.selectors'
import { createStructuredSelector } from 'reselect'
import { connect, MapStateToProps } from 'react-redux';
import ClipLoader from "react-spinners/ClipLoader";
import './style.scss';
import { scrollToRef } from "../../utils/focusHandlingUtil";

const PreLoader : React.FC<PreLoaderProps> = ({ isFetching, isLoading, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  scrollToRef(ref);

  return (
    <div className={`preloader-container ${className}`} ref={ref}>
     
      <ClipLoader
        color={"#000000"}
        loading={isFetching || isLoading}
        size={55}
        speedMultiplier={1}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      
    </div>
  );  
}

const mapStateToProps: MapStateToProps<PreLoaderStateProps, PreLoaderOwnProps, RootState> = createStructuredSelector({
  isFetching: selectIsFetchingState,
});

export default connect(mapStateToProps)(PreLoader);
