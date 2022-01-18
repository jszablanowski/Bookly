import { Component } from 'react';
import { Route, Routes } from "react-router-dom";
import Home from './Home';
import { Users } from '../views/users/Users';
import FlatsBookingsView from '../views/flatly/FlatsBookingsView'
import CarsBookingsView from '../views/carly/CarsBookingsView';
import ParkingSpotsBookingsView from '../views/parkly/ParkingSpotsBookingsView';
import NotFound from './NotFound';

export class AppRouter extends Component {
  render () {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/users' element={<Users />}/>
            <Route path='bookings'>
              <Route path='flats' element={<FlatsBookingsView />}/>
              <Route path='cars' element={<CarsBookingsView />}/>
              <Route path='parking_spots' element={<ParkingSpotsBookingsView />}/>
            </Route>
            <Route path='*' element={<NotFound />}/>
        </Routes>
    );
  }
}
