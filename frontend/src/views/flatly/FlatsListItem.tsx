import React from 'react';
import { Card, Row, Col } from "antd";

interface Props {
}

const FlatsListItem: React.FC<Props> = (props: Props) => {

    return (
       <div className="space-align-block">
            <Card title={"Flat ABC"}>
                <Row justify="space-between">
                    <Col>
                        PHOTO
                    </Col>

                    <Col>
                        <Row>
                            ul. Marszałkowska, Warszawa
                        </Row>
                        <Row>
                            2 Rooms
                        </Row>
                        <Row>
                            3 Beds
                        </Row>
                        <Row>
                            Air conditioning
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
                        <b>Price: 420 PLN</b>
                    </Col>
                </Row>
            </Card>
            <br />
        </div>
    );
}

export default FlatsListItem;