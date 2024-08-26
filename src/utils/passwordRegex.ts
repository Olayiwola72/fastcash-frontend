import { PASSWORD_REGEX } from "../constants/env";

export function getPasswordRegex(): RegExp {
    if (PASSWORD_REGEX) {
        return new RegExp(PASSWORD_REGEX);
    }else{
        throw new Error('PASSWORD_REGEX is not defined');
    }
}