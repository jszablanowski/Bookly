import React, { useState } from 'react';
import { Card, Row, Col, Image } from "antd";
import { FlatItem } from '../../classes/FlatItem';
import { BookingItem } from '../../classes/BookingItem';

interface Props {
    flatItem: FlatItem,
    booking: BookingItem
}

const FlatsListItem: React.FC<Props> = (props: Props) => {
    const url = props.flatItem.images?.map((image) => image.path);

    const getImage = () => {
        if(url != undefined) 
            return <Image width={200} src={url.toString()} />
        else
            return "PHOTO"
    }

    return (
       <div className="space-align-block">
            <Card title={"Flat ABC"}>
                <Row justify="space-between">
                    <Col>
                        { getImage() }
                    </Col>

                    <Col>
                        <Row>
                            {props.flatItem.address?.street} {props.flatItem.address?.houseNumber}  {props.flatItem.address?.localNumber}, {props.flatItem.address?.city}
                        </Row>
                        <Row>
                            {props.flatItem.rooms} Rooms
                        </Row>
                        <Row>
                            {props.flatItem.numberOfGuests} Guests
                        </Row>
                        <Row>
                            {props.flatItem.area} Square meters
                        </Row>
                    </Col>

                    <Col>
                        <Row>
                            User: {props.booking.user.email}
                        </Row>
                        <Row>
                            UserId: {props.booking.user.userid}
                        </Row>
                        <Row>
                            Start date: {props.booking.startDate}
                        </Row>
                        <Row>
                            {props.booking.active && "active"}
                            {!props.booking.active && "not active"}
                        </Row>
                    </Col>
                </Row>
            </Card>
            <br />
        </div>
    );
}

export default FlatsListItem;