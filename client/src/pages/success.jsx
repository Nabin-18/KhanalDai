// src/PaymentSuccess.js
import React from "react";
import { useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const paymentDetails = {
    transactionId: queryParams.get("transaction_id"),
    amount: queryParams.get("amount"),
    mobile: queryParams.get("mobile"),
    status: queryParams.get("status"),
    purchaseOrderId: queryParams.get("purchase_order_id"),
    purchaseOrderName: queryParams.get("purchase_order_name"),
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 md:p-12 max-w-md w-full">
        <div className="text-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-green-500 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h1 className="text-3xl font-bold text-gray-800 mt-4">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mt-2">Thank you for your purchase.</p>
        </div>
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <p className="text-gray-700">
              <strong>Transaction ID:</strong> {paymentDetails.transactionId}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <p className="text-gray-700">
              <strong>Amount:</strong> Rs. {paymentDetails.amount}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <p className="text-gray-700">
              <strong>Mobile:</strong> {paymentDetails.mobile}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <p className="text-gray-700">
              <strong>Status:</strong> {paymentDetails.status}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <p className="text-gray-700">
              <strong>Purchase Order ID:</strong>{" "}
              {paymentDetails.purchaseOrderId}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <p className="text-gray-700">
              <strong>Purchase Order Name:</strong>{" "}
              {paymentDetails.purchaseOrderName}
            </p>
          </div>
        </div>
        <a
          href="/"
          className="block w-full bg-blue-500 text-white text-center py-3 rounded-lg mt-6 hover:bg-blue-600 transition duration-300"
        >
          Go to Homepage
        </a>
      </div>
    </div>
  );
};

export default PaymentSuccess;
