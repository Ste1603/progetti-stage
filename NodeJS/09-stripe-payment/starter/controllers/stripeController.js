const stripe = require("stripe")(process.env.STRIPE_KEY); //secret key

const stripeController = async (req, res) => {
  const { purchase, total_amount, shipping_fee } = req.body;

  const calculateOrderAmount = () => {
    return shipping_fee + total_amount;
  };
  //!creo il payment intent che mi permette di creare il clientSecret
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: "usd",
    });
    
    console.log(paymentIntent);
    res.json({ clientSecret: paymentIntent.client_secret });
};

module.exports = stripeController;
