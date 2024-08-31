import React, { useState } from "react";
import { AccountFeaturesDispatchProps, AccountFeaturesOwnProps, AccountFeaturesProps } from './interface';
import './style.scss';
import { Link, useNavigate } from "react-router-dom";
import MyModal from "../MyModal";
import { setShowModal } from "../../redux/user/user.actions";
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { Dispatch } from 'redux';
import { Account } from "../../redux/user/interface";
import { interTransferPage, ownAccountTransferPage } from "../../pages/route";
import { formatNumber } from "../../utils/formatUtil";
import { getPreferredLanguage } from "../../utils/languageUtil";

const AccountFeatures: React.FC<AccountFeaturesProps> = ({ accounts, setShowModal, userData }) => {
    const [currentAccount, setCurrentAccount] = useState<Account>();

    const handleShow = (account: Account) => {
        setCurrentAccount(account);
        setShowModal();
    };

    const navigate = useNavigate();

    const handleNavigtion = (event: React.MouseEvent<HTMLButtonElement>, account: Account, page: string) => {
        event.preventDefault();
        setCurrentAccount(account);
        navigate(`${page}?account=${account.accountNumber}&currency=${account.currency}`);
    };

    return (
        <div className="container my-5">
            {currentAccount &&
                <MyModal currentAccount={currentAccount}>
                    <h5>Are you sure you want to {currentAccount.allowOverdraft ? "disable" : "enable"} overdraft?</h5>
                </MyModal>
            }
            <h2 className="pb-4 text-center">Wallets</h2>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {accounts.map((account) => (
                    <div className="col" key={account.accountNumber}>
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <h3 className="card-title">Wallet Number: {account.accountNumber}</h3>
                                {userData && <p><strong>Name:</strong> {userData.name}</p>}
                                <p><strong>Current Balance:</strong> 
                                    {
                                        formatNumber(getPreferredLanguage(userData), 'currency', account.currency, account.balance)
                                    }
                                </p>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div>
                                        <strong>Allow Overdraft:</strong>
                                        <span> {account.allowOverdraft ? "Yes" : "No"}</span>
                                    </div>
                                    <Link to="#" className="text-decoration-none" onClick={() => handleShow(account)}>
                                        {account.allowOverdraft ? "Disable" : "Enable"} Overdraft
                                    </Link>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <button type="button" className="btn btn-primary w-100 me-2 rounded-pill" onClick={(event) => handleNavigtion(event, account, ownAccountTransferPage)}>
                                        Account Transfer
                                    </button>
                                    <button type="button" className="btn btn-success w-100 rounded-pill" onClick={(event) => handleNavigtion(event, account, interTransferPage)}>
                                        Inter Bank Transfer
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const mapDispatchToProps: MapDispatchToPropsFunction<AccountFeaturesDispatchProps, AccountFeaturesOwnProps> = (dispatch: Dispatch) => ({
    setShowModal: () => dispatch(setShowModal())
});

export default connect(null, mapDispatchToProps)(AccountFeatures);
