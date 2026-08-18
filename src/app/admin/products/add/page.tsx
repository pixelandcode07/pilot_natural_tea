"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { UploadCloud, X, ArrowLeft, Save, ImagePlus, Loader2, LayoutGrid, Tag, Package, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

interface ICategory {
  _id: string;
  name: string;
}

function ProductForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "", slug: "", description: "", currentPrice: "", oldPrice: "",
    category: "", stock: "0", isFeatured: false, badge: "", badgeType: "orange", status: "Active",
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [existingGallery, setExistingGallery] = useState<string[]>([]); 
  const [newGalleryFiles, setNewGalleryFiles] = useState<File[]>([]); 
  const [newGalleryPreviews, setNewGalleryPreviews] = useState<string[]>([]); 

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const catRes = await fetch("/v1/category");
        const catData = await catRes.json();
        if (catData.success) setCategories(catData.data);

        if (editId) {
          const prodRes = await fetch("/v1/product");
          const prodData = await prodRes.json();
          if (prodData.success) {
            const product = prodData.data.find((p: any) => p._id === editId);
            if (product) {
              setFormData({
                name: product.name || "", 
                slug: product.slug || "", 
                description: product.description || "",
                currentPrice: product.currentPrice?.toString() || "", 
                oldPrice: product.oldPrice?.toString() || "",
                category: product.category?._id || product.category || "", 
                stock: product.stock?.toString() || "0",
                isFeatured: product.isFeatured || false, 
                badge: product.badge || "",
                badgeType: product.badgeType || "orange", 
                status: product.status || "Active",
              });
              
              if (product.image) setImagePreview(product.image);
              if (product.gallery && Array.isArray(product.gallery)) {
                setExistingGallery(product.gallery);
              }
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch initial data", error);
      } finally {
        setIsLoadingData(false);
      }
    };
    loadInitialData();
  }, [editId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as any;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameValue = e.target.value;
    const generatedSlug = nameValue.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    setFormData({ ...formData, name: nameValue, slug: generatedSlug });
  };

  const handleMainFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeMainImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setNewGalleryFiles((prev) => [...prev, ...files]);
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setNewGalleryPreviews((prev) => [...prev, ...newPreviews]);
    }
    if (galleryInputRef.current) galleryInputRef.current.value = "";
  };

  const removeExistingGalleryImage = (urlToRemove: string) => {
    setExistingGallery(prev => prev.filter(url => url !== urlToRemove));
  };

  const removeNewGalleryImage = (indexToRemove: number) => {
    setNewGalleryFiles(prev => prev.filter((_, idx) => idx !== indexToRemove));
    setNewGalleryPreviews(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, typeof value === "boolean" ? String(value) : value);
      });
      
      if (imageFile) submitData.append("image", imageFile);

      if (existingGallery.length > 0) {
        existingGallery.forEach(url => submitData.append("existingGallery", url));
      } else {
        submitData.append("existingGallery", "EMPTY_GALLERY_FLAG");
      }

      newGalleryFiles.forEach(file => submitData.append("gallery", file));

      const url = editId ? `/v1/product/${editId}` : "/v1/product";
      const method = editId ? "PATCH" : "POST";

      const res = await fetch(url, { method, body: submitData });
      const data = await res.json();
      
      if (data.success) {
        router.push("/admin/products");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Submit Error:", error);
      alert("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B1B42]/20 focus:border-[#0B1B42] transition-all";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";

  if (isLoadingData) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#0B1B42]" />
          <p className="text-gray-500 font-medium">Loading editor...</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[1200px] mx-auto pb-12">
      
      {/* 📌 Sticky Action Bar */}
      <div className="sticky top-0 z-40 bg-[#F4F7FC]/80 backdrop-blur-md pb-4 mb-2 pt-2 border-b border-gray-200/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/products" className="p-2.5 bg-white rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight tracking-tight">
              {editId ? "Edit Product" : "Add New Product"}
            </h1>
            <p className="text-[13px] text-gray-500 font-medium">Manage product details, pricing, and images.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link href="/admin/products" className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-50 transition-colors flex-1 sm:flex-none text-center">
            Discard
          </Link>
          <button 
            type="submit" 
            disabled={isSubmitting} 
            className="px-6 py-2.5 bg-[#0B1B42] text-white rounded-xl font-medium text-sm hover:bg-[#152756] transition-colors flex items-center justify-center gap-2 shadow-sm flex-1 sm:flex-none disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {editId ? "Update Product" : "Save Product"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        
        {/* ========================================= */}
        {/* 📌 Left Column (Main Info & Pricing) */}
        {/* ========================================= */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* General Information Card */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100/80">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                <LayoutGrid className="w-4 h-4 text-blue-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-800">Basic Details</h2>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className={labelClass}>Product Name <span className="text-red-500">*</span></label>
                <input type="text" name="name" value={formData.name} onChange={handleNameChange} placeholder="e.g. Premium Raw Honey" className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>Permalink (Slug) <span className="text-red-500">*</span></label>
                <div className="flex items-center">
                  <span className="bg-gray-100 border border-r-0 border-gray-200 text-gray-500 text-sm px-4 py-3 rounded-l-xl">/products/</span>
                  <input type="text" name="slug" value={formData.slug} onChange={handleChange} placeholder="premium-raw-honey" className={`${inputClass} rounded-l-none bg-white`} required />
                </div>
              </div>
              <div>
                <label className={labelClass}>Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows={6} placeholder="Write a detailed product description..." className={inputClass}></textarea>
              </div>
            </div>
          </div>

          {/* Pricing & Inventory Card */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100/80">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                <Package className="w-4 h-4 text-emerald-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-800">Pricing & Inventory</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className={labelClass}>Selling Price (৳) <span className="text-red-500">*</span></label>
                <input type="number" name="currentPrice" value={formData.currentPrice} onChange={handleChange} placeholder="e.g. 500" className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>Regular Price (৳)</label>
                <input type="number" name="oldPrice" value={formData.oldPrice} onChange={handleChange} placeholder="e.g. 600" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Stock Quantity</label>
                <input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="0" className={inputClass} />
              </div>
            </div>
          </div>

        </div>

        {/* ========================================= */}
        {/* 📌 Right Column (Media, Category & Tags) */}
        {/* ========================================= */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Media Card */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100/80">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                <ImageIcon className="w-4 h-4 text-purple-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-800">Product Media</h2>
            </div>

            {/* Main Thumbnail */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Main Thumbnail <span className="text-red-500">*</span></label>
              {imagePreview ? (
                <div className="relative w-full aspect-[4/3] rounded-xl border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center group">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-contain p-2" />
                  <button type="button" onClick={removeMainImage} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all shadow-md">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer flex flex-col items-center justify-center w-full aspect-[4/3] border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-blue-50 hover:border-blue-300 transition-colors">
                  <UploadCloud className="w-10 h-10 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 font-medium">Browse image</p>
                  <p className="text-xs text-gray-400 mt-1">Supports: JPG, PNG, WEBP</p>
                  <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleMainFileChange} required={!editId} />
                </label>
              )}
            </div>

            {/* Gallery Images */}
            <div className="border-t border-gray-100 pt-5">
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-medium text-gray-700">Image Gallery</label>
                <label className="cursor-pointer text-xs font-bold text-[#0B1B42] bg-[#F4F7FC] px-3 py-1.5 rounded-lg hover:bg-[#E8EDF5] flex items-center gap-1.5 transition-colors">
                  <ImagePlus className="w-3.5 h-3.5" /> Add More
                  <input ref={galleryInputRef} type="file" multiple className="hidden" accept="image/*" onChange={handleGalleryChange} />
                </label>
              </div>

              {(existingGallery.length > 0 || newGalleryPreviews.length > 0) ? (
                <div className="grid grid-cols-3 gap-3">
                  {existingGallery.map((url, idx) => (
                    <div key={`exist-${idx}`} className="relative w-full aspect-square rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm group">
                      <img src={url} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                      <button type="button" onClick={() => removeExistingGalleryImage(url)} className="absolute top-1 right-1 bg-red-500/90 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {newGalleryPreviews.map((url, idx) => (
                    <div key={`new-${idx}`} className="relative w-full aspect-square rounded-xl border-2 border-blue-400 overflow-hidden bg-white shadow-sm group">
                      <img src={url} alt={`New Gallery ${idx}`} className="w-full h-full object-cover opacity-90" />
                      <button type="button" onClick={() => removeNewGalleryImage(idx)} className="absolute top-1 right-1 bg-red-500/90 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-full py-8 bg-gray-50 border border-gray-200 border-dashed rounded-xl flex items-center justify-center">
                  <p className="text-xs text-gray-400">No additional images added.</p>
                </div>
              )}
            </div>
          </div>

          {/* Organization & Tags Card */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100/80">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                <Tag className="w-4 h-4 text-orange-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-800">Organization</h2>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className={labelClass}>Category <span className="text-red-500">*</span></label>
                <select name="category" value={formData.category} onChange={handleChange} className={inputClass} required>
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Product Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className={inputClass}>
                  <option value="Active">Active (Published)</option>
                  <option value="Inactive">Inactive (Draft)</option>
                </select>
              </div>

              {/* Modern Toggle Switch for Featured */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div>
                  <h4 className="text-sm font-semibold text-gray-800">Featured Product</h4>
                  <p className="text-xs text-gray-500">Show on homepage sliders</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00B853]"></div>
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Badge Text</label>
                  <input type="text" name="badge" value={formData.badge} onChange={handleChange} placeholder="e.g. Save 10%" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Badge Color</label>
                  <select name="badgeType" value={formData.badgeType} onChange={handleChange} className={inputClass}>
                    <option value="orange">Orange</option>
                    <option value="green">Green</option>
                  </select>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </form>
  );
}

export default function AddProductPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#0B1B42]" />
      </div>
    }>
      <ProductForm />
    </Suspense>
  );
}