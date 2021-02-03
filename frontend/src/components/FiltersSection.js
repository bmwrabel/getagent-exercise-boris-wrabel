import React, { useState } from 'react';
import { Button, Card, Form, Col } from 'react-bootstrap';

function FiltersSection(props) 
{
    const [filterData, setFilterData] = useState({
        propertyId: "",
        postcode: "",
        street: "",
    });
    
    const { propertyId, postcode, street } = filterData;

    const onChange = (event) => setFilterData({ ...filterData, [event.target.name]: event.target.value  });

    return (
        <Card style={{marginTop: '10px'}}>
            <Card.Header as="h5">Filters</Card.Header>
            <Card.Body>
                <Form>
                    <Form.Row >
                        <Col>
                            <Form.Label>Property ID</Form.Label>
                            <Form.Control 
                            name="propertyId"
                            type="text" 
                            placeholder="Enter property ID" 
                            value={propertyId}
                            onChange={(event) => onChange(event)}
                            />
                            <Form.Text id="passwordHelpBlock" muted>
                                e.g. 1234
                            </Form.Text>
                        </Col>
                        <Col>
                            <Form.Label>Postcode</Form.Label>
                            <Form.Control 
                            name="postcode"
                            type="text" 
                            placeholder="Enter postcode"
                            value={postcode}
                            onChange={(event) => onChange(event)}
                            aria-describedby="passwordHelpBlock"
                            />
                            <Form.Text id="passwordHelpBlock" muted>
                                e.g. E2 0PL
                            </Form.Text>
                        </Col>
                        <Col>
                            <Form.Label>Street</Form.Label>
                            <Form.Control 
                            name="street"
                            type="text"
                            placeholder="Enter street name" 
                            value={street}
                            onChange={(event) => onChange(event)}
                            />
                            <Form.Text id="passwordHelpBlock" muted>
                                e.g. Acacia Road
                            </Form.Text>
                        </Col>
                    </Form.Row>
                </Form> 
            </Card.Body>
            <Card.Footer>
                <Button className="float-right" onClick={() => props.onFormSubmit(filterData)} variant="primary">Apply Filters</Button>
            </Card.Footer>
        </Card>
    );
}

export default FiltersSection;