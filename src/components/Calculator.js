import React, {useState} from 'react'
import {
    Box,
    TextField,
    Button
} from '@mui/material';

export default function Calculator() {
    const [probPerc, setProbPerc] = useState("");
    const [probDec, setProbDec] = useState("");
    const [rolls, setRolls] = useState("");
    const [percConf, setPercConf] = useState("");
    let calcList = []

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isNaN(parseFloat(probPerc)) && isNaN(parseFloat(probDec))) {
            alert("Please enter a valid probability")
            return
        } else if (!(Number.isInteger(parseInt(rolls)) || rolls === '') && ((percConf > 0 && percConf < 100) || (percConf === ''))) {
            alert("Please enter either a desired confidence or number of rolls")
            return
        } 

        const prob = probPerc / 100 || probDec

        if (Number.isInteger(parseInt(rolls)) && !(rolls === "")) {
            let conf = ((1 - (1 - prob) ** rolls) * 100).toFixed(2)
            console.log(conf)
            setPercConf(conf)       

        } else if ((percConf > 0 && percConf < 100) && !(percConf === "")) {
            let dConf = percConf / 100
            let reqRolls = Math.ceil(Math.log(1 - dConf) / Math.log(1 - prob))
            console.log(reqRolls)
            setRolls(reqRolls)

        } else {
            alert('Please input a valid number of rolls or percentage confidence')
        }

        let newCalc = {probPerc, probDec, rolls, percConf}

        calcList.push(newCalc)

        localStorage.setItem("calculations", JSON.stringify(calcList));

    }

    const handleProbPerc = (e) => {
        setProbPerc(e.target.value)
    }

    const handleProbDec = (e) => {
        setProbDec(e.target.value)
    }

    const handleRolls = (e) => {
        setRolls(e.target.value)
    }

    const handlePercConf = (e) => {
        setPercConf(e.target.value)
    }

    return (
        <div className='container'>
            <br></br>
            <Box
                component='form'
                sx = {{'& .MuiTextField-root': { m: 1}}}
                noValidate
                autoComplete='off'
                textAlign='center'
                >
                <div className='container2'>
                    <TextField
                        // id="outlined-required"
                        label = "Probability as Percentage"
                        onChange = {handleProbPerc}
                        value = {probPerc}
                        />
                    <TextField
                        // id="disabled"
                        label = "Probability as Decimal"
                        onChange = {handleProbDec}
                        value = {probDec}
                        />
                    <TextField
                        // id="disabled"
                        label = "Rolls Required"
                        onChange = {handleRolls}
                        value = {rolls}
                        />
                    <TextField
                        // id="outlined-required"
                        label = "Percentage Confidence"
                        onChange = {handlePercConf}
                        value = {percConf}
                        />
                    <br></br>
                    <br></br>
                    <Button variant="contained" onClick={handleSubmit}>Submit Calculation</Button>
                    <br></br>
                    <br></br>
                </div>
            </Box>
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