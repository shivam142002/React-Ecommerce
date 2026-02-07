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




// import Razorpay from 'razorpay';

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY,
//   key_secret: process.env.RAZORPAY_SECRET,
// });

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   try {
//     const { amount } = req.body;

//     const order = await razorpay.orders.create({
//       amount: amount * 100,
//       currency: 'INR',
//     });

//     return res.status(200).json({
//       orderId: order.id,
//       amount: order.amount,
//     });
//   } catch (error) {
//     console.error('Razorpay error:', error);
//     return res.status(500).json({ error: 'Order creation failed' });
//   }
// }






// const Razorpay = require('razorpay');

// module.exports = async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   try {
//     if (!process.env.RAZORPAY_KEY || !process.env.RAZORPAY_SECRET) {
//       throw new Error('Razorpay env variables missing');
//     }

//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY,
//       key_secret: process.env.RAZORPAY_SECRET,
//     });



//     const { amount } = req.body;

//     if (!amount || isNaN(amount)) {
//       throw new Error('Invalid amount');
//     }

//     const order = await razorpay.orders.create({
//       amount: Number(amount) * 100,
//       currency: 'INR',
//     });

//     return res.status(200).json({
//       orderId: order.id,
//       amount: order.amount,
//     });
//   } catch (error) {
//     console.error('🔥 API ERROR:', error);
//     return res.status(500).json({
//       error: error.message || 'Order creation failed',
//     });
//   }
// };




// const Razorpay = require('razorpay');

// module.exports = async function handler(req, res) {
//   // Allow only POST
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   try {
//     // 1️⃣ Validate env variables
//     const key = process.env.RAZORPAY_KEY;
//     const secret = process.env.RAZORPAY_SECRET;

//     if (!key || !secret) {
//       console.error('Missing Razorpay env vars');
//       return res.status(500).json({
//         error: 'Payment service not configured',
//       });
//     }

//     // 2️⃣ Parse body safely (Vercel dev safety)
//     const body =
//       typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

//     const { amount } = body;

//     // 3️⃣ Validate amount
//     if (!amount || isNaN(amount) || Number(amount) <= 0) {
//       return res.status(400).json({
//         error: 'Invalid amount',
//       });
//     }

//     // 4️⃣ Initialize Razorpay
//     const razorpay = new Razorpay({
//       key_id: key,
//       key_secret: secret,
//     });

//     // 5️⃣ Create order
//     const order = await razorpay.orders.create({
//       amount: Math.round(Number(amount) * 100), // rupees → paise
//       currency: 'INR',
//     });

//     // 6️⃣ Return order details
//     return res.status(200).json({
//       orderId: order.id,
//       amount: order.amount,
//       currency: order.currency,
//     });
//   } catch (error) {
//     // Razorpay / runtime errors
//     console.error('🔥 Order API Error:', error);

//     return res.status(500).json({
//       error: error.message || 'Order creation failed',
//     });
//   }
// };





// import Razorpay from 'razorpay';

// export default async function handler(req, res) {
//   // Allow only POST
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   try {
//     // 1️⃣ Validate env variables
//     const key = process.env.RAZORPAY_KEY;
//     const secret = process.env.RAZORPAY_SECRET;

//     if (!key || !secret) {
//       console.error('Missing Razorpay env vars');
//       return res.status(500).json({
//         error: 'Payment service not configured',
//       });
//     }

//     // 2️⃣ Parse body safely
//     const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
//     const { amount } = body;

//     // 3️⃣ Validate amount
//     if (!amount || isNaN(amount) || Number(amount) <= 0) {
//       return res.status(400).json({ error: 'Invalid amount' });
//     }

//     // 4️⃣ Initialize Razorpay
//     const razorpay = new Razorpay({
//       key_id: key,
//       key_secret: secret,
//     });

//     // 5️⃣ Create order
//     const order = await razorpay.orders.create({
//       amount: Math.round(Number(amount) * 100), // rupees → paise
//       currency: 'INR',
//     });
// console.log('RAZORPAY_KEY:', process.env.RAZORPAY_KEY);
// console.log('RAZORPAY_SECRET loaded?', !!process.env.RAZORPAY_SECRET);

//     // 6️⃣ Return order details
//     return res.status(200).json({
//       orderId: order.id,
//       amount: order.amount,
//       currency: order.currency,
//     });
//   } catch (error) {
//     console.error('🔥 Order API Error:', error);
//      console.error('Stack:', error.stack);
//   console.error('Env Variables:', {
//     key: !!process.env.RAZORPAY_KEY,
//     secret: !!process.env.RAZORPAY_SECRET,
//   });
//     return res.status(500).json({
//       error: error.message || 'Order creation failed',
//     });
//   }
// }





import Razorpay from 'razorpay';

export default async function handler(req, res) {
  console.log('RAZORPAY_KEY:', process.env.RAZORPAY_KEY);
  console.log('RAZORPAY_SECRET loaded?', !!process.env.RAZORPAY_SECRET);

  // Allow only POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // 1️⃣ Read environment variables
    const key = process.env.RAZORPAY_KEY;
    const secret = process.env.RAZORPAY_SECRET;

    if (!key || !secret) {
      console.error('Missing Razorpay env vars');
      return res.status(500).json({ error: 'Payment service not configured' });
    }

    // 2️⃣ Parse request body safely
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { amount } = body;

    // 3️⃣ Validate amount
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    // 4️⃣ Initialize Razorpay instance
    const razorpay = new Razorpay({
      key_id: key,
      key_secret: secret,
    });

    // 5️⃣ Create order
    const order = await razorpay.orders.create({
      amount: Math.round(Number(amount) * 100), // Convert rupees to paise
      currency: 'INR',
      payment_capture: 1, // Auto-capture payment
    });

    console.log('Razorpay order created:', order.id);

    // 6️⃣ Return order details to frontend
    return res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error('🔥 Order API Error:', error);
    return res.status(500).json({
      error: error.message || 'Order creation failed',
    });
  }
}
