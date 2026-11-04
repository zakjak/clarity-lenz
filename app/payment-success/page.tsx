const PaymentSuccess = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { amount } = await searchParams;

  return (
    <div
      className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md
     bg-linear-to-r from-blue-500 to-purple-500"
    >
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
        <h2 className="text-2xl">
          You successfully Booked your appointment and all neccasry information
          will be sent to you email
        </h2>

        <div className="bg-white p-2 rounded-md text-purple-500 mt-5 text-4xl font-bold">
          ${amount}
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
