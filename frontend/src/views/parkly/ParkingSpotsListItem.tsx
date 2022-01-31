import React, { useState } from 'react';
import { Card, Row, Col, Image } from "antd";
import { ParkingItem } from '../../classes/ParkingItem';
import { BookingItem } from '../../classes/BookingItem';

interface ParkingProps {
    parkingItem: ParkingItem,
    booking: BookingItem
}

const ParkingSpotsListItem: React.FC<ParkingProps> = (props: ParkingProps) => {
    return (
       <div className="space-align-block">
            <Card title={props.parkingItem.parkingName}>
                <Row justify="space-between">
                    <Col>
                        <Image width={200} src={props.parkingItem.imageLink} />
                    </Col>

                    <Col>
                        <Row>
                            {props.parkingItem.street} {props.parkingItem.streetTag}, {props.parkingItem.city}
                        </Row>
                        <Row>
                            {props.parkingItem.spotNumber} spots available
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

                    <Col>
                        <b>Price: {props.parkingItem.pricePerHour} PLN/hour</b>
                    </Col>
                </Row>
            </Card>
            <br />
        </div>
    );
}

export default ParkingSpotsListItem;