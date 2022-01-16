import React from 'react';
import { Card, Row, Col } from "antd";

interface Props {
}

const ParkingSpotsListItem: React.FC<Props> = (props: Props) => {

    return (
       <div className="space-align-block">
            <Card title={"Underground parking"}>
                <Row justify="space-between">
                    <Col>
                        PHOTO
                    </Col>

                    <Col>
                        <Row>
                            ul. Marszałkowska, Warszawa
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
                        <b>Price: 75 PLN</b>
                    </Col>
                </Row>
            </Card>
            <br />
        </div>
    );
}

export default ParkingSpotsListItem;