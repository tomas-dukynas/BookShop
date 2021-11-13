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

  const handleSubmitError = (_errorMessage) => {
    setErrorMessage(_errorMessage);
    setPaymentMethod(null);
  };

  const getClientSecret = async () => {
    const { data } = await axios.post(`${BASE_URL}/stripe/checkout`, {
      amount: state?.price * 100,
    });

    return data;
  };

  const createPaymentMethod = async () => {
    const cardElement = elements.getElement(CardNumberElement);

    return stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name,
        address: {
          postal_code: postal,
        },
      },
    });
  };

  const confirmCardPayment = async (clientSecret, payload) => {
    const confirmedCardPayment = await stripe.confirmCardPayment(clientSecret, {
      payment_method: payload.paymentMethod?.id,
    });

    if (confirmedCardPayment) {
      setLoading(false);
      if (!confirmedCardPayment.error) {
        setModalIsOpen(true);
      }
    }

    return confirmedCardPayment;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    try {
      const clientSecret = await getClientSecret();
      const payload = await createPaymentMethod();
      await confirmCardPayment(clientSecret, payload);

      if (payload.error) {
        handleSubmitError(payload.error.message);
      } else {
        setPaymentMethod(payload.paymentMethod);
        setErrorMessage(null);
      }
    } catch (err) {
      if (err === '500') {
        handleSubmitError('Wrong card number');
      }
      handleSubmitError(err.messages);
    }
  };

  const handleModalClose = async () => {
    let result = '';
    let promoCode = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 7; i++) {
      const array = new Uint32Array(10);
      result += characters.charAt(
        Math.floor(window.crypto.getRandomValues(array) * charactersLength),
      );
    }

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 5; i++) {
      const array = new Uint32Array(10);
      promoCode += characters.charAt(
        Math.floor(window.crypto.getRandomValues(array) * charactersLength),
      );
    }

    const date = new Date();
    let text = '';
    state.cart.forEach((book) => {
      text = `${text + book.id},`;
    });

    axios
      .post('http://localhost:1337/trackings', {
        TrackingID: result.toString(),
        Status: 'Pending',
        BookID: text.toString(),
        Date: date,
      })
      .catch((e) => console.log(e));

    axios
      .post(
        'http://localhost:1337/promo-codes',
        {
          promoCode,
          user: state.user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${state.user?.token}`,
          },
        },
      )
      .catch((e) => console.log(e));

    setModalIsOpen(false);
    history.push('/list-view');
    await axios.post(`${BASE_URL}/email`, {
      to: 'tomas.dukynas@gmail.com',
      from: 'tomas.dukynas@gmail.com',
      replyTo: 'tomas.dukynas@gmail.com',
      subject: 'Successful purchase',
      text: `${
        name || 'Customer'
      } Thank you for buying!!! Your tracking ID is ${result} \n And your promo code is: ${promoCode}`,
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
        classname="modal"
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        text="Thank you for buying! Tracking ID has been sent to you via email."
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
