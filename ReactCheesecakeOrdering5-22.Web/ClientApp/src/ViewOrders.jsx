import {useState, useEffect } from 'react'
import TableRow from './TableRow';
import axios from 'axios'

const ViewOrders = () => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
            const {data } = await axios.get('api/cheesecakeorders/getall');
            setOrders(data);
        }
        getOrders();
    }, [])

    return (
        <>
            <div className='container pt-2'>
                <table className='table table-bordered table-striped table-hover mt-5'>
                    <thead>
                        <tr>
                            <th>Name/Email</th>
                            <th>Base Flavor</th>
                            <th>Toppings</th>
                            <th>Special Requests</th>
                            <th>Quantity</th>
                            <th>Delivery Date</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(o => <TableRow key={o.id} order={o }/>) }
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default ViewOrders;