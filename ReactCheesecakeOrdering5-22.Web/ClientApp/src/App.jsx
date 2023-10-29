import React from 'react';
import Layout from './Layout'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes } from 'react-router-dom'
import './App.css';
import Home from './Home'
import MakeOrder from './MakeOrder'
import ViewOrders from './ViewOrders'
import OrderConfirmation from './OrderConfirmation';
import ViewOrder from './ViewOrder'

class App extends React.Component {
    render() {
        return (
            <Layout>
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/makeorder' element={<MakeOrder />} />
                    <Route exact path='/orderconfirmation' element={<OrderConfirmation/> }/>
                    <Route exact path='/vieworders' element={<ViewOrders />} />
                    <Route exact path='vieworder/:id' element={<ViewOrder/> }/>
                </Routes>
            </Layout>
            )}
}

export default App;