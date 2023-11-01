import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
const stripe = require('stripe')(process.env.STRIPE_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.json('Should be a post request');
    return;
  }


  const { email, name, address, city, country, zip, cartProducts } = req.body;

  await mongooseConnect();

  const productIds = cartProducts;
  const uniqueIds = [... new Set(productIds)];
  const productsInfo = await Product.find({ _id: uniqueIds });

  let line_items = [];

  for (const productId of uniqueIds) {
    const productInfo = productsInfo.find(p => p._id.toString() === productId);

    const quantity = productIds.filter(id => id === productId)?.length || 0;

    if (quantity > 0 && productInfo) {
      line_items.push(
        {
          quantity,
          price_data: {
            currency: 'KES',
            product_data: { name: productInfo.title },
            unit_amount: quantity * productInfo.price * 100 ,
          },

        }
      )
    }
  }

  const orderDoc = await Order.create({
    line_items, email, name, address, city, country, zip, paid: false
  })

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    customer_email: email,
    success_url: process.env.SUCCESS_URL + '/cart?success=1',
    cancel_url: process.env.SUCCESS_URL + '/cart?canceled=1',
    metadata: { orderId: orderDoc._id.toString(), test: 'ok' }
  })

  res.json({
    url: session.url,
  })

}