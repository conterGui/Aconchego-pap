import { Request, Response } from 'express';
import Order from '../models/Order';
import Product from '../models/Product';
import { sendOrderConfirmationEmail } from '../utils/emailService';

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { customerName, customerEmail, customerPhone, items } = req.body;

    // Validate and fetch product details
    const orderItems = [];
    let totalAmount = 0;

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product || !product.available) {
        res.status(400).json({ message: `Product ${item.productId} not available` });
        return;
      }

      const orderItem = {
        productId: product._id,
        productName: product.name,
        quantity: item.quantity,
        price: product.price
      };

      orderItems.push(orderItem);
      totalAmount += product.price * item.quantity;
    }

    const order = new Order({
      customerName,
      customerEmail,
      customerPhone,
      items: orderItems,
      totalAmount
    });

    await order.save();

    // Send confirmation email
    try {
      await sendOrderConfirmationEmail(order);
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Continue even if email fails
    }

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: 'Error creating order', error });
  }
};

export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};

export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error });
  }
};

export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: 'Error updating order', error });
  }
};
