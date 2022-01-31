import React from 'react';
import { Card, Row, Col, Image } from "antd";
import { CarItem } from '../../classes/CarItem';
import { BookingItem } from '../../classes/BookingItem';

interface Props {
    car : CarItem
    booking: BookingItem
}

const CarsListItem: React.FC<Props> = (props: Props) => {

    return (
       <div className="space-align-block">
            <Card title={props.car.brand + "  " + props.car.model}>
                <Row justify="space-between">
                    <Col>
                        <Row>
                            {props.car.location}
                        </Row>
                        <Row>
                            Engine: {props.car.engine}
                        </Row>
                        <Row>
                            Year: {props.car.year}
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
                        <b>Price: {props.car.price} PLN</b>
                    </Col>
                </Row>
            </Card>
            <br />
        </div>
    );
}

export default CarsListItem;