import React, {useState} from 'react'
import {
    Box,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';

export default function Rolls() {
    const [probPerc, setProbPerc] = useState("");
    const [rolls, setRolls] = useState("");
    const [percConf, setPercConf] = useState("");
    let calcList = JSON.parse(localStorage.getItem('rollCalcs')) || []

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isNaN(parseFloat(probPerc))) {
            alert("Please enter a valid probability")
            return
        } else if (((percConf < 0 && percConf > 100) || (percConf === ''))) {
            alert("Please enter desired confidence percentage")
            return
        } 

        const prob = probPerc / 100

        if ((percConf > 0 && percConf < 100) && !(percConf === "")) {
            let dConf = percConf / 100
            let reqRolls = Math.ceil(Math.log(1 - dConf) / Math.log(1 - prob))
            setRolls(reqRolls)
            
            if (calcList.length === 0) {
                let i = 0

                let newCalc = {i, probPerc, percConf, reqRolls}

                calcList.push(newCalc)

                localStorage.setItem("rollCalcs", JSON.stringify(calcList)); 
            } else {                
                let i = calcList[calcList.length - 1].i + 1

                let newCalc = {i, probPerc, percConf, reqRolls}

                calcList.push(newCalc)

                localStorage.setItem("rollCalcs", JSON.stringify(calcList)); 
            }

        } else {
            alert('Please input a valid percentage confidence')
        }

    }

    const handleProbPerc = (e) => {
        setProbPerc(e.target.value)
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
                    <br></br>
                    <TextField
                        // id="outlined-required"
                        label = "Probability as Percentage"
                        onChange = {handleProbPerc}
                        value = {probPerc}
                        />
                    <TextField
                        // id="outlined-required"
                        label = "Percentage Confidence"
                        onChange = {handlePercConf}
                        value = {percConf}
                        />
                    <TextField
                        disabled
                        label = "Rolls Required"
                        onChange = {handleRolls}
                        value = {rolls}
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
                    <h2>Previous Calculations:</h2>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650,}} aria-label="simple table">
                                <TableHead sx={{background: '#f77f00'}}>
                                <TableRow >
                                    <TableCell>Percentage Chance (%)</TableCell>
                                    <TableCell align="center">Confidence Desired (%)</TableCell>
                                    <TableCell align="right">Rolls Required</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {calcList.map((c, i) => (
                                    <TableRow
                                    key={c.probPerc}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    style ={ i % 2? { background : "#fcbf49" }:{ background : "#eae2b7" }}
                                    >
                                    <TableCell component="th" scope="row">
                                        {c.probPerc}
                                    </TableCell>
                                    <TableCell align="center">{c.percConf}</TableCell>
                                    <TableCell align="right">{c.reqRolls}</TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                </Box>
                <br></br>
            </div>
        </div>
    )
}   