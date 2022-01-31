import { Component, useContext } from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import Home from './Home';
import Users from '../views/users/Users';
import FlatsBookingsView from '../views/flatly/FlatsBookingsView'
import CarsBookingsView from '../views/carly/CarsBookingsView';
import ParkingSpotsBookingsView from '../views/parkly/ParkingSpotsBookingsView';
import NotFound from './NotFound';
import { globalContext } from '../reducers/GlobalStore';
import Login from '../components/Login';
import { UserService } from '../app/services/UserService';
import { BookingService } from '../app/services/BookingsService';


export const AppRouter: React.FC = () => {
  const { globalState } = useContext(globalContext);

  return (
      <Routes>
            { !globalState.isUserAuthenticated && <Route path='*' element={<Login userService={new UserService()}/>}/> }
            <Route path='/login' element={<Login userService={new UserService()}/>}/>
            <Route path='/home' element={<Home />} />
            <Route path='/users' element={<Users userService={new UserService()}/>}/>
            <Route path='bookings'>
              <Route path='flats' element={<FlatsBookingsView bookingService={new BookingService()}/>}/>
              <Route path='cars' element={<CarsBookingsView  bookingService={new BookingService()}/>}/>
              <Route path='parking_spots' element={<ParkingSpotsBookingsView bookingService={new BookingService()}/>}/>
            </Route>
            <Route path='*' element={<NotFound />}/>
      </Routes>
  );
}
