import React from 'react';
import Container from 'react-bootstrap/Container';
import {RowOfCards} from './RowOfCards.js';

class CardShow extends React.Component{
    render(){
        return(
         <Container>
            <RowOfCards/>
        </Container>
        )
    }
}

export default CardShow