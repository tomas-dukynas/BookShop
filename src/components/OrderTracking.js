import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/BookList.css';

const OrderTracking = () => {
  const [trackingStatus, setTrackingStatus] = useState();
  const [ID, setID] = useState('');
  const [date, setDate] = useState('');

  const onSearchClick = () => {
    axios
      .get('http://localhost:1337/trackings', {
        params: {
          TrackingID: ID,
        },
      })
      .then(({ data }) => {
        setTrackingStatus(data);
        const string = data[0].Date.toString();
        const date1 = new Date(string);

        const readableDate = date1.toUTCString();
        setDate(readableDate);
      })
      .catch((e) => {
        throw new Error(e);
      });
  };

  return (
    <section>
      <div className="row">
        <div className="col-lg-8">
          <div className="mb-3">
            <div className="pt-4 wish-list inputDiv">
              <h5 className="mb-4">Orders</h5>
              <input
                id="ID"
                className="inputDiv"
                placeholder="Enter tracking id"
                value={ID}
                onChange={(e) => {
                  setID(e.target.value);
                }}
              />
              <button type="button" className="inputDiv" onClick={onSearchClick}>
                Search
              </button>
            </div>
          </div>
          {!trackingStatus ? (
            ' '
          ) : (
            <div>
              <p>Tracking ID: {trackingStatus?.[0].TrackingID}</p>
              <p>Status: {trackingStatus?.[0].Status}</p>
              <p>Order Date: {date} </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
export default OrderTracking;
