import { useState } from 'react'
import dayjs from 'dayjs'
import axios from 'axios'
import {useNavigate } from 'react-router-dom'

const MakeOrder = () => {

    const baseFlavors = ['choose...', 'classic', 'chocolate', 'red velvet', 'brownie']

    const toppings = [
        'Chocolate Chips',
        'Caramel Drizzle',
        'Whipped Cream',
        'Pecans',
        'Sprinkles',
        'Chocolate Fudge',
        'Graham Cracker Crumble',
        'Cookie Dough'
    ]

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [selectedBaseFlavor, setSelectedBaseFlavor] = useState(baseFlavors[0]);
    const [selectedToppings, setSelectedToppings] = useState([]);
    const [specialRequests, setSpecialRequests] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [deliveryDate, setDeliveryDate] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);

    //let total = 0;

    const navigate = useNavigate();

    const onNameChange = e => {
        setName(e.target.value)
    }
    const onEmailChange = e => {
        setEmail(e.target.value)
    }
    const onSelectedBaseFlavorChange = (e) => {
        setSelectedBaseFlavor(e.target.value)
    }

    const onSelectedToppingsChange = t => {
        if (selectedToppings.includes(t)) {
            setSelectedToppings(selectedToppings.filter(topping => topping !== t))
        }
        else {
            setSelectedToppings([...selectedToppings, t])
        }
    }
    const onSpecialRequestsChange = (e) => {
        setSpecialRequests(e.target.value)
    }
    const onQuantityChange = (e) => {
        setQuantity(parseInt(e.target.value))
    }
    const onDeliveryDateChange = (e) => {
        setDeliveryDate(e.target.value)
    }

    const calculateTotal = () => {
        if (selectedBaseFlavor === baseFlavors[0]) {
            return 0;
        }
        else {
            return ((49.99 + (selectedToppings.length * 3.95)) * quantity).toFixed(2);
        }
    }

    const canSubmit = !!name && !!email && selectedBaseFlavor !== baseFlavors[0] && quantity > 0 && deliveryDate !== '';
    const submitOrder = async () => {
        //console.log(name, email, selectedBaseFlavor, selectedToppings, specialRequests, quantity, deliveryDate, calculateTotal())
        await axios.post('/api/cheesecakeorders/submitorder', {
            name,
            email,
            baseFlavor: selectedBaseFlavor,
            toppings: selectedToppings.join(', '),
            specialRequests,
            quantity,
            deliveryDate,
            totalPrice: calculateTotal()
        })
        navigate('/orderconfirmation');
    }

    return (
        <div className="container" style={{ backgroundColor: 'whitesmoke', marginTop: 80 }}>
            <h1 className="text-center my-4">Cheesecake Factory Order Form</h1>
            <div className="row">
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" value={name} onChange={onNameChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" value={email} onChange={onEmailChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Cheesecake Base Flavor ($49.99)</label>
                        <select className="form-select" onChange={onSelectedBaseFlavorChange}>
                            {baseFlavors.map(f => <option key={f}>{f}</option>)}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Toppings (each topping adds an additional $3.95)</label>
                        {toppings.map(t => <div key={t } className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                onChange={() => onSelectedToppingsChange(t)}
                                checked={selectedToppings.includes(t) }/>
                            <label className="form-check-label">{t}</label>
                        </div>)}
                        
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Special Requests</label>
                        <textarea className="form-control" rows="3" value={specialRequests} onChange={onSpecialRequestsChange}></textarea>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Quantity</label>
                        <input type="number" className="form-control" min="1" value={quantity} onChange={onQuantityChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Delivery Date</label>
                        <input type="date" className="form-control" value={ deliveryDate} onChange={onDeliveryDateChange }/>
                    </div>
                    <button type="submit" disabled={!canSubmit} className="btn btn-primary" onClick={submitOrder }>Submit Order</button>
                </div>
                <div className="col-md-6 position-sticky">
                    <h2 className="mb-4">Live Preview</h2>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Your Custom Cheesecake</h5>
                            <p className="card-text">Base: {selectedBaseFlavor}</p>
                            <p className="card-text">Toppings: {selectedToppings.join(', ')} </p>
                            <p className="card-text">Special Requests: {specialRequests}</p>
                            <p className="card-text">Quantity: {quantity}</p>
                            <p className="card-text">Delivery Date: {!!deliveryDate && dayjs(deliveryDate).format('MM/DD/YY')}</p>
                            <p className="card-text fw-bold">Total: ${calculateTotal()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MakeOrder;