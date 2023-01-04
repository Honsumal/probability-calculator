import React, {useState} from 'react'
import {
    Box,
    TextField,
    Button
} from '@mui/material';

export default function Calculator() {
    const [probPerc, setProbPerc] = useState("");
    const [rolls, setRolls] = useState("");
    const [percConf, setPercConf] = useState("");
    let calcList = []

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isNaN(parseFloat(probPerc))) {
            alert("Please enter a valid probability")
            return
        } else if (((percConf > 0 && percConf < 100) || (percConf === ''))) {
            alert("Please enter desired confidence percentage")
            return
        } 

        const prob = probPerc / 100

        if ((percConf > 0 && percConf < 100) && !(percConf === "")) {
            let dConf = percConf / 100
            let reqRolls = Math.ceil(Math.log(1 - dConf) / Math.log(1 - prob))
            console.log(reqRolls)
            setRolls(reqRolls)

        } else {
            alert('Please input a valid percentage confidence')
        }

        let newCalc = {probPerc, rolls, percConf}

        calcList.push(newCalc)

        localStorage.setItem("calculations", JSON.stringify(calcList));

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
                    <TextField
                        // id="outlined-required"
                        label = "Probability as Percentage"
                        onChange = {handleProbPerc}
                        value = {probPerc}
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
                </div>
            </Box>
        </div>
    )
}   