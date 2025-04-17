import express from 'express';
import Khalti from "khalti-js"
const payRouter = express.Router();

const khalti = new Khalti({
    mode: "Sandbox", // or 'Production'
    secretKey: process.env.KHALTI_SECRET,
    returnUrl: "http://localhost:5173/success",
    websiteUrl: "http://localhost:5173",
});

payRouter.post('/', async (req, res) => {

    const { amount } = req.body
    const orderData = {
        amount: amount, // Amount in paisa
        purchase_order_id: "123456789",
        purchase_order_name: "Order #123456",
        customer_info: {
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "9801234567",
        },

    };
    const paymentUrl = await khalti.getPaymentUrl(orderData);
    console.log(paymentUrl)
    res.json({ paymentUrl });

});

export default payRouter;

