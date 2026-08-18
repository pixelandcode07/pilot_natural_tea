import mongoose, { Schema } from "mongoose";
import { IOrder } from "./order.interface";

// 📌 Error Fix: User এবং Product মডেল ইম্পোর্ট করা হলো যাতে Mongoose চিনতে পারে
import "../user/user.model";
import "../product/product.model";

const orderSchema = new Schema<IOrder>(
  {
    orderNo: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: "User", default: null }, // Optional
    customerName: { type: String, required: true },
    email: { type: String },
    phone: { type: String, required: true },
    shippingAddress: { type: String, required: true },
    city: { type: String, required: true },
    
    orderItems: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],

    subTotal: { type: Number, required: true },
    deliveryFee: { type: Number, required: true, default: 0 },
    totalAmount: { type: Number, required: true },

    paymentMethod: { type: String, enum: ["Cash on Delivery", "SSLCOMMERZ", "bKash"], default: "Cash on Delivery" },
    paymentStatus: { type: String, enum: ["Pending", "Paid", "Failed"], default: "Pending" },
    deliveryStatus: { type: String, enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"], default: "Pending" },
    
    notes: { type: String },
  },
  { timestamps: true }
);

export const Order = mongoose.models.Order || mongoose.model<IOrder>("Order", orderSchema);