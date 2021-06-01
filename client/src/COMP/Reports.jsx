// View reports about followed vacations
import { React, useState, useEffect } from 'react';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory';
import Container from '@material-ui/core/Container';



export default function Reports() {

    const [reports, setReports] = useState([])


    useEffect(async () => {
        const res = await fetch('http://localhost:1000/userVacations', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'authorization': 'bearer ' + localStorage.getItem('userToken'), 'userID': localStorage.getItem('userID') }
        })
        const reportsFetch = await res.json()
        setReports(reportsFetch)
        console.log(reportsFetch)
        console.log(reports)
    }, [])

    return (

        < div >
            <Container maxWidth="md">

                <h1>   Vacations followers report:</h1>
                <VictoryChart
                    // domainPadding will add space to each side of VictoryBar to
                    // prevent it from overlapping the axis
                    domainPadding={20}
                    theme={VictoryTheme.material}
                >
                    <VictoryBar
                        data={reports}
                        x="vacationName"
                        y="follows"
                    />
                </VictoryChart>

            </Container>
        </div >
    )
}
