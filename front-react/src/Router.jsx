import React, {useEffect, useState} from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import axios from 'axios'



import Register from './pages/register';
import Login from './pages/login';
import Offers from './pages/offers';
import { useSetState } from './Provider';
import {PrivateRoute, PublicRoute} from './RouteTypes'


export default function Router () {

    const setState = useSetState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            await axios.get(
                "http://localhost:5000/authenticate",
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    },
                }
            )
                .then(res =>  setState(() => ({auth: true})))
                .catch(err => setState(() => ({auth: false})))
                .finally(() => setIsLoading(false));
        }
        verifyUser(); 
    }, []);

    return isLoading? <p>loading...</p> : (
        <BrowserRouter>
        <Switch>
            <PublicRoute path={["/register"]} component={()=> <Register />} />
            <PrivateRoute path="/offers" component={()=> <Offers />} />
            <PublicRoute path={["/","/login"]} component={()=> <Login />} />
           
        </Switch>
        </BrowserRouter>
    );
}