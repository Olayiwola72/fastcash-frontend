import React, { useMemo, useState, lazy } from "react";
import { MoneyTransferDataRow, RecentTransactionsProps } from './interface';
import DataTable, { TableColumn, ConditionalStyles } from 'react-data-table-component';
import { Account } from "../../redux/user/interface";
import { getFilteredItems } from "../../utils/filterUtils";
import './style.scss';

// Lazy-loaded components
const ExportActions = lazy(() => import("../ExportActions"));
const SubHeaderComponent = lazy(() => import("../SubHeaderComponent"));

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transfers, userData, accounts }) => {

    const data = transfers.map(transfer => {
        return { 
            ...transfer, 
            direction: 'Sending',
            sign: '-',
            account: transfer.debitAccount
        };
    });

    const conditionalCellStyles : ConditionalStyles<MoneyTransferDataRow>[] = [
        {
            when: row => row.direction == 'Sending',
            classNames: ['text-danger'],
        },
    ];

    const columns: TableColumn<MoneyTransferDataRow>[] = [
        {
            name: 'Transaction ID',
            selector: row => row.transactionId,
            allowOverflow: true,
        },
        {
            name: 'Debit Account',
            selector: row => row.debitAccount.accountNumber,
            sortable: true,
            right: true,
            allowOverflow: true,
        },
        {
            name: 'Current Balance',
            selector: row => `${row.debitAccount.balance} ${row.debitAccount.currency}`,
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
            name: 'Debit Amount',
            selector: row => `${row.sign} ${row.totalDebitedAmount} ${row.debitCurrency}`,
            sortable: true,
            right: true,
        },
        {
            name: 'Credit Account',
            selector: row => row.creditAccount.accountNumber,
            sortable: true,
            right: true,
        },
        {
            name: 'Credit Amount',
            selector: row => `${row.sign} ${row.totalCreditedAmount} ${row.creditCurrency}`,
            sortable: true,
            right: true,
            allowOverflow: true
        },
        {
            name: 'Charge Amount',
            selector: row => `${row.sign} ${row.chargeAmount} ${row.debitCurrency}`,
            sortable: true,
            right: true,
        },
    ];

    const [filterText, setFilterText] = React.useState<string>('');
    const [filterAccount, setFilterAccount] = React.useState<Account>();
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);;

    const filteredItems : MoneyTransferDataRow[] = useMemo(
        () => getFilteredItems(data, filterText, filterAccount),
        [filterText, filterAccount, data]
    );

    return (
        <div className="recent-transactions">
            <DataTable
                title="Recent Transactions"
                actions={<ExportActions columns={columns} filteredItems={filteredItems} userData={userData} title="Recent Transactions Report" fileMarker="recent_transactions"/>}
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

export default RecentTransactions;