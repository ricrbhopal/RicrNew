import React, { useState, useEffect, useRef } from 'react';
import { affiliationAPI } from '../../../config/api.js';
import toast, { Toaster } from 'react-hot-toast';
import { 
  MdUpload, 
  MdDelete, 
  MdImage, 
  MdVisibility, 
  MdVisibilityOff, 
  MdAddPhotoAlternate,
  MdCloudUpload,
  MdRefresh,
  MdCheckCircle,
  MdError,
  MdInfo,
  MdClear
} from 'react-icons/md';

export default function AffiliationsTab() {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('create');
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => { 
    fetchItems(); 
    return () => { 
      (previews||[]).forEach(p=>{ 
        try{ URL.revokeObjectURL(p.url) } catch(e){} 
      }) 
    } 
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await affiliationAPI.getAffiliations();
      setItems(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load affiliations');
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
    const fList = e.target.files;
    if (!fList || fList.length === 0) return;
    handleFiles(fList);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const fList = e.dataTransfer?.files;
    if (fList && fList.length > 0) {
      handleFiles(fList);
    }
  };

  const handleFiles = (fileList) => {
    const arr = Array.from(fileList).filter(file => file.type.startsWith('image/'));
    
    if (arr.length === 0) {
      toast.error('Please select valid image files');
      return;
    }

    // Check file sizes
    const oversizedFiles = arr.filter(file => file.size > 10 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      toast.error('Some files exceed 10MB limit');
      return;
    }

    setFiles(arr);
    setPreviews(arr.map(f => ({ 
      url: URL.createObjectURL(f), 
      type: f.type,
      name: f.name,
      size: f.size 
    })));
  };

  const upload = async () => {
    if (!files.length) { 
      toast.error('Please select image(s) first'); 
      return; 
    }
    
    const form = new FormData();
    files.forEach(f => form.append('media', f));
    
    try {
      setUploading(true);
      toast.loading(`Uploading ${files.length} image${files.length > 1 ? 's' : ''}...`, { id: 'aff-upload' });
      
      const res = await affiliationAPI.uploadAffiliationWithConfig(form);
      toast.dismiss('aff-upload');
      toast.success(`${files.length} image${files.length > 1 ? 's' : ''} uploaded successfully!`);
      
      setFiles([]); 
      setPreviews([]);
      try { 
        if (inputRef.current) { 
          inputRef.current.value = null; 
        } 
      } catch(e){}

      if (res && res.data && Array.isArray(res.data.created) && res.data.created.length) {
        setItems(it => [...(it||[]), ...res.data.created]);
      } else {
        fetchItems();
      }
      setActiveTab('manage');
    } catch (err) {
      console.error(err);
      toast.dismiss('aff-upload');
      toast.error(err?.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const toggle = async (id) => {
    try {
      const cur = items.find(i => i._id === id) || {};
      const newStatus = cur.status === 'active' ? 'inactive' : 'active';
      
      setItems(it => it.map(x => x._id === id ? { ...x, status: newStatus } : x));
      await affiliationAPI.updateAffiliationStatus(id, newStatus);
      toast.success(`Image ${newStatus === 'active' ? 'activated' : 'deactivated'}`);
    } catch (err) { 
      console.error(err); 
      toast.error('Failed to update status'); 
      fetchItems(); 
    }
  };

  const del = async (id) => {
    if (!window.confirm('Are you sure you want to delete this affiliation image? This action cannot be undone.')) {
      return;
    }

    const tId = toast.loading('Deleting...');
    try {
      await affiliationAPI.deleteAffiliation(id);
      setItems(it => it.filter(x => x._id !== id));
      toast.dismiss(tId); 
      toast.success('Image deleted successfully');
    } catch (err) { 
      console.error(err); 
      toast.dismiss(tId); 
      toast.error('Delete failed'); 
      fetchItems(); 
    }
  };

  const clearSelection = () => {
    setFiles([]);
    setPreviews([]);
    if (inputRef.current) inputRef.current.value = null;
  };

  const activeItems = items.filter(item => item.status === 'active');
  const inactiveItems = items.filter(item => item.status === 'inactive');

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Affiliation Management</h1>
          <p className="text-gray-600">Manage your organization's accreditation and partnership logos</p>
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
              Upload Images
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
              Manage Affiliations
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                {items.length}
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
                      Select Images *
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
                        accept="image/*" 
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
                        {dragActive ? 'Drop images here' : 'Click to select images'}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Supports JPG, PNG, WebP • Max 10MB per image
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
                            Upload {files.length} Image{files.length > 1 ? 's' : ''}
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
                          <img
                            src={preview.url}
                            alt={`preview-${idx}`}
                            className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 truncate text-sm">
                              {files[idx]?.name || `Image ${idx + 1}`}
                            </p>
                            <p className="text-gray-600 text-xs mt-1">
                              {(files[idx]?.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          </div>
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                      <MdImage className="text-gray-400 text-4xl mx-auto mb-3" />
                      <p className="text-gray-500">Selected images will appear here</p>
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
                    All Affiliations ({items.length})
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {activeItems.length} active, {inactiveItems.length} inactive
                  </p>
                </div>
                
                <button
                  onClick={fetchItems}
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
                  <span className="ml-3 text-gray-600">Loading affiliations...</span>
                </div>
              ) : items.length === 0 ? (
                <div className="text-center py-12">
                  <MdImage className="text-gray-400 text-5xl mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No Affiliations Found</h4>
                  <p className="text-gray-600 mb-4">Get started by uploading your first affiliation image</p>
                  <button
                    onClick={() => setActiveTab('create')}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Upload Images
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {items.map(item => (
                    <div
                      key={item._id}
                      className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
                    >
                      <div className="relative aspect-video bg-gray-50 rounded-lg overflow-hidden mb-4">
                        <img
                          src={item.image}
                          alt="Affiliation"
                          className="w-full h-full object-contain p-4"
                        />
                        
                        <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {item.status === 'active' ? 'Active' : 'Inactive'}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggle(item._id)}
                          className={`flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                            item.status === 'active'
                              ? 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                              : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                          }`}
                        >
                          {item.status === 'active' ? (
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
                          onClick={() => del(item._id)}
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