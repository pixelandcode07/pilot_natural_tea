import { Types } from "mongoose";

export interface IOrderItem {
  product: Types.ObjectId; // Product ID
  name: string;
  price: number;
  quantity: number;
}

export interface IOrder {
  orderNo: string; // Random generated unique ID (e.g., #PILOT-12345)
  user?: Types.ObjectId; // Optional: If user is logged in
  customerName: string;
  email: string;
  phone: string;
  shippingAddress: string;
  city: string;
  orderItems: IOrderItem[];
  subTotal: number;
  deliveryFee: number;
  totalAmount: number;
  paymentMethod: "Cash on Delivery" | "SSLCOMMERZ" | "bKash";
  paymentStatus: "Pending" | "Paid" | "Failed";
  deliveryStatus: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  notes?: string;
}