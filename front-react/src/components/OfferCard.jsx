import React from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';


export default function OfferCard({offer}) {
    const { title, type, description, email, phoneNumber } = offer;
    return (
        <Card>
            <CardContent>
                <Typography variant="h3">{title}</Typography>
                <Typography variant="h5">Type: {type}</Typography>
                <Typography variant="h6">{description}</Typography>
            </CardContent>
            <CardActions>
                <Button onClick={(e) => {
                    window.location = `mailto:${email}`;
                    e.preventDefault();
                }} color="primary">{ email}</Button>
                <Button onClick={(e) => {
                    window.location = `tel:${phoneNumber}`;
                    e.preventDefault();
                }} color="primary">{ phoneNumber}</Button>
            </CardActions>
        </Card>
    );

 }