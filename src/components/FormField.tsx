import React from 'react';

type FormFieldProps = {
  id: string;
  label: string;
  type?: string;
  register: any;
  error?: string | boolean;
  max?: string | Date;
};

const FormField: React.FC<FormFieldProps> = ({ id, label, type = 'text', register, error, ...rest }) => {
  const today = new Date();
  // const minDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());

  return (
    <div className="mb-4">
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
