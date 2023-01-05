import React, {useState} from 'react'
import {
    Box,
    TextField,
    Button
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function Confidence() {
    const [probPerc, setProbPerc] = useState("");
    const [rolls, setRolls] = useState("");
    const [percConf, setPercConf] = useState("");
    let calcList = JSON.parse(localStorage.getItem("confCalcs")) || []

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isNaN(parseFloat(probPerc))) {
            alert("Please enter a valid probability")
            return
        } else if (!(Number.isInteger(parseInt(rolls)) || rolls === '')) {
            alert("Please enter a desired number of rolls to perform")
            return
        } 

        const prob = probPerc / 100

        if (Number.isInteger(parseInt(rolls)) && !(rolls === "")) {
            let conf = ((1 - (1 - prob) ** rolls) * 100).toFixed(2)

            setPercConf(conf)

            if (calcList.length === 0) {
                let i = 0

                let newCalc = {i, probPerc, rolls, conf}

                calcList.push(newCalc)

                localStorage.setItem("confCalcs", JSON.stringify(calcList)); 
            } else {                
                let i = calcList[calcList.length - 1].i + 1

                let newCalc = {i, probPerc, rolls, conf}

                calcList.push(newCalc)

                localStorage.setItem("confCalcs", JSON.stringify(calcList)); 
            }
                 

        } else {
            alert('Please input a valid number of rolls to perform')
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
                        // id="disabled"
                        label = "Rolls to Perform"
                        onChange = {handleRolls}
                        value = {rolls}
                        />
                    <TextField
                        disabled
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
                    <h2>Previous Calculations:</h2>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650,}} aria-label="simple table">
                                <TableHead sx={{background: '#f77f00'}}>
                                <TableRow >
                                    <TableCell>Percentage Chance (%)</TableCell>
                                    <TableCell align="right">Rolls Performed</TableCell>
                                    <TableCell align="right">Percentage Confidence (%)</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {calcList.map((c, i) => (
                                    <TableRow
                                    key={c.i}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    style ={ i % 2? { background : "#fcbf49" }:{ background : "#eae2b7" }}
                                    >
                                    <TableCell component="th" scope="row">
                                        {c.probPerc}
                                    </TableCell>
                                    <TableCell align="right">{c.rolls}</TableCell>
                                    <TableCell align="right">{c.conf}</TableCell>
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