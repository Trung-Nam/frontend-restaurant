import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const CheckoutForm = ({ cart, price }) => {
    const { user } = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const [cartError, setCartError] = useState();
    const [clientSecret, setClientSecret] = useState("");
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();


    useEffect(() => {
        axiosSecure.post("/create-payment-intent", { price: Math.floor(price * 100) })
            .then((response) => {
                // console.log(response.data.clientSecret);
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
                        name: user?.name || 'anonymous',
                        email: user?.email || 'unknown'
                    },
                },
            },
        );

        if (confirmError) {
            console.log(confirmError);
        }
        // console.log(paymentIntent);
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
            };

            // console.log(paymentInfo);
            // send info to BE

            axiosSecure.post('/payments', paymentInfo)
                .then(res => {
                    // console.log(res.data);
                    toast.success('Payment successfully!');
                    navigate('/order')

                })
        }

    };

    return (
        <div className='section-container px-8 flex flex-col sm:flex-row justify-start items-center gap-8'>
            <div className="md:w-2/3 w-full space-y-3">
                <div className="my-24">
                    <h2 className="font-bold mb-6 text-2xl text-center">Order Summary</h2>
                    <table className="min-w-full border-collapse border border-gray-200">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">Details</th>
                                <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">Information</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">Customer Name</td>
                                <td className="border border-gray-300 px-4 py-2">{user?.name}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">Customer Email</td>
                                <td className="border border-gray-300 px-4 py-2">{user?.email}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">Customer Address</td>
                                <td className="border border-gray-300 px-4 py-2"> {user?.address?.street || 'No Address Provided'}, {user?.address?.city || ''}, {user?.address?.country || ''}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">Total Items</td>
                                <td className="border border-gray-300 px-4 py-2">{cart?.length}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">Total Price</td>
                                <td className="border border-gray-300 px-4 py-2">{price.toFixed(2) || 0}</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>

            <div className="md:w-1/3 w-full space-y-5 card shrink-0 max-w-sm shadow-2xl bg-base-100 px-4 py-10 mt-12">
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