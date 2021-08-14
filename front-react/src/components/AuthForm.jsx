import React, {useState} from 'react';
import { Button, TextField, Grid, makeStyles } from '@material-ui/core';
import {useHistory} from 'react-router-dom'

import { handleAuth } from '../helpers/auth';
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
        handleAuth({userName,password,type})
            .then((auth) => {
                if (auth) {
                    setState(() => ({ auth }));
                    // history.push("/offers");
                }
        
            })
            .catch(err => { });
    }

    const classes = useStyles();
    return (
        <Grid container className={classes.root} justifyContent="center" alignItems="center" spacing={0}>
            <Grid item xs={3}>
                <Grid container spacing={0}>
                    <div className={classes.paper}>
                        <TextField onChange={(event)=> setUserName(event.target.value)} label="Username" />
                        <TextField onChange={(event)=> setPassword(event.target.value)} label="Password" type="password" />
                        <Button onClick={() => handleOnCLick()} color='primary'>{type === 'register' ? "register now!" : "log in"}</Button>
                        {type === "login" ? <Button color="primary" onClick={() => { history.push("/register") }}>Don't have a user? Register here!</Button> : <Button color="primary" onClick={() => history.push("/login")}>already have a user? log in here!</Button>}
                    </div>
                </Grid>
            </Grid>
        </Grid> 
    );
}