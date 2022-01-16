import {Typography} from "antd"
import { FilterOutlined } from '@ant-design/icons';
import CarsListItem from './CarsListItem'
import { CARS } from '../../exampleData/Car';

import React, { useState } from 'react';
import "antd/dist/antd.css";
import { Card, Row, Col } from "antd";
import BreadcrumbComponent from '../BreadcrumbComponent';
import CarsFilter from "./CarsFilter";

const { Title } = Typography;


const CarsBookingsView: React.FC = () => {
    const [carList, setCarList] = useState(CARS);

    function filterResultsHandler() {
        console.log("Filtered Booked Cars Results");
        return carList;
    }

    return (
        <div>
            <BreadcrumbComponent item="Cars" />

            <Row>
                <Col flex="400px">
                    <Card>
                        <Title level={2}><FilterOutlined /> Filter results</Title>
                        <CarsFilter filterResultsHandler={(e : any) => filterResultsHandler()} />
                    </Card>
                </Col>

                <Col flex="20px" />

                <Col flex="auto">
                    <div className="site-layout-content">
                    <Title>Booked cars</Title>
                        { carList.map((car) => (<CarsListItem car={car}/>)) }
                    </div>               
                </Col>
            </Row>
        </div>
    );
}

export default CarsBookingsView;