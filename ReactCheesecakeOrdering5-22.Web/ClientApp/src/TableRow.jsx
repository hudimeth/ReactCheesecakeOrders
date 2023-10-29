import React from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

const TableRow = ({ order }) => {

    const { id, name, email, baseFlavor, toppings, specialRequests, quantity, deliveryDate, totalPrice } = order

    return (
        <tr>
            <td><Link to={`/vieworder/${id}`}>{name}- {email}</Link></td>
            <td>{baseFlavor}</td>
            <td>{toppings}</td>
            <td>{specialRequests}</td>
            <td>{quantity}</td>
            <td>{dayjs(deliveryDate).format('MM/DD/YY')}</td>
            <td>{totalPrice}</td>
        </tr>
    )
}
export default TableRow;