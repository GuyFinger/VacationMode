// show main vacations page


import { React, useState, useEffect } from 'react';
import Vacation from './Vacation'
import { useSelector } from 'react-redux'
import Container from '@material-ui/core/Container';






export default function Main() {
    const loggedUser = useSelector(state => state.loggedUser)
    const [isAdmin, setIsAdmin] = useState(true)
    const [vacation, setVacation] = useState([])

    useEffect(() => {
        (async () => {
            const res = await fetch('http://localhost:1000/vacations', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'authorization': 'bearer ' + localStorage.getItem('userToken'), 'userID': localStorage.getItem('userID') }
            })
            const vacations = await res.json()
            setVacation(vacations)
            console.log(vacations)
        })()
    }, [])


    return (
        <div>

                <Vacation isAdmin={isAdmin} setIsAdmin={setIsAdmin} vacationlist={vacation} setVacationList={setVacation} />
        </div >
    )
}
