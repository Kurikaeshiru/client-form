import React from 'react';
import { Provider } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Form from './components/Form';
import { ToastContainer } from 'react-toastify';

import store from './store';
import './translation/i18n';

const App: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <Provider store={store}>
      <div className="container mx-auto p-4">
        <div className="flex justify-end mb-4">
          <button onClick={() => i18n.changeLanguage('en')} className="mr-2">{t('english')}</button>
          <button onClick={() => i18n.changeLanguage('fr')}>{t('french')}</button>
        </div>
        <Form />
        <ToastContainer />
      </div>
    </Provider>
  );
};

export default App;
