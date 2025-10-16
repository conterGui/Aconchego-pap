import nodemailer from 'nodemailer';
import { IOrder } from '../models/Order';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

export const sendOrderConfirmationEmail = async (order: IOrder): Promise<void> => {
  const itemsList = order.items
    .map(item => `${item.productName} x${item.quantity} - $${item.price * item.quantity}`)
    .join('\n');

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: order.customerEmail,
    subject: 'Order Confirmation - Aconchego Coffee Shop',
    text: `
Dear ${order.customerName},

Thank you for your order at Aconchego Coffee Shop!

Order Details:
${itemsList}

Total Amount: $${order.totalAmount}

We will process your order shortly.

Best regards,
Aconchego Coffee Shop
    `
  };

  await transporter.sendMail(mailOptions);
};
