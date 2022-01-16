import {Typography} from "antd"
import { FilterOutlined } from '@ant-design/icons';

import React from 'react';
import "antd/dist/antd.css";
import { Card, Row, Col } from "antd";
import BreadcrumbComponent from '../BreadcrumbComponent';
import FlatsFilter from "./FlatsFilter";
import FlatsListItem from "./FlatsListItem";

const { Title } = Typography;

interface FlatlyProps {
}

const FlatsBookingsView: React.FC<FlatlyProps> = (props: FlatlyProps) => {

    function filterResultsHandler() {
        console.log("Filtered Booked Flats Results");
    }

    return (
        <div>
            <BreadcrumbComponent item="Flats" />

            <Row>
                <Col flex="400px">
                    <Card>
                        <Title level={2}><FilterOutlined /> Filter results</Title>
                        <FlatsFilter filterResultsHandler={(e : any) => filterResultsHandler()} />
                    </Card>
                </Col>

                <Col flex="20px" />

                <Col flex="auto">
                    <div className="site-layout-content">
                    <Title>Booked flats</Title>
                        { (new Array(4)).fill(0).map((_, columnIndex : number) => {
                            return <FlatsListItem />
                        }) }
                    </div>               
                </Col>
            </Row>
        </div>
    );
}

export default FlatsBookingsView;