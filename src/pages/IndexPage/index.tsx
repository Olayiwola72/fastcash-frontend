import React, { Suspense, lazy } from "react";
import { IndexProps, IndexOwnProps, IndexStateProps } from './interface';
import { RootState } from '../../redux/store';
import { selectUserData } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { connect, MapStateToProps } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { resetPasswordPage } from "../route";
import PreLoader from "../../components/PreLoader";
import './style.scss';

// Lazy-loaded components
const Section = lazy(() => import("../../components/Section"));
const SignIn = lazy(() => import("../../components/SignIn"));
const HomePage = lazy(() => import("../HomePage"));
const ResetPassword = lazy(() => import("../../components/ResetPassword"));

const IndexPage: React.FC<IndexProps> = ({ userData }) => {
    const { pathname } = useLocation();

    const renderContent = () => {
        switch (pathname) {
            case resetPasswordPage:
                return <ResetPassword />;
            default:
                return <SignIn />;
        }
    };

    return (
        <>
            { userData ? (
                <Suspense fallback={<PreLoader isLoading={true} />}>
                    <HomePage userData={userData} />
                </Suspense>
            ) : (
                <Suspense fallback={<PreLoader isLoading={true} />}>
                    <div className="index p-5 pb-0">
                        <Section />
                        {renderContent()}
                    </div>
                </Suspense>
            )}
        </>
    );
};

const mapStateToProps: MapStateToProps<IndexStateProps, IndexOwnProps, RootState> = createStructuredSelector({
    userData: selectUserData,
});

export default connect(mapStateToProps)(IndexPage);