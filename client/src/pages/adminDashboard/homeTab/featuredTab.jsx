import React, { useState, useEffect, useRef } from 'react';
import { adminAPI } from '../../../config/api';
import toast, { Toaster } from 'react-hot-toast';
import { 
  MdUpload, 
  MdDelete, 
  MdImage, 
  MdRefresh, 
  MdClear, 
  MdVisibility, 
  MdVisibilityOff,
  MdLink,
  MdAdd,
  MdPerson
} from 'react-icons/md';

const FeaturedTab = () => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [mediaUrl, setMediaUrl] = useState('');
  const [activeTab, setActiveTab] = useState('create');
  const inputRef = useRef(null);

  useEffect(() => {
    fetchItems();
    return () => {
      previews.forEach(p => { try { URL.revokeObjectURL(p.url); } catch (e) {} });
    };
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await adminAPI.getAllFeaturedInMedia();
      setItems(res.data || []);
    } catch (err) {
      toast.error('Failed to load featured media');
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFiles = (fileList) => {
    const arr = Array.from(fileList).filter(file => file.type.startsWith('image/'));
    if (arr.length === 0) {
      toast.error('Please select valid image files');
      return;
    }
    setFiles(arr);
    setPreviews(arr.map(file => ({ 
      url: URL.createObjectURL(file), 
      name: file.name, 
      size: file.size 
    })));
  };

  const onSelect = (e) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;
    handleFiles(fileList);
  };

  const upload = async () => {
    if (!files.length && !mediaUrl.trim()) {
      toast.error('Please select image file(s) or enter a URL');
      return;
    }
    try {
      setUploading(true);
      toast.loading(`Uploading ${files.length || mediaUrl ? 1 : 0} item(s)...`, { id: 'featured-upload' });
      const uploadPromises = [];
      if (files.length) {
        files.forEach(file => {
          const formData = new FormData();
          formData.append('image', file);
          formData.append('MediaUrl', mediaUrl.trim());
          uploadPromises.push(adminAPI.createFeaturedInMedia(formData));
        });
      }
      if (!files.length && mediaUrl.trim()) {
        const formData = new FormData();
        formData.append('MediaUrl', mediaUrl.trim());
        uploadPromises.push(adminAPI.createFeaturedInMedia(formData));
      }
      await Promise.all(uploadPromises);
      toast.dismiss('featured-upload');
      toast.success('Upload successful!');
      clearForm();
      setActiveTab('manage');
      fetchItems();
    } catch (err) {
      toast.dismiss('featured-upload');
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const clearForm = () => {
    setFiles([]); 
    setPreviews([]); 
    setMediaUrl('');
    if (inputRef.current) inputRef.current.value = null;
  };

  const deleteItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    const toastId = toast.loading('Deleting...');
    try {
      await adminAPI.deleteFeaturedInMedia(id);
      setItems(prev => prev.filter(item => item._id !== id));
      toast.dismiss(toastId);
      toast.success('Deleted successfully');
    } catch (err) {
      toast.dismiss(toastId);
      toast.error('Delete failed');
      fetchItems();
    }
  };

  const updateStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    try {
      await adminAPI.updateFeaturedInMediaStatus(id, newStatus);
      toast.success(`Status set to ${newStatus}`);
      fetchItems();
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Featured In Media</h1>
          <p className="text-gray-600">Manage your featured media appearances and press coverage</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="flex border-b border-gray-200">
            <button 
              onClick={() => setActiveTab('create')} 
              className={`flex items-center gap-2 px-6 py-4 font-medium border-b-2 transition-colors ${
                activeTab === 'create' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <MdAdd className="text-lg" /> Create Media
            </button>
            <button 
              onClick={() => setActiveTab('manage')} 
              className={`flex items-center gap-2 px-6 py-4 font-medium border-b-2 transition-colors ${
                activeTab === 'manage' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <MdImage className="text-lg" /> Manage Media
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">{items.length}</span>
            </button>
          </div>

          {activeTab === 'create' && (
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">


                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <MdImage className="text-gray-400" /> Media Images
                    </label>
                    <div className="space-y-3">
                      <input 
                        ref={inputRef} 
                        type="file" 
                        accept="image/*" 
                        multiple 
                        onChange={onSelect} 
                        className="hidden" 
                        id="media-file" 
                      />
                      <label 
                        htmlFor="media-file" 
                        className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer"
                      >
                        <MdUpload className="text-gray-400 text-xl" /> 
                        <span className="text-gray-600">
                          {files.length > 0 ? `${files.length} file(s) selected` : 'Choose image files'}
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button 
                      onClick={upload} 
                      disabled={uploading || (!files.length && !mediaUrl.trim())}
                      className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {uploading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <MdAdd /> Create Media
                        </>
                      )}
                    </button>
                    <button 
                      onClick={clearForm} 
                      className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg"
                    >
                      <MdClear /> Clear
                    </button>
                  </div>
                </div>

                <div className="lg:border-l lg:border-gray-200 lg:pl-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
                  {previews.length > 0 ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 max-h-48 overflow-y-auto">
                        {previews.map((preview, idx) => (
                          <div key={idx} className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
                            <img 
                              src={preview.url} 
                              alt={preview.name} 
                              className="w-16 h-16 object-cover rounded-lg mx-auto mb-2"
                            />
                            <div className="text-xs text-gray-700 truncate">{preview.name}</div>
                            <div className="text-xs text-gray-500">{(preview.size / (1024 * 1024)).toFixed(2)} MB</div>
                          </div>
                        ))}
                      </div>
                      {mediaUrl && (
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <p className="text-sm text-gray-700"><strong>URL:</strong> {mediaUrl}</p>
                        </div>
                      )}
                    </div>
                  ) : mediaUrl ? (
                    <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <MdLink className="text-gray-400 text-3xl mx-auto mb-3" />
                      <p className="text-gray-700 font-medium">{mediaUrl}</p>
                      <p className="text-sm text-gray-500 mt-2">Media URL will be published</p>
                    </div>
                  ) : (
                    <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <MdImage className="text-gray-400 text-4xl mx-auto mb-3" />
                      <p className="text-gray-500">Media preview will appear here</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'manage' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">All Media Items ({items.length})</h3>
                  <p className="text-gray-600 text-sm">
                    {items.filter(e => e.status === 'active').length} active, {items.filter(e => e.status === 'inactive').length} inactive
                  </p>
                </div>
                <button 
                  onClick={fetchItems} 
                  disabled={loading} 
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <MdRefresh className={loading ? 'animate-spin' : ''} /> Refresh
                </button>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-gray-600">Loading media items...</span>
                </div>
              ) : items.length === 0 ? (
                <div className="text-center py-12">
                  <MdImage className="text-gray-400 text-5xl mx-auto mb-4" />
                  <h4 className="text-lg font-medium">No Media Items Found</h4>
                  <p className="text-gray-600 mb-4">Create your first media item</p>
                  <button 
                    onClick={() => setActiveTab('create')} 
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    Create Media
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {items.map(item => (
                    <div key={item._id} className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 flex flex-col items-center transition-all hover:shadow-xl">
                      <div className="w-full flex flex-col items-center">
                        <div className="aspect-square w-24 h-24 mb-3 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                          {item.image ? (
                            <img src={item.image} alt="Featured media" className="object-cover w-full h-full" />
                          ) : (
                            <MdImage className="text-gray-400 text-4xl" />
                          )}
                        </div>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${
                          item.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {item.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="flex gap-2 w-full mt-4">
                        <button 
                          onClick={() => updateStatus(item._id, item.status)}
                          className={`flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                            item.status === 'active' 
                              ? 'bg-orange-50 text-orange-700 hover:bg-orange-100' 
                              : 'bg-green-50 text-green-700 hover:bg-green-100'
                          }`}
                        >
                          {item.status === 'active' ? (
                            <>
                              <MdVisibilityOff /> Deactivate
                            </>
                          ) : (
                            <>
                              <MdVisibility /> Activate
                            </>
                          )}
                        </button>
                        <button 
                          onClick={() => deleteItem(item._id)}
                          className="flex-1 flex items-center justify-center gap-1 py-2 px-3 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg text-sm font-medium"
                        >
                          <MdDelete /> Delete
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

      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
    </div>
  );
};

export default FeaturedTab;