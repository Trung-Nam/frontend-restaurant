import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import useCart from '../../hooks/useCart';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
const Payment = () => {
  const [cart] = useCart();

  const cartTotal = cart.reduce((sum, cart) => sum + cart.price, 0);

  const totalPrice = parseFloat(cartTotal.toFixed(2));
  
  // console.log(totalPrice);
  
  return (
    <div className="section-container py-28">
      <Elements stripe={stripePromise}>
        <CheckoutForm cart={cart} price={totalPrice}/>
      </Elements>
    </div>
  )
}

export default Payment