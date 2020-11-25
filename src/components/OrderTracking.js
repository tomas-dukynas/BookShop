import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/BookList.css';


const OrderTracking = () => {
  const [trackingStatus, setTrackingStatus] = useState();
  const [ID, setID] = useState('');
  const [date, setDate] = useState('');
  //console.log(ID);

  const Searching = (event) => {
    console.log(ID);

    axios
      .get('http://localhost:1337/trackings', {
        params: {
          TrackingID: ID,
        },
      })
      .then(({ data }) => {
        //console.log(data[0].Status);
        setTrackingStatus(data);
        let string = data[0].Date.toString();
        let date1 = new Date(string);

        let readableDate = date1.toUTCString();
        setDate(readableDate);
      })
      .catch((e) => console.log(e));
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
              <button className="inputDiv" onClick={Searching}>
                Search
              </button>
            </div>
          </div>
          {!trackingStatus ? (
            ' '
          ) : (
            <div>
              <p>Tracking ID: {trackingStatus[0].TrackingID}</p>
              <p>Status: {trackingStatus[0].Status}</p>
              <p>Order Date: {date} </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
export default OrderTracking;
