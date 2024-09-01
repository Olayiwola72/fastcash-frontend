import React, { useEffect, useCallback, lazy, Suspense, useRef } from "react";
import { HomeProps } from './interface';
import { useLocation, useNavigate } from 'react-router-dom';
import { ownAccountTransferPage, interTransferPage, transactionsPage, transactionsHistoryPage, accountsPage, profilePage, changePasswordPage, indexPage, intraTransferPage } from '../route';
import SideBar from "../../components/SideBar";
import './style.scss';
import PreLoader from "../../components/PreLoader";
import { scrollToRef } from "../../utils/focusHandlingUtil";

// Lazy-loaded components
const DashboardComponent = lazy(() => import('../../components/DashboardComponent'));
const TransactionHistory = lazy(() => import('../../components/TransactionHistory'));
const RecentTransactions = lazy(() => import('../../components/RecentTransactions'));
const OwnAccountTransfer = lazy(() => import('../../components/OwnAccountTransfer'));
const IntraAccountTransfer = lazy(() => import('../../components/IntraAccountTransfer'));
const InterBankTransfer = lazy(() => import('../../components/InterBankTransfer'));
const AccountFeatures = lazy(() => import('../../components/AccountFeatures'));
const UpdateUser = lazy(() => import('../../components/UpdateUser'));
const ChangePassword = lazy(() => import('../../components/ChangePassword'));

const HomePage: React.FC<HomeProps> = ({ userData }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const handleRedirect = useCallback(() => {
        if (!userData) {
            navigate(indexPage);
        }
    }, [userData, navigate]);

    useEffect(() => {
        handleRedirect();
    }, [handleRedirect]);

    const ref = useRef<HTMLDivElement>(null);
    scrollToRef(ref)

    const accountStatements = userData?.accountStatements ?? [];
    const transfers = userData?.transfers ?? [];
    const accounts = userData?.accounts ?? [];

    const renderContent = () => {
        switch (pathname) {
            case transactionsHistoryPage:
                return <TransactionHistory userData={userData} accounts={accounts} accountStatements={accountStatements} />
            case ownAccountTransferPage:
                return <OwnAccountTransfer userData={userData}  accounts={accounts}/>;
            case intraTransferPage:
                return <IntraAccountTransfer userData={userData}  accounts={accounts}/>;
            case interTransferPage:
                return <InterBankTransfer userData={userData}  accounts={accounts} />;
            case transactionsPage:
                return <RecentTransactions transfers={transfers} userData={userData}  accounts={accounts} />;
            case accountsPage:
                return <AccountFeatures userData={userData} accounts={accounts} />;
            case profilePage:
                return  <UpdateUser userData={userData} />;
            case changePasswordPage:
                return <ChangePassword userData={userData} />;
            default:
                return <DashboardComponent transfers={transfers} userData={userData} />;
                  
        }
    };
       
    return (
        <div className="container-fluid">
            <div className="row">
                <SideBar />
                
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-5" ref={ref}>
                    <Suspense fallback={<PreLoader isLoading={true} />}>
                        {renderContent()}
                    </Suspense>
                </main>
            </div>
        </div>
    )
}

export default (HomePage);
