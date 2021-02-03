import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import FiltersSection from './FiltersSection';
import ResultsSection from './ResultsSection'

function TransactionSearchInterface()
{
    const [propertyData, setPropertyData] = useState(null);
    
    const fetchData = async (data) => {
        try {
            const { propertyId, postcode, street } = data;
            const url = `/lrPropertyData?${new URLSearchParams({  propertyId, postcode, street  }).toString()}`;
            const res = await fetch(url, { mode: 'no-cors' }); 
            const json = await res.json();
            if (json.success) {
                setPropertyData(json.propertyData);
            }
        } catch(e) {
            console.error(e);
        }
    } 

    const propertyDataHandler = (filterData) => {
        fetchData(filterData);
    }

    return (
    <React.Fragment>
        <Container>
            <h1>Transaction Search Interface</h1>
            <FiltersSection onFormSubmit={propertyDataHandler}/>
            <ResultsSection propertyData={propertyData}/>  
        </Container>
    </React.Fragment>
  );
}

export default TransactionSearchInterface;