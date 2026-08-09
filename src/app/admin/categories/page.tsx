"use client";

import React, { useState, useEffect, useRef } from "react";
import { Plus, Trash2, Edit, Search, Image as ImageIcon, Star, UploadCloud, X } from "lucide-react";

interface ICategory {
  _id: string;
  name: string;
  slug: string;
  icon: string;
  isFeatured: boolean;
  status: "Active" | "Inactive";
}

export default function CategoryManagement() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 📌 এডিট মোড হ্যান্ডেল করার জন্য স্টেট
  const [editId, setEditId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    isFeatured: false,
    status: "Active",
  });
  
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // 📌 ডাটাবেস থেকে ক্যাটাগরি লোড
  const fetchCategories = async () => {
    try {
      const res = await fetch("/v1/category");
      const data = await res.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch categories", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIconFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setIconFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // 📌 এডিট বাটনে ক্লিক করলে ফর্মে ডাটা লোড করার ফাংশন
  const handleEditClick = (cat: ICategory) => {
    setEditId(cat._id);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      isFeatured: cat.isFeatured,
      status: cat.status,
    });
    setImagePreview(cat.icon || null);
    setIconFile(null);
  };

  // 📌 এডিট ক্যানসেল করার ফাংশন
  const handleCancelEdit = () => {
    setEditId(null);
    setFormData({ name: "", slug: "", isFeatured: false, status: "Active" });
    removeImage();
  };

  // 📌 ক্যাটাগরি তৈরি বা আপডেট করা (Create & Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("slug", formData.slug);
      submitData.append("status", formData.status);
      submitData.append("isFeatured", String(formData.isFeatured));
      
      if (iconFile) {
        submitData.append("icon", iconFile);
      }

      // যদি editId থাকে তবে PATCH (Update), নাons থাকলে POST (Create)
      const url = editId ? `/v1/category/${editId}` : "/v1/category";
      const method = editId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method: method,
        body: submitData, 
      });

      const contentType = res.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await res.json();
        
        if (data.success) {
          handleCancelEdit();
          fetchCategories();
        } else {
          alert(data.message);
        }
      } else {
        alert("Server returned an invalid response.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Something went wrong while submitting the form!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this category?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/v1/category/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        setCategories(categories.filter((cat) => cat._id !== id));
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Failed to delete category.");
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Category Management</h1>
        <p className="text-sm text-gray-500">Create, edit and delete your product categories.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Side: Create / Edit Category Form */}
        <div className="xl:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
          <div className="flex justify-between items-center mb-5 border-b pb-2">
            <h2 className="text-lg font-bold text-gray-800">
              {editId ? "Edit Category" : "Add New Category"}
            </h2>
            {editId && (
              <button onClick={handleCancelEdit} className="text-xs text-red-500 hover:underline font-medium">
                Cancel Edit
              </button>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category Icon</label>
              
              {imagePreview ? (
                <div className="relative w-32 h-32 rounded-xl border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover p-2" />
                  <button 
                    type="button" 
                    onClick={removeImage}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 font-medium">Click to upload icon</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 2MB</p>
                  </div>
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category Name *</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleNameChange}
                placeholder="e.g. Premium Green Tea" 
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1B42]"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug URL</label>
              <input 
                type="text" 
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="e.g. premium-green-tea" 
                className="w-full border border-gray-300 bg-gray-50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1B42]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select 
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1B42]"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="flex items-center gap-2 pt-1 pb-2">
              <input 
                type="checkbox" 
                id="isFeatured" 
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="w-4 h-4 text-[#0B1B42] rounded border-gray-300 focus:ring-[#0B1B42] cursor-pointer"
              />
              <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700 cursor-pointer flex items-center gap-1">
                <Star className="w-4 h-4 text-orange-400 fill-current" /> Show in Featured Categories
              </label>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-[#0B1B42] text-white font-medium px-4 py-3 rounded-lg hover:bg-[#152756] transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <><Plus className="w-4 h-4" /> {editId ? "Update Category" : "Create Category"}</>
              )}
            </button>
          </form>
        </div>

        {/* Right Side: Category List Table */}
        <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h2 className="text-lg font-bold text-gray-800">All Categories</h2>
            <div className="relative">
              <input type="text" placeholder="Search category..." className="border border-gray-300 rounded-md text-sm pl-3 pr-8 py-1.5 w-48 lg:w-64 focus:outline-none focus:border-[#0B1B42]" />
              <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-100 text-gray-600 font-semibold border-b border-gray-200">
                <tr>
                  <th className="p-4">Icon</th>
                  <th className="p-4">Category Name</th>
                  <th className="p-4">Featured</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">
                      Loading categories...
                    </td>
                  </tr>
                ) : categories.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">
                      No categories found. Please create one.
                    </td>
                  </tr>
                ) : (
                  categories.map((cat) => (
                    <tr key={cat._id} className="hover:bg-gray-50">
                      <td className="p-4">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden">
                          {cat.icon ? (
                            <img src={cat.icon} alt={cat.name} className="w-full h-full object-cover p-1" />
                          ) : (
                            <ImageIcon className="w-5 h-5 text-gray-300" />
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="font-semibold text-gray-800">{cat.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">/{cat.slug}</p>
                      </td>
                      <td className="p-4">
                        {cat.isFeatured ? (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-orange-600 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full w-fit">
                            <Star className="w-3 h-3 fill-current" /> Featured
                          </span>
                        ) : (
                          <span className="text-gray-400 text-xs">-</span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${cat.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
                          {cat.status}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex justify-center gap-2">
                          <button 
                            onClick={() => handleEditClick(cat)}
                            className="bg-[#FFC107] text-white p-1.5 rounded hover:bg-[#E0A800] transition-colors" 
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(cat._id)}
                            className="bg-[#DC3545] text-white p-1.5 rounded hover:bg-[#C82333] transition-colors" 
                            title="Delete"
                          >
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
    </div>
  );
}