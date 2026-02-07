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





// import { toast } from 'react-toastify';

// // Only the Key ID (safe for frontend)
// const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY;

// export const initiatePayment = async (orderDetails, onSuccess, onFailure) => {
//   const { grandTotal, name, addressInfo, cartItems, email, userid } = orderDetails;

//   try {
//     // Call Vercel serverless function to create order
//     const res = await fetch('/api/order', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ amount: grandTotal }),
//     });

//     if (!res.ok) throw new Error('Order creation failed');

//     const data = await res.json(); 

//     const options = {
//       key: RAZORPAY_KEY,
//       amount: data.amount,
//       currency: 'INR',
//       order_receipt: 'order_rcptid_' + name,
//       order_id: data.orderId,
//       name: 'EShop Store',
//       description: 'Payment for your order',
//       handler: function (response) {
//         toast.success('Payment Successful');

//         const paymentId = response.razorpay_payment_id;

//         const orderInfo = {
//           cartItems,
//           addressInfo,
//           date: new Date().toLocaleString('en-US', {
//             month: 'short',
//             day: '2-digit',
//             year: 'numeric',
//           }),
//           email,
//           userid,
//           paymentId,
//           totalAmount: grandTotal,
//         };

//         if (onSuccess) onSuccess(orderInfo);
//       },
//       modal: {
//         ondismiss: function () {
//           toast.info('Payment cancelled');
//           if (onFailure) onFailure();
//         },
//       },
//       theme: { color: '#3399cc' },
//     };

//     const pay = new window.Razorpay(options);
//     pay.open();

//     pay.on('payment.failed', function (response) {
//       console.error('Payment Failed:', response.error);
//       toast.error('Payment failed. Please try again.');
//       if (onFailure) onFailure(response.error);
//     });

//   } catch (err) {
//     console.error(err);
//     toast.error('Payment initiation failed');
//     if (onFailure) onFailure(err);
//   }
// };



import { toast } from 'react-toastify';

// Only public Razorpay key
const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY;

export const initiatePayment = async (orderDetails, onSuccess, onFailure) => {
  const { grandTotal, name, addressInfo, cartItems, email, userid } = orderDetails;

  try {
    // 1️⃣ Create order on server
    const res = await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: Number(grandTotal), // IMPORTANT
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Order creation failed');
    }

    // 2️⃣ Ensure Razorpay SDK is loaded
    if (!window.Razorpay) {
      toast.error('Razorpay SDK not loaded');
      return;
    }

    // 3️⃣ Razorpay options
    const options = {
      key: RAZORPAY_KEY,
      amount: data.amount, // in paise
      currency: 'INR',
      order_id: data.orderId,

      name: 'EShop Store',
      description: 'Payment for your order',

      handler: function (response) {
        toast.success('Payment Successful 🎉');

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
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          signature: response.razorpay_signature,
          totalAmount: Number(grandTotal),
        };

        onSuccess?.(orderInfo);
      },

      modal: {
        ondismiss: function () {
          toast.info('Payment cancelled');
          onFailure?.();
        },
      },

      theme: {
        color: '#3399cc',
      },
    };

    // 4️⃣ Open Razorpay popup
    const razorpay = new window.Razorpay(options);

    razorpay.on('payment.failed', function (response) {
      console.error('Payment Failed:', response.error);
      toast.error(response.error.description || 'Payment failed');
      onFailure?.(response.error);
    });

    razorpay.open();
  } catch (err) {
    console.error('Payment Init Error:', err);
    toast.error(err.message || 'Payment initiation failed');
    onFailure?.(err);
  }
};



// import { toast } from 'react-toastify';

// // Public Razorpay key (frontend only)
// const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY;

// export const initiatePayment = async (orderDetails, onSuccess, onFailure) => {
//   const { grandTotal, name, addressInfo, cartItems, email, userid } = orderDetails;

//   try {
//     /* ============================
//        1️⃣ CREATE ORDER (BACKEND)
//     ============================ */

//     const res = await fetch('/api/order', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         amount: Number(grandTotal),
//       }),
//     });

//     // 👉 Read response SAFELY
//     const text = await res.text();
//     let data = {};

//     try {
//       data = text ? JSON.parse(text) : {};
//     } catch {
//       throw new Error('Invalid response from payment server');
//     }

//     if (!res.ok) {
//       throw new Error(data.error || 'Order creation failed');
//     }

//     /* ============================
//        2️⃣ CHECK RAZORPAY SDK
//     ============================ */

//     if (!window.Razorpay) {
//       toast.error('Razorpay SDK not loaded');
//       return;
//     }

//     /* ============================
//        3️⃣ RAZORPAY OPTIONS
//     ============================ */

//     const options = {
//       key: RAZORPAY_KEY,
//       amount: data.amount, // paise
//       currency: 'INR',
//       order_id: data.orderId,

//       name: 'EShop Store',
//       description: 'Payment for your order',

//       handler: function (response) {
//         toast.success('Payment Successful 🎉');

//         const orderInfo = {
//           cartItems,
//           addressInfo,
//           date: new Date().toLocaleString('en-US', {
//             month: 'short',
//             day: '2-digit',
//             year: 'numeric',
//           }),
//           email,
//           userid,
//           paymentId: response.razorpay_payment_id,
//           orderId: response.razorpay_order_id,
//           signature: response.razorpay_signature,
//           totalAmount: Number(grandTotal),
//         };

//         onSuccess?.(orderInfo);
//       },

//       modal: {
//         ondismiss: function () {
//           toast.info('Payment cancelled');
//           onFailure?.();
//         },
//       },

//       theme: {
//         color: '#3399cc',
//       },
//     };

//     /* ============================
//        4️⃣ OPEN CHECKOUT
//     ============================ */

//     const razorpay = new window.Razorpay(options);

//     razorpay.on('payment.failed', function (response) {
//       console.error('Payment Failed:', response.error);
//       toast.error(response.error?.description || 'Payment failed');
//       onFailure?.(response.error);
//     });

//     razorpay.open();
//   } catch (err) {
//     console.error('Payment Init Error:', err);
//     toast.error(err.message || 'Payment initiation failed');
//     onFailure?.(err);
//   }
// };
