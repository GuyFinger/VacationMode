// Login comp
import { React, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, InputAdornment } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { loggedIn } from '../ACTIONS'
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { red } from '@material-ui/core/colors';







const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            padding: '200px',
            backgroundColor: "rgb(140, 200, 219)"
        },

    },
}));

export default function Login() {
    const dispatch = useDispatch()
    const classes = useStyles();
    const [redirect, setRedirect] = useState(null)

    const handleUserChange = (e) => {
        setUsername(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPass(e.target.value)
    }


    const [username, setUsername] = useState("")
    const [pass, setPass] = useState("")

    useEffect(() => {
        console.log("username:  " + username + "      password:  " + pass)
        return () => {

        }
    }, [username, pass])



    const login = async () => {
        const res = await fetch('http://localhost:1000/login', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userName: username, password: pass })
        })
        const logged = await res.json()
        console.log(logged.token);
        localStorage.setItem('userToken', logged.token)
        localStorage.setItem('userID', logged.userID)
        localStorage.setItem('userType', JSON.stringify(logged.userType))
        console.log(localStorage.getItem('userType'))
        dispatch(loggedIn(logged.userType))
        setRedirect(true)
        window.location.href = 'http://localhost:3000/'

    }


    return (


        <div className={classes.root}>
            <Grid container justify="center"
                alignItems="center" >
                <Box boxShadow={10} bgcolor='white' width={1 / 2} p={5} >
                    <h1>Login </h1>
                    <TextField required id="outlined-basic" label="username" variant="outlined"
                        onChange={(e) => { handleUserChange(e) }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }} />
                    <TextField required id="outlined-password-input" label="password" type="password" variant="outlined" autoComplete="current-password"
                        onChange={(e) => { handlePasswordChange(e) }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <VpnKeyIcon />
                                </InputAdornment>
                            ),
                        }} />

                    <Button size="large" variant="contained" color="primary" onClick={() => login()}>
                        Login
                </Button>

                    <p>not registered yet? <a href="http://localhost:3000/signup">Register</a></p>
                </Box>
            </Grid >
        </div >

    )
}
