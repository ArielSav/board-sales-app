import React, {useState} from 'react';
import {Button, TextField, Grid, makeStyles} from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection : "column",
        position: "absolute",
        top: "30%",
        
    },
    paper: {
      height: 140,
      width: 250,
    },
  }));


export default function Auth({ type }) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleOnCLick = () => {
        switch (type) {
            case 'register':
                axios.post(
                    "http://localhost:5000/register",
                    JSON.stringify({
                        username: userName,
                        password
                    }),
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                    )
                    .then((res => console.log(res.status)))
                    .catch(err => console.log(err));
                break;
            case 'login':

                break;
            default:
                break;
        }
    }

    const classes = useStyles();
    return (
        <Grid container className={classes.root} justifyContent="center" alignItems="center" spacing={0}>
            <Grid item xs={3}>
                <Grid container spacing={0}>
                    <div className={classes.paper}>
                        <TextField onChange={(event)=> setUserName(event.target.value)} label="Username" />
                        <TextField onChange={(event)=> setPassword(event.target.value)} label="Password" type="password" />
                        <Button onClick={() => handleOnCLick()} color='primary'>register now!</Button>
                    </div>
                </Grid>
            </Grid>
        </Grid> 
    );
}