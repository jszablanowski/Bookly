import { Component } from 'react';
import { AppLayout } from './components/AppLayout';
import { AppRouter } from './components/AppRouter'
import './custom.css'

export default class App extends Component {
    static displayName = App.name;
  
    render () {
        return (
            <AppLayout>
                <AppRouter />
            </AppLayout>
        );
    }
}
