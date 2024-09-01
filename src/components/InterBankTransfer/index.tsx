import React, { useEffect, lazy } from "react";
import { connect, MapStateToProps, MapDispatchToPropsFunction } from 'react-redux';
import { RootState } from '../../redux/store';
import { Dispatch } from 'redux';
import { accountTransferStart, fetchExchangeRateStart } from '../../redux/user/user.actions';
import { InterBankTransferProps, InterBankTransferOwnProps, InterBankTransferStateProps, InterBankTransferDispatchProps, InterBankTransferRequest, } from './interface';
import { createStructuredSelector } from 'reselect';
import { selectConfigCurrencies } from "../../redux/config/config.selectors";
import { useForm } from 'react-hook-form';
import { NavigateFunction, useLocation } from "react-router-dom";
import useFormPersist from "react-hook-form-persist";
import { useNavigateContext } from "../NavigateProvider";
import { FetchExchangeRateRequest } from "../../redux/user/interface";
import { TRANSACTION_TYPES } from "../../constants/api";
import './style.scss';
import { titles } from "../../pages/route";
import { formatNumberNoOptions } from "../../utils/formatUtil";
import { selectErrorDetailsState } from "../../redux/user/user.selectors";

// Lazy-loaded components
const OverdraftAlert = lazy(() => import("../OverdraftAlert"));
const ErrorHandler = lazy(() => import("../ErrorHandler"));
const FormError = lazy(() => import('../FormError'));

