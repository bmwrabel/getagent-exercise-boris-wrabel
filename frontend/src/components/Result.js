import React from 'react';
import { Container, Accordion, Card, Button } from 'react-bootstrap';
import Transaction from './Transaction';

function Result(props) 
{
    // User experience could be improved by adding a See Property Price details button 
    // The property details which are inside the Accordion.Toggle could be encapsulated into their own component 
    const property = props.property;
    return (
        <Container style={{marginTop: '10px', marginBottom: '10px'}}>
            <Accordion>
            <Card>
                <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    Property ID: {property.id}, Address: {property.saon ? property.saon : null} {property.paon ? property.paon : null} {property.street}, Postcode: {property.outcode} {property.incode}
                </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                <Card.Body>
                    <Card.Title>Price history</Card.Title>
                    {property.lrTransactions.map(transaction => {
                    return (
                       <Transaction key={transaction.id} transaction={transaction} />
                    );
                    })}
                </Card.Body>
                </Accordion.Collapse>
            </Card>
            </Accordion>
        </Container>
    );   
}

export default Result;