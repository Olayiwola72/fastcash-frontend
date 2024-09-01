import { DEFAULT_LOCALE } from "../constants/app";

export interface NumberFormatOwnProps {
  children?: React.ReactNode,
  className?: string,
  style: keyof Intl.NumberFormatOptionsStyleRegistry | undefined,
  currency: string,
  value: number,
}

export const formatNumber = (preferredLanguage: string, style: 'currency' | 'decimal' | 'percent', currency: string, value: number): string => {
  const options: Intl.NumberFormatOptions = {
    style: style,
    currency: currency,
  }

  try {
    return new Intl.NumberFormat(preferredLanguage || DEFAULT_LOCALE, options).format(value);
  } catch (error) {
    if (error instanceof RangeError) {
      console.error(`Locale '${preferredLanguage}' caused an error. Falling back to default locale.`);
      return new Intl.NumberFormat(DEFAULT_LOCALE, options).format(value);
    } else {
      throw error;
    }
  }
}

export const formatNumberNoOptions = (preferredLanguage: string | undefined, value: number): string | number => {
  try {
    return value ? 
      new Intl.NumberFormat(preferredLanguage || DEFAULT_LOCALE).format(value) 
      : 
      value;
  } catch (error) {
    if (error instanceof RangeError) {
      console.error(`Locale '${preferredLanguage}' caused an error. Falling back to default locale.`);
      return new Intl.NumberFormat(DEFAULT_LOCALE).format(value);
    } else {
      throw error;
    }
  }
}
