import { act } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import store from '../store';
import Form from '../components/Form';

describe('Form Component', () => {
  const renderForm = () => {
    render(
      <Provider store={store}>
        <Form />
        <ToastContainer />
      </Provider>
    );
  };

  it('renders form correctly', () => {
    renderForm();
    expect(screen.getByText('form_fields.civility')).toBeInTheDocument();
    expect(screen.getByLabelText('form_fields.male')).toBeInTheDocument();
    expect(screen.getByLabelText('form_fields.female')).toBeInTheDocument();
    expect(screen.getByLabelText('form_fields.name')).toBeInTheDocument();
    expect(screen.getByLabelText('form_fields.surname')).toBeInTheDocument();
    expect(screen.getByLabelText('form_fields.email')).toBeInTheDocument();
    expect(screen.getByLabelText('form_fields.birthday')).toBeInTheDocument();
    expect(screen.getByLabelText('form_fields.postalCode')).toBeInTheDocument();
    expect(screen.getByLabelText('form_fields.phone')).toBeInTheDocument();
    expect(screen.getByText('save')).toBeInTheDocument();
    expect(screen.getByText('clear_data')).toBeInTheDocument();
  });

  it('shows validation errors on submit with empty fields', async () => {
    renderForm();
    await act(async () => {
      fireEvent.click(screen.getByText('save'));
    });
    await waitFor(() => {
      expect(screen.getAllByText('form_errors.required').length).toBeGreaterThan(0);
    });
  });

  it('shows phone number validation error', async () => {
    renderForm();
    await act(async () => {
      fireEvent.change(screen.getByLabelText('form_fields.phone'), { target: { value: '123' } });
      fireEvent.click(screen.getByText('save'));
    });
    await waitFor(() => {
      expect(screen.getByText('form_errors.invalid')).toBeInTheDocument();
    });
  });

  it('successfully submits the form with valid data', async () => {
    renderForm();
    await act(async () => {
      fireEvent.click(screen.getByLabelText('form_fields.male'));
      fireEvent.change(screen.getByLabelText('form_fields.name'), { target: { value: 'John' } });
      fireEvent.change(screen.getByLabelText('form_fields.surname'), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText('form_fields.birthday'), { target: { value: '1990-01-01' } });
      fireEvent.change(screen.getByLabelText('form_fields.postalCode'), { target: { value: '75001' } });
      fireEvent.change(screen.getByLabelText('form_fields.email'), { target: { value: 'john.doe@example.com' } });
      fireEvent.change(screen.getByLabelText('form_fields.phone'), { target: { value: '+33123456789' } });
      fireEvent.click(screen.getByText('save'));
    });
      await waitFor(() => {
        expect(screen.getByText('form_messages.saved')).toBeInTheDocument();
      });
  });

  it('shows confirmation dialog before clearing local storage', async () => {
    renderForm();
    await act(async () => {
      fireEvent.click(screen.getByText('clear_data'));
    });
    await waitFor(() => {
      expect(screen.getByText('confirm.message')).toBeInTheDocument();
    });
  });
});
