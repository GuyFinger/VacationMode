import { React, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';



const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            padding: '200px',
            backgroundColor: "rgb(140, 200, 219)"
        },
    },
}));

export default function Signup() {

    const signup = async () => {
        if (username == '' || pass == '' || firstName == '' || lastName == '') {
            alert('Please make sure you entered all fields correctly')

        } else {
            const data = await fetch('http://localhost:1000/users')
            const users = await data.json()
            const userexist = users.filter(user => user.userName === username)
            console.log(userexist)
            if (userexist.length > 0) {
                alert('Username is taken by another user, please choose another');
            } else {

                const res = await fetch('http://localhost:1000/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userName: username, admin: checked.check, password: pass, firstName: firstName, lastName: lastName })
                })
                const newUser = await res.json()
                console.log(newUser)
                window.location.href = 'http://localhost:3000/'

            }
        }
    }





    const [username, setUsername] = useState("")
    const [pass, setPass] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [checked, setChecked] = useState({
        check: false
    })

    useEffect(() => {
        console.log("is admin checked:  " + checked.check)
        return () => {

        }
    }, [checked])


    const classes = useStyles();

    const handleUserChange = (e) => {
        setUsername(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPass(e.target.value)
    }
    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value)
    }
    const handleLastNameChange = (e) => {
        setLastName(e.target.value)
    }
    const handleCheckChange = (e) => {
        setChecked({ check: e.target.checked })
    }

    return (
        <div className={classes.root}>
            <Grid container justify="center" alignItems="center" >
                <Box boxShadow={10} bgcolor='white' width={2 / 3} p={5} >
                    <h1>Signup</h1>



                    <TextField required id="outlined-basic" label="First Name" variant="outlined"
                        onChange={(e) => { handleFirstNameChange(e) }}
                    />
                    <TextField required id="outlined-basic" label="Last Name" variant="outlined"
                        onChange={(e) => { handleLastNameChange(e) }}
                    />
                    <TextField required id="outlined-basic" label="Username" variant="outlined"
                        onChange={(e) => { handleUserChange(e) }}
                    />
                    <TextField required id="outlined-password-input" label="Password" type="password" variant="outlined" autoComplete="current-password"
                        onChange={(e) => { handlePasswordChange(e) }}
                    />

                    <FormGroup row>
                        <FormControlLabel
                            control={<Checkbox checked={checked.check} onChange={handleCheckChange} name="admin" />}
                            label="User Is Admin"
                        />
                    </FormGroup>

                    <Button size="large" variant="contained" color="primary" onClick={() => signup()}>
                        Sign Up
            </Button>
                </Box>
            </Grid>
        </div>
    )
}
