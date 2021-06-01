import { React, useState, useEffect } from 'react';
import VacationItem from './VacationItem'
import '../App.css';
import moment from 'moment';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


moment().format();




export default function Vacation({ vacationlist, setVacationList, isAdmin }) {
    const removeItem = async (vacation) => {
        const res = await fetch(`http://localhost:1000/vacations/${vacation.ID}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'authorization': 'bearer ' + localStorage.getItem('userToken'), 'userID': localStorage.getItem('userID') },
        })
        const afterDeleteVacations = await res.json()
        console.log(afterDeleteVacations)
        setVacationList(afterDeleteVacations)
    }

    const handleUpdate = async (vacation) => {

        const res = await fetch(`http://localhost:1000/vacations/${vacation.ID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'authorization': 'bearer ' + localStorage.getItem('userToken'), 'userID': localStorage.getItem('userID') },
            body: JSON.stringify({ name: vacation.vacationName, desc: vacation.description, start: moment(vacation.start).format('YYYY-MM-DD'), end: moment(vacation.end).format('YYYY-MM-DD'), img: vacation.image, price: vacation.price, follow: vacation.follow })
        })
        const updateVacation = await res.json()
        console.log(updateVacation)
        setVacationList(updateVacation)

    }

    return (

        <div className="vacationList">
            <Grid container spacing={10} justify="center">
                {vacationlist.map(vacation => (
                    <Grid item style={{ height: 450, width: 500 }}>
                        <VacationItem vacation={vacation} handleUpdate={handleUpdate} removeItem={removeItem} isAdmin={isAdmin} />
                    </Grid>
                ))}
            </Grid>

        </div>
    )
}