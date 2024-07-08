import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type FormFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  register: UseFormRegisterReturn;
  error?: string | boolean;
};

const FormField: React.FC<FormFieldProps> = ({ id, label, type = 'text', register, error, ...rest }) => {
  return (
    <div>
      <label htmlFor={id} className="block mb-2 uppercase">{label}</label>
      <input
        className="w-full py-2 px-4 border border-gray-300 rounded"
        id={id}
        type={type}
        {...rest}
        {...register}
      />
      {error && <p className="text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default FormField;
