import React from 'react';
import {Card, Col} from 'react-bootstrap';
import './singleCard.css';

export function SingleCard (props){
    let {title, image, description, publishedAt, url} = props.item;

    return(
        <Col xs={12} md={6} lg={4}>
            <Card onClick={()=> window.open(url)}>
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