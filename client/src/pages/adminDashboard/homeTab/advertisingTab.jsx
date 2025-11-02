import React, { useState, useEffect, useRef } from 'react';
import { adminAPI } from '../../../config/api';
import toast, { Toaster } from 'react-hot-toast';
import { 
  MdUpload, 
  MdDelete, 
  MdImage, 
  MdVideocam,
  MdVisibility, 
  MdVisibilityOff, 
  MdAddPhotoAlternate,
  MdCloudUpload,
  MdRefresh,
  MdClear
} from 'react-icons/md';

function AdverstandingTab() {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('create');
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    fetchAds();
    return () => {
      previews.forEach(preview => {
        try { URL.revokeObjectURL(preview.url); } catch (e) {}
      });
    };
  }, []);

  const fetchAds = async () => {
    setLoading(true);
    try {
  const res = await adminAPI.getAllAdvertising();
      setAds(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load ads');
    } finally {
      setLoading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const onSelect = (e) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;
    handleFiles(fileList);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const fileList = e.dataTransfer?.files;
    if (fileList && fileList.length > 0) {
      handleFiles(fileList);
    }
  };

  const handleFiles = (fileList) => {
    const arr = Array.from(fileList).filter(file => 
      file.type.startsWith('image/') || file.type.startsWith('video/')
    );
    
    if (arr.length === 0) {
      toast.error('Please select valid image or video files');
      return;
    }

    // Check file sizes
    const oversizedFiles = arr.filter(file => file.size > 10 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      toast.error('Some files exceed 10MB limit');
      return;
    }

    setFiles(arr);
    setPreviews(arr.map(file => ({ 
      url: URL.createObjectURL(file), 
      type: file.type.startsWith('video/') ? 'video' : 'image',
      name: file.name,
      size: file.size 
    })));
  };

  const upload = async () => {
    if (!files.length) { 
      toast.error('Please select media file(s) first'); 
      return; 
    }
    
    try {
      setUploading(true);
      toast.loading(`Uploading ${files.length} ad${files.length > 1 ? 's' : ''}...`, { id: 'ad-upload' });
      
      // Upload each file individually
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
    formData.append('media', file);
    formData.append('medial', file.type.startsWith('video/') ? 'video' : 'image');
    const response = await adminAPI.createAdvertising(formData);
    return response.data;
      });

      const results = await Promise.all(uploadPromises);
      
      toast.dismiss('ad-upload');
      toast.success(`${files.length} ad${files.length > 1 ? 's' : ''} uploaded successfully!`);
      
      setFiles([]); 
      setPreviews([]);
      if (inputRef.current) inputRef.current.value = null;
      
      // Refresh the ads list
      fetchAds();
      setActiveTab('manage');
    } catch (err) {
      console.error(err);
      toast.dismiss('ad-upload');
      toast.error(err?.response?.data?.error || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const toggleStatus = async (ad) => {
    try {
      const newStatus = ad.status === 'active' ? 'inactive' : 'active';
      
      // Optimistic update
      setAds(prev => prev.map(item => 
        item._id === ad._id ? { ...item, status: newStatus } : item
      ));

  await adminAPI.updateAdvertising(ad._id, { status: newStatus });
      toast.success(`Ad ${newStatus === 'active' ? 'activated' : 'deactivated'}`);
    } catch (err) { 
      console.error(err); 
      toast.error('Failed to update status'); 
      fetchAds(); // Revert on error
    }
  };

  const deleteAd = async (id) => {
    if (!window.confirm('Are you sure you want to delete this ad? This action cannot be undone.')) {
      return;
    }

    const toastId = toast.loading('Deleting ad...');
    try {
  await adminAPI.deleteAdvertising(id);
      setAds(prev => prev.filter(ad => ad._id !== id));
      toast.dismiss(toastId); 
      toast.success('Ad deleted successfully');
    } catch (err) { 
      console.error(err); 
      toast.dismiss(toastId); 
      toast.error('Delete failed'); 
      fetchAds(); 
    }
  };

  const clearSelection = () => {
    setFiles([]);
    setPreviews([]);
    if (inputRef.current) inputRef.current.value = null;
  };

  const activeAds = ads.filter(ad => ad.status === 'active');
  const inactiveAds = ads.filter(ad => ad.status === 'inactive');

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ad Management</h1>
          <p className="text-gray-600">Upload and manage your advertisement content</p>
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
              <MdAddPhotoAlternate className="text-lg" />
              Upload Ads
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
              <MdImage className="text-lg" />
              Manage Ads
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                {ads.length}
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
                      className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
                        dragActive 
                          ? 'border-blue-400 bg-blue-50' 
                          : 'border-gray-300 bg-gray-50 hover:border-blue-300 hover:bg-blue-50/50'
                      }`}
                      onClick={() => inputRef.current?.click()}
                    >
                      <input 
                        ref={inputRef} 
                        type="file" 
                        accept="image/*,video/*" 
                        multiple 
                        className="hidden" 
                        onChange={onSelect} 
                      />
                      
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                        dragActive ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        <MdCloudUpload className={`w-8 h-8 ${
                          dragActive ? 'text-blue-600' : 'text-gray-400'
                        }`} />
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {dragActive ? 'Drop media here' : 'Click to select media'}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Supports JPG, PNG, WebP, MP4, MOV • Max 10MB per file
                      </p>
                    </div>
                  </div>

                  {files.length > 0 && (
                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={upload}
                        disabled={uploading}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors flex-1 justify-center"
                      >
                        {uploading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <MdUpload />
                            Upload {files.length} Ad{files.length > 1 ? 's' : ''}
                          </>
                        )}
                      </button>
                      
                      <button
                        onClick={clearSelection}
                        className="flex items-center gap-2 px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors"
                      >
                        <MdClear />
                        Clear
                      </button>
                    </div>
                  )}
                </div>

                {/* Preview Section */}
                <div className="lg:border-l lg:border-gray-200 lg:pl-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
                  
                  {previews.length > 0 ? (
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {previews.map((preview, idx) => (
                        <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-4">
                          <div className="relative">
                            {preview.type === 'video' ? (
                              <video
                                src={preview.url}
                                className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                              />
                            ) : (
                              <img
                                src={preview.url}
                                alt={`preview-${idx}`}
                                className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                              />
                            )}
                            <div className="absolute -top-1 -right-1">
                              {preview.type === 'video' ? (
                                <MdVideocam className="w-4 h-4 text-blue-600 bg-white rounded-full p-0.5" />
                              ) : (
                                <MdImage className="w-4 h-4 text-green-600 bg-white rounded-full p-0.5" />
                              )}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 truncate text-sm">
                              {files[idx]?.name || `Media ${idx + 1}`}
                            </p>
                            <p className="text-gray-600 text-xs mt-1">
                              {(files[idx]?.size / (1024 * 1024)).toFixed(2)} MB • {preview.type}
                            </p>
                          </div>
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                      <MdImage className="text-gray-400 text-4xl mx-auto mb-3" />
                      <p className="text-gray-500">Selected media files will appear here</p>
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
                    All Ads ({ads.length})
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {activeAds.length} active, {inactiveAds.length} inactive
                  </p>
                </div>
                
                <button
                  onClick={fetchAds}
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
                  <span className="ml-3 text-gray-600">Loading ads...</span>
                </div>
              ) : ads.length === 0 ? (
                <div className="text-center py-12">
                  <MdImage className="text-gray-400 text-5xl mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No Ads Found</h4>
                  <p className="text-gray-600 mb-4">Get started by uploading your first advertisement</p>
                  <button
                    onClick={() => setActiveTab('create')}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Upload Ads
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {ads.map(ad => (
                    <div
                      key={ad._id}
                      className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
                    >
                      <div className="relative aspect-video bg-gray-50 rounded-lg overflow-hidden mb-4">
                        {ad.medial === 'video' ? (
                          <video
                            src={ad.url}
                            className="w-full h-full object-cover"
                            controls
                          />
                        ) : (
                          <img
                            src={ad.url}
                            alt="Advertisement"
                            className="w-full h-full object-cover"
                          />
                        )}
                        
                        <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${
                          ad.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {ad.status === 'active' ? 'Active' : 'Inactive'}
                        </div>

                        <div className="absolute top-3 right-3">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                            {ad.medial}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-500 mb-3">
                        Uploaded: {new Date(ad.createdAt).toLocaleDateString()}
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleStatus(ad)}
                          className={`flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                            ad.status === 'active'
                              ? 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                              : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                          }`}
                        >
                          {ad.status === 'active' ? (
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
                          onClick={() => deleteAd(ad._id)}
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

export default AdverstandingTab;