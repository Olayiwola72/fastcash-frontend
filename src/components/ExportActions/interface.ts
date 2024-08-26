import { TableColumn } from 'react-data-table-component';
import { AccountStatementDataRow } from '../TransactionHistory/interface';
import { User } from '../../redux/user/interface';
import { MoneyTransferDataRow } from '../RecentTransactions/interface';

export type TableColumnDataRow = TableColumn<AccountStatementDataRow>[] | TableColumn<MoneyTransferDataRow>[];
export type ItemsDataRow = AccountStatementDataRow[] | MoneyTransferDataRow[];

export interface ExportActionsProps {
    columns: TableColumnDataRow;
    filteredItems: ItemsDataRow;
    userData: User | undefined;
    title: string,
    fileMarker: string
}