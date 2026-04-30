

import React, { useState, useRef, useEffect } from "react";
import { adminAPI } from "../../../config/api.js";
import {
  MdUpload,
  MdDelete,
  MdVisibility,
  MdVisibilityOff,
  MdVideoLibrary,
  MdCloudUpload,
  MdImage,
  MdAdd,
  MdRefresh,
  MdCheckCircle,
  MdError,
  MdEdit,
  MdClose,
} from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  // File upload states
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [progress, setProgress] = useState(0);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("create");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // Hero content states
  const [cta1Text, setCta1Text] = useState("");
  const [cta1Link, setCta1Link] = useState("");
  const [cta2Text, setCta2Text] = useState("");
  const [cta2Link, setCta2Link] = useState("");

  // Edit modal states
  const [editingVideo, setEditingVideo] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCta1Text, setEditCta1Text] = useState("");
  const [editCta1Link, setEditCta1Link] = useState("");
  const [editCta2Text, setEditCta2Text] = useState("");
  const [editCta2Link, setEditCta2Link] = useState("");

  // Video preview states
  const [previewVideoId, setPreviewVideoId] = useState(null);

  // Validation
  const isFormValid =
    files.length > 0 &&
    cta1Text.trim() !== "" &&
    cta1Link.trim() !== "" &&
    cta2Text.trim() !== "" &&
    cta2Link.trim() !== "";

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleFile = (fList) => {
    if (!fList || fList.length === 0) return;
    const arr = Array.from(fList);
    setFiles(arr);
    setPreviews(
      arr.map((f) => ({
        url: URL.createObjectURL(f),
        type: f.type || "",
        name: f.name,
        size: f.size,
      }))
    );
    setProgress(0);
    toast.dismiss();
  };

  const handleSelect = (e) => {
    const fList = e.target.files;
    handleFile(fList);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const fList = e.dataTransfer?.files;
    handleFile(fList);
  };

  const handleUploadClick = () => fileInputRef.current?.click();

  // Upload function
  const handleUpload = async () => {
    if (!files || files.length === 0) {
      toast.error("Please choose one or more videos first");
      return;
    }
    if (!isFormValid) {
      toast.error("Please fill all CTA fields before uploading");
      return;
    }
    
    const formData = new FormData();
    files.forEach((f) => formData.append("video", f));

    // Append hero content
    formData.append("cta1Text", cta1Text);
    formData.append("cta1Link", cta1Link);
    formData.append("cta2Text", cta2Text);
    formData.append("cta2Link", cta2Link);

    try {
      setUploading(true);
      toast.loading("Uploading...", { id: "upload" });

      const res = await adminAPI.uploadBackgroundVideoWithConfig(formData, {
        onUploadProgress: (evt) => {
          const percent = Math.round((evt.loaded * 100) / evt.total);
          setProgress(percent);
        },
      });

      toast.dismiss("upload");
      toast.success("Upload successful!");

      // Reset form
      setFiles([]);
      setCta1Text("");
      setCta1Link("");
      setCta2Text("");
      setCta2Link("");
      setPreviews([]);
      setProgress(0);

      fetchVideos();
      setActiveTab("manage");
    } catch (err) {
      console.error(err);
      toast.dismiss("upload");
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // Fetch videos
  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await adminAPI.getBgVideos();
      setVideos(
        (res.data || []).sort((a, b) => (a.order || 0) - (b.order || 0))
      );
    } catch (err) {
      console.error("Failed to fetch bg videos", err);
      toast.error("Failed to load videos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    return () => {
      previews.forEach((p) => {
        try {
          URL.revokeObjectURL(p.url);
        } catch (e) {}
      });
    };
  }, [previews]);

  // Toggle active status
  const toggleActive = async (id) => {
    try {
      const current = videos.find((x) => x._id === id) || {};
      const newStatus = current.status === "active" ? "inactive" : "active";

      setVideos((v) =>
        v.map((x) => (x._id === id ? { ...x, status: newStatus } : x))
      );
      await adminAPI.updateHeroStatus(id, newStatus);
      toast.success(
        `Video ${newStatus === "active" ? "activated" : "deactivated"} successfully`
      );
    } catch (err) {
      console.error("Toggle failed", err);
      toast.error("Failed to update video status");
      fetchVideos();
    }
  };

  // Delete video
  const deleteVideo = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this video? This action cannot be undone."
      )
    ) {
      return;
    }

    const toastId = toast.loading("Deleting video...");
    try {
      await adminAPI.deleteHero(id);
      setVideos((v) => v.filter((x) => x._id !== id));
      toast.dismiss(toastId);
      toast.success("Video deleted successfully");
    } catch (err) {
      console.error("Delete failed", err);
      toast.dismiss(toastId);
      toast.error("Failed to delete video");
      fetchVideos();
    }
  };


  // Open edit modal
  const openEditModal = (video) => {
    setEditingVideo(video);
    setEditCta1Text(video.cta1Text || "");
    setEditCta1Link(video.cta1Link || "");
    setEditCta2Text(video.cta2Text || "");
    setEditCta2Link(video.cta2Link || "");
    setShowEditModal(true);
  };

  // Update hero content
