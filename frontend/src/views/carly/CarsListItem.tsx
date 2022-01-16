import React from 'react';
import { Car } from '../../exampleData/Car';
import { Card, Row, Col, Image } from "antd";

interface Props {
    car : Car
}

const CarsListItem: React.FC<Props> = (props: Props) => {

    return (
       <div className="space-align-block">
            <Card title={props.car.name}>
                <Row justify="space-between">
                    <Col>
                        <Image width={200} src={props.car.image} />
                    </Col>

                    <Col>
                        <Row>
                            ul. Marszałkowska, Warszawa
                        </Row>
                        <Row>
                            {props.car.doors} doors
                        </Row>
                        <Row>
                            {props.car.seats} seats
                        </Row>
                        <Row>
                            Manual transmission
                        </Row>
                        <Row>
                            {props.car.AC && 'Air conditioning'}
                        </Row>
                    </Col>

                    <Col>
                        <Row>
                            User: xyz
                        </Row>
                        <Row>
                            UserIs: 1234
                        </Row>
                    </Col>

                    <Col>
                        <b>Price: {props.car.pricePerDay} PLN</b>
                    </Col>
                </Row>
            </Card>
            <br />
        </div>
    );
}

export default CarsListItem;