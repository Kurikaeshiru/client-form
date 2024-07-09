const React = require('react');

const useTranslation = () => {
  return {
    t: (key) => key,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  };
};

const Trans = ({ children }) => children;
const Translation = ({ children }) => children(() => "");

module.exports = {
  useTranslation,
  Trans,
  Translation,
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
};