const InterBankTransfer : React.FC<InterBankTransferProps> = ({ accounts, userData, currencies, errorDetails, fetchExchangeRateStart, accountTransferStart }) => {
    const { search, pathname } = useLocation();
    const navigate = useNavigateContext();

    const {register, handleSubmit, watch, setValue, setError, formState: { errors } } = useForm({
        mode: 'all',
        criteriaMode: 'all',
        shouldFocusError: true
    });

    useFormPersist("form-inter-bank", { watch, setValue });

    useEffect(() => {
        const params = new URLSearchParams(search);
        const account = params.get('account');
        const currency = params.get('currency');
        if(account){
            setValue('debitAccount', account)
            setValue('debitCurrency', currency)
        }
    }, [search, setValue]);

    const debitAccount: number = watch('debitAccount');
    const creditCurrency: string = watch('creditCurrency');
    const amount : number = watch('amount');
    const debitCurrency : string = watch('debitCurrency');
    const conversionRate : number = watch('conversionRate');
    const conversionAmount : number = watch('conversionAmount');

    useEffect(() => {
        if (debitAccount) {
            const debitAccountCurrency = accounts.find(account => account.accountNumber == debitAccount)?.currency;
            if (debitAccountCurrency) {
                setValue('debitCurrency', debitAccountCurrency);
            }
        }
    }, [debitAccount, accounts, setValue]);

    useEffect(() => {
        if (amount && debitCurrency && creditCurrency) {
            fetchExchangeRateStart({ 
                amount, 
                debitCurrency, 
                creditCurrency, 
                setValue 
            });
        }
    }, [amount, debitCurrency, creditCurrency, setValue]);

    const onSubmit = (request : InterBankTransferRequest) => {
        request.transactionType = TRANSACTION_TYPES.INTER_BANK;
        accountTransferStart(request, navigate);
    };

    useEffect(() => {
        errorDetails && errorDetails.errors.map((errorDetail) => 
            errorDetail && errorDetail.fieldName && 
                setError(errorDetail.fieldName === "id" ? "creditAccount" : errorDetail.fieldName , {
                    type: "custom",
                    message: errorDetail.errorMessage
                }
                , {
                    shouldFocus: false
                }
            )
        );
    }, [errorDetails, setError]);

    return (
        <aside className="container">
            <div className="form-transaction w-100">
                <ErrorHandler className="mb-4"/>
                
                <form onSubmit={handleSubmit((data) => onSubmit(data as InterBankTransferRequest))}>
                    <h1 className="h3 mt-5 mb-3 fw-normal text-center">{titles[pathname]}</h1>

                    {
                        debitAccount ? 
                            <OverdraftAlert account={accounts.find((account) => account.accountNumber == debitAccount)}/>
                        :''
                    }

                    <div className="form-floating">
                        <select
                            className={`form-control ${errors.debitAccount ? 'is-invalid' : ''}`} 
                            id="debitAccount"
                            {...register("debitAccount", {
                                required: {
                                    value: true,
                                    message: 'required',
                                },
                            })}
                        >
                            <option value=''>
                                Select an account
                            </option>
                            {accounts.map((account) => (
                                <option key={account.accountNumber} value={account.accountNumber}>
                                    {account.accountNumber} ({account.balance} {account.currency})
                                </option>
                            ))}
                        </select>
                        <label htmlFor="debitAccount">Select Debit Account *</label>
                        <FormError errors={errors} fieldName="debitAccount" field="Debit Account" />
                    </div>

                    <div className="form-floating">
                        <input 
                            type="text"
                            className={`form-control`} 
                            id="debitCurrency" 
                            disabled
                            {...register("debitCurrency", {
                                required: true
                            })}
                        />
                        <label htmlFor="debitCurrency">Debit Currency</label>
                    </div>

                    <div className="container-fluid p-0 d-flex align-items-center">
                        <div className="form-floating position-relative w-100">
                            <input 
                                type="number"
                                className={`form-control ${errors.amount ? 'is-invalid' : ''}`} 
                                id="amount" 
                                {...register("amount", {
                                    required: {
                                        value: true,
                                        message: 'required',
                                    },
                                })}
                            />
                            <label htmlFor="amount">Amount *</label>
                            <FormError errors={errors} fieldName="amount" field="Amount" />
                        </div>
                    </div>

                    <div className="form-floating">
                        <select
                            className={`form-control ${errors.creditCurrency ? 'is-invalid' : ''}`} 
                            id="creditCurrency" 
                            {...register("creditCurrency", {
                                required: {
                                    value: true,
                                    message: 'required',
                                },
                            })}
                        >
                            <option value=''>
                                Select a currency
                            </option>
                            { currencies && currencies.map((currency) => (
                                <option key={currency.name} value={currency.name}>
                                    {currency.name}
                                </option>
                            )) }
                        </select>
                        <label htmlFor="creditCurrency">Select Credit Currency *</label>
                        <FormError errors={errors} fieldName="creditCurrency" field="Credit Currency" />
                    </div>

                    <div className="container-fluid p-0 d-flex align-items-center">
                        <div className="form-floating position-relative w-100">
                            <input 
                                type="number"
                                className={`form-control ${errors.creditAccount ? 'is-invalid' : ''}`} 
                                id="creditAccount" 
                                {...register("creditAccount", {
                                    required: {
                                        value: true,
                                        message: 'required',
                                    },
                                    maxLength: 35
                                })}
                            />
                            <label htmlFor="creditAccount">Credit Account *</label>
                            <FormError errors={errors} value="35" fieldName="creditAccount" field="Credit Account" />
                        </div>
                    </div>

                    { amount && debitCurrency && creditCurrency && debitCurrency !== creditCurrency ?
                        <div>
                            <div className="container-fluid p-0 d-flex align-items-center">
                                <div className="form-floating position-relative w-100">
                                    <input
                                        type="text"
                                        className={`form-control`}
                                        id="conversionRate"
                                        value={
                                            formatNumberNoOptions(userData?.preferredLanguage, conversionRate)
                                        }
                                        disabled
                                        {...register("conversionRate", {
                                            required: true
                                        })}
                                    />
                                    <label htmlFor="conversionRate">FX Rate</label>
                                </div>
                            </div>

                            <div className="container-fluid p-0 d-flex align-items-center">
                                <div className="form-floating position-relative w-100">
                                    <input
                                        type="text"
                                        className={`form-control`}
                                        id="conversionAmount"
                                        value={
                                            formatNumberNoOptions(userData?.preferredLanguage, conversionAmount)
                                        }
                                        disabled
                                        {...register("conversionAmount", {
                                            required: false
                                        })}
                                    />
                                    <label htmlFor="conversionAmount">FX Amount</label>
                                </div>
                            </div>
                        </div>
                    : ''
                    }

                    <div className="container-fluid p-0 d-flex align-items-center">
                        <div className="form-floating position-relative w-100">
                            <input 
                                type="text"
                                className={`form-control ${errors.bankName ? 'is-invalid' : ''}`} 
                                id="bankName" 
                                {...register("bankName", {
                                    required: true,
                                    maxLength: 35
                                })}
                            />
                            <label htmlFor="bankName">Bank Name *</label>
                            <FormError errors={errors} value="35" fieldName="bankName" field="Bank Name" />
                        </div>
                    </div>

                    <div className="container-fluid p-0 d-flex align-items-center">
                        <div className="form-floating position-relative w-100">
                            <input 
                                type="text"
                                className={`form-control ${errors.accountHolderName ? 'is-invalid' : ''}`} 
                                id="accountHolderName" 
                                {...register("accountHolderName", {
                                    required: true,
                                    maxLength: 35
                                })}
                            />
                            <label htmlFor="accountHolderName">Account Holder Name *</label>
                            <FormError errors={errors} value="35" fieldName="accountHolderName" field="Account Holder Name" />
                        </div>
                    </div>

                    <div className="container-fluid p-0 d-flex align-items-center">
                        <div className="form-floating position-relative w-100">
                            <input 
                                type="text"
                                className={`form-control ${errors.notes ? 'is-invalid' : ''}`} 
                                id="notes" 
                                {...register("notes", {
                                    required: false,
                                    maxLength: 35
                                })}
                            />
                            <label htmlFor="notes">Notes</label>
                            <FormError errors={errors} value="35" fieldName="notes" field="Notes" />
                        </div>
                    </div>

                    <button 
                        className="btn btn-md btn-primary py-2 mt-3 w-100"
                        type="submit"
                        disabled={
                            conversionRate === undefined 
                            || conversionAmount === undefined
                        }
                    >
                        Send Money
                    </button>
                </form>
            </div>
        </aside>
    )
}

const mapStateToProps: MapStateToProps<InterBankTransferStateProps, InterBankTransferOwnProps, RootState> = createStructuredSelector({
    currencies: selectConfigCurrencies,
    errorDetails: selectErrorDetailsState
});

const mapDispatchToProps : MapDispatchToPropsFunction<InterBankTransferDispatchProps, InterBankTransferOwnProps> = (dispatch: Dispatch) => ({
    accountTransferStart: (payload: InterBankTransferRequest, navigate : NavigateFunction) => dispatch(accountTransferStart(payload, navigate)),
    fetchExchangeRateStart: (payload: FetchExchangeRateRequest) => dispatch(fetchExchangeRateStart(payload))
});


  
export default connect(mapStateToProps, mapDispatchToProps)(InterBankTransfer);
