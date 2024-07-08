import { FormValues } from '../data/types';
import { SAVE_FORM_DATA, INITIALIZE_FORM_DATA } from './actions';

const initialState: { formData: FormValues } = {
  formData: {
    name: '',
    surname: '',
    email: '',
    birthday: '',
    postalCode: '',
    phone: '',
    civility: undefined,
  },
};

const formDataReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case INITIALIZE_FORM_DATA:
      return {
        ...state,
        formData: action.payload,
      };
    case SAVE_FORM_DATA:
      localStorage.setItem('formData', JSON.stringify(action.payload));
      return {
        ...state,
        formData: action.payload,
      };
    default:
      return state;
  }
};

export default formDataReducer;
