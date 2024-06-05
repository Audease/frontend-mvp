import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Form1 from "../src/app/Forms/Form1"; 

jest.mock('axios');

const mockFormData = {
  college: '',
  bussinessNo: '',
  firstName: '',
  lastName: '',
  email: '',
  noOfEmployee: '',
  selectedCountry: '',
};

const setFormData = jest.fn();
const handleSubmit = jest.fn((e) => e.preventDefault());

describe('Form1 Component', () => {

  test('renders the form with all fields', async () => {
    render(<Form1 formData={mockFormData} setFormData={setFormData} handleSubmit={handleSubmit} />);

    expect(screen.getByPlaceholderText('College')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('No of Employees')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Bussiness No')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
  });
});