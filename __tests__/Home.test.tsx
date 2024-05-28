import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useRouter } from 'next/router';
import Home from '../src/app/page';

// Mock the Next.js router
jest.mock('next/router', () => ({
  useRouter: jest.fn()
}));

describe('Home Component', () => {
  it('renders the Home component correctly', () => {
    render(<Home />);

    // Check if both buttons are rendered
    expect(screen.getByText('Sign up')).toBeInTheDocument();
    expect(screen.getByText('Log in')).toBeInTheDocument();
  });

  it('contains the correct links', () => {
    render(<Home />);

    // Check if the links have the correct href attributes
    const signUpLink = screen.getByText('Sign up').closest('a');
    const logInLink = screen.getByText('Log in').closest('a');

    expect(signUpLink).toHaveAttribute('href', '/signup');
    expect(logInLink).toHaveAttribute('href', 'signIn');
  });

  it('navigates to the correct route on click', () => {
    const push = jest.fn();
    useRouter.mockImplementation(() => ({
      push,
    }));

    render(<Home />);

    const signUpButton = screen.getByText('Sign up');
    const logInButton = screen.getByText('Log in');

    // Simulate clicks
    signUpButton.click();
    logInButton.click();

    // Check if the push method was called with the correct arguments
    expect(push).toHaveBeenCalledWith('/signup');
    expect(push).toHaveBeenCalledWith('signIn');
  });
});
