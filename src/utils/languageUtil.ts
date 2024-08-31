import { DEFAULT_LOCALE } from "../constants/app";
import { User } from "../redux/user/interface";

export const getPreferredLanguage = (userData: User | undefined) => {
    return userData ? userData.preferredLanguage : DEFAULT_LOCALE;
}