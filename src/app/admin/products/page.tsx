"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Trash2, Edit, Search, Image as ImageIcon, Star } from "lucide-react";
import { useRouter } from "next/navigation";

interface IProduct {
  _id: string;
  name: string;
  slug: string;
  currentPrice: number;
  category: { _id: string; name: string };
  image: string;
  gallery: string[];
  stock: number;
  isFeatured: boolean;
  status: "Active" | "Inactive";
}

export default function AllProducts() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchProducts = async () => {
    try {
      const res = await fetch("/v1/product");
      const data = await res.json();
      if (data.success) setProducts(data.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/v1/product/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setProducts(products.filter((p) => p._id !== id));
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Failed to delete product.");
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">All Products</h1>
          <p className="text-sm text-gray-500">Manage and view all your products.</p>
        </div>
        <Link 
          href="/admin/products/add" 
          className="bg-[#0B1B42] text-white font-medium px-4 py-2.5 rounded-lg hover:bg-[#152756] transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add New Product
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div className="relative w-full max-w-sm">
            <input type="text" placeholder="Search product..." className="w-full border border-gray-300 rounded-md text-sm pl-3 pr-8 py-2 focus:outline-none focus:border-[#0B1B42]" />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-100 text-gray-600 font-semibold border-b border-gray-200">
              <tr>
                <th className="p-4">Product Details</th>
                <th className="p-4">Category</th>
                <th className="p-4 text-center">Price</th>
                <th className="p-4 text-center">Stock</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr><td colSpan={6} className="p-8 text-center text-gray-500">Loading products...</td></tr>
              ) : products.length === 0 ? (
                <tr><td colSpan={6} className="p-8 text-center text-gray-500">No products found.</td></tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="w-full h-full object-contain p-1" />
                        ) : <ImageIcon className="w-5 h-5 text-gray-300" />}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 flex items-center gap-2">
                          {product.name}
                          {/* 📌 FIXED: Removed title from Star icon and wrapped in a span */}
                          {product.isFeatured && (
                            <span title="Featured" className="flex items-center">
                              <Star className="w-3.5 h-3.5 text-orange-400 fill-current" />
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-gray-400">/{product.slug}</p>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600 font-medium">{product.category?.name || "N/A"}</td>
                    <td className="p-4 text-center font-bold text-[#F58634]">৳{product.currentPrice}</td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${product.stock > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${product.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => router.push(`/admin/products/add?edit=${product._id}`)} className="bg-gray-100 text-gray-600 p-2 rounded hover:bg-[#0B1B42] hover:text-white transition-colors" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(product._id)} className="bg-gray-100 text-gray-600 p-2 rounded hover:bg-red-600 hover:text-white transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}