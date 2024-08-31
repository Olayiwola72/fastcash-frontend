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

  return new Intl.NumberFormat(preferredLanguage || DEFAULT_LOCALE, options).format(value);
}

export const formatNumberNoOptions = (preferredLanguage: string | undefined, value: number): string | number => {
  return value ? 
    new Intl.NumberFormat(preferredLanguage || DEFAULT_LOCALE).format(value) 
    : 
    value;
}