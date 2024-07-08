import React from 'react';
import { Provider } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';
import Form from './components/Form';

import store from './store';
import './translation/i18n';

type FormValues = {
  name: string;
  surname: string;
  phone: string;
  email: string;
};

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = data => console.log(data);

  return (
    <Provider store={store}>
      <div className="container mx-auto p-4">
        <div className="flex justify-end mb-4">
          <button onClick={() => i18n.changeLanguage('en')} className="mr-2">{t('english')}</button>
          <button onClick={() => i18n.changeLanguage('fr')}>{t('french')}</button>
        </div>
        <Form />
      </div>
    </Provider>
  );
};

export default App;
