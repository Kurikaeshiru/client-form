import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../store';
import Form from '../components/Form';

// Mock i18n translations
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
}));

describe('Form Component', () => {
  const renderForm = () => {
    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );
  };

  it('renders form correctly', () => {
    renderForm();
    expect(screen.getByText(/Civility/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Male/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Female/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Surname/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Birthday/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Postal Code/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
    expect(screen.getByText(/Save/i)).toBeInTheDocument();
    expect(screen.getByText(/Clear Data/i)).toBeInTheDocument();
  });

  it('shows validation errors on submit with empty fields', async () => {
    renderForm();
    await act(async () => {
      fireEvent.click(screen.getByText(/Save/i));
      await waitFor(() => {
        expect(screen.getByText(/is required/i)).toBeInTheDocument();
      });
    });
  });

  it('shows phone number validation error', async () => {
    renderForm();
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: '123' } });
      fireEvent.click(screen.getByText(/Save/i));
      await waitFor(() => {
        expect(screen.getByText(/invalid/i)).toBeInTheDocument();
      });
    });
  });

  it('successfully submits the form with valid data', async () => {
    renderForm();
    await act(async () => {
      fireEvent.click(screen.getByLabelText(/Male/i));
      fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John' } });
      fireEvent.change(screen.getByLabelText(/Surname/i), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
      fireEvent.change(screen.getByLabelText(/Birthday/i), { target: { value: '1990-01-01' } });
      fireEvent.change(screen.getByLabelText(/Postal Code/i), { target: { value: '75001' } });
      fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: '+33123456789' } });
      fireEvent.click(screen.getByText(/Save/i));
      await waitFor(() => {
        expect(screen.getByText(/Form successfully saved/i)).toBeInTheDocument();
      });
    });
  });

  it('shows confirmation dialog before clearing local storage', async () => {
    renderForm();
    await act(async () => {
      fireEvent.click(screen.getByText(/Clear Data/i));
      await waitFor(() => {
        expect(screen.getByText(/Are you sure you want to clear all data?/i)).toBeInTheDocument();
      });
    });
  });
});
