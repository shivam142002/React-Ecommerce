// import Razorpay from 'razorpay';

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY,
//   key_secret: process.env.RAZORPAY_SECRET,
// });

// export default async function handler(req, res) {
//   if (req.method !== 'POST') return res.status(405).end();

//   const { amount } = req.body;

//   try {
//     const order = await razorpay.orders.create({
//       amount: amount * 100, // rupees to paise
//       currency: 'INR',
//     });

//     res.status(200).json({ orderId: order.id, amount: order.amount });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Order creation failed' });
//   }
// }




import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: 'INR',
    });

    return res.status(200).json({
      orderId: order.id,
      amount: order.amount,
    });
  } catch (error) {
    console.error('Razorpay error:', error);
    return res.status(500).json({ error: 'Order creation failed' });
  }
}
