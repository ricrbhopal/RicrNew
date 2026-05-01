import React, { useEffect, useState } from "react";
import { adminAPI } from "../../../config/api";

const ProgramManager = () => {
  const [programs, setPrograms] = useState([]);
  const [file, setFile] = useState(null);
  const [subtext, setSubtext] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("create"); // "create" or "manage"

  const [editing, setEditing] = useState(null);
  const [editText, setEditText] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // 🔥 FETCH ALL
  const fetchPrograms = async () => {
    const res = await adminAPI.getAllPrograms();
    setPrograms(res.data);
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  // 🔥 UPLOAD
const handleUpload = async () => {
  try {
    if (!file) return alert("Please select a video file");
    if (!subtext.trim()) return alert("Please enter subtext");

    const formData = new FormData();
    formData.append("video", file);
    formData.append("subtext", subtext);

    setLoading(true);
    setUploadProgress(10);

    const res = await adminAPI.uploadProgram(formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(percent);
      },
    });


    setLoading(false);
    setUploadProgress(0);
    setFile(null);
    setSubtext("");

    fetchPrograms();

    alert("✅ Video uploaded successfully!");

  } catch (err) {
    console.error("UPLOAD ERROR:", err);

    setLoading(false);
    setUploadProgress(0);

    alert(
      err?.response?.data?.message ||
      "❌ Upload failed! Check backend / Cloudinary"
    );
  }
};
  // 🔥 DELETE
  const handleDelete = async (id) => {
    await adminAPI.deleteProgram(id);
    setDeleteConfirm(null);
    fetchPrograms();
  };

  // 🔥 STATUS TOGGLE
  const toggleStatus = async (id) => {
    await adminAPI.updateProgramStatus(id);
    fetchPrograms();
  };

  // 🔥 UPDATE
  const handleUpdate = async () => {
    await adminAPI.updateProgram(editing._id, {
      subtext: editText,
    });
    setEditing(null);
    fetchPrograms();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Program Manager</h1>
          <p className="text-gray-600">Manage your program videos and content</p>
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
              Create Program
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
              Manage Programs
            </div>
          </button>
        </div>

        {/* Create Program Tab */}
        {activeTab === "create" && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">Upload New Program Video</h2>
              <p className="text-blue-100 text-sm mt-1">Add a new program video with description</p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* File Upload Area */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Video File</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-500 transition-colors duration-300">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                        <span>Upload a video</span>
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => setFile(e.target.files[0])}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">MP4, WebM, OGG up to 100MB</p>
                  </div>
                </div>
                {file && (
                  <p className="text-sm text-green-600 mt-2">
                    ✓ Selected: {file.name}
                  </p>
                )}
              </div>

              {/* Subtext Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Subtext / Description</label>
                <textarea
                  placeholder="Enter program description or subtext..."
                  value={subtext}
                  onChange={(e) => setSubtext(e.target.value)}
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Upload Progress */}
              {loading && uploadProgress > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Upload Button */}
              <button
                onClick={handleUpload}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02]"
              >
                {loading ? "Uploading..." : "Upload Program Video"}
              </button>
            </div>
          </div>
        )}

        {/* Manage Programs Tab */}
        {activeTab === "manage" && (
          <div className="space-y-6">
   

            {/* Programs Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {programs.map((p, index) => (
                <div
                  key={p._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Video Thumbnail/Player */}
                  <div className="relative bg-black">
                    <video
                      src={p.video}
                      controls
                      className="w-full h-48 object-cover"
                    />
                    <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold ${
                      p.status === "active"
                        ? "bg-green-500 text-white"
                        : "bg-gray-500 text-white"
                    }`}>
                      {p.status === "active" ? "ACTIVE" : "INACTIVE"}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-3">
                    <p className="text-sm text-gray-700 leading-relaxed min-h-[60px]">
                      {p.subtext}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>ID: {p._id.slice(-6)}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => toggleStatus(p._id)}
                        className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                          p.status === "active"
                            ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                            : "bg-green-100 text-green-700 hover:bg-green-200"
                        }`}
                      >
                        {p.status === "active" ? "Deactivate" : "Activate"}
                      </button>

                      <button
                        onClick={() => {
                          setEditing(p);
                          setEditText(p.subtext);
                        }}
                        className="flex-1 bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 transition-all duration-300"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => setDeleteConfirm(p)}
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
            {programs.length === 0 && (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No programs yet</h3>
                <p className="mt-2 text-gray-500">Create your first program in the Create tab</p>
              </div>
            )}
          </div>
        )}

        {/* Edit Modal */}
        {editing && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 rounded-t-2xl">
                <h3 className="text-xl font-semibold text-white">Edit Subtext</h3>
                <p className="text-blue-100 text-sm">Update program description</p>
              </div>
              
              <div className="p-6 space-y-4">
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter program description..."
                />
                
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
                    Update Program
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
                <h3 className="text-xl font-semibold text-white">Delete Program</h3>
                <p className="text-red-100 text-sm">This action cannot be undone</p>
              </div>
              
              <div className="p-6 space-y-4">
                <p className="text-gray-700">
                  Are you sure you want to delete this program? This will permanently remove the video and all associated data.
                </p>
                
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
};

export default ProgramManager;