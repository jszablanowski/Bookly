import {Pagination, Typography} from "antd"
import { FilterOutlined } from '@ant-design/icons';

import React, { useContext, useEffect, useState } from 'react';
import "antd/dist/antd.css";
import { Card, Row, Col } from "antd";
import BreadcrumbComponent from '../BreadcrumbComponent';
import ParkingSpotsFilter from "./ParkingSpotsFilter";
import ParkingSpotsListItem from "./ParkingSpotsListItem";
import { BookingService } from "../../app/services/BookingsService";
import { globalContext } from "../../reducers/GlobalStore";
import { exampleParking, exampleBooking } from "../../exampleData/ExampleItem";


const { Title } = Typography;

interface ParklyProps {
    bookingService : BookingService
}

const ParkingSpotsBookingsView: React.FC<ParklyProps> = (props: ParklyProps) => {
    const pageSize = 100;
    const [parkingSpots, setParkingSpots] = useState([]);
    const [bookingsList, setBookingsList] = useState([]);
    const [totalPages, setTotalPages] = useState<number | undefined>(1);
    const { globalState } = useContext(globalContext);

    function filterResultsHandler() {
        console.log("Filtered Booked Parking Slots Results");
    }
    function changePageNumberHandler(pageNumber : number) {
        fetchData(pageNumber)
    }

    function fetchData(page: number) {
        props.bookingService.getParklyBookings(
            globalState.token,
            page,
            pageSize
        ).then((response) => {
            let bookings : any = response.items?.map((booking : any) => ({
                item: booking.items?.map((parking : any) => ({
                    parkingName: parking.parkingName,
                    spotNumber: parking.spotNumber,
                    city: parking.city,
                    street: parking.street,
                    streetTag: parking.streetTag,
                    pricePerHour: parking.pricePerHour,
                    imageLink: parking.imageLink,
                  })),
                startDate: booking.startDate,
                active: booking.active,
                bookingId: booking.bookingId,
                user: booking.user
            }))
            let parkings = bookings.map((booking : any) => booking.item)

            setBookingsList(bookings);
            setParkingSpots(parkings);
            setTotalPages(response.totalPages === undefined ? 1 : response.totalPages);
        }).catch((error) => console.log(error));
    }

    useEffect(() => {
        fetchData(1);
    }, []);

    return (
        <div>
            <BreadcrumbComponent item="Parking spots" />

            <Row>
                <Col flex="400px">
                    <Card>
                        <Title level={2}><FilterOutlined /> Filter results </Title>
                        <ParkingSpotsFilter filterResultsHandler={(e : any) => filterResultsHandler()} />
                    </Card>
                </Col>

                <Col flex="20px" />

                <Col flex="auto">
                    <div className="site-layout-content">
                    <Title>Booked parking spots</Title>
                        { parkingSpots.map((parking, i) => <ParkingSpotsListItem parkingItem={parking === undefined ? exampleParking : parking}  booking={parking === undefined ? exampleBooking : bookingsList[i]}/>) }
                    </div> 
                    <br />
                    <Pagination onChange={changePageNumberHandler} pageSize={pageSize} total={totalPages} />                        
                </Col>
            </Row>
        </div>
    );
}

export default ParkingSpotsBookingsView;