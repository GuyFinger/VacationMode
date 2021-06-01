import React from 'react'
import { Link } from 'react-router-dom'
import { createMuiTheme, makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import BarChartIcon from '@material-ui/icons/BarChart';
import './CSS/Navbar.css'
import { useSelector, useDispatch } from 'react-redux'
import HomeIcon from '@material-ui/icons/Home';
import Box from '@material-ui/core/Box';



const theme = createMuiTheme({
    overrides: {

        root: {
            margin: '50px'
        }
    }
})


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        color: theme.palette.text.primary,


    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));


export default function Navbar() {
    const classes = useStyles();
    const logout = () => {
        localStorage.clear()
        window.location.href = 'http://localhost:3000/login'
    }
    const reports = () => {
        window.location.href = 'http://localhost:3000/reports'
    }
    const add = () => {
        window.location.href = 'http://localhost:3000/add'
    }
    const home = () => {
        window.location.href = 'http://localhost:3000/'
    }
    const ls = localStorage.getItem('userType')
    const parsedLs = JSON.parse(ls)
    const loggedUser = useSelector(state => state.loggedUser)



    return (
        <div>

            {loggedUser == 'admin' ?
                <Box mb={10}>
                    <div className={classes.root}>
                        <AppBar position="static">
                            <Toolbar>
                                <AccountCircle fontSize="large" className="userAvatar" />
                                <Typography variant="h6" className={classes.title} component="div">
                                    Welcome Admin
             </Typography>
                                <IconButton aria-label="add" className="addBtn" onClick={() => add()}>
                                    <AddCircleOutlineIcon fontSize="large" />
                                </IconButton>

                                <IconButton aria-label="report" className="reportsBtn" onClick={() => reports()} >
                                    <BarChartIcon fontSize="large" />
                                </IconButton>

                                <IconButton aria-label="home" className="reportsBtn" onClick={() => home()}>
                                    <HomeIcon fontSize="large" />
                                </IconButton>

                                <Button color="inherit" onClick={() => logout()}>Log Out</Button>


                            </Toolbar>
                        </AppBar>
                    </div>
                </Box>

                :
                <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar>
                            <AccountCircle fontSize="large" className="userAvatar" />
                            <Typography variant="h6" className={classes.title} component="div">
                                Welcome User
        </Typography>
                            <Button color="inherit" onClick={() => logout()}>Log Out</Button>


                        </Toolbar>
                    </AppBar>
                </div>

            }

        </div>



    )
}
