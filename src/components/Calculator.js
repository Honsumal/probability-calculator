import React, {useState} from 'react'
import {
    Box,
    TextField,
    Button
} from '@mui/material';
import NavTabs from './NavTabs';
import Confidence from './fragments/Confidence';
import Rolls from './fragments/Rolls'

export default function Calculator() {
    const [currentCalculator, setCurrentCalculator] = useState('Confidence');

    const renderCalculator = () => {
        switch (currentCalculator) {
            case "Rolls":
                return <Rolls />;
            default:
                return <Confidence />;
        }
    };

    const handleCalculatorChange = (calc) => setCurrentCalculator(calc)

    return (
        <div className='container'>
            <NavTabs currentCalculator={currentCalculator} handleCalculatorChange={handleCalculatorChange} />
            <br></br>
            {renderCalculator}
            <br></br>
            <div className='container2'>
                <Box>
                    Previous Calculations:
                </Box>                
            </div>
            <br></br>
        </div>
    )
}   