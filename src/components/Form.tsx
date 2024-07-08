import React,  { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import PhoneInput from 'react-phone-input-2';
import { useDispatch } from 'react-redux';
import 'react-phone-input-2/lib/style.css';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

import { initializeFormData, saveFormData } from '../store/actions';
import FormField from './FormField';
import { FormValues } from '../data/types';

const maxBirthDate = new Date().toISOString().split('T')[0];

const Form: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<FormValues>();
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const storedFormData = JSON.parse(localStorage.getItem('formData') || '{}');
    dispatch(initializeFormData(storedFormData));
    reset(storedFormData);
    setPhone(storedFormData.phone || '');
  }, [dispatch]);


  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(saveFormData(data));
    console.log('Form data saved:', data);
  };

  const handleClearLocalStorage = () => {
    localStorage.removeItem('formData');
    dispatch(initializeFormData({} as FormValues));
    setPhone('');
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    setValue('phone', value);
  };

  const validatePhoneNumber = (value: string) => {
    const phoneNumber = parsePhoneNumberFromString(value);
    return phoneNumber && phoneNumber.isValid() ? true : t('form_errors.invalid');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto grid grid-cols-2 gap-4 bg-white p-10 rounded-2xl">
      <h2 className="text-2xl font-bold mb-4 text-blue-500">{t('form_title')}</h2>

      {/* Civility */}
      <div className="col-span-2">
        <label className="block mb-2 uppercase">{t('form_fields.civility')}</label>
        <div className="mb-2 grid grid-cols-2 px-4 border border-gray-300 rounded">
          <div className="flex items-center py-2">
            <input
              type="radio"
              id="male"
              value="male"
              {...register('civility', { required: true })}
              className="mr-2"
            />
            <label htmlFor="male">{t('form_fields.male')}</label>
          </div>
          <div className="flex items-center py-2 pl-2 border-gray-300 border-l">
            <input
              type="radio"
              id="female"
              value="female"
              {...register('civility', { required: true })}
              className="mr-2"
            />
            <label htmlFor="female">{t('form_fields.female')}</label>
          </div>
        </div>
        {errors.civility && <p className="text-red-500">{t('form_errors.required')}</p>}
      </div>

      {/* Name and Surname Fields */}
      <FormField
        id="name"
        label={t('form_fields.name')}
        register={register('name', { required: true })}
        error={errors.name && (errors.name.message || t('form_errors.required'))}
      />

      <FormField
        id="surname"
        label={t('form_fields.surname')}
        register={register('surname', { required: true })}
        error={errors.surname && (errors.surname.message || t('form_errors.required'))}
      />

      {/* Email and Birthday Fields */}
      <FormField
        id="email"
        label={t('form_fields.email')}
        type="email"
        register={register('email', {
          required: true,
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: t('form_errors.invalid')
          }
        })}
        error={errors.email && (errors.email.message || t('form_errors.required'))}
      />
      <FormField
        id="birthday"
        label={t('form_fields.birthday')}
        type="date"
        max={maxBirthDate}
        register={register('birthday', { required: true })}
        error={errors.birthday && (errors.birthday.message || t('form_errors.required'))}
      />

      {/* Postal Code and Phone Fields */}
      <FormField
          id="postalCode"
          label={t('form_fields.postalCode')}
          register={register('postalCode', { required: true })}
          error={errors.postalCode && (errors.postalCode.message || t('form_errors.required'))}
        />
      <div>
        <label htmlFor="phone" className="block mb-2 uppercase">{t('form_fields.phone')}</label>
        <PhoneInput
          containerClass="w-full"
          inputClass="!w-full !text-base !h-[unset] p-2 border border-gray-300 rounded"
          country={'fr'}
          value={phone}
          inputProps={{
            required: true,
            autoFocus: true,
            ...register('phone', { validate: validatePhoneNumber }),
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => handlePhoneChange(e.target.value),
          }}
          onChange={handlePhoneChange}
        />
        {errors.phone && <p className="text-red-500 mt-1">{t('form_errors.required')}</p>}
      </div>

      {/* Buttons */}
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        {t('save')}
      </button>
      <button type="button" className="w-full bg-black/50 text-white p-2 rounded" onClick={handleClearLocalStorage}>
        {t('clear_data')}
      </button>
    </form>
  );
};

export default Form;
