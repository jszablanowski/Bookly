import {Pagination, Typography} from "antd"
import { FilterOutlined } from '@ant-design/icons';
import CarsListItem from './CarsListItem'
import { CARS } from '../../exampleData/Car';

import React, { useContext, useEffect, useState } from 'react';
import "antd/dist/antd.css";
import { Card, Row, Col } from "antd";
import BreadcrumbComponent from '../BreadcrumbComponent';
import CarsFilter from "./CarsFilter";
import { globalContext } from "../../reducers/GlobalStore";
import { BookingService } from "../../app/services/BookingsService";
import { exampleCar, exampleBooking } from "../../exampleData/ExampleItem";
import { ActivityIndicatorBase } from "react-native";

const { Title } = Typography;

interface CarlyProps {
    bookingService : BookingService,
}

const CarsBookingsView: React.FC<CarlyProps> = (props: CarlyProps) => {
    const pageSize = 100;
    const [bookingsList, setBookingsList] = useState([]);
    const [carList, setCarList] = useState([]);
    const [totalPages, setTotalPages] = useState<number | undefined>(1);
    const { globalState } = useContext(globalContext);

    function filterResultsHandler() {
        console.log("Filtered Booked Cars Results");
        return carList;
    }
    function changePageNumberHandler(pageNumber : number) {
        fetchData(pageNumber)
    }

    function fetchData(page: number) {
        props.bookingService.getCarlyBookings(
            globalState.token,
            page,
            pageSize
        ).then((response) => {
            let bookings : any = response.items?.map((booking : any) => ({
                item: booking.items?.map((car : any) => ({
                    id: car.id,
                    price: car.price,
                    brand: car.brand,
                    model: car.model,
                    location: car.location,
                    engine: car.engine,
                    year: car.year
                  })),
                startDate: booking.startDate,
                active: booking.active,
                bookingId: booking.bookingId,
                user: booking.user
            }))
            let cars = bookings.map((booking : any) => booking.item)

            setBookingsList(bookings);
            setTotalPages(response.totalPages === undefined ? 1 : response.totalPages);
            setCarList(cars);
        }).catch((error) => console.log(error));
    }

    useEffect(() => {
        fetchData(1);
    }, []);

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
                        { carList.map((car, i) => (<CarsListItem car={car === undefined ? exampleCar : car} booking={(car === undefined || bookingsList[i] === undefined) ? exampleBooking : bookingsList[i]}/>)) }
                    </div> 
                    <br />
                    <Pagination onChange={changePageNumberHandler} pageSize={pageSize} total={totalPages} />              
                </Col>
            </Row>
        </div>
    );
}

export default CarsBookingsView;