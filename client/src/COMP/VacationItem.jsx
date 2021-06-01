import { React, useState, useEffect } from 'react';
import EditVacationDialog from './EditVacationDialog'
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { useSelector, useDispatch } from 'react-redux'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import moment from 'moment';
moment().format();

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 550,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    }
}));

export default function VacationItem({ vacation, handleUpdate, removeItem, isAdmin }) {
    const loggedUser = useSelector(state => state.loggedUser)
    const classes = useStyles();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleClickOpen = () => {
        setIsDialogOpen(true);
    };

    return (
        <div className="vacationCard">

            <Box className={classes.root} boxShadow={10} key={vacation.ID}>
                <Card className={classes.root} >

                    <CardHeader
                        action=
                        {loggedUser == 'admin' ? <IconButton aria-label="delete">
                            <HighlightOffIcon onClick={(e) => { removeItem(vacation) }} />
                        </IconButton> : ''}
                        title={vacation.vacationName}
                    />
                    <CardMedia
                        className={classes.media}
                        image={vacation.image}
                    />
                    <CardContent>

                        <Typography variant="body1" color="textSecondary" component="p">
                            {vacation.description}
                        </Typography>
                    </CardContent>


                    <CardActions disableSpacing>
                        {loggedUser == 'admin' ? <EditIcon onClick={() => { handleClickOpen() }}></EditIcon> : <IconButton aria-label="add to favorites" onClick={() => {

                            vacation.follow = !vacation.follow
                            handleUpdate(vacation)
                        }}>
                            {!vacation.follow ? <FavoriteBorderIcon /> : <FavoriteIcon />}
                        </IconButton>}
                        <Box ml={2}>

                            <Typography className="cardPrice" variant="h6" color="textSecondary" component="p">
                                {vacation.price}
                                <AttachMoneyIcon alignSelf="flex-start" fontSize="small"></AttachMoneyIcon>
                            </Typography>
                        </Box>
                        <Typography variant="h6" color="textSecondary" component="p">
                            {moment(vacation.start).format('DD/MM/YYYY') + " -  "}
                        </Typography>
                        <Typography variant="h6" color="textSecondary" component="p">
                            {moment(vacation.end).format('DD/MM/YYYY')}
                        </Typography>

                    </CardActions>
                </Card>
            </Box>
            <EditVacationDialog originalVacation={vacation} setOpen={setIsDialogOpen} isOpen={isDialogOpen} saveDialogChanges={handleUpdate} />
        </div>
    )
}
