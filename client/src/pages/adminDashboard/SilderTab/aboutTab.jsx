import React, { useState, useEffect, useRef } from 'react';
import { adminAPI } from '../../../config/api';
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
  MdClear,
  MdInfo,
  MdCheckCircle,
  MdWarning
} from 'react-icons/md';

const AboutHeroTab = () => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('create');
  const inputRef = useRef(null);

  useEffect(() => {
    fetchItems();
    return () => {
      (previews || []).forEach(p => {
        try { URL.revokeObjectURL(p.url); } catch (e) { }
      });
    };
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await adminAPI.getAllAboutHeroes();
      setItems(res?.data || []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load About Heroes');
    } finally {
      setLoading(false);
    }
  };

  const handleFiles = (fileList) => {
    const arr = Array.from(fileList).filter(file => file.type.startsWith('image/') || file.type.startsWith('video/'));

    if (arr.length === 0) {
      toast.error('Please select valid image or video files');
      return;
    }

    const oversizedFiles = arr.filter(file => file.size > 50 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      toast.error('Some files exceed 50MB limit');
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
      toast.error('Please select files first');
      return;
    }

    const form = new FormData();
    files.forEach(f => form.append('file', f));
    form.append('mediaType', 'image');

    try {
      setUploading(true);
      toast.loading(`Uploading ${files.length} file${files.length > 1 ? 's' : ''}...`, { id: 'upload' });

      const res = await adminAPI.createAboutHero(form);
      toast.dismiss('upload');
      toast.success(`${files.length} file${files.length > 1 ? 's' : ''} uploaded successfully!`);

      setFiles([]);
      setPreviews([]);
      inputRef.current.value = null;

      if (res && res.data) {
        setItems(it => [res.data.aboutHero, ...it]);
      } else {
        fetchItems();
      }
      setActiveTab('manage');
    } catch (err) {
      console.error(err);
      toast.dismiss('upload');
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const toggleStatus = async (id) => {
    try {
      const item = items.find(i => i._id === id);
      const newStatus = item.status === 'active' ? 'inactive' : 'active';

      setItems(it => it.map(x => x._id === id ? { ...x, status: newStatus } : x));
      await adminAPI.updateAboutHeroStatus(id, newStatus);
      toast.success(`Status updated to ${newStatus}`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to update status');
    }
  };

  const deleteItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      await adminAPI.deleteAboutHero(id);
      setItems(it => it.filter(x => x._id !== id));
      toast.success('Item deleted successfully');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete item');
    }
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-50 rounded-lg">
                <MdCloudUpload className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Upload Media</h2>
                <p className="text-gray-600 text-sm">Add new hero images or videos</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                  <MdCloudUpload className="text-gray-400" />
                  Select Media Files *
                </label>

                <div
                  onClick={() => inputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer transition-all duration-200 hover:border-blue-400 hover:bg-blue-50/30 group"
                >
                  <input
                    ref={inputRef}
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFiles(e.target.files)}
                  />
                  <div className="p-3 bg-blue-50 rounded-full w-16 h-16 mx-auto mb-4 group-hover:bg-blue-100 transition-colors">
                    <MdCloudUpload className="w-8 h-8 text-blue-500 mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Drop files here or click to browse</h3>
                  <p className="text-gray-500 text-sm mb-1">Supports JPG, PNG, MP4, MOV</p>
                  <p className="text-gray-400 text-xs">Maximum file size: 50MB</p>
                </div>
              </div>

              {files.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <MdInfo className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">Ready to upload</span>
                  </div>
                  <p className="text-blue-700 text-sm">{files.length} file{files.length > 1 ? 's' : ''} selected • {files.reduce((acc, file) => acc + file.size, 0) / (1024 * 1024).toFixed(2)} MB total</p>
                </div>
              )}

              {files.length > 0 && (
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={upload}
                    disabled={uploading}
                    className="flex items-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-all duration-200 flex-1 justify-center shadow-sm hover:shadow-md"
                  >
                    {uploading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <MdUpload className="w-5 h-5" />
                        Upload {files.length} File{files.length > 1 ? 's' : ''}
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setFiles([]);
                      setPreviews([]);
                      inputRef.current.value = null;
                    }}
                    className="flex items-center gap-2 px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors"
                  >
                    <MdClear className="w-5 h-5" />
                    Clear
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-50 rounded-lg">
                <MdVisibility className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Media Preview</h2>
                <p className="text-gray-600 text-sm">Preview selected files before upload</p>
              </div>
            </div>

            {previews.length > 0 ? (
              <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">
                {previews.map((preview, idx) => (
                  <div key={idx} className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center gap-4 transition-all hover:shadow-sm">
                    <div className="flex-shrink-0">
                      {preview.type.startsWith('image') ? (
                        <img 
                          src={preview.url} 
                          alt={`preview-${idx}`} 
                          className="w-16 h-16 object-cover rounded-lg shadow-sm"
                        />
                      ) : (
                        <div className="relative w-16 h-16 bg-gray-900 rounded-lg overflow-hidden">
                          <video src={preview.url} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                            <MdPlayArrow className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate text-sm mb-1">{preview.name}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>{(preview.size / (1024 * 1024)).toFixed(2)} MB</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span className="capitalize">{preview.type.split('/')[0]}</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        preview.type.startsWith('image') 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {preview.type.startsWith('image') ? 'Image' : 'Video'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center h-64 flex items-center justify-center">
                <div>
                  <MdImage className="text-gray-300 text-5xl mx-auto mb-4" />
                  <p className="text-gray-400 font-medium">No files selected</p>
                  <p className="text-gray-400 text-sm mt-1">Selected media will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Existing Items Section */}
      <div className="mt-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">About Hero Gallery</h2>
              <p className="text-gray-600 mt-1">Manage existing hero media items</p>
            </div>
            <button
              onClick={fetchItems}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-300 transition-colors"
            >
              <MdRefresh className="w-4 h-4" />
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12">
              <MdImage className="text-gray-300 text-5xl mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-medium">No About Heroes found</p>
              <p className="text-gray-400 mt-1">Upload your first hero media to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {items.map(item => (
                <div key={item._id} className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-200">
                  <div className="relative aspect-video bg-gray-100 overflow-hidden">
                    {item.mediaType === 'image' ? (
                      <img 
                        src={item.url} 
                        alt="Media" 
                        className="w-full h-full object-contain transition-transform hover:scale-105 duration-300"
                      />
                    ) : (
                      <video 
                        src={item.url} 
                        controls 
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute top-3 left-3">
                      <div className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
                        item.status === 'active' 
                          ? 'bg-green-100 text-green-800 border border-green-200' 
                          : 'bg-gray-100 text-gray-800 border border-gray-200'
                      }`}>
                        {item.status === 'active' ? (
                          <MdCheckCircle className="w-3.5 h-3.5" />
                        ) : (
                          <MdVisibilityOff className="w-3.5 h-3.5" />
                        )}
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleStatus(item._id)}
                        className={`flex items-center gap-2 flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-colors ${
                          item.status === 'active' 
                            ? 'bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200' 
                            : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
                        }`}
                      >
                        {item.status === 'active' ? (
                          <>
                            <MdVisibilityOff className="w-4 h-4" />
                            Deactivate
                          </>
                        ) : (
                          <>
                            <MdVisibility className="w-4 h-4" />
                            Activate
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => deleteItem(item._id)}
                        className="flex items-center gap-2 py-2.5 px-3 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg text-sm font-semibold transition-colors border border-red-200"
                      >
                        <MdDelete className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AboutOurLogoTab = () => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [sub, setSub] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    fetchItems();
    return () => {
      (previews || []).forEach(p => {
        try { URL.revokeObjectURL(p.url); } catch (e) { }
      });
    };
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await adminAPI.getAllOurLogos();
      setItems(res?.data || []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load Our Logos');
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

    const oversizedFiles = arr.filter(file => file.size > 50 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      toast.error('Some files exceed 50MB limit');
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
      toast.error('Please select files first');
      return;
    }

    if (!title || !sub) {
      toast.error('Please provide both title and subtitle');
      return;
    }

    const form = new FormData();
    files.forEach(f => form.append('file', f));
    form.append('title', title);
    form.append('sub', sub);

    try {
      setUploading(true);
      toast.loading(`Uploading ${files.length} file${files.length > 1 ? 's' : ''}...`, { id: 'upload' });

      const res = await adminAPI.createOurLogo(form);
      toast.dismiss('upload');
      toast.success(`${files.length} file${files.length > 1 ? 's' : ''} uploaded successfully!`);

      setFiles([]);
      setPreviews([]);
      setTitle('');
      setSub('');
      inputRef.current.value = null;

      if (res && res.data) {
        setItems(it => [res.data.ourLogo, ...it]);
      } else {
        fetchItems();
      }
    } catch (err) {
      console.error(err);
      toast.dismiss('upload');
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const toggleStatus = async (id) => {
    try {
      const item = items.find(i => i._id === id);
      const newStatus = item.status === 'active' ? 'inactive' : 'active';

      setItems(it => it.map(x => x._id === id ? { ...x, status: newStatus } : x));
      await adminAPI.updateOurLogoStatus(id, newStatus);
      toast.success(`Status updated to ${newStatus}`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to update status');
    }
  };

  const deleteItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      await adminAPI.deleteOurLogo(id);
      setItems(it => it.filter(x => x._id !== id));
      toast.success('Item deleted successfully');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete item');
    }
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-50 rounded-lg">
                <MdAddPhotoAlternate className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Upload Logo</h2>
                <p className="text-gray-600 text-sm">Add new logo with title and description</p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                  <MdCloudUpload className="text-gray-400" />
                  Select Logo Image *
                </label>

                <div
                  onClick={() => inputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer transition-all duration-200 hover:border-green-400 hover:bg-green-50/30 group"
                >
                  <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFiles(e.target.files)}
                  />
                  <div className="p-3 bg-green-50 rounded-full w-16 h-16 mx-auto mb-4 group-hover:bg-green-100 transition-colors">
                    <MdAddPhotoAlternate className="w-8 h-8 text-green-500 mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Drop logo image here or click to browse</h3>
                  <p className="text-gray-500 text-sm mb-1">Supports JPG, PNG, SVG, WEBP</p>
                  <p className="text-gray-400 text-xs">Maximum file size: 50MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Logo Title *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="Enter logo title (e.g., Brand Identity)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Logo Subtitle *</label>
                  <input
                    type="text"
                    value={sub}
                    onChange={(e) => setSub(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="Enter logo subtitle (e.g., Our visual identity)"
                  />
                </div>
              </div>

              {files.length > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <MdInfo className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-900">Ready to upload</span>
                  </div>
                  <p className="text-green-700 text-sm">{files.length} file{files.length > 1 ? 's' : ''} selected • {files.reduce((acc, file) => acc + file.size, 0) / (1024 * 1024).toFixed(2)} MB total</p>
                </div>
              )}

              {files.length > 0 && (
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={upload}
                    disabled={uploading || !title || !sub}
                    className="flex items-center gap-3 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg font-medium transition-all duration-200 flex-1 justify-center shadow-sm hover:shadow-md"
                  >
                    {uploading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <MdUpload className="w-5 h-5" />
                        Upload Logo
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setFiles([]);
                      setPreviews([]);
                      setTitle('');
                      setSub('');
                      inputRef.current.value = null;
                    }}
                    className="flex items-center gap-2 px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors"
                  >
                    <MdClear className="w-5 h-5" />
                    Clear All
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-50 rounded-lg">
                <MdVisibility className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Logo Preview</h2>
                <p className="text-gray-600 text-sm">Preview selected logo before upload</p>
              </div>
            </div>

            {previews.length > 0 ? (
              <div className="space-y-6">
                {previews.map((preview, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                    <div className="bg-gray-50 rounded-lg p-6 mb-4 border border-gray-200">
                      <img 
                        src={preview.url} 
                        alt={`preview-${idx}`} 
                        className="max-w-full h-32 object-contain mx-auto"
                      />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900 truncate text-sm mb-2">{preview.name}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{(preview.size / (1024 * 1024)).toFixed(2)} MB</span>
                        <span>Image</span>
                      </div>
                    </div>
                    {title && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="font-semibold text-gray-900 text-lg">{title}</h4>
                        <p className="text-gray-600 text-sm mt-1">{sub}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center h-64 flex items-center justify-center">
                <div>
                  <MdImage className="text-gray-300 text-5xl mx-auto mb-4" />
                  <p className="text-gray-400 font-medium">No logo selected</p>
                  <p className="text-gray-400 text-sm mt-1">Selected logo will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Existing Logos Section */}
      <div className="mt-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Logo Collection</h2>
              <p className="text-gray-600 mt-1">Manage your brand logos and identities</p>
            </div>
            <button
              onClick={fetchItems}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-300 transition-colors"
            >
              <MdRefresh className="w-4 h-4" />
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12">
              <MdImage className="text-gray-300 text-5xl mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-medium">No logos found</p>
              <p className="text-gray-400 mt-1">Upload your first logo to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {items.map(item => (
                <div key={item._id} className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-200">
                  <div className="relative aspect-square bg-white p-6 border-b border-gray-200">
                    <img 
                      src={item.url} 
                      alt="Logo" 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <div className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
                        item.status === 'active' 
                          ? 'bg-green-100 text-green-800 border border-green-200' 
                          : 'bg-gray-100 text-gray-800 border border-gray-200'
                      }`}>
                        {item.status === 'active' ? (
                          <MdCheckCircle className="w-3.5 h-3.5" />
                        ) : (
                          <MdVisibilityOff className="w-3.5 h-3.5" />
                        )}
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-gray-900 truncate mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600 truncate">{item.sub}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleStatus(item._id)}
                        className={`flex items-center gap-2 flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-colors ${
                          item.status === 'active' 
                            ? 'bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200' 
                            : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
                        }`}
                      >
                        {item.status === 'active' ? (
                          <>
                            <MdVisibilityOff className="w-4 h-4" />
                            Deactivate
                          </>
                        ) : (
                          <>
                            <MdVisibility className="w-4 h-4" />
                            Activate
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => deleteItem(item._id)}
                        className="flex items-center gap-2 py-2.5 px-3 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg text-sm font-semibold transition-colors border border-red-200"
                      >
                        <MdDelete className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Add missing icon component
const MdPlayArrow = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z"/>
  </svg>
);

const AboutTab = () => {
  const [activeTab, setActiveTab] = useState('aboutHero');

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">About Management</h1>
          <p className="text-gray-600">Manage About Hero sections and Brand Logos</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8 overflow-hidden">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            <button
              onClick={() => setActiveTab('aboutHero')}
              className={`flex items-center gap-3 px-6 py-4 font-semibold border-b-2 transition-all duration-200 min-w-max ${
                activeTab === 'aboutHero' 
                  ? 'border-blue-600 text-blue-600 bg-blue-50' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <MdImage className="w-5 h-5" />
              About Hero Management
            </button>
            <button
              onClick={() => setActiveTab('aboutOurLogo')}
              className={`flex items-center gap-3 px-6 py-4 font-semibold border-b-2 transition-all duration-200 min-w-max ${
                activeTab === 'aboutOurLogo' 
                  ? 'border-green-600 text-green-600 bg-green-50' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <MdAddPhotoAlternate className="w-5 h-5" />
              Our Logo Management
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-1">
            {activeTab === 'aboutHero' && <AboutHeroTab />}
            {activeTab === 'aboutOurLogo' && <AboutOurLogoTab />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTab;