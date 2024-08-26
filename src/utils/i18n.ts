import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Required": "{{field}} is required",
      "maxLength": "Too many characters, maximum allowed character length is {{value}}",
      "InvalidEmail": "Please provide a valid email address",
      "PasswordRequired": "Password is required",
      "PasswordsDoNotMatch": "Passwords do not match",
      "InvalidPassword": "Password must be at least 6 characters long, contain at least one uppercase letter and one special character",
      "NoChange": "{{field}} provided remains the same",
      "UnexpectedErrorOccured": "An unexpected error occurred.",
      "AuthenticationErrorOccured": "Your session has expired, please log in again to continue.",
      "SignedOutSuccess": "Signed out successfully",
    }
  }
  // Add other languages here
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;