import { MoneyTransferDataRow } from "../components/RecentTransactions/interface";
import { AccountStatementDataRow } from "../components/TransactionHistory/interface";
import { Account } from "../redux/user/interface";

export const getFilteredItems = (
    data: AccountStatementDataRow[] | MoneyTransferDataRow[],
    filterText: string,
    filterAccount?: Account
) : typeof data => {
    return data.filter(item => {
        // Check if filterAccount is defined and the account matches
        const accountMatches = !filterAccount || (item.account && item.account.accountNumber === filterAccount.accountNumber);
        // Check if filterText is defined and the narration matches
        const textMatches = !filterText || (item.narration && item.narration.toLowerCase().includes(filterText.toLowerCase()));
        // Return true if both conditions match
        return accountMatches && textMatches;
    });
};