const handleUpdateHero = async () => {
  if (!editingVideo) return;

  const toastId = toast.loading("Updating hero...");

  try {
    const formData = new FormData();

    formData.append("cta1Text", editCta1Text);
    formData.append("cta1Link", editCta1Link);
    formData.append("cta2Text", editCta2Text);
    formData.append("cta2Link", editCta2Link);

    // 🔥 FILE ADD
    if (editingVideo.newFile) {
      formData.append("media", editingVideo.newFile);
    }

    await adminAPI.updateHero(editingVideo._id, formData);

    toast.dismiss(toastId);
    toast.success("Hero updated successfully");

    setShowEditModal(false);
    setEditingVideo(null);

    fetchVideos(); // refresh
  } catch (err) {
    console.error(err);
    toast.dismiss(toastId);
    toast.error("Update failed");
  }
};

  // Update order
  const updateOrder = async (id, order) => {
    try {
      await adminAPI.updateHeroOrder(id, order);
      fetchVideos();
      toast.success("Order updated successfully");
    } catch (err) {
      console.error("Order update failed", err);
      toast.error("Failed to update order");
    }
  };

  const activeVideos = videos.filter((video) => video.status === "active");
  const inactiveVideos = videos.filter((video) => video.status === "inactive");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Hero Section Management
              </h1>
     
            </div>
            <button
              onClick={fetchVideos}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-700 transition-all duration-200 shadow-sm"
            >
              <MdRefresh className={`${loading ? "animate-spin" : ""} text-gray-500`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8 overflow-hidden">
          <div className="flex flex-col sm:flex-row border-b border-gray-100 bg-gray-50/50">
            <button
              onClick={() => setActiveTab("create")}
              className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-4 font-medium transition-all duration-200 ${
                activeTab === "create"
                  ? "bg-white text-blue-600 border-b-2 border-blue-600 -mb-px"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100/50"
              }`}
            >
              <MdAdd className="text-lg" />
              <span>Upload Media</span>
              {files.length > 0 && (
                <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs font-semibold">
                  {files.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("manage")}
              className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-4 font-medium transition-all duration-200 ${
                activeTab === "manage"
                  ? "bg-white text-blue-600 border-b-2 border-blue-600 -mb-px"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100/50"
              }`}
            >
              <MdVideoLibrary className="text-lg" />
              <span>Manage Media</span>
              <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs font-semibold">
                {videos.length}
              </span>
            </button>
          </div>

          {/* Create Tab Content */}
          {activeTab === "create" && (
            <div className="p-4 md:p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row gap-6 xl:gap-8">
                {/* LEFT COLUMN - Upload & Preview Section */}
                <div className="flex-1 lg:w-1/2 space-y-6">
                  {/* Upload Card */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-5 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                          <MdCloudUpload className="text-white text-lg" />
                        </div>
                        <div>
                          <h3 className="text-base md:text-lg font-bold text-gray-900">Upload Media</h3>
                          <p className="text-xs md:text-sm text-gray-500">Select background videos or images</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      {/* Drag & Drop Area */}
                      <div
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={handleUploadClick}
                        className={`border-2 border-dashed rounded-xl p-6 md:p-8 text-center transition-all duration-300 cursor-pointer ${
                          dragActive
                            ? "border-blue-500 bg-blue-50/50 scale-[1.01]"
                            : "border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50/30"
                        }`}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*,video/*"
                          onChange={handleSelect}
                          multiple
                          className="hidden"
                        />

                        <div
                          className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 transition-all duration-300 ${
                            dragActive ? "bg-blue-100 scale-110" : "bg-gray-100"
                          }`}
                        >
                          <MdCloudUpload
                            className={`w-8 h-8 md:w-10 md:h-10 ${
                              dragActive ? "text-blue-600" : "text-gray-400"
                            }`}
                          />
                        </div>

                        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1 md:mb-2">
                          {dragActive ? "Drop to upload" : "Choose files or drag & drop"}
                        </h3>
                        <p className="text-xs md:text-sm text-gray-500 mb-3">
                          MP4, WebM, JPG, PNG • Max 200MB
                        </p>
                        <button
                          type="button"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <MdUpload className="text-gray-500 text-sm" />
                          Browse Files
                        </button>
                      </div>

                      {/* Selected Files List */}
                      {files.length > 0 && (
                        <div className="mt-5 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-gray-700">
                              Selected ({files.length} file{files.length > 1 ? "s" : ""})
                            </span>
              
                          </div>
                          <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                            {files.map((file, idx) => (
                              <div key={idx} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg border border-gray-100">
                                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                                  {file.type.startsWith("image/") ? (
                                    <MdImage className="text-gray-500 text-xl" />
                                  ) : (
                                    <MdVideoLibrary className="text-gray-500 text-xl" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                                  <p className="text-xs text-gray-500">
                                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                                  </p>
                                </div>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const newFiles = files.filter((_, i) => i !== idx);
                                    const newPreviews = previews.filter((_, i) => i !== idx);
                                    setFiles(newFiles);
                                    setPreviews(newPreviews);
                                  }}
                                  className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
                                >
                                  <MdDelete className="text-gray-400 text-sm" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Upload Progress */}
                      {progress > 0 && uploading && (
                        <div className="mt-5 pt-4 border-t border-gray-200">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">Uploading</span>
                            <span className="font-semibold text-blue-600">{progress}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 rounded-full"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Upload Button Section */}
                  {files.length > 0 && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 md:p-5 border border-blue-100">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={handleUpload}
                          disabled={uploading || !isFormValid}
                          className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-blue-400 disabled:to-blue-500 text-white rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                          {uploading ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            <>
                              <MdUpload className="text-lg" />
                              Upload to Server
                            </>
                          )}
                        </button>
                      </div>
                      {!isFormValid && files.length > 0 && (
                        <p className="text-xs text-amber-600 text-center mt-2">
                          Please fill all CTA fields before uploading
                        </p>
                      )}
                    </div>
                  )}

                  {/* Preview Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <MdImage className="text-blue-500 text-lg" />
                      <h3 className="text-base md:text-lg font-bold text-gray-900">Media Preview</h3>
                      {previews.length > 0 && (
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                          {previews.length}
                        </span>
                      )}
                    </div>

                    {previews.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
                        {previews.map((preview, idx) => (
                          <div
                            key={idx}
                            className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
                          >
                            <div className="aspect-video bg-black relative">
                              {preview.type.startsWith("image/") ? (
                                <img
                                  src={preview.url}
                                  alt={`preview-${idx}`}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              ) : (
                                <video
                                  src={preview.url}
                                  className="w-full h-full object-cover"
                                  muted
                                  autoPlay
                                  loop
                                  playsInline
                                />
                              )}
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                <span className="text-white text-xs font-medium bg-black/70 px-2 py-1 rounded-full">
                                  {preview.type.split("/")[0]?.toUpperCase()}
                                </span>
                              </div>
                            </div>
                            <div className="p-2">
                              <p className="font-medium text-gray-900 truncate text-xs">
                                {preview.name}
                              </p>
                              <p className="text-gray-500 text-xs mt-0.5">
                                {(preview.size / (1024 * 1024)).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                        <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <MdVideoLibrary className="text-gray-400 text-2xl" />
                        </div>
                        <p className="text-gray-500 font-medium text-sm">No files selected</p>
                        <p className="text-gray-400 text-xs mt-1">Click the upload area above to select media</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* RIGHT COLUMN - Hero Content Form */}
                <div className="flex-1 lg:w-1/2">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden sticky top-6">
                    <div className="px-5 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-500 rounded-xl flex items-center justify-center shadow-md">
                          <MdEdit className="text-white text-lg" />
                        </div>
                        <div>
                          <h3 className="text-base md:text-lg font-bold text-gray-900">Call to Actions</h3>
                          <p className="text-xs md:text-sm text-gray-500">Customize your hero section buttons</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 space-y-5">
                      {/* Form Validation Warning */}
                      {files.length > 0 && !isFormValid && (
                        <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                          <p className="text-xs text-amber-800 flex items-start gap-2">
                            <MdError className="text-amber-600 text-sm flex-shrink-0 mt-0.5" />
                            <span>Please fill all CTA fields (Text & Link) before uploading</span>
                          </p>
                        </div>
                      )}

                      {/* CTA 1 Section */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
                            <span className="text-xs font-bold text-blue-600">1</span>
                          </div>
                          <label className="text-sm font-semibold text-gray-700">Primary CTA Button</label>
                          <span className="text-xs text-red-500">*</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <input
                              type="text"
                              placeholder="Button Text"
                              value={cta1Text}
                              onChange={(e) => setCta1Text(e.target.value)}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              placeholder="Button Link (https://...)"
                              value={cta1Link}
                              onChange={(e) => setCta1Link(e.target.value)}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      {/* CTA 2 Section */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-xs font-bold text-gray-600">2</span>
                          </div>
                          <label className="text-sm font-semibold text-gray-700">Secondary CTA Button</label>
                          <span className="text-xs text-red-500">*</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <input
                              type="text"
                              placeholder="Button Text"
                              value={cta2Text}
                              onChange={(e) => setCta2Text(e.target.value)}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              placeholder="Button Link (https://...)"
                              value={cta2Link}
                              onChange={(e) => setCta2Link(e.target.value)}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                          </div>
                        </div>
                      </div>

    

                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Manage Tab Content */}
          {activeTab === "manage" && (
            <div className="p-4 md:p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    All Media Files
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    <span className="text-green-600 font-medium">
                      {activeVideos.length} active
                    </span>{" "}
                    •{" "}
                    <span className="text-gray-500">
                      {inactiveVideos.length} inactive
                    </span>{" "}
                    • Total {videos.length}
                  </p>
                </div>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  <span className="mt-4 text-gray-500 font-medium">
                    Loading media files...
                  </span>
                </div>
              ) : videos.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MdVideoLibrary className="text-gray-400 text-4xl" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    No Media Files Found
                  </h4>
                  <p className="text-gray-500 mb-6">
                    Get started by uploading your first background video or image
                  </p>
                  <button
                    onClick={() => setActiveTab("create")}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Upload Media
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {videos.map((video) => (
                    <div
                      key={video._id}
                      className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      {/* Media Preview */}
                      <div
                        className="relative aspect-video bg-gray-900 overflow-hidden cursor-pointer"
                        onMouseEnter={() => setPreviewVideoId(video._id)}
                        onMouseLeave={() => setPreviewVideoId(null)}
                      >
                        {video.backgroundVideo ? (
                          (() => {
                            const url = video.backgroundVideo || "";
                            const isImage =
                              video.mediaType === "image" ||
                              /\.(jpe?g|png|webp|gif|svg)$/i.test(url);
                            return isImage ? (
                              <img
                                src={url}
                                alt="Hero background"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            ) : (
                              <video
                                src={url}
                                className="w-full h-full object-cover"
                                muted
                                loop
                                playsInline
                                autoPlay={previewVideoId === video._id}
                              />
                            );
                          })()
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-800">
                            <MdVideoLibrary className="w-12 h-12 text-gray-600" />
                          </div>
                        )}

                        {/* Status Badge */}
                        <div
                          className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md ${
                            video.status === "active"
                              ? "bg-green-500/90 text-white"
                              : "bg-gray-700/90 text-gray-200"
                          }`}
                        >
                          {video.status === "active" ? "ACTIVE" : "INACTIVE"}
                        </div>

                        {/* Order Badge */}
                        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-black/50 backdrop-blur-md text-white">
                          Order: {video.order || 0}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                            {video.mediaType === "image" ? "IMAGE" : "VIDEO"}
                          </span>
                          <span className="text-xs text-gray-400">
                            {video.createdAt
                              ? new Date(video.createdAt).toLocaleDateString()
                              : "Unknown"}
                          </span>
                        </div>

                        {/* CTAs preview */}
                        {(video.cta1Text || video.cta2Text) && (
                          <div className="flex flex-col gap-1 mb-3 text-xs text-gray-500">
                            {video.cta1Text && (
                              <span className="truncate">
                                🔗 CTA 1: {video.cta1Text}
                              </span>
                            )}
                            {video.cta2Text && (
                              <span className="truncate">
                                🔗 CTA 2: {video.cta2Text}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-2 mt-4">
                          <button
                            onClick={() => openEditModal(video)}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium transition-colors"
                          >
                            <MdEdit size={16} />
                            Edit
                          </button>
                          <button
                            onClick={() => toggleActive(video._id)}
                            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-sm font-medium transition-colors ${
                              video.status === "active"
                                ? "bg-orange-50 text-orange-700 hover:bg-orange-100"
                                : "bg-green-50 text-green-700 hover:bg-green-100"
                            }`}
                          >
                            {video.status === "active" ? (
                              <>
                                <MdVisibilityOff size={16} />
                                Off
                              </>
                            ) : (
                              <>
                                <MdVisibility size={16} />
                                On
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => deleteVideo(video._id)}
                            className="flex items-center justify-center gap-1.5 py-2 px-3 bg-red-50 text-red-700 hover:bg-red-100 rounded-xl text-sm font-medium transition-colors"
                          >
                            <MdDelete size={16} />
                          </button>
                        </div>

                        {/* Order Update */}
                        <form
                          className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100"
                          onSubmit={async (e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            const orderValue = formData.get(
                              `order-${video._id}`
                            );
                            if (!orderValue || isNaN(orderValue)) {
                              toast.error("Please enter a valid order number");
                              return;
                            }
                            await updateOrder(video._id, Number(orderValue));
                          }}
                        >
                          <input
                            type="number"
                            name={`order-${video._id}`}
                            defaultValue={video.order || 0}
                            min={0}
                            className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Order"
                          />
                          <button
                            type="submit"
                            className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-medium transition-colors"
                          >
                            Set
                          </button>
                        </form>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

{/* Edit Modal */}
{showEditModal && editingVideo && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">

      {/* HEADER */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <MdEdit className="text-blue-600 text-xl" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              Edit Hero Content
            </h3>
            <p className="text-sm text-gray-500">
              Update media + CTA buttons
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowEditModal(false)}
          className="p-2 hover:bg-gray-100 rounded-xl"
        >
          <MdClose className="text-gray-500 text-2xl" />
        </button>
      </div>

      {/* BODY */}
      <div className="p-6 space-y-6">

        {/* 🔥 MEDIA CHANGE */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Change Image / Video
          </label>

          <input
            type="file"
            accept="image/*,video/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setEditingVideo((prev) => ({
                  ...prev,
                  newFile: file,
                  preview: URL.createObjectURL(file),
                }));
              }
            }}
            className="w-full border border-gray-300 rounded-xl px-4 py-3"
          />

          {/* PREVIEW */}
          <div className="mt-4 rounded-xl overflow-hidden border">
            {editingVideo?.preview ? (
              editingVideo.newFile?.type.startsWith("image") ? (
                <img
                  src={editingVideo.preview}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <video
                  src={editingVideo.preview}
                  className="w-full h-48 object-cover"
                  controls
                />
              )
            ) : editingVideo.backgroundVideo ? (
              editingVideo.mediaType === "image" ? (
                <img
                  src={editingVideo.backgroundVideo}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <video
                  src={editingVideo.backgroundVideo}
                  className="w-full h-48 object-cover"
                  controls
                />
              )
            ) : null}
          </div>
        </div>

        {/* CTA 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            value={editCta1Text}
            onChange={(e) => setEditCta1Text(e.target.value)}
            placeholder="CTA 1 Text"
            className="border rounded-xl px-4 py-3"
          />
          <input
            type="text"
            value={editCta1Link}
            onChange={(e) => setEditCta1Link(e.target.value)}
            placeholder="CTA 1 Link"
            className="border rounded-xl px-4 py-3"
          />
        </div>

        {/* CTA 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            value={editCta2Text}
            onChange={(e) => setEditCta2Text(e.target.value)}
            placeholder="CTA 2 Text"
            className="border rounded-xl px-4 py-3"
          />
          <input
            type="text"
            value={editCta2Link}
            onChange={(e) => setEditCta2Link(e.target.value)}
            placeholder="CTA 2 Link"
            className="border rounded-xl px-4 py-3"
          />
        </div>

      </div>

      {/* FOOTER */}
      <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex gap-3">
        <button
          onClick={() => setShowEditModal(false)}
          className="flex-1 border px-6 py-3 rounded-xl"
        >
          Cancel
        </button>

        <button
          onClick={handleUpdateHero}
          className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl"
        >
          Save Changes
        </button>
      </div>

    </div>
  </div>
)}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
            borderRadius: "12px",
            padding: "12px 16px",
          },
          success: {
            style: {
              background: "#10B981",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#10B981",
            },
          },
          error: {
            style: {
              background: "#EF4444",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#EF4444",
            },
          },
        }}
      />
    </div>
  );
}
