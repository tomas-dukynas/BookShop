import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/BookList.css';



const OrderTracking = () => {


  return (

    <section>
      <div className="row">
        <div className="col-lg-8">
          <div className="mb-3">
            <div className="pt-4 wish-list">
              <h5 className="mb-4">
                Orders
              </h5>
              <input
                type="email"
                className="form-control"
                placeholder="Enter tracking id"
                /*value={email}
                onChange={(e) => setEmail(e.target.value)}*/
              />
              <button>
                Search
              </button>


            </div>
          </div>
        </div>
      </div>
    </section>





  );
};
export default OrderTracking;
