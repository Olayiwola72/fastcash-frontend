import React, { useLayoutEffect, useCallback, useMemo, Suspense, lazy  } from "react";
import { connect, MapStateToProps, MapDispatchToPropsFunction } from 'react-redux';
import { Dispatch } from 'redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { LayoutProps, LayoutOwnProps, LayoutStateProps, LayoutDispatchProps } from './interface';
import { removeErrorMessage, getUserFailure, signOutSuccess } from '../../redux/user/user.actions';
import { getConfigSuccess } from '../../redux/config/config.actions';
import { getUserSuccess } from '../../redux/user/user.actions';
import { useQueries, UseQueryOptions, UseQueryResult } from 'react-query';
import { fetchUserDetails } from '../../redux/user/user.api';
import { accountsPage, changePasswordPage, homePage, indexPage, interTransferPage, ownAccountTransferPage, profilePage, resetPasswordPage, transactionsHistoryPage, transactionsPage } from '../route';
import Header from "../../components/Header";
import PreLoader from "../../components/PreLoader";
import { Config } from "../../redux/config/interface";
import { useTranslation } from 'react-i18next';
import { User } from "../../redux/user/interface";
import { RootState } from '../../redux/store';
import { selectIsFetchingState, selectUserData } from '../../redux/user/user.selectors'
import { createStructuredSelector } from 'reselect';
import toast, { Toaster } from 'react-hot-toast';
import { fetchConfig } from "../../redux/config/config.api";
import './style.scss';

// Lazy-loaded components
const IndexPage = lazy(() => import("../IndexPage"));
const HomePage = lazy(() => import("../HomePage"));
const ResetPassword = lazy(() => import("../../components/ResetPassword"));
const NotFound = lazy(() => import("../../components/NotFound"));
const Footer = lazy(() => import("../../components/Footer"));
const Title = lazy(() => import("../../components/Title"));

const Layout: React.FC<LayoutProps> = ({
    userData,
    isFetching,
    removeErrorMessage,
    getConfigSuccess,
    getUserSuccess,
    getUserFailure,
    signOutSuccess
}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [navigationEntry] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    const wasPageReloaded: boolean = navigationEntry && navigationEntry.type === 'reload';

    const handleRemoveErrorMessage = useCallback(() => {
        if (wasPageReloaded) {
            removeErrorMessage();
        }
    }, [removeErrorMessage, wasPageReloaded]);

    useLayoutEffect(() => {
        handleRemoveErrorMessage();
    }, [handleRemoveErrorMessage]);

    const queries: UseQueryOptions[] = useMemo(() => {
        const baseQueries: UseQueryOptions[] = [
            {
                queryKey: ['config'],
                queryFn: fetchConfig,
                onSuccess: (data) => {
                    getConfigSuccess(data as Config);
                },
                onError: () => {
                    navigate(indexPage);
                    toast.error(t('UnexpectedErrorOccured'));
                    signOutSuccess();
                }
            }
        ];

        if (userData && wasPageReloaded) {
            baseQueries.push({
                queryKey: ['userData', userData],
                queryFn: fetchUserDetails,
                onSuccess: (data) => {
                    getUserSuccess(data as User);
                },
                onError: () => {
                    getUserFailure();
                }
            });
        }

        return baseQueries;
    }, [userData, wasPageReloaded, getConfigSuccess, getUserSuccess, getUserFailure, navigate, t, signOutSuccess]);

    const results = useQueries<UseQueryResult<Config | User>[]>(queries);
    const isLoading = results.some(result => result.isLoading);
    const loading = isLoading || isFetching;

    return (
        <React.Fragment>
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 5000,
                }}
            />

            { loading ? (
                <PreLoader isLoading={loading} />
            ) : (
                <Suspense fallback={<PreLoader isLoading={true} />}>
                    <div className="layout-container">
                        <Header />
                        
                        <main>
                            <Routes>
                                <Route path='*' element={<NotFound />} />
                                <Route path="/" element={<IndexPage />} />
                                <Route path={homePage} element={<HomePage userData={userData} />} />
                                <Route path={ownAccountTransferPage} element={<HomePage userData={userData} />} />
                                <Route path={interTransferPage} element={<HomePage userData={userData} />} />
                                <Route path={transactionsHistoryPage} element={<HomePage userData={userData} />} />
                                <Route path={accountsPage} element={<HomePage userData={userData} />} />
                                <Route path={profilePage} element={<HomePage userData={userData} />} />
                                <Route path={changePasswordPage} element={<HomePage userData={userData} />} />
                                <Route path={transactionsPage} element={<HomePage userData={userData} />} />
                                <Route path={resetPasswordPage} element={<ResetPassword />} />
                            </Routes>
                        </main>

                        <Footer />
                    </div>
                </Suspense>
            )}

            <Title />
        </React.Fragment>
    );
};

const mapStateToProps: MapStateToProps<LayoutStateProps, LayoutOwnProps, RootState> = createStructuredSelector({
    userData: selectUserData,
    isFetching: selectIsFetchingState,
});

const mapDispatchToProps: MapDispatchToPropsFunction<LayoutDispatchProps, LayoutOwnProps> = (dispatch: Dispatch) => ({
    removeErrorMessage: () => dispatch(removeErrorMessage()),
    getConfigSuccess: (data: Config) => dispatch(getConfigSuccess(data)),
    getUserSuccess: (data: User) => dispatch(getUserSuccess(data)),
    getUserFailure: () => dispatch(getUserFailure()),
    signOutSuccess: () => dispatch(signOutSuccess())
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Layout));
