import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from 'react-router-dom';
const CheckoutForm = ({ cart, price }) => {
    const { user } = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const [cartError, setCartError] = useState();
    const [clientSecret, setClientSecret] = useState("");
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();


    useEffect(() => {
        if (typeof price !== "number" || price < 1) {
            console.log("Price is not a number or less than 1");

            return;
        }

        axiosSecure.post("/create-payment-intent", { price })
            .then((response) => {
                console.log(response.data.clientSecret);
                setClientSecret(response.data.clientSecret);
            })
    }, [price, axiosSecure])



    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            // console.log('[error]', error);
            setCartError(error.message);
        } else {
            setCartError('Payment Successfully!!!')
            // console.log('[PaymentMethod]', paymentMethod);
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || 'anonymous',
                        email: user?.email || 'unknown'
                    },
                },
            },
        );

        if (confirmError) {
            console.log(confirmError);
        }
        console.log(paymentIntent);
        if (paymentIntent.status === 'succeeded') {
            setCartError(`Your transactionId is ${paymentIntent.id}`);

            const paymentInfo = {
                email: user.email,
                transactionId: paymentIntent.id,
                price,
                quantity: cart.length,
                status: "Order pending",
                itemName: cart.map(item => item.name),
                cartItems: cart.map(item => item._id),
                menuItems: cart.map(item => item.menuItemId),
            }

            // console.log(paymentInfo);
            // send info to BE

            axiosSecure.post('/payments', paymentInfo)
            .then(res => {
                // console.log(res.data);
                alert('Payment successfully!')
                navigate('/order')

            })
        }

    };

    return (
        <div className='section-container px-8 flex flex-col sm:flex-row justify-start items-center gap-8'>
            <div className="md:w-1/2 w-full space-y-3">
                <h4 className="text-lg font-semibold">Order Summary</h4>
                <p>Number of items: {cart?.length}</p>
                <p>Total Price: {price}</p>
            </div>

            <div className="md:w-1/2 w-full space-y-5 card shrink-0 max-w-sm shadow-2xl bg-base-100 px-4 py-8">
                <h4 className="text-lg font-semibold">Process your payment</h4>
                <h5>Credit/Debit Card</h5>

                {/* stripe form */}
                <form onSubmit={handleSubmit}>
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                    <button type="submit" disabled={!stripe} className="btn btn-sm btn-primary w-full mt-8 ">
                        Pay
                    </button>

                    {
                        cartError ? <p className="text-soft-red italic text-sm mt-5">{cartError}</p> : ""
                    }
                </form>
            </div>

        </div>
    )
}

export default CheckoutForm