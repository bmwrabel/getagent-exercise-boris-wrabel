import React from 'react';
import { Container } from 'react-bootstrap'

function Transaction(props) 
{
    return (
        <div>Date: {props.transaction.date}, Price: {props.transaction.price}</div>
    );
} 

export default Transaction;