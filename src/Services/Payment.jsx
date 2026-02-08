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

