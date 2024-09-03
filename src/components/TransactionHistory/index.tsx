import React, { useMemo, useState, lazy } from "react";
import { AccountStatementDataRow, TransactionHistoryProps } from './interface';
import DataTable, { TableColumn, ConditionalStyles } from 'react-data-table-component';
import { Account } from "../../redux/user/interface";
import { getFilteredItems } from "../../utils/filterUtil";
import './style.scss';
import { formatNumber } from "../../utils/formatUtil";
import { getPreferredLanguage } from "../../utils/languageUtil";

// Lazy-loaded components
const ExportActions = lazy(() => import("../ExportActions"));
const SubHeaderComponent = lazy(() => import("../SubHeaderComponent"));

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ accountStatements, userData, accounts }) => {

    const data = accountStatements.map(accountStatement => {
        return { 
            ...accountStatement, 
            account: accountStatement.direction == 'Receiving' ? accountStatement.creditAccount : accountStatement.debitAccount
        };
    });

    const conditionalCellStyles : ConditionalStyles<AccountStatementDataRow>[] = [
        {
            when: row => row.direction == 'Receiving',
            classNames: ['text-success'],
        },
        {
            when: row => row.direction == 'Sending',
            classNames: ['text-danger'],
        },
    ];

    const columns: TableColumn<AccountStatementDataRow>[] = [
        {
            name: 'Transaction ID',
            selector: row => row.transactionId,
            allowOverflow: true,
        },
        {
            name: 'Account ID',
            selector: row => row.account.accountNumber,
            sortable: true,
            right: true,
        },
        {
            name: 'Closing Balance',
            selector: row => 
                formatNumber(getPreferredLanguage(userData), 'currency', row.account.currency, row.balance),
            sortable: true,
            right: true,
        },
        {
            name: 'Direction',
            selector: row => row.direction,
            sortable: true,
            conditionalCellStyles: conditionalCellStyles
        },
        {
            name: 'Narration',
            selector: row => row.narration,
            sortable: true,
            wrap: true
        },
        {
            name: 'Date & Time',
            selector: row => row.createdAtFormatted,
            sortable: true,
            wrap: true
        },
        {
            name: 'Amount',
            selector: row => `
                ${row.sign} 
                ${formatNumber(
                    getPreferredLanguage(userData), 
                    'currency', 
                    row.direction == 'Receiving' ? row.creditCurrency : row.debitCurrency, 
                    row.direction == 'Receiving' ? row.totalCreditedAmount : row.totalDebitedAmount
                )}`,
            sortable: true,
            right: true,
            allowOverflow: true
        },
        {
            name: 'Charge Amount',
            selector: row => 
                formatNumber(getPreferredLanguage(userData), 'currency', row.debitCurrency, row.chargeAmount),
            sortable: true,
            right: true,
            allowOverflow: true
        },
    ];

    const [filterText, setFilterText] = React.useState<string>('');
    const [filterAccount, setFilterAccount] = React.useState<Account>();
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    const filteredItems = useMemo(
        () => getFilteredItems(data, filterText, filterAccount) as AccountStatementDataRow[],
        [filterText, filterAccount, data]
    );
    
    return (
        <div className="transaction-history mt-5">
            <DataTable
                title="Transaction History"
                actions={<ExportActions columns={columns} filteredItems={filteredItems} userData={userData} title="Transaction History Report" fileMarker="transaction_history"/>}
                pagination
                columns={columns}
                data={filteredItems}
                paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                subHeader
                subHeaderComponent={
                    <SubHeaderComponent
                        accounts={accounts}
                        filterText={filterText}
                        filterAccount={filterAccount}
                        setFilterText={setFilterText}
                        setFilterAccount={setFilterAccount}
                        resetPaginationToggle={resetPaginationToggle}
                        setResetPaginationToggle={setResetPaginationToggle}
                    />
                }
                persistTableHead
            />
        </div>
    )
}

export default TransactionHistory;