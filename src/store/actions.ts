import { FormValues } from "../data/types";

export const SAVE_FORM_DATA = 'SAVE_FORM_DATA';
export const INITIALIZE_FORM_DATA = 'INITIALIZE_FORM_DATA';

export const saveFormData = (formData: any) => ({
  type: SAVE_FORM_DATA,
  payload: formData,
});

export const initializeFormData = (formData: FormValues) => ({
  type: INITIALIZE_FORM_DATA,
  payload: formData,
});
