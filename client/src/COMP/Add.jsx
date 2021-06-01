//add vacation to Main comp
import { React, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {
    MuiPickersUtilsProvider, KeyboardDatePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import './CSS/Add.css'





import moment from 'moment';
moment().format();

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        '& > *': {
            margin: theme.spacing(1),

        },
    },
}));


export default function Add() {

    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [dest, setDest] = useState("")
    const [img, setImg] = useState("")
    const [selectedDateStart, setSelectedDateStart] = useState(new Date())
    const [selectedDateEnd, setSelectedDateEnd] = useState(new Date())
    const [price, setPrice] = useState("")


    const classes = useStyles();
    // TITLE
    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }
    // DESC
    const handleDescriptionChange = (e) => {
        setDesc(e.target.value)
    }
    //DEST
    const handleDestinationChange = (e) => {
        setDest(e.target.value)
    }
    //IMG
    const handleImgURLChange = (e) => {
        setImg(e.target.value)
    }
    //PRICE
    const handlePriceChange = (e) => {
        setPrice(e.target.value)
    }
    //DATE START
    const handleDateStartChange = (date) => {
        setSelectedDateStart(date);
        console.log(selectedDateStart)
    };
    //DATE END
    const handleDateEndChange = (date) => {
        setSelectedDateEnd(date);
        console.log(selectedDateEnd)
    };


    const add = async () => {

        if (title == '' || desc == '' || img == '' || price == '') {
            alert('Please make sure you entered all fields correctly')
        } else {

            const res = await fetch('http://localhost:1000/vacations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'authorization': 'bearer ' + localStorage.getItem('userToken'), 'userID': localStorage.getItem('userID') },
                body: JSON.stringify({ name: title, desc: desc, dest: dest, start: moment(selectedDateStart).format('YYYY-MM-DD'), end: moment(selectedDateEnd).format('YYYY-MM-DD'), img: img, price: price })
            })
            const newVacation = await res.json()
            console.log(newVacation)
        }
    }




    return (



        <div>
            <div className={classes.root}>
                <Box width="97%">
                    <Grid container spacing={2} justify="center">

                        <h1>
                            Add New Vacation
                    </h1>
                    </Grid>

                    <Grid container spacing={2} justify="center">

                        <Grid item >
                            {/* title */}
                            <TextField required={true} id="outlined-required" label="Title" variant="outlined"
                                onChange={(e) => { handleTitleChange(e) }}
                            />
                        </Grid>
                        <Grid item >

                            {/* description */}
                            <TextField required={true} id="outlined-required" label="Description" variant="outlined"
                                onChange={(e) => { handleDescriptionChange(e) }}
                            />
                        </Grid>


                        <Grid container spacing={2} justify="center">
                            <Grid item>

                                {/* img url */}
                                <TextField required={true} id="outlined-required" label="image URL" variant="outlined"
                                    onChange={(e) => { handleImgURLChange(e) }}
                                />
                            </Grid>
                            {/* price */}
                            <Grid item>

                                <TextField required id="outlined-basic" label="Price" variant="outlined"
                                    onChange={(e) => { handlePriceChange(e) }}
                                />
                            </Grid>
                        </Grid>

                    </Grid>


                    <Grid container spacing={2} justify="center">

                        {/* dates */}

                        <Box mb={5} ml={1} mt={5}>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="DD/MM/yyyy"
                                    id="date-picker-inline"
                                    label="Starting Date"
                                    value={selectedDateStart}
                                    onChange={handleDateStartChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="DD/MM/yyyy"
                                    id="date-picker-inline"
                                    label="Ending Date"
                                    value={selectedDateEnd}
                                    onChange={handleDateEndChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Box>
                    </Grid>

                    <Grid container spacing={2} justify="center">

                        <Box mr={2} >
                            <Button size="large" variant="contained" color="primary" onClick={() => add()}>
                                ADD
            </Button>
                        </Box>
                        <Button size="large" variant="contained" color="primary" href="http://localhost:3000/">
                            CANCEL
            </Button>

                    </Grid>
                </Box>
            </div >

            <div className="imgStrip">

            </div>
        </div>

    )
}
