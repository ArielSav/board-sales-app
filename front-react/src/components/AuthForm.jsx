import React, {useState} from 'react';
import { Button, TextField, Grid, makeStyles } from '@material-ui/core';
import {useHistory} from 'react-router-dom'
import axios from 'axios';

import {useSetState} from '../Provider'

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


export default function AuthForm({ type }) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const setState = useSetState();

    const handleOnCLick = () => {
        axios.post(
            `http://localhost:5000/${type}`,
            JSON.stringify({
                username: userName,
                password
            }),
            {
                withCredentials: true,
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                }
            }
            )
            .then((res => {
                setState(() => ({ auth: true }));
                history.push("/offers");
            }))
            .catch(err => console.log(err));
    }

    const classes = useStyles();
    return (
        <Grid container className={classes.root} justifyContent="center" alignItems="center" spacing={0}>
            <Grid item xs={3}>
                <Grid container spacing={0}>
                    <div className={classes.paper}>
                        <TextField onChange={(event)=> setUserName(event.target.value)} label="Username" />
                        <TextField onChange={(event)=> setPassword(event.target.value)} label="Password" type="password" />
                        <Button onClick={() => handleOnCLick()} color='primary'>{type ==='register' ? "register now!" : "log in" }</Button>
                    </div>
                </Grid>
            </Grid>
        </Grid> 
    );
}