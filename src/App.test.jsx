import { render, screen, fireEvent } from './utils/test-utils';
import App from './App';

// Helper function to simulate button clicks
const clickButtons = (buttons) => {
  buttons.forEach((btn) => {
    fireEvent.click(screen.getByText(btn));
  });
};

describe('Calculator App', () => {
  // Test basic button clicks and AC (All Clear) functionality
  it('should update the input when buttons are clicked and clear when AC is clicked', () => {
    render(<App />);
    clickButtons(['1', '+', '2']);
    const input = screen.getByRole('textbox');
    expect(input.value).toBe('1+2');
    clickButtons(['AC']);
    expect(input.value).toBe('');
  });

  // Test input validation for consecutive operators
  it('should not allow consecutive operators', () => {
    render(<App />);
    clickButtons(['1', '+', '+']);
    const input = screen.getByRole('textbox');
    expect(input.value).toBe('1+');
  });

  // Test input validation for leading zeros
  it('should not allow leading zeros for non-decimal numbers', () => {
    render(<App />);
    clickButtons(['0', '0', '1']);
    const input = screen.getByRole('textbox');
    expect(input.value).toBe('1');
  });

  // Test decimal validation
  it('should allow only one decimal per number', () => {
    render(<App />);
    clickButtons(['1', '.', '2', '.', '3']);
    const input = screen.getByRole('textbox');
    expect(input.value).toBe('1.23');
  });

  // Test calculation for addition
  it('should correctly calculate the sum of two numbers', () => {
    render(<App />);
    clickButtons(['1', '+', '2', '=']);
    const input = screen.getByRole('textbox');
    expect(input.value).toBe('3');
  });

  // Test calculation for subtraction
  it('should correctly calculate the difference between two numbers', () => {
    render(<App />);
    clickButtons(['5', '-', '2', '=']);
    const input = screen.getByRole('textbox');
    expect(input.value).toBe('3');
  });

  // Test calculation for multiplication
  it('should correctly calculate the product of two numbers', () => {
    render(<App />);
    clickButtons(['2', 'x', '3', '=']);
    const input = screen.getByRole('textbox');
    expect(input.value).toBe('6');
  });

  // Test calculation for division
  it('should correctly calculate the division of two numbers', () => {
    render(<App />);
    clickButtons(['6', '/', '3', '=']);
    const input = screen.getByRole('textbox');
    expect(input.value).toBe('2');
  });

  // Test division by zero
  it('should display "Error" when dividing by zero', () => {
    render(<App />);
    clickButtons(['1', '/', '0', '=']);
    const input = screen.getByRole('textbox');
    expect(input.value).toBe('Error');
  });
});
