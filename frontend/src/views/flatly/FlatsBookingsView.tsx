import {Pagination, Typography} from "antd"
import { FilterOutlined } from '@ant-design/icons';

import React, { useContext, useEffect, useState } from 'react';
import "antd/dist/antd.css";
import { Card, Row, Col } from "antd";
import BreadcrumbComponent from '../BreadcrumbComponent';
import FlatsFilter from "./FlatsFilter";
import FlatsListItem from "./FlatsListItem";
import { globalContext } from "../../reducers/GlobalStore";
import { BookingService } from "../../app/services/BookingsService";
import { exampleFlat, exampleBooking } from "../../exampleData/ExampleItem";

const { Title } = Typography;

interface FlatlyProps {
    bookingService : BookingService
}

const FlatsBookingsView: React.FC<FlatlyProps> = (props: FlatlyProps) => {
    const pageSize = 100;
    const { globalState } = useContext(globalContext);
    const [flatsList, setFlatsList] = useState([]);
    const [totalPages, setTotalPages] = useState<number | undefined>(1);
    const [bookingsList, setBookingsList] = useState([]);

    function filterResultsHandler() {
        console.log("Filtered Booked Flats Results");
    }
    function changePageNumberHandler(pageNumber : number) {
        fetchData(pageNumber)
    }

    function fetchData(page: number) {
        props.bookingService.getFlatlyBookings(
            globalState.token,
            page,
            pageSize
        ).then((response) => {
            let bookings : any = response.items?.map((booking : any) => ({
                item: booking.items?.map((flat : any) => ({
                    id: flat.id,
                    name: flat.name,
                    rooms: flat.rooms,
                    numberOfGuests: flat.numberOfGuests,
                    area: flat.area,
                    description: flat.description,
                    address: flat.address,
                    facilities: flat.facilities,
                    images: flat.images
                  })),
                startDate: booking.startDate,
                active: booking.active,
                bookingId: booking.bookingId,
                user: booking.user
            }))
            let flats = bookings.map((booking : any) => booking.item)

            setBookingsList(bookings);
            setFlatsList(flats);
            setTotalPages(response.totalPages === undefined ? 1 : response.totalPages);
        }).catch((error) => console.log(error));
    }



    useEffect(() => {
        fetchData(1);
    }, []);

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
                        { flatsList.map((flat, i) => <FlatsListItem flatItem={flat === undefined ? exampleFlat : flat}  booking={flat === undefined ? exampleBooking : bookingsList[i]}/>) }
                    </div>    
                    <br />
                    <Pagination onChange={changePageNumberHandler} pageSize={pageSize} total={totalPages} />                   
                </Col>
            </Row>
        </div>
    );
}

export default FlatsBookingsView;