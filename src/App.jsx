import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "./App.css";
import { FormControl } from "@mui/base";
import { FilledInput, InputAdornment } from "@mui/material";
import CalculatorButtons from "./CalculatorButtons";
import { useState } from "react";
import { calculate } from "./functions";

const CustomPaper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function App() {
  const [input, setInput] = useState(""); // Initialize state to keep track of input

  // Handler function to update the calculator's input
  const onClick = (value) => {
    const isOperator = ['+', '-', 'x', '/'].includes(value);
    const lastChar = input.slice(-1);
    const isZero = value === '0';
    const isDecimal = value === '.';
    const isClear = value === 'AC';
    const isEqual = value === '=';
  
    // Clear all input when 'AC' is pressed
    if (isClear) {
      setInput('');
      return;
    }
  
    // Prevent multiple consecutive operators
    if (isOperator && ['+', '-', 'x', '/'].includes(lastChar)) {
      return;
    }
  
    // Prevent starting with an operator other than minus
    if (isOperator && input.length === 0 && value !== '-') {
      return;
    }
  
    // Prevent leading zero for non-decimal numbers
    if (isZero && input === '0') {
      return;
    }
  
    // Replace leading zero if necessary
    if (input === '0' && !isZero && !isOperator && !isDecimal) {
      setInput(value);
      return;
    }
  
    // Validate decimal points (only one decimal per number)
    if (isDecimal) {
      // eslint-disable-next-line no-useless-escape
      const parts = input.split(/[\+\-x\/]/); // Split by operators
      const lastPart = parts[parts.length - 1];
      if (lastPart.includes('.')) {
        return; // Skip if there's already a decimal in the last number part
      }
    }
  
    // Validate '=' button (the expression should be valid)
    if (isEqual) {
      // For now, just prevent it if the last character is an operator
      // Later, you can add more sophisticated validation or actually perform the calculation
      if (['+', '-', 'x', '/'].includes(lastChar)) {
        return;
      }
      
      const result = calculate(input);
      setInput(result);
      
      return;
    }
  
    // Append the value to the input
    setInput((prevInput) => prevInput + value);
  };

  return (
    <>
      <div id="container">
        <Box sx={{ width: 600 }}>
          <CustomPaper className="paper-background">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth variant="filled">
                  <FilledInput
                    id="filled-adornment-amount"
                    style={{ width: "100%" }}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    value={input}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <CalculatorButtons onClick={onClick} />
              </Grid>
            </Grid>
          </CustomPaper>
        </Box>
      </div>
    </>
  );
}

export default App;
