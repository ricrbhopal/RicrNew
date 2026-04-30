import React, { useEffect, useState } from "react";
import { adminAPI } from "../../../config/api";

function HowItWorkTab() {
  const [list, setList] = useState([]);
  const [activeTab, setActiveTab] = useState("create");
  
  // Create form state
  const [title, setTitle] = useState("");
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [mediaType, setMediaType] = useState("video");
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // Edit state
  const [editing, setEditing] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // 🔥 FETCH ALL
  const fetchData = async () => {
    const res = await adminAPI.getAllWhyRICR();
    setList(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔥 FILE CHANGE & AUTO-DETECT MEDIA TYPE
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type.startsWith("video/")) {
      setMediaType("video");
    } else if (file.type.startsWith("image/")) {
      setMediaType("image");
    } else {
      alert("Please select a valid video or image file");
      return;
    }

    setMediaFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setMediaPreview(reader.result);
    reader.readAsDataURL(file);
  };

  // 🔥 CREATE
  const handleCreate = async () => {
    if (!title.trim()) return alert("Please enter a title");
    if (!mediaFile) return alert("Please select a video or image");

    setLoading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("mediaType", mediaType);
    formData.append("media", mediaFile);

    // Simulate progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      await adminAPI.createWhyRICR(formData);
      clearInterval(interval);
      setUploadProgress(100);
      
      setTimeout(() => {
        setTitle("");
        setMediaFile(null);
        setMediaPreview(null);
        setMediaType("video");
        fetchData();
        alert("Why RICR content created successfully!");
        setLoading(false);
        setUploadProgress(0);
      }, 500);
    } catch (err) {
      clearInterval(interval);
      alert("Error creating content");
      setLoading(false);
      setUploadProgress(0);
    }
  };

  // 🔥 DELETE
  const handleDelete = async (id) => {
    try {
      await adminAPI.deleteWhyRICR(id);
      setDeleteConfirm(null);
      fetchData();
    } catch (err) {
      alert("Error deleting");
    }
  };

  // 🔥 STATUS TOGGLE
  const toggleStatus = async (id) => {
    try {
      await adminAPI.updateWhyRICRStatus(id);
      fetchData();
    } catch (err) {
      alert("Error updating status");
    }
  };

  // 🔥 UPDATE TITLE
  const handleUpdate = async () => {
    if (!editTitle.trim()) return alert("Title cannot be empty");
    
    const formData = new FormData();
    formData.append("title", editTitle);

    try {
      await adminAPI.updateWhyRICR(editing._id, formData);
      setEditing(null);
      fetchData();
    } catch (err) {
      alert("Error updating title");
    }
  };

  // Statistics
  const totalItems = list.length;
  const activeItems = list.filter(item => item.status === "active").length;
  const inactiveItems = list.filter(item => item.status === "inactive").length;
  const videoCount = list.filter(item => item.mediaType === "video").length;
  const imageCount = list.filter(item => item.mediaType === "image").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Why RICR Manager</h1>
          <p className="text-gray-600">Manage your "Why RICR" video and image content</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("create")}
            className={`px-6 py-3 text-sm font-medium transition-all duration-300 rounded-t-lg ${
              activeTab === "create"
                ? "bg-white text-blue-600 border-b-2 border-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New
            </div>
          </button>
          
          <button
            onClick={() => setActiveTab("manage")}
            className={`px-6 py-3 text-sm font-medium transition-all duration-300 rounded-t-lg ${
              activeTab === "manage"
                ? "bg-white text-blue-600 border-b-2 border-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Manage Items
            </div>
          </button>
        </div>

        {/* ========== CREATE TAB ========== */}
        {activeTab === "create" && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">Upload New Content</h2>
              <p className="text-blue-100 text-sm mt-1">Add a video or image with a title</p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Title Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  placeholder="Enter a compelling title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* File Upload Area */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Upload Media (Video or Image)</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-500 transition-colors duration-300">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                        <span>Select a file</span>
                        <input type="file" accept="video/*,image/*" onChange={handleFileChange} className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">MP4, WebM, MOV for videos | PNG, JPG, JPEG for images</p>
                  </div>
                </div>
                
                {/* Preview Section */}
                {mediaPreview && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                    <div className="rounded-lg overflow-hidden border border-gray-200 bg-black">
                      {mediaType === "video" ? (
                        <video src={mediaPreview} controls className="w-full max-h-80 object-contain" />
                      ) : (
                        <img src={mediaPreview} alt="Preview" className="w-full max-h-80 object-contain" />
                      )}
                    </div>
                    <p className="text-xs text-green-600 mt-2">
                      ✓ {mediaType === "video" ? "Video" : "Image"} selected: {mediaFile?.name}
                    </p>
                  </div>
                )}
              </div>

              {/* Auto-detected Media Type Badge */}
              {mediaFile && (
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <div className="flex items-center gap-2">
                    {mediaType === "video" ? (
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                    <span className="text-sm text-gray-700">
                      Media Type: <strong className="text-blue-700">{mediaType.toUpperCase()}</strong> (Auto-detected)
                    </span>
                  </div>
                </div>
              )}

              {/* Upload Progress */}
              {loading && uploadProgress > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                </div>
              )}

              {/* Create Button */}
              <button
                onClick={handleCreate}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02]"
              >
                {loading ? "Creating..." : "Create Why RICR Content"}
              </button>
            </div>
          </div>
        )}

        {/* ========== MANAGE TAB ========== */}
        {activeTab === "manage" && (
          <div className="space-y-6">
            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-blue-500">
                <p className="text-sm text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-green-500">
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">{activeItems}</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-purple-500">
                <p className="text-sm text-gray-600">Videos</p>
                <p className="text-2xl font-bold text-gray-900">{videoCount}</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-orange-500">
                <p className="text-sm text-gray-600">Images</p>
                <p className="text-2xl font-bold text-gray-900">{imageCount}</p>
              </div>
            </div>

            {/* Items Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {list.map((item) => (
                <div key={item._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  {/* Media Preview */}
                  <div className="relative bg-gray-900 h-48">
                    {item.mediaType === "video" ? (
                      <video src={item.mediaUrl} controls className="w-full h-full object-cover" />
                    ) : (
                      <img src={item.mediaUrl} alt={item.title} className="w-full h-full object-cover" />
                    )}
                    {/* Type Badge */}
                    <div className="absolute top-3 left-3 px-2 py-1 rounded-lg text-xs font-semibold bg-black/70 text-white backdrop-blur-sm">
                      {item.mediaType === "video" ? "🎥 VIDEO" : "🖼️ IMAGE"}
                    </div>
                    {/* Status Badge */}
                    <div className={`absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-semibold ${
                      item.status === "active" ? "bg-green-500 text-white" : "bg-gray-500 text-white"
                    }`}>
                      {item.status === "active" ? "ACTIVE" : "INACTIVE"}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-3">
                    <h3 className="font-bold text-gray-900 text-lg line-clamp-2">{item.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>ID: {item._id.slice(-6)}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => toggleStatus(item._id)}
                        className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                          item.status === "active"
                            ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                            : "bg-green-100 text-green-700 hover:bg-green-200"
                        }`}
                      >
                        {item.status === "active" ? "Deactivate" : "Activate"}
                      </button>

                      <button
                        onClick={() => {
                          setEditing(item);
                          setEditTitle(item.title);
                        }}
                        className="flex-1 bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 transition-all duration-300"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => setDeleteConfirm(item)}
                        className="flex-1 bg-red-100 text-red-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-200 transition-all duration-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {list.length === 0 && (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No items found</h3>
                <p className="mt-2 text-gray-500">Create your first Why RICR item in the Create tab</p>
              </div>
            )}
          </div>
        )}

        {/* ========== EDIT MODAL ========== */}
        {editing && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 rounded-t-2xl">
                <h3 className="text-xl font-semibold text-white">Edit Title</h3>
                <p className="text-blue-100 text-sm">Update the title of this item</p>
              </div>
              <div className="p-6 space-y-4">
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter new title..."
                />
                <div className="flex gap-3 justify-end">
                  <button onClick={() => setEditing(null)} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-300">
                    Cancel
                  </button>
                  <button onClick={handleUpdate} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300">
                    Update Title
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========== DELETE CONFIRMATION MODAL ========== */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
              <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4 rounded-t-2xl">
                <h3 className="text-xl font-semibold text-white">Delete Content</h3>
                <p className="text-red-100 text-sm">This action cannot be undone</p>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-gray-700">
                  Are you sure you want to delete "<strong>{deleteConfirm.title}</strong>"? This will permanently remove the{' '}
                  {deleteConfirm.mediaType} and all associated data.
                </p>
                <div className="flex gap-3 justify-end">
                  <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-300">
                    Cancel
                  </button>
                  <button onClick={() => handleDelete(deleteConfirm._id)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300">
                    Delete Permanently
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HowItWorkTab;