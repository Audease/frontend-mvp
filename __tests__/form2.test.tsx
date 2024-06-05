import { render, screen, fireEvent } from "@testing-library/react";
import Form2 from "../src/app/Forms/Form2";
import '@testing-library/jest-dom'



jest.mock("react-phone-number-input", () => ({
  __esModule: true,
  default: jest.fn(() => <input data-testid="phone-input" />),
}));

const formData = {
  streetAddress: "",
  streetAddress2: "",
  city: "",
  postCode: "",
  selectedStates: "",
  phoneNumber: "",
};

const setFormData = jest.fn();
const handleSubmit = jest.fn();
const handleBackClick = jest.fn();

describe("Form2 Component", () => {
  test("renders the form with initial data", () => {
    render(
      <Form2
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        handleBackClick={handleBackClick}
      />
    );

    expect(screen.getByPlaceholderText("Street address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Street address 2")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("City")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Post code")).toBeInTheDocument();
    expect(screen.getByTestId("phone-input")).toBeInTheDocument();
    expect(screen.getByText("Continue")).toBeInTheDocument();
  });

  test("handles back button click", () => {
    render(
      <Form2
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        handleBackClick={handleBackClick}
      />
    );

    const backButton = screen.getByText("Go back");
    fireEvent.click(backButton);
    expect(handleBackClick).toHaveBeenCalled();
  });
});
