import React, { useState } from 'react';
import axios from 'axios';
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { logEvent, Result, ErrorResult } from './utilCheckout';
import '../Styles/Checkout.css';
import BASE_URL from '../config/IpAdress';
import UserContext from '../context/UserContext';

const ELEMENT_OPTIONS = {
  style: {
    paymentRequestButton: {
      type: 'buy',
      theme: 'dark',
    },
  },
};

const CheckoutForm = () => {
  const elements = useElements();
  const stripe = useStripe();
  const [name, setName] = useState('');
  const [postal, setPostal] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const state = React.useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    const cardElement = elements.getElement(CardNumberElement);

    try {
      const { data: clientSecret } = await axios.post(`${BASE_URL}/stripe/checkout`, {
        amount: state?.price * 100,
      });
      const payload = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name,
          address: {
            postal_code: postal,
          },
        },
      });

      const confirmedCardPayment = await stripe.confirmCardPayment(clientSecret, {
        payment_method: payload.paymentMethod.id,
      });

      console.log(confirmedCardPayment);

      if (payload.error) {
        console.log('[error]', payload.error);
        setErrorMessage(payload.error.message);
        setPaymentMethod(null);
      } else {
        console.log('[PaymentMethod]', payload.paymentMethod);
        setPaymentMethod(payload.paymentMethod);
        setErrorMessage(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Amount to pay: ${state?.price}</h2>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="name">Full Name</label>
      <input
        id="name"
        required
        placeholder="Jenny Rosen"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="cardNumber">Card Number</label>
      <CardNumberElement
        id="cardNumber"
        onBlur={logEvent('blur')}
        onChange={logEvent('change')}
        onFocus={logEvent('focus')}
        onReady={logEvent('ready')}
        options={ELEMENT_OPTIONS}
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="expiry">Card Expiration</label>
      <CardExpiryElement
        id="expiry"
        onBlur={logEvent('blur')}
        onChange={logEvent('change')}
        onFocus={logEvent('focus')}
        onReady={logEvent('ready')}
        options={ELEMENT_OPTIONS}
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="cvc">CVC</label>
      <CardCvcElement
        id="cvc"
        onBlur={logEvent('blur')}
        onChange={logEvent('change')}
        onFocus={logEvent('focus')}
        onReady={logEvent('ready')}
        options={ELEMENT_OPTIONS}
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="postal">Postal Code</label>
      <input
        id="postal"
        required
        placeholder="12345"
        value={postal}
        onChange={(e) => {
          setPostal(e.target.value);
        }}
      />
      {errorMessage && <ErrorResult>{errorMessage}</ErrorResult>}
      {paymentMethod && <Result>Got PaymentMethod: {paymentMethod.id}</Result>}
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
