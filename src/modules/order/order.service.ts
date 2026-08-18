import { Order } from "./order.model";

// ১. ক্রিয়েট অর্ডার
const createOrder = async (payload: any) => {
  // Generate a random Order Number (e.g. #PLT-837482)
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  payload.orderNo = `#PLT-${randomNum}`;

  const result = await Order.create(payload);
  return result;
};

// ২. সব অর্ডার ফেচ (অ্যাডমিন প্যানেলের জন্য)
const getAllOrders = async () => {
  const result = await Order.find({})
    .populate("user", "name email") 
    .sort({ createdAt: -1 });
  return result;
};

// ৩. সিঙ্গেল ইউজারের অর্ডার ফেচ (কাস্টমার ড্যাশবোর্ডের জন্য)
const getUserOrders = async (userId: string) => {
  const result = await Order.find({ user: userId }).sort({ createdAt: -1 });
  return result;
};

// ৪. অর্ডার স্ট্যাটাস আপডেট
const updateOrderStatus = async (id: string, payload: any) => {
  const result = await Order.findByIdAndUpdate(id, payload, { new: true });
  if (!result) throw new Error("Order not found");
  return result;
};

// ৫. অর্ডার ডিলিট
const deleteOrder = async (id: string) => {
  const result = await Order.findByIdAndDelete(id);
  if (!result) throw new Error("Order not found");
  return result;
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
  deleteOrder,
};