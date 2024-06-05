import { render, screen, fireEvent } from '@testing-library/react';
import FormStep from '../src/app/components/FormStep';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../src/app/Forms/Form1', () => jest.fn(({ formData, setFormData, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      name="college"
      placeholder="College"
      value={formData.college}
      onChange={(e) => setFormData({ ...formData, college: e.target.value })}
    />
    <button type="submit">Next</button>
  </form>
)));

jest.mock('../src/app/Forms/Form2', () => jest.fn(({ formData, setFormData, handleSubmit, handleBackClick }) => (
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      name="city"
      placeholder="City"
      value={formData.city}
      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
    />
    <button type="button" onClick={handleBackClick}>Back</button>
    <button type="submit">Next</button>
  </form>
)));

jest.mock('../src/app/Forms/Form3', () => jest.fn(({ formData, setFormData, handleSubmit, handleBackClick, userCollege }) => (
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      name="userName"
      placeholder="Username"
      value={formData.userName}
      onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
    />
    <button type="button" onClick={handleBackClick}>Back</button>
    <button type="submit">Submit</button>
  </form>
)));

describe('FormStep Component', () => {
  const push = jest.fn();


  test('renders Form1 initially', () => {
    render(<FormStep />);

    expect(screen.getByPlaceholderText('College')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  test('navigates to Form2 on next click', () => {
    render(<FormStep />);

    fireEvent.click(screen.getByText('Next'));

    expect(screen.getByPlaceholderText('City')).toBeInTheDocument();
    expect(screen.getByText('Back')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  test('navigates back to Form1 on back click from Form2', () => {
    render(<FormStep />);

    fireEvent.click(screen.getByText('Next')); // Go to Form2
    fireEvent.click(screen.getByText('Back')); // Go back to Form1

    expect(screen.getByPlaceholderText('College')).toBeInTheDocument();
  });

  test('navigates to Form3 on next click from Form2', () => {
    render(<FormStep />);

    fireEvent.click(screen.getByText('Next')); // Go to Form2
    fireEvent.click(screen.getByText('Next')); // Go to Form3

    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
  });
});
