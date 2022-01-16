import {Typography} from "antd"
import { FilterOutlined } from '@ant-design/icons';

import React from 'react';
import "antd/dist/antd.css";
import { Card, Row, Col } from "antd";
import BreadcrumbComponent from '../BreadcrumbComponent';
import ParkingSpotsFilter from "./ParkingSpotsFilter";
import ParkingSpotsListItem from "./ParkingSpotsListItem";

const { Title } = Typography;

interface FlatlyProps {
}

const ParkingSpotsBookingsView: React.FC<FlatlyProps> = (props: FlatlyProps) => {

    function filterResultsHandler() {
        console.log("Filtered Booked Parking Slots Results");
    }

    return (
        <div>
            <BreadcrumbComponent item="Parking spots" />

            <Row>
                <Col flex="400px">
                    <Card>
                        <Title level={2}><FilterOutlined /> Filter results</Title>
                        <ParkingSpotsFilter filterResultsHandler={(e : any) => filterResultsHandler()} />
                    </Card>
                </Col>

                <Col flex="20px" />

                <Col flex="auto">
                    <div className="site-layout-content">
                    <Title>Booked parking spots</Title>
                        { (new Array(7)).fill(0).map((_, columnIndex : number) => {
                            return <ParkingSpotsListItem />
                        }) }
                    </div>               
                </Col>
            </Row>
        </div>
    );
}

export default ParkingSpotsBookingsView;