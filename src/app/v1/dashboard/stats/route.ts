export const dynamic = 'force-dynamic'; // 📌 No cache

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Order } from "@/modules/order/order.model";
import { Product } from "@/modules/product/product.model";

export async function GET() {
  try {
    await connectDB();

    // Fetch all required data
    const allOrders = await Order.find();
    const totalProducts = await Product.countDocuments({ status: "Active" });

    // Date calculations
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    let todaysOrdersCount = 0;
    let todaysOrdersAmount = 0;

    let lifetimeSalesCount = allOrders.length;
    let lifetimeSalesAmount = 0;

    let completedOrdersCount = 0;
    let completedOrdersAmount = 0;

    let pendingOrdersCount = 0;
    let pendingOrdersAmount = 0;

    let totalRevenue = 0;

    const uniqueCustomers = new Set();

    allOrders.forEach(order => {
      // Lifetime
      lifetimeSalesAmount += order.totalAmount;
      
      // Unique Customers (Using phone as unique identifier)
      if (order.phone) uniqueCustomers.add(order.phone);

      // Today's Orders
      const orderDate = new Date(order.createdAt);
      if (orderDate >= startOfToday) {
        todaysOrdersCount++;
        todaysOrdersAmount += order.totalAmount;
      }

      // Completed Orders & Revenue
      if (order.deliveryStatus === 'Delivered') {
        completedOrdersCount++;
        completedOrdersAmount += order.totalAmount;
        totalRevenue += order.totalAmount; // Delivered order amount is real revenue
      }

      // Pending Orders
      if (order.deliveryStatus === 'Pending' || order.deliveryStatus === 'Processing') {
        pendingOrdersCount++;
        pendingOrdersAmount += order.totalAmount;
      }
    });

    const avgOrderValue = lifetimeSalesCount > 0 ? Math.round(lifetimeSalesAmount / lifetimeSalesCount) : 0;
    const totalCustomers = uniqueCustomers.size;

    return NextResponse.json({
      success: true,
      data: {
        todaysOrders: { count: todaysOrdersCount, amount: todaysOrdersAmount },
        lifetimeSales: { count: lifetimeSalesCount, amount: lifetimeSalesAmount },
        completedOrders: { count: completedOrdersCount, amount: completedOrdersAmount },
        pendingOrders: { count: pendingOrdersCount, amount: pendingOrdersAmount },
        totalRevenue,
        totalProducts,
        totalCustomers,
        avgOrderValue
      }
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}