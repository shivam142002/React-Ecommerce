// import { toast } from 'react-toastify';

// export const RAZORPAY_KEY = 'rzp_test_.......'; // Replace with your actual key
// export const RAZORPAY_SECRET = 'htsAp........'; // Replace with your actual secret

// export const initiatePayment = (orderDetails, onSuccess, onFailure) => {
//   const { grandTotal, name, addressInfo, cartItems, email, userid } = orderDetails;

//   const options = {
//     key: RAZORPAY_KEY,
//     key_secret: RAZORPAY_SECRET,
//     amount: parseInt(grandTotal * 100),
//     currency: 'INR',
//     order_receipt: 'order_rcptid_' + name,
//     name: 'EShop Store',
//     description: 'Payment for your order',
//     handler: function (response) {
//       console.log('Payment Response:', response);
//       toast.success('Payment Successful');

//       const paymentId = response.razorpay_payment_id;

//       const orderInfo = {
//         cartItems,
//         addressInfo,
//         date: new Date().toLocaleString('en-US', {
//           month: 'short',
//           day: '2-digit',
//           year: 'numeric',
//         }),
//         email,
//         userid,
//         paymentId,
//         totalAmount: grandTotal,
//       };

//       if (onSuccess) {
//         onSuccess(orderInfo);
//       }
//     },
//     modal: {
//       ondismiss: function () {
//         toast.info('Payment cancelled');
//         if (onFailure) {
//           onFailure();
//         }
//       },
//     },
//     theme: {
//       color: '#3399cc',
//     },
//   };

//   const pay = new window.Razorpay(options);
//   pay.open();

//   pay.on('payment.failed', function (response) {
//     console.error('Payment Failed:', response.error);
//     toast.error('Payment failed. Please try again.');
//     if (onFailure) {
//       onFailure(response.error);
//     }
//   });
// };





import { toast } from 'react-toastify';

// Only the Key ID (safe for frontend)
const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY;

export const initiatePayment = async (orderDetails, onSuccess, onFailure) => {
  const { grandTotal, name, addressInfo, cartItems, email, userid } = orderDetails;

  try {
    // Call Vercel serverless function to create order
    const res = await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: grandTotal }),
    });

    if (!res.ok) throw new Error('Order creation failed');

    const data = await res.json(); 

    const options = {
      key: RAZORPAY_KEY,
      amount: data.amount,
      currency: 'INR',
      order_receipt: 'order_rcptid_' + name,
      order_id: data.orderId,
      name: 'EShop Store',
      description: 'Payment for your order',
      handler: function (response) {
        toast.success('Payment Successful');

        const paymentId = response.razorpay_payment_id;

        const orderInfo = {
          cartItems,
          addressInfo,
          date: new Date().toLocaleString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
          }),
          email,
          userid,
          paymentId,
          totalAmount: grandTotal,
        };

        if (onSuccess) onSuccess(orderInfo);
      },
      modal: {
        ondismiss: function () {
          toast.info('Payment cancelled');
          if (onFailure) onFailure();
        },
      },
      theme: { color: '#3399cc' },
    };

    const pay = new window.Razorpay(options);
    pay.open();

    pay.on('payment.failed', function (response) {
      console.error('Payment Failed:', response.error);
      toast.error('Payment failed. Please try again.');
      if (onFailure) onFailure(response.error);
    });

  } catch (err) {
    console.error(err);
    toast.error('Payment initiation failed');
    if (onFailure) onFailure(err);
  }
};
