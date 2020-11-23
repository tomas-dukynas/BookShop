import React, { useState } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { useHistory } from 'react-router-dom';
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
import AuthContext from '../context/AuthContext';
import SuccessModal from './SuccessModal';

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
  const { resetCartAndPrice } = React.useContext(AuthContext);
  const [name, setName] = useState('');
  const [postal, setPostal] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const state = React.useContext(UserContext);
  const history = useHistory();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    const cardElement = elements.getElement(CardNumberElement);

    console.log('CARD NUM', cardElement);

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
        payment_method: payload.paymentMethod?.id,
      });

      console.log(confirmedCardPayment);
      if (confirmedCardPayment) {
        setLoading(false);
        if (!confirmedCardPayment.error) {
          setModalIsOpen(true);
        }
      }

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
      if (err === '500') {
        setErrorMessage('Wrong card number');
      }
      setErrorMessage(err.messages);
    }
  };
  const handleModalClose = async () => {
    setModalIsOpen(false);
    history.push('/list-view');
    await axios.post(`${BASE_URL}/email`, {
      to: state.user ? state.user.email : 'tomas.dukynas@gmail.com',
      from: 'tomas.dukynas@gmail.com',
      replyTo: 'tomas.dukynas@gmail.com',
      subject: 'Successful purchase',
      text: `${name || 'Customer'} Thank you for buying!!!`,
    });
    resetCartAndPrice();
  };

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="button"
        onClick={() => history.push('/list-view')}
        className="buttonClose"
        style={{ marginBottom: '20px' }}
      >
        Back to books
      </button>
      <SuccessModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        text="Thank you for buying!"
        handleModalClose={handleModalClose}
      />
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
      {loading ? (
        <Spinner animation="border" className="spinner" />
      ) : (
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      )}
    </form>
  );
};

export default CheckoutForm;
