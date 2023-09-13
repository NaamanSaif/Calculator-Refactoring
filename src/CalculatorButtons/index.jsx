import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import PropTypes from 'prop-types';

const CalculatorButtons = ({ onClick }) => {
    const numbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.'];
    const operations = ['+', '-', 'x', '/', '=', 'AC'];

    return (
        <Grid container spacing={1}>
            {/* Render number buttons */}
            <Grid container item xs={9} spacing={1}>
                {numbers.map((number, index) => (
                    <Grid key={index} item xs={4}>
                        <Button variant="contained" onClick={() => onClick(number)} color="error">
                            {number}
                        </Button>
                    </Grid>
                ))}
            </Grid>

            {/* Render operation buttons */}
            <Grid container item xs={3} spacing={1}>
                {operations.map((operation, index) => (
                    <Grid key={index} item xs={12}>
                        <Button variant="contained" color="primary" onClick={() => onClick(operation)}>
                            {operation}
                        </Button>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};

CalculatorButtons.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default CalculatorButtons;
