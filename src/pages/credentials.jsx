import React from "react";

const Credentials = () => {
  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-md rounded-xl border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-red-500 mb-4">
        Details Received 
      </h2>

      <p className="text-gray-800 text-center mb-3">
        Thank you for submitting your information. We have successfully received your manufacturer details.
      </p>

      <p className="text-gray-700 text-center mb-6">
        You will be notified via your provided email once your account is approved and ready to access.
      </p>

      <div className="bg-gray-100 p-4 rounded-md text-gray-600 text-sm text-center">
        Your login credentials will be sent to your email shortly.
      </div>

      <p className="mt-6 text-center text-gray-500 text-sm">
        For any urgent queries, please contact our support team.
      </p>
    </div>
  );
};

export default Credentials;
