import React, {useState} from 'react'
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
        <div>
            <NavTabs currentCalculator={currentCalculator} handleCalculatorChange={handleCalculatorChange} />
            <br></br>
            <div className='container'>
                
                {renderCalculator()}
                <br></br>
                
            </div>
            
            {/* <div className='container'>
                <PrevCalcs currentCalculator={currentCalculator} />   
                <br></br>
            </div> */}

            <br></br>
        </div>
    )
}   