import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Form1 from "../src/app/Forms/Form1"; 
import axios from 'axios';

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
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [
        { name: { common: 'United Kingdom' }, cca2: 'UK' },
        { name: { common: 'United States' }, cca2: 'US' },
      ],
    });
  });

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

//   test('handles input changes', () => {
//     render(<Form1 formData={mockFormData} setFormData={setFormData} handleSubmit={handleSubmit} />);

//     const collegeInput = screen.getByPlaceholderText('College');
//     fireEvent.change(collegeInput, { target: { name: 'college', value: 'Harvard' } });
//     expect(setFormData).toHaveBeenCalledWith({ ...mockFormData, college: 'Harvard' });

//     const emailInput = screen.getByPlaceholderText('Email');
//     fireEvent.change(emailInput, { target: { name: 'email', value: 'test@example.com' } });
//     expect(setFormData).toHaveBeenCalledWith({ ...mockFormData, email: 'test@example.com' });
//   });

//   test('fetches and displays countries', async () => {
//     render(<Form1 formData={mockFormData} setFormData={setFormData} handleSubmit={handleSubmit} />);

//     await waitFor(() => {
//       expect(axios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/all');
//     });

//     const countrySelect = screen.getByRole('combobox', { name: /country/i });
//     expect(countrySelect).toBeInTheDocument();
//     expect(screen.getByText('United Kingdom')).toBeInTheDocument();
//     expect(screen.queryByText('United States')).not.toBeInTheDocument();
//   });

//   test('handles form submission', () => {
//     render(<Form1 formData={mockFormData} setFormData={setFormData} handleSubmit={handleSubmit} />);

//     const form = screen.getByRole('form');
//     act(() => {
//         fireEvent.submit(form);
//       });
    

//     expect(handleSubmit).toHaveBeenCalled();
//   });
});
