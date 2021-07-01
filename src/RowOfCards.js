
import Row from 'react-bootstrap/Row';
import {dataReceived} from "./App.js";
import {SingleCard} from "./SingleCard.js";


export function RowOfCards (){
    let number=0, id=0;
    return(
       <Row>
           <dataReceived.Consumer>
                {value => value.map(image =>
                <SingleCard 
                    key={number++}
                    id={id++}
                    item={image}
                />
                )}
           </dataReceived.Consumer>
       </Row>
    )
}