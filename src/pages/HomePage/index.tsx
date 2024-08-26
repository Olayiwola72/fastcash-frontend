import React, { useEffect, useCallback, lazy, Suspense } from "react";
import { HomeProps } from './interface';
import { useLocation, useNavigate } from 'react-router-dom';
import { ownAccountTransferPage, interTransferPage, transactionsPage, transactionsHistoryPage, accountsPage, profilePage, changePasswordPage, indexPage } from '../route';
import SideBar from "../../components/SideBar";
import './style.scss';
import PreLoader from "../../components/PreLoader";

// Lazy-loaded components
const ChartComponent = lazy(() => import('../../components/ChartComponent'));
const TransactionHistory = lazy(() => import('../../components/TransactionHistory'));
const RecentTransactions = lazy(() => import('../../components/RecentTransactions'));
const OwnAccountTransfer = lazy(() => import('../../components/OwnAccountTransfer'));
const InterBankTransfer = lazy(() => import('../../components/InterBankTransfer'));
const AccountFeatures = lazy(() => import('../../components/AccountFeatures'));
const UpdateUser = lazy(() => import('../../components/UpdateUser'));
const ChangePassword = lazy(() => import('../../components/ChangePassword'));

const HomePage: React.FC<HomeProps> = ({ userData }) => {
    const navigate = useNavigate();

    const handleRedirect = useCallback(() => {
        if (!userData) {
            navigate(indexPage);
        }
    }, [userData, navigate]);

    useEffect(() => {
        handleRedirect();
    }, [handleRedirect]);

    const accountStatements = userData?.accountStatements ?? [];
    const transfers = userData?.transfers ?? [];
    const accounts = userData?.accounts ?? [];
    const { pathname } = useLocation();

    const renderContent = () => {
        switch (pathname) {
            case transactionsHistoryPage:
                return <TransactionHistory userData={userData} accounts={accounts} accountStatements={accountStatements} />
            case ownAccountTransferPage:
                return <OwnAccountTransfer accounts={accounts}/>;
            case interTransferPage:
                return <InterBankTransfer accounts={accounts} />;
            case transactionsPage:
                return <RecentTransactions transfers={transfers} userData={userData}  accounts={accounts} />;
            case accountsPage:
                return <AccountFeatures userData={userData} accounts={accounts} />;
            case profilePage:
                return  <UpdateUser userData={userData} />;
            case changePasswordPage:
                return <ChangePassword userData={userData} />;
            default:
                return <ChartComponent transfers={transfers} />;
                  
        }
    };
       
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="border side-bar col-md-3 col-lg-2">
                    <SideBar />
                </div>


                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-5">
                    <Suspense fallback={<PreLoader isLoading={true} />}>
                        {renderContent()}
                    </Suspense>
                </main>
            </div>
        </div>
    )
}

export default (HomePage);
