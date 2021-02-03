import React from 'react';
import Result from './Result';
import { Card } from 'react-bootstrap'

function ResultsSection(props) 
{
  let cardSubtitle = <Card.Subtitle className="mb-2 text-muted"> 
    Results: {props.propertyData ? props.propertyData.length : null}.
    {props.propertyData && props.propertyData.length !== 0 ? ' Click on an entry to see its price history.' : null }
  </Card.Subtitle>;

  return (
    <Card style={{marginTop: '10px'}}> 
      <Card.Header>
        <Card.Title>
          Search Results
        </Card.Title>
        {props.propertyData ? cardSubtitle : null}
      </Card.Header>
        {Array.isArray(props.propertyData) && props.propertyData.length > 0 ? props.propertyData.map(property => {
          return (
            <Result key={property.id} property={property}/>
          );
        })
        : <div>No results</div>}
    </Card>
  );
}

export default ResultsSection;