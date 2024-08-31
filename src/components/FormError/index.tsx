import React from 'react';
import { useTranslation } from 'react-i18next';
import { FieldError } from 'react-hook-form';
import { FormErrorProps } from './interface';

const FormError: React.FC<FormErrorProps> = ({ errors, fieldName, field, value }) => {
  const { t } = useTranslation();

  const fieldError = errors[fieldName] as FieldError | undefined;

  if (!fieldError) return null;

  const errorMessages = [];

  if (fieldError.type === 'required') {
    errorMessages.push(t('Required', { field }));
  }

  if (fieldError.type === 'maxLength') {
    errorMessages.push(t('maxLength', { value }));
  }

  if (fieldError.type === 'validate' && fieldName === "creditAccount") {
    errorMessages.push(t('EqualTransactionAccount'));
  }

  if (fieldError.type === 'custom') {
    errorMessages.push(fieldError.message?.toString());
  }

  return (
    <div className="invalid-feedback d-block">
      <ul className="m-0 p-0 list-unstyled">
        {errorMessages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default FormError;
