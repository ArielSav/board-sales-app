import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import {Button} from '@material-ui/core';

import Register from './pages/register';


export default function Router () {


    return(
        <>
        <BrowserRouter>
        <Switch>
        <Route path={["/register"]} component={()=> <Register />} />
            <Route path="/offers" component={()=> {
                return (
                    <>
                    <Button><p>im in offers page</p></Button>
                    </>
                    );
            }} />
            <Route path={["/","/signin"]} component={()=> {
                return (
                <>
                <Button><p>im in sign in page</p></Button>
                </>
                );
            }} />
           
        </Switch>
        </BrowserRouter>
        </>
    );
}