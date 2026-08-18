"use client";

import React, { useState, useEffect, useRef } from "react";
import { Plus, Trash2, Edit, Search, Image as ImageIcon, UploadCloud, X } from "lucide-react";

interface IBanner {
  _id: string;
  title: string;
  link: string;
  image: string;
  position: "Hero" | "Promo";
  status: "Active" | "Inactive";
}

export default function BannerManagement() {
  const [banners, setBanners] = useState<IBanner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // এডিট মোড হ্যান্ডেল করার জন্য স্টেট
  const [editId, setEditId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    link: "",
    position: "Hero",
    status: "Active",
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // 📌 ডাটাবেস থেকে ব্যানার লোড
  const fetchBanners = async () => {
    try {
      const res = await fetch("/v1/banner");
      const data = await res.json();
      if (data.success) {
        setBanners(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch banners", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // 📌 এডিট বাটনে ক্লিক করলে ফর্মে ডাটা লোড করা
  const handleEditClick = (banner: IBanner) => {
    setEditId(banner._id);
    setFormData({
      title: banner.title || "",
      link: banner.link || "",
      position: banner.position,
      status: banner.status,
    });
    setImagePreview(banner.image || null);
    setImageFile(null);
  };

  // 📌 এডিট ক্যানসেল করা
  const handleCancelEdit = () => {
    setEditId(null);
    setFormData({ title: "", link: "", position: "Hero", status: "Active" });
    removeImage();
  };

  // 📌 ব্যানার তৈরি বা আপডেট করা (Create & Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("link", formData.link);
      submitData.append("position", formData.position);
      submitData.append("status", formData.status);
      
      if (imageFile) {
        submitData.append("image", imageFile);
      }

      const url = editId ? `/v1/banner/${editId}` : "/v1/banner";
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
          fetchBanners();
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

  // 📌 ব্যানার ডিলিট করা
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this banner?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/v1/banner/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        setBanners(banners.filter((banner) => banner._id !== id));
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Failed to delete banner.");
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Banner Management</h1>
        <p className="text-sm text-gray-500">Create, edit and delete your website banners.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Side: Create / Edit Banner Form */}
        <div className="xl:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
          <div className="flex justify-between items-center mb-5 border-b pb-2">
            <h2 className="text-lg font-bold text-gray-800">
              {editId ? "Edit Banner" : "Add New Banner"}
            </h2>
            {editId && (
              <button onClick={handleCancelEdit} className="text-xs text-red-500 hover:underline font-medium">
                Cancel Edit
              </button>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Banner Image *</label>
              
              {imagePreview ? (
                <div className="relative w-full h-32 rounded-xl border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center">
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
                    <p className="text-sm text-gray-500 font-medium">Click to upload banner</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG (1920x1080 recommended)</p>
                  </div>
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileChange}
                    required={!editId} // নতুন ব্যানার তৈরির সময় ইমেজ লাগবেই
                  />
                </label>
              )}
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Banner Title</label>
              <input 
                type="text" 
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Special Offer 50% Off" 
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1B42]"
              />
            </div>
            
            {/* Link */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Link</label>
              <input 
                type="text" 
                name="link"
                value={formData.link}
                onChange={handleChange}
                placeholder="e.g. /shop or #offer" 
                className="w-full border border-gray-300 bg-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1B42]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Position */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <select 
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1B42]"
                >
                  <option value="Hero">Hero Slider (Top)</option>
                  <option value="Promo">Promo Banner (Middle)</option>
                </select>
              </div>

              {/* Status */}
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
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-[#0B1B42] text-white font-medium px-4 py-3 rounded-lg mt-4 hover:bg-[#152756] transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <><Plus className="w-4 h-4" /> {editId ? "Update Banner" : "Create Banner"}</>
              )}
            </button>
          </form>
        </div>

        {/* Right Side: Banner List Table */}
        <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h2 className="text-lg font-bold text-gray-800">All Banners</h2>
            <div className="relative">
              <input type="text" placeholder="Search banner..." className="border border-gray-300 rounded-md text-sm pl-3 pr-8 py-1.5 w-48 lg:w-64 focus:outline-none focus:border-[#0B1B42]" />
              <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-100 text-gray-600 font-semibold border-b border-gray-200">
                <tr>
                  <th className="p-4">Image</th>
                  <th className="p-4">Title & Link</th>
                  <th className="p-4 text-center">Position</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">
                      Loading banners...
                    </td>
                  </tr>
                ) : banners.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">
                      No banners found. Please create one.
                    </td>
                  </tr>
                ) : (
                  banners.map((banner) => (
                    <tr key={banner._id} className="hover:bg-gray-50">
                      <td className="p-4">
                        <div className="w-24 h-12 rounded bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden">
                          {banner.image ? (
                            <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon className="w-5 h-5 text-gray-300" />
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="font-semibold text-gray-800 truncate w-40">{banner.title || "No Title"}</p>
                        <p className="text-xs text-gray-400 mt-0.5 truncate w-40">Link: {banner.link || "N/A"}</p>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${banner.position === 'Hero' ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'bg-purple-50 text-purple-600 border border-purple-200'}`}>
                          {banner.position}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${banner.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
                          {banner.status}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex justify-center gap-2">
                          <button 
                            onClick={() => handleEditClick(banner)}
                            className="bg-[#FFC107] text-white p-1.5 rounded hover:bg-[#E0A800] transition-colors" 
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(banner._id)}
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