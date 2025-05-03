import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../src/app/page';


// Mock the Next.js router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Home Component', () => {
  it('renders the Home component correctly', () => {
    render(<Home />);

    // Check if both buttons are rendered
    expect(screen.getByText('Sign up')).toBeInTheDocument();
    expect(screen.getByText('Log in')).toBeInTheDocument();
  });

});

describe ('Correct Links', () => {

  it('contains the correct links', () => {
    render(<Home />);

    // Check if the links have the correct href attributes
    // const signUpLink = screen.getAllByRole('button');
    // const logInLink = screen.getAllByRole('button');
    // eslint-disable-next-line testing-library/no-node-access
    const signUpLink = screen.getByText('Sign up').closest('a');
    // eslint-disable-next-line testing-library/no-node-access
    const logInLink = screen.getByText('Log in').closest('a');

    expect(signUpLink).toHaveAttribute('href', '/signup');
    expect(logInLink).toHaveAttribute('href', 'signIn');
  });
})