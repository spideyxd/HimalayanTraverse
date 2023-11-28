import React from 'react';

const Payment = ({ name, price, quantity }) => {
  const total = price * quantity;

  return (
    <>
      <div className="container text-center">
        <div className="row m-0 justify-content-center">
          <div className="col-lg-5 p-0 ps-lg-4">
            <div className="row m-0">
              <div className="col-12 px-4">
                <div className="d-flex align-items-end mt-4 mb-2">
                  <p className="h4 m-0">
                    <span className="pe-1">{name}Item</span>
                  </p>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <p className="text-muted">Qty</p>
                  <p className="fs-14 fw-bold">{quantity}</p>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <p className="text-muted">Subtotal</p>
                  <p className="fs-14 fw-bold">
                    <span className="fas fa-dollar-sign pe-1" />
                    {total}
                  </p>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <p className="text-muted">Shipping</p>
                  <p className="fs-14 fw-bold">Free</p>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <p className="text-muted fw-bold">Total</p>
                  <div className="d-flex align-text-top ">
                    <span className="fas fa-dollar-sign mt-1 pe-1 fs-14 " />
                    <span className="h4">{total}</span>
                  </div>
                </div>
              </div>
              <div className="col-12 px-0">
                <div className="row bg-light m-0">
                  <div className="col-12 px-4 my-4">
                    <p className="fw-bold">Payment detail</p>
                  </div>
                  <div className="col-12 px-4">
                    <div className="d-flex  mb-4">
                      <span className="">
                        <p className="text-muted">Card number</p>
                        <input
                          className="form-control"
                          type="text"
                          defaultValue="4485 6888 2359 1498"
                          placeholder="1234 5678 9012 3456"
                        />
                      </span>
                      <div className=" w-100 d-flex flex-column align-items-end">
                        <p className="text-muted">Expires</p>
                        <input
                          className="form-control2"
                          type="text"
                          defaultValue="01/2020"
                          placeholder="MM/YYYY"
                        />
                      </div>
                    </div>
                    <div className="d-flex mb-5">
                      <span className="me-5">
                        <p className="text-muted">Cardholder name</p>
                        <input
                          className="form-control"
                          type="text"
                          defaultValue="David J.Frias"
                          placeholder="Name"
                        />
                      </span>
                      <div className="w-100 d-flex flex-column align-items-end">
                        <p className="text-muted">CVC</p>
                        <input
                          className="form-control3"
                          type="text"
                          defaultValue={630}
                          placeholder="XXX"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row m-0">
                  <div className="col-12  mb-4 p-0">
                    <div className="btn btn-primary">
                      Purchase
                      <span className="fas fa-arrow-right ps-2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
