import { z } from "zod";

export const OrderValidation = {
  createOrderSchema: z.object({
    user: z.string().optional(),
    customerName: z.string().min(1, "Customer Name is required"),
    email: z.string().email().optional().or(z.literal("")),
    phone: z.string().min(10, "Valid phone number is required"),
    shippingAddress: z.string().min(5, "Shipping address is required"),
    city: z.string().min(2, "City is required"),
    
    orderItems: z.array(
      z.object({
        product: z.string().min(1, "Product ID is required"),
        name: z.string().min(1),
        price: z.number().positive(),
        quantity: z.number().min(1),
      })
    ).min(1, "At least one product is required in the order"),

    subTotal: z.number().positive(),
    deliveryFee: z.number().min(0),
    totalAmount: z.number().positive(),

    paymentMethod: z.enum(["Cash on Delivery", "SSLCOMMERZ", "bKash"]).default("Cash on Delivery"),
    notes: z.string().optional(),
  }),

  updateOrderStatusSchema: z.object({
    paymentStatus: z.enum(["Pending", "Paid", "Failed"]).optional(),
    deliveryStatus: z.enum(["Pending", "Processing", "Shipped", "Delivered", "Cancelled"]).optional(),
  }),
};