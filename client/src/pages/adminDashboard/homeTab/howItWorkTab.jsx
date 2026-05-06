import React, { useEffect, useState } from "react";
import { adminAPI } from "../../../config/api";
import { toast } from "react-toastify";

function HowItWorkTab() {
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("");
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [mediaType, setMediaType] = useState("video");
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("create"); // "create" or "manage"

  const [editing, setEditing] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  //  FETCH
  const fetchData = async () => {
    const res = await adminAPI.getAllHowItWorks();
    setList(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  //  DETECT MEDIA TYPE FROM FILE
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Detect file type
    const fileType = file.type;
    if (fileType.startsWith("video/")) {
      setMediaType("video");
    } else if (fileType.startsWith("image/")) {
      setMediaType("image");
    } else {
      toast.error("Please select a valid video or image file");
      return;
    }

    setMediaFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setMediaPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  //  Remove selected media
  const handleRemoveMedia = () => {
    setMediaFile(null);
    setMediaPreview(null);
    setMediaType("video");
    toast.info("Media removed");
  };

  //  CREATE
  const handleCreate = async () => {
    try {
      if (!title.trim()) return toast.error("Please enter title");
      if (!mediaFile) return toast.error("Please select a file");

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

      await adminAPI.createHowItWork(formData);
      clearInterval(interval);
      setUploadProgress(100);

      setTitle("");
      setMediaFile(null);
      setMediaPreview(null);
      setMediaType("video");

      fetchData();
      toast.success(" Tutorial created successfully");

    } catch (err) {
      console.error(err);
      toast.error(" Upload failed");
    } finally {
      setLoading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  //  DELETE
  const handleDelete = async (id) => {
    await adminAPI.deleteHowItWork(id);
    setDeleteConfirm(null);
    fetchData();
    toast.success(" Tutorial deleted successfully");
  };

  //  STATUS TOGGLE
  const toggleStatus = async (id) => {
    await adminAPI.updateHowItWorkStatus(id);
    fetchData();
    toast.success("Status updated successfully");
  };

  //  UPDATE
  const handleUpdate = async () => {
    await adminAPI.updateHowItWork(editing._id, {
      title: editTitle,
    });
    setEditing(null);
    fetchData();
    toast.success(" Title updated successfully");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage your  videos and images</h1>

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
              Create Tutorial
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Manage Tutorials
            </div>
          </button>
        </div>

        {/* Create Tab */}
        {activeTab === "create" && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-5">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-xl">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Add video or image  content</h2>
                  
                </div>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Title Input */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Title
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter tutorial title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value.slice(0, 100))}
                    maxLength="100"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                  <span className="absolute right-3 bottom-3 text-xs text-gray-400">
                    {title.length}/100
                  </span>
                </div>
              </div>

              {/* File Upload Area */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Upload Media (Video or Image)
                  <span className="text-red-500 ml-1">*</span>
                </label>
                
                {!mediaPreview ? (
                  <label className={`
                    relative flex flex-col items-center justify-center w-full 
                    border-2 border-dashed rounded-xl cursor-pointer
                    transition-all duration-200 ease-in-out
                    hover:border-blue-400 hover:bg-blue-50
                  `}>
                    <div className="flex flex-col items-center justify-center py-8 px-4">
                      <div className="p-3 rounded-full bg-gray-100 mb-3">
                        <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">
                        <span className="text-blue-600 font-medium">Click to upload</span>
                        <span className="text-gray-500"> or drag and drop</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        MP4, WebM for videos | PNG, JPG, JPEG for images (Max 100MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="video/*,image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="space-y-3">
                    {/* Preview Section */}
                    <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                      <div className="relative">
                        {mediaType === "video" ? (
                          <video
                            src={mediaPreview}
                            controls
                            className="w-full max-h-80 object-contain"
                          />
                        ) : (
                          <img
                            src={mediaPreview}
                            alt="Preview"
                            className="w-full max-h-80 object-contain"
                          />
                        )}
                        
                        {/* Remove Button */}
                        <button
                          onClick={handleRemoveMedia}
                          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all duration-200 shadow-lg"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    {/* File Info */}
                    <div className="flex items-center justify-between bg-blue-50 rounded-lg p-3 border border-blue-200">
                      <div className="flex items-center gap-3">
                        {mediaType === "video" ? (
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-700">{mediaFile?.name}</p>
                          <p className="text-xs text-gray-500">
                            {(mediaFile?.size / (1024 * 1024)).toFixed(2)} MB • {mediaType.toUpperCase()}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={handleRemoveMedia}
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Upload Progress */}
              {loading && uploadProgress > 0 && (
                <div className="space-y-3 bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-blue-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span className="font-medium text-gray-700">Creating tutorial...</span>
                    </div>
                    <span className="font-semibold text-blue-600">{uploadProgress}%</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Create Button */}
              <button
                onClick={handleCreate}
                disabled={loading || !title.trim() || !mediaFile}
                className={`
                  w-full font-semibold px-6 py-3.5 rounded-xl 
                  transition-all duration-200 transform 
                  flex items-center justify-center space-x-2
                  ${(!loading && title.trim() && mediaFile) 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                {loading ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Upload</span>
                  </>
                )}
              </button>
       
            </div>
          </div>
        )}

        {/* Manage Tab */}
        {activeTab === "manage" && (
          <div className="space-y-6">

          
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {list.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Media Preview */}
                  <div className="relative bg-gray-900 h-48">
                    {item.mediaType === "video" ? (
                      <video
                        src={item.mediaUrl}
                        controls
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={item.mediaUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                    
                    {/* Type Badge */}
                    <div className="absolute top-3 left-3 px-2 py-1 rounded-lg text-xs font-semibold bg-black/70 text-white backdrop-blur-sm">
                      {item.mediaType === "video" ? " VIDEO" : " IMAGE"}
                    </div>
                    
                    {/* Status Badge */}
                    <div className={`absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-semibold ${
                      item.status === "active"
                        ? "bg-green-500 text-white"
                        : "bg-gray-500 text-white"
                    }`}>
                      {item.status === "active" ? "ACTIVE" : "INACTIVE"}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-3">
                    <h3 className="font-bold text-gray-900 text-lg line-clamp-2">
                      {item.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>ID: {item._id.slice(-6)}</span>
                      <span>•</span>
                      <span>Created: {new Date(item.createdAt).toLocaleDateString()}</span>
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
                <h3 className="mt-4 text-lg font-medium text-gray-900">No tutorials yet</h3>
                <p className="mt-2 text-gray-500">Create your first tutorial in the Create tab</p>
                <button
                  onClick={() => setActiveTab("create")}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
                >
                  Create Tutorial
                </button>
              </div>
            )}
          </div>
        )}

        {/* Edit Modal */}
        {editing && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4 rounded-t-2xl">
                <h3 className="text-xl font-semibold text-white">Edit Title</h3>
                <p className="text-blue-100 text-sm">Update  title</p>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value.slice(0, 100))}
                    maxLength="100"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter new title..."
                  />
                  <p className="text-xs text-gray-500 text-right">{editTitle.length}/100</p>
                </div>
                
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => setEditing(null)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
                  >
                    Update Title
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
              <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4 rounded-t-2xl">
                <h3 className="text-xl font-semibold text-white">Delete Tutorial</h3>
                <p className="text-red-100 text-sm">This action cannot be undone</p>
              </div>
              
              <div className="p-6 space-y-4">
                <p className="text-gray-700">
                  Are you sure you want to delete "<strong className="text-red-600">{deleteConfirm.title}</strong>"? 
                  This will permanently remove the {deleteConfirm.mediaType} and all associated data.
                </p>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-xs text-yellow-800">
                     Warning: This action is permanent and cannot be reversed.
                  </p>
                </div>
                
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(deleteConfirm._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300"
                  >
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