const PaymentSuccess = async () => {
  return (
    <div
      className="p-10 text-white text-center border rounded-md
     bg-linear-to-r from-blue-500 to-purple-500 m-4 md:m-10"
    >
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Thank you 🎉</h1>
        <h2 className="text-2xl">Your Appointment Is Confirmed!</h2>
        <p className="text-sm mt-2">
          Your payment was successful, and your appointment has been booked
          successfully.
        </p>
        <p className="text-sm mt-2">
          All the important details, including your appointment date, time, and
          meeting information, will be sent to your email.
        </p>
        <div className="bg-white p-2 rounded-md text-purple-500 mt-5 text-xl md:text-4xl font-bold">
          We look forward to meeting with you!
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
