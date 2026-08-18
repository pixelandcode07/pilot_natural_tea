import { NextRequest, NextResponse } from "next/server";
import { OrderService } from "./order.service";
import { OrderValidation } from "./order.validation";

export const createOrderController = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const validatedData = OrderValidation.createOrderSchema.parse(body);
    
    const newOrder = await OrderService.createOrder(validatedData);
    return NextResponse.json({ success: true, message: "Order placed successfully!", data: newOrder }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
};

export const getAllOrdersController = async () => {
  try {
    const orders = await OrderService.getAllOrders();
    return NextResponse.json({ success: true, data: orders }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
};

// To get logged-in user's orders
export const getUserOrdersController = async (req: NextRequest, userId: string) => {
  try {
    const orders = await OrderService.getUserOrders(userId);
    return NextResponse.json({ success: true, data: orders }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
};

export const updateOrderController = async (req: NextRequest, id: string) => {
  try {
    const body = await req.json();
    const validatedData = OrderValidation.updateOrderStatusSchema.parse(body);
    
    const updatedOrder = await OrderService.updateOrderStatus(id, validatedData);
    return NextResponse.json({ success: true, message: "Order updated successfully", data: updatedOrder }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
};

export const deleteOrderController = async (id: string) => {
  try {
    await OrderService.deleteOrder(id);
    return NextResponse.json({ success: true, message: "Order deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
};