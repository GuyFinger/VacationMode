import { React, useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {
    MuiPickersUtilsProvider, KeyboardDatePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import moment from 'moment';
moment().format();

export default function EditVacationDialog({ originalVacation, setOpen, isOpen, saveDialogChanges }) {

    const [newVacation, setNewVacation] = useState(JSON.parse(JSON.stringify(originalVacation)))
    const [selectedDateStart, setSelectedDateStart] = useState(newVacation.start)
    const [selectedDateEnd, setSelectedDateEnd] = useState(newVacation.end)
    console.log(newVacation)

    const handleClose = () => {
        setOpen(false);
    };

    const handleDateStartChange = (date) => {
        setSelectedDateStart(date);
        newVacation.start = date
        console.log(selectedDateStart)
    };
    //DATE END
    const handleDateEndChange = (date) => {
        setSelectedDateEnd(date);
        newVacation.end = date
        console.log(selectedDateEnd)
    };

    const setTitle = (e) => {

        newVacation.vacationName = e.target.value
        console.log(newVacation)
    }
    const setImg = (e) => {

        newVacation.image = e.target.value
        console.log(newVacation)
    }
    const setPrice = (e) => {

        newVacation.price = e.target.value
        console.log(newVacation)
    }
    const setDesc = (e) => {

        newVacation.description = e.target.value
        console.log(newVacation)
    }
    const update = () => {

        saveDialogChanges(newVacation)
        handleClose()
    }

    return (
        <div>
            <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Update Vacation</DialogTitle>
                <DialogContent>


                    <TextField required defaultValue={newVacation.vacationName} id="name" label="Title" fullWidth autoFocus onChange={(e) => { setTitle(e) }} />
                    <TextField required defaultValue={newVacation.image} id="name" label="Image" fullWidth autoFocus onChange={(e) => { setImg(e) }} />
                    <TextField required defaultValue={newVacation.description} id="name" label="Description" fullWidth autoFocus onChange={(e) => { setDesc(e) }} />
                    <TextField required defaultValue={newVacation.price} id="name" label="Price" fullWidth autoFocus onChange={(e) => { setPrice(e) }} />
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            fullWidth
                            variant="inline"
                            format="DD/MM/yyyy"
                            margin="normal"
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
                            fullWidth
                            variant="inline"
                            format="DD/MM/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Ending Date"
                            value={selectedDateEnd}
                            onChange={handleDateEndChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={update} color="primary">
                        UPDATE
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
