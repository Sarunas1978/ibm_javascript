import React from 'react';
import {Card, Col} from 'react-bootstrap';
import './singleCard.css';
// import {useEffect} from 'react';
import fetchDataToServer from  "./fetchDataToServer.js";

export function SingleCard (props){
    let {title, image, description, publishedAt, url} = props.item;

    // useEffect(()=>{
    //     fetchDataToServer("cardClicked",props.item)
    // },[props.item])

    function handleClick(){
        window.open(url)
        fetchDataToServer("cardClicked", props.item)
    }

    return(
        <Col xs={12} md={6} lg={4}>
            <Card onClick={handleClick}>
                {/* ()=> window.open(url)}> */}
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Header className="d-flex justify-content-end pr-0">{publishedAt}</Card.Header>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text className="descriptionStyle" >{description}</Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
}