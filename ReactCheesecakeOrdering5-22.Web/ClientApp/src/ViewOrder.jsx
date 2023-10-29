import dayjs from 'dayjs'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const ViewOrder = () => {

    const { id } = useParams()
    const [order, setOrder] = useState({})

    useEffect(() => {
        const getCurrentOrder = async () => {
            const { data } = await axios.get(`/api/cheesecakeorders/getorder?id=${id}`);
            setOrder(data);
        }
        getCurrentOrder()
    }, [])

    const { name, email, baseFlavor, toppings, specialRequests, quantity, deliveryDate, totalPrice } = order

    return <>
        <div className="container pt-5" >
            <div class="d-flex align-items-center justify-content-center">
                <div class="card text-center shadow p-3 mb-5 bg-body rounded" style={{ backgroundColor: "whitesmoke" }}>
                    <div class="card-body">
                        <h3 class="card-title fw-bold">{ name}</h3>
                        <p class="card-text fs-5">{email}</p>
                        <p class="card-text fs-5">{ baseFlavor}</p>
                        <p class="card-text fs-5">{toppings}</p>
                        <p class="card-text fs-5">{specialRequests}</p>
                        <p class="card-text fs-5">{quantity }</p>
                        <p class="card-text fs-5">{dayjs(deliveryDate).format('MM/DD/YY')}</p>
                        <p class="card-text fs-5">{totalPrice}</p></div>
                    <a href="/vieworders"><button class="btn btn-primary w-100">Back to Orders</button></a>
                </div>
            </div>
        </div>
    </>
}
export default ViewOrder;