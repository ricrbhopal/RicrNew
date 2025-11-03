import React, { useEffect, useState, useRef } from 'react';
import { adminAPI } from '../../../config/api';
import { 
  MdUpload, 
  MdDelete, 
  MdCheckCircle, 
  MdCancel,
  MdAddPhotoAlternate,
  MdVisibility,
  MdVisibilityOff,
  MdRefresh,
  MdImage,
  MdCloudUpload,
  MdAdd,
  MdCollections
} from 'react-icons/md';
import toast from 'react-hot-toast';

const CodeCraftTab = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [activeTab, setActiveTab] = useState('create');
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchPortfolios();
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, []);

  const fetchPortfolios = async () => {
    setLoading(true);
    try {
      const res = await adminAPI.getAllPortfolio();
      setPortfolios(res.data || []);
    } catch (err) {
      toast.error('Failed to load portfolio');
      setPortfolios([]);
    }
    setLoading(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error('Please select an image to upload');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);
    
    setUploading(true);
    try {
      await adminAPI.createPortfolio(formData);
      toast.success('Portfolio image uploaded successfully!');
      clearUpload();
      setActiveTab('manage');
      fetchPortfolios();
    } catch (err) {
      toast.error('Upload failed. Please try again.');
    }
    setUploading(false);
  };

  const handleStatusToggle = async (id, status) => {
    try {
      const newStatus = status === 'active' ? 'inactive' : 'active';
      await adminAPI.updatePortfolioStatus(id, newStatus);
      toast.success(`Image ${newStatus === 'active' ? 'activated' : 'deactivated'}`);
      fetchPortfolios();
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this portfolio image?')) return;
    try {
      await adminAPI.deletePortfolio(id);
      toast.success('Portfolio image deleted successfully');
      fetchPortfolios();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const clearUpload = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">CodeCraft Portfolio</h1>
          <p className="text-gray-600">Showcase your development projects and coding achievements</p>
        </div>

        {/* Main Card with Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200">
            <button 
              onClick={() => setActiveTab('create')} 
              className={`flex items-center gap-2 px-6 py-4 font-medium border-b-2 transition-colors ${
                activeTab === 'create' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <MdAdd className="text-lg" /> Upload Image
            </button>
            <button 
              onClick={() => setActiveTab('manage')} 
              className={`flex items-center gap-2 px-6 py-4 font-medium border-b-2 transition-colors ${
                activeTab === 'manage' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <MdCollections className="text-lg" /> Manage Portfolio
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                {portfolios.length}
              </span>
            </button>
          </div>

          {/* Create Tab Content */}
          {activeTab === 'create' && (
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Upload Form */}
                <div className="space-y-6">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <MdImage className="text-gray-400" /> Portfolio Image
                    </label>
                    <div className="space-y-3">
                      <input 
                        ref={fileInputRef} 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange} 
                        className="hidden" 
                        id="portfolio-file" 
                      />
                      <label 
                        htmlFor="portfolio-file" 
                        className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
                      >
                        <MdCloudUpload className="text-gray-400 text-xl" /> 
                        <span className="text-gray-600">
                          {image ? image.name : 'Choose image file'}
                        </span>
                      </label>
                      <p className="text-xs text-gray-500">
                        Supported formats: JPG, PNG, WebP. Max size: 5MB
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button 
                      onClick={handleUpload} 
                      disabled={uploading || !image}
                      className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {uploading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <MdUpload /> Upload Image
                        </>
                      )}
                    </button>
                    <button 
                      onClick={clearUpload} 
                      className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg"
                    >
                      <MdCancel /> Clear
                    </button>
                  </div>
                </div>

                {/* Preview Section */}
                <div className="lg:border-l lg:border-gray-200 lg:pl-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
                  {imagePreview ? (
                    <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-64 object-cover rounded-lg mb-4 mx-auto"
                      />
                      <div className="text-center">
                        <p className="text-sm text-gray-700 font-medium">{image.name}</p>
                        <p className="text-xs text-gray-500">
                          {(image.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                      <MdImage className="text-gray-400 text-4xl mx-auto mb-3" />
                      <p className="text-gray-500">Image preview will appear here</p>
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
                  <h3 className="text-lg font-semibold text-gray-900">Portfolio Images ({portfolios.length})</h3>
                  <p className="text-gray-600 text-sm">
                    {portfolios.filter(p => p.status === 'active').length} active, 
                    {' '}{portfolios.filter(p => p.status === 'inactive').length} inactive
                  </p>
                </div>
                <button 
                  onClick={fetchPortfolios} 
                  disabled={loading} 
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <MdRefresh className={loading ? 'animate-spin' : ''} /> Refresh
                </button>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-gray-600">Loading portfolio images...</span>
                </div>
              ) : portfolios.length === 0 ? (
                <div className="text-center py-12">
                  <MdCollections className="text-gray-400 text-5xl mx-auto mb-4" />
                  <h4 className="text-lg font-medium">No Portfolio Images Found</h4>
                  <p className="text-gray-600 mb-4">Upload your first portfolio image</p>
                  <button 
                    onClick={() => setActiveTab('create')} 
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    Upload Image
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {portfolios.map((item) => (
                    <div key={item._id} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md">
                      <div className="flex flex-col items-center">
                        <img 
                          src={item.image} 
                          alt="Portfolio" 
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            item.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {item.status === 'active' ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleStatusToggle(item._id, item.status)}
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
                          onClick={() => handleDelete(item._id)}
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
    </div>
  );
};

export default CodeCraftTab;