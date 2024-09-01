export const indexPage: string = "/";
export const homePage: string = "/home";
export const ownAccountTransferPage: string = "/transfer";
export const interTransferPage: string = "/external/transfer";
export const intraTransferPage: string = "/account/transfer";
export const transactionsPage: string = "/transactions";
export const transactionsHistoryPage: string = "/transactions/history";
export const accountsPage: string = "/wallets";
export const profilePage: string = "/profile";
export const changePasswordPage: string = "/password/change";
export const resetPasswordPage: string = "/password/reset";

export const titles: { [key: string]: string } = {
    [indexPage]: 'Welcome',
    [homePage]: 'Home',
    [ownAccountTransferPage]: 'Own Wallet Transfer',
    [intraTransferPage]: 'Wallet to Wallet Transfer',
    [interTransferPage]: 'External Bank Transfer',
    [transactionsPage]: 'Recent Transactions',
    [transactionsHistoryPage]: 'Transaction History',
    [accountsPage]: 'Wallets',
    [profilePage]: 'Update Profile',
    [changePasswordPage]: 'Change Password',
    [resetPasswordPage]: 'Reset Password',
};
