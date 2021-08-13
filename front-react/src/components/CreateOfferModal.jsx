import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Dialog,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    Grid,
    useMediaQuery,
    useTheme,
    CircularProgress
} from '@material-ui/core/';
import MaterialUiPhoneNumber from 'material-ui-phone-number';
import emailRegex from 'email-regex';

import { addOffer } from '../helpers/db';


const useStyles = makeStyles((theme) => ({
    dialog: {
        overflowX: 'hidden',
        overflowY: 'hidden',
    },
    content: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    gridContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    }

}));


export default function CreateOfferModal(props) {
    const classes = useStyles();
    const { open, handleClose } = props;
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState('');
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [emailInvalid, setEmailInvalid] = useState(false);
    const [loading, setLoading] = useState(false);

    return loading? <Dialog open={open} fullScreen={fullScreen} className={classes.dialog}><CircularProgress/></Dialog> :(
        <Dialog open={open} onClose={handleClose} fullScreen={fullScreen} className={classes.dialog} >
            <DialogTitle>Create a New Offer!</DialogTitle>
            <DialogContent className={ classes.content}>
                <Grid container className={classes.gridContainer}>
                    <Grid item xs={12}>
                        <TextField onChange={(e)=> setTitle(e.target.value) } label="Title" />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl className={classes.formControl}>
                            <InputLabel>Type</InputLabel>
                            <Select value={type} onChange={(e) => setType(e.target.value)}>
                                <MenuItem value={"cars"}>Cars</MenuItem>
                                <MenuItem value={"electronics"}>Electronics</MenuItem>
                                <MenuItem value={"realEstate"}>Real Estate</MenuItem>
                                <MenuItem value={"clothing"}>Clothing</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            onChange={(e) => setDescription(e.target.value)}
                            label="Description (200 characters maximum)"
                            multiline
                            minRows={2}
                            inputProps={{maxLength: 200}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <MaterialUiPhoneNumber defaultCountry={'il'} onChange={(value) => setPhoneNumber(value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="E-mail" error={emailInvalid} helperText={emailInvalid? "Incorrect E-mail Format." : "" } onChange={(e) => {
                            if (emailRegex({ exact: true }).test(e.target.value)) {
                                setEmail(e.target.value);
                                setEmailInvalid(false);
                            } else {
                                setEmailInvalid(true);
                             }
                        }} />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=> handleClose() } color="secondary">Cancel</Button>
                <Button onClick={() => {
                    setLoading(true);
                    addOffer({
                        title,
                        description,
                        type,
                        phoneNumber,
                        email
                    }).then(success => {
                        setLoading(false);
                        handleClose();
                    }).catch(rej => setLoading(false));
                }} color="primary">Add</Button>
            </DialogActions>
        </Dialog>
    );
}