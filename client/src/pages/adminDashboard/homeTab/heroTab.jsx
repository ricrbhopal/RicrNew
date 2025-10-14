import React, { useState, useRef, useEffect } from 'react';
import { heroAPI } from '../../../config/api.js';
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
  MdError
} from 'react-icons/md';
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [progress, setProgress] = useState(0);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('create');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

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
    setPreviews(arr.map(f => ({ 
      url: URL.createObjectURL(f), 
      type: f.type || '',
      name: f.name,
      size: f.size 
    })));
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

  const handleUpload = async () => {
    if (!files || files.length === 0) {
      toast.error('Please choose one or more videos first');
      return;
    }

    const formData = new FormData();
    files.forEach((f) => formData.append('video', f));

    try {
      setUploading(true);
      toast.loading('Uploading...', { id: 'upload' });
      const res = await heroAPI.uploadBackgroundVideoWithConfig(formData, {
        onUploadProgress: (evt) => {
          const percent = Math.round((evt.loaded * 100) / evt.total);
          setProgress(percent);
        }
      });
      toast.dismiss('upload');
      toast.success('Video uploaded successfully!');
      setFiles([]);
      previews.forEach((p) => URL.revokeObjectURL(p.url));
      setPreviews([]);
      setProgress(0);
      fetchVideos();
      setActiveTab('manage');
    } catch (err) {
      console.error(err);
      toast.dismiss('upload');
      toast.error(err?.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await heroAPI.getBgVideos();
      setVideos(res.data || []);
    } catch (err) {
      console.error('Failed to fetch bg videos', err);
      toast.error('Failed to load videos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    return () => {
      previews.forEach(p => {
        try { URL.revokeObjectURL(p.url); } catch (e) {}
      });
    };
  }, [previews]);

  const toggleActive = async (id) => {
    try {
      const current = videos.find(x => x._id === id) || {};
      const newStatus = current.status === 'active' ? 'inactive' : 'active';

      setVideos(v => v.map(x => x._id === id ? { ...x, status: newStatus } : x));
      await heroAPI.updateHeroStatus(id, newStatus);
      toast.success(`Video ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`);
    } catch (err) {
      console.error('Toggle failed', err);
      toast.error('Failed to update video status');
      fetchVideos();
    }
  };

  const deleteVideo = async (id) => {
    if (!window.confirm('Are you sure you want to delete this video? This action cannot be undone.')) {
      return;
    }

    const toastId = toast.loading('Deleting video...');
    try {
      await heroAPI.deleteHero(id);
      setVideos(v => v.filter(x => x._id !== id));
      toast.dismiss(toastId);
      toast.success('Video deleted successfully');
    } catch (err) {
      console.error('Delete failed', err);
      toast.dismiss(toastId);
      toast.error('Failed to delete video');
      fetchVideos();
    }
  };

  const clearSelection = () => {
    setFiles([]);
    previews.forEach(p => URL.revokeObjectURL(p.url));
    setPreviews([]);
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const activeVideos = videos.filter(video => video.status === 'active');
  const inactiveVideos = videos.filter(video => video.status === 'inactive');

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hero Section Management</h1>
          <p className="text-gray-600">Upload and manage background videos for your hero section</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('create')}
              className={`flex items-center gap-2 px-6 py-4 font-medium border-b-2 transition-colors ${
                activeTab === 'create' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <MdAdd className="text-lg" />
              Upload Media
              {files.length > 0 && (
                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm">
                  {files.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('manage')}
              className={`flex items-center gap-2 px-6 py-4 font-medium border-b-2 transition-colors ${
                activeTab === 'manage' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <MdVideoLibrary className="text-lg" />
              Manage Media
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                {videos.length}
              </span>
            </button>
          </div>

          {/* Create Tab Content */}
          {activeTab === 'create' && (
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Upload Section */}
                <div className="space-y-6">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <MdCloudUpload className="text-gray-400" />
                      Select Media Files *
                    </label>
                    
                    <div
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      onClick={handleUploadClick}
                      className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
                        dragActive 
                          ? 'border-blue-400 bg-blue-50' 
                          : 'border-gray-300 bg-gray-50 hover:border-blue-300 hover:bg-blue-50/50'
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
                      
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                        dragActive ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        <MdCloudUpload className={`w-8 h-8 ${
                          dragActive ? 'text-blue-600' : 'text-gray-400'
                        }`} />
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {dragActive ? 'Drop media files here' : 'Click to select files'}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Supports MP4, WebM, JPG, PNG • Max 200MB per file
                      </p>
                    </div>
                  </div>

                  {files.length > 0 && (
                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={handleUpload}
                        disabled={uploading}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors flex-1 justify-center"
                      >
                        {uploading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Uploading... {progress}%
                          </>
                        ) : (
                          <>
                            <MdUpload />
                            Upload {files.length} File{files.length > 1 ? 's' : ''}
                          </>
                        )}
                      </button>
                      
                      <button
                        onClick={clearSelection}
                        className="flex items-center gap-2 px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors"
                      >
                        Clear Selection
                      </button>
                    </div>
                  )}

                  {/* Progress Bar */}
                  {progress > 0 && (
                    <div className="pt-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Upload Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 transition-all duration-300 ease-out"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Preview Section */}
                <div className="lg:border-l lg:border-gray-200 lg:pl-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
                  
                  {previews.length > 0 ? (
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {previews.map((preview, idx) => (
                        <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center gap-4 mb-3">
                            <div className="w-16 h-16 bg-black rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
                              {preview.type.startsWith('image/') ? (
                                <img
                                  src={preview.url}
                                  alt={`preview-${idx}`}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <video
                                  src={preview.url}
                                  className="w-full h-full object-cover"
                                  muted
                                  playsInline
                                />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-900 truncate text-sm">
                                {preview.name}
                              </p>
                              <p className="text-gray-600 text-xs mt-1">
                                {(preview.size / (1024 * 1024)).toFixed(2)} MB • {preview.type.split('/')[1].toUpperCase()}
                              </p>
                            </div>
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                      <MdVideoLibrary className="text-gray-400 text-4xl mx-auto mb-3" />
                      <p className="text-gray-500">Selected files will appear here</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Manage Tab Content */}
          {activeTab === 'manage' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    All Media Files ({videos.length})
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {activeVideos.length} active, {inactiveVideos.length} inactive
                  </p>
                </div>
                
                <button
                  onClick={fetchVideos}
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors"
                >
                  <MdRefresh className={`${loading ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-gray-600">Loading media files...</span>
                </div>
              ) : videos.length === 0 ? (
                <div className="text-center py-12">
                  <MdVideoLibrary className="text-gray-400 text-5xl mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No Media Files Found</h4>
                  <p className="text-gray-600 mb-4">Get started by uploading your first background video or image</p>
                  <button
                    onClick={() => setActiveTab('create')}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Upload Media
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos.map(video => (
                    <div
                      key={video._id}
                      className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
                    >
                      <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4">
                        {video.backgroundVideo ? (
                          (() => {
                            const url = video.backgroundVideo || '';
                            const isImage = video.mediaType === 'image' || /\.(jpe?g|png|webp|gif|svg)$/i.test(url);
                            return isImage ? (
                              <img 
                                src={url} 
                                alt="Hero background" 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <video
                                src={url}
                                className="w-full h-full object-cover"
                                muted
                                loop
                                playsInline
                              />
                            );
                          })()
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <MdVideoLibrary className="w-12 h-12" />
                          </div>
                        )}
                        
                        <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${
                          video.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {video.status === 'active' ? 'Active' : 'Inactive'}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <span>
                          {video.mediaType === 'image' ? 'Image' : 'Video'}
                        </span>
                        <span>
                          {video.createdAt ? new Date(video.createdAt).toLocaleDateString() : 'Unknown date'}
                        </span>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleActive(video._id)}
                          className={`flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                            video.status === 'active'
                              ? 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                              : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                          }`}
                        >
                          {video.status === 'active' ? (
                            <>
                              <MdVisibilityOff size={16} />
                              Deactivate
                            </>
                          ) : (
                            <>
                              <MdVisibility size={16} />
                              Activate
                            </>
                          )}
                        </button>
                        
                        <button
                          onClick={() => deleteVideo(video._id)}
                          className="flex items-center justify-center gap-1 py-2 px-3 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg text-sm font-medium transition-colors"
                        >
                          <MdDelete size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            style: {
              background: '#10B981',
            },
          },
          error: {
            style: {
              background: '#EF4444',
            },
          },
        }}
      />
    </div>
  );
}