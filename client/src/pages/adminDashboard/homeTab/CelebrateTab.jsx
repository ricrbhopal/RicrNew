import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../../config/api';
import { MdUpload, MdDelete, MdVisibility, MdVisibilityOff, MdAdd, MdClear, MdWork, MdLink, MdImage, MdRefresh, MdPerson, MdBusiness } from 'react-icons/md';

function CelebrateTab() {
  const [form, setForm] = useState({
    name: '',
    position: '',
    company: '',
    batch: '',
    image: null,
    companyLogo: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [celebrates, setCelebrates] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [activeTab, setActiveTab] = useState('create');

  useEffect(() => {
    fetchCelebrates();
  }, []);

  const fetchCelebrates = async () => {
    setFetching(true);
    try {
      const res = await adminAPI.getCelebrates();
      setCelebrates(res.data || []);
    } catch (err) {
      setMessage(' Error fetching success stories');
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
      
      if (files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (name === 'image') {
            setImagePreview(e.target.result);
          } else if (name === 'companyLogo') {
            setLogoPreview(e.target.result);
          }
        };
        reader.readAsDataURL(files[0]);
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const clearImage = (type) => {
    if (type === 'image') {
      setForm(prev => ({ ...prev, image: null }));
      setImagePreview(null);
    } else {
      setForm(prev => ({ ...prev, companyLogo: null }));
      setLogoPreview(null);
    }
  };

  const clearForm = () => {
    setForm({ name: '', position: '', company: '', batch: '', image: null, companyLogo: null });
    setImagePreview(null);
    setLogoPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    // Debug log for image and companyLogo
    if (!form.image) {
      setMessage(' Student photo is required.');
      return;
    }
    if (!form.companyLogo) {
      setMessage(' Company logo is required.');
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      await adminAPI.createCelebrate(formData);
      setMessage(' Success story created successfully!');
      clearForm();
      fetchCelebrates();
      setActiveTab('manage');
    } catch (err) {
      setMessage(' Error: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id) => {
    try {
      const current = celebrates.find(c => c._id === id) || {};
      const newStatus = current.status === 'active' ? 'inactive' : 'active';
      setCelebrates(prev => prev.map(x => x._id === id ? { ...x, status: newStatus } : x));
      await adminAPI.updateCelebrateStatus(id, newStatus);
      setMessage(`Success story ${newStatus === 'active' ? 'activated' : 'deactivated'}`);
    } catch (err) {
      setMessage(' Failed to update status');
      fetchCelebrates();
    }
  };

  const deleteCelebrate = async (id) => {
    if (!window.confirm('Are you sure you want to delete this success story?')) return;
    try {
      await adminAPI.deleteCelebrate(id);
      setCelebrates(prev => prev.filter(x => x._id !== id));
      setMessage(' Success story deleted successfully');
    } catch (err) {
      setMessage(' Failed to delete success story');
      fetchCelebrates();
    }
  };  

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Success Stories Management</h1>
          <p className="text-gray-600">Celebrate student achievements and placements</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="flex border-b border-gray-200">
            <button 
              onClick={() => setActiveTab('create')} 
              className={`flex items-center gap-2 px-6 py-4 font-medium border-b-2 transition-colors ${activeTab === 'create' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              <MdAdd className="text-lg" /> Create Success Story
            </button>
            <button 
              onClick={() => setActiveTab('manage')} 
              className={`flex items-center gap-2 px-6 py-4 font-medium border-b-2 transition-colors ${activeTab === 'manage' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              <MdPerson className="text-lg" /> Manage Stories
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                {celebrates.length}
              </span>
            </button>
          </div>

          {activeTab === 'create' && (
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <MdPerson className="text-gray-400" /> Student Name *
                    </label>
                    <input 
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter student name"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <MdWork className="text-gray-400" /> Position *
                    </label>
                    <input 
                      type="text"
                      name="position"
                      value={form.position}
                      onChange={handleChange}
                      placeholder="e.g., Software Engineer"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <MdBusiness className="text-gray-400" /> Company *
                    </label>
                    <input 
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="e.g., Google, Microsoft"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <MdWork className="text-gray-400" /> Batch *
                    </label>
                    <input 
                      type="text"
                      name="batch"
                      value={form.batch}
                      onChange={handleChange}
                      placeholder="e.g., RICR • Batch 2025"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <MdImage className="text-gray-400" /> Student Photo *
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        {imagePreview ? (
                          <div className="relative">
                            <img
                              src={imagePreview}
                              alt="Student preview"
                              className="mx-auto h-24 w-24 rounded-full object-cover border-4 border-white shadow-lg"
                            />
                            <button
                              type="button"
                              onClick={() => clearImage('image')}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <MdClear className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <MdImage className="text-gray-400 text-2xl mx-auto" />
                            <label className="cursor-pointer bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 inline-block text-sm">
                              Choose Photo
                              <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleChange}
                                className="hidden"
                                required
                              />
                            </label>
                            <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 5MB</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <MdBusiness className="text-gray-400" /> Company Logo *
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        {logoPreview ? (
                          <div className="relative">
                            <img
                              src={logoPreview}
                              alt="Company logo preview"
                              className="mx-auto h-16 w-16 object-contain bg-white p-2 rounded-lg shadow-sm"
                            />
                            <button
                              type="button"
                              onClick={() => clearImage('companyLogo')}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <MdClear className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <MdImage className="text-gray-400 text-2xl mx-auto" />
                            <label className="cursor-pointer bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 inline-block text-sm">
                              Choose Logo
                              <input
                                type="file"
                                name="companyLogo"
                                accept="image/*"
                                onChange={handleChange}
                                className="hidden"
                                required
                              />
                            </label>
                            <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 5MB</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button 
                      onClick={handleSubmit} 
                      disabled={loading}
                      className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                      {loading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <><MdAdd /> Create Story</>
                      )}
                    </button>
                    <button 
                      onClick={clearForm}
                      className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      <MdClear /> Clear
                    </button>
                  </div>

                  {message && (
                    <div className={`p-3 rounded-lg ${message.includes('❌') ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-green-50 border border-green-200 text-green-700'}`}>
                      <div className="flex items-center">
                        {message.includes('') ? (
                          <MdClear className="w-4 h-4 mr-2" />
                        ) : (
                          <MdAdd className="w-4 h-4 mr-2" />
                        )}
                        {message.replace('', '').replace('', '')}
                      </div>
                    </div>
                  )}
                </div>

                <div className="lg:border-l lg:border-gray-200 lg:pl-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
                  {imagePreview ? (
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center space-x-4">
                        <img
                          src={imagePreview}
                          alt="Student preview"
                          className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{form.name || 'Student Name'}</h4>
                          <p className="text-blue-600 text-sm">{form.position || 'Position'}</p>
                          <p className="text-gray-600 text-sm">{form.company || 'Company'}</p>
                          <p className="text-gray-500 text-xs mt-1">{form.batch || 'Batch'}</p>
                        </div>
                        {logoPreview && (
                          <img
                            src={logoPreview}
                            alt="Company logo preview"
                            className="w-12 h-12 object-contain bg-white p-1 rounded shadow-sm"
                          />
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                      <MdImage className="text-gray-400 text-4xl mx-auto mb-3" />
                      <p className="text-gray-500">Preview will appear here</p>
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
                  <h3 className="text-lg font-semibold text-gray-900">All Success Stories ({celebrates.length})</h3>
                  <p className="text-gray-600 text-sm">
                    {celebrates.filter(c => c.status === 'active').length} active, 
                    {celebrates.filter(c => c.status === 'inactive').length} inactive
                  </p>
                </div>
                <button 
                  onClick={fetchCelebrates} 
                  disabled={fetching}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <MdRefresh className={fetching ? 'animate-spin' : ''} /> Refresh
                </button>
              </div>

              {fetching ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-gray-600">Loading success stories...</span>
                </div>
              ) : celebrates.length === 0 ? (
                <div className="text-center py-12">
                  <MdPerson className="text-gray-400 text-5xl mx-auto mb-4" />
                  <h4 className="text-lg font-medium">No Success Stories Found</h4>
                  <p className="text-gray-600 mb-4">Create your first success story</p>
                  <button 
                    onClick={() => setActiveTab('create')}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Create Story
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {celebrates.map(celebrate => (
                    <div key={celebrate._id} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        <img 
                          src={celebrate.image} 
                          alt={celebrate.name} 
                          className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 truncate">{celebrate.name}</h4>
                          <p className="text-blue-600 text-sm mt-1">{celebrate.position}</p>
                          <p className="text-gray-600 text-sm">{celebrate.company}</p>
                          <p className="text-gray-500 text-xs mt-1">{celebrate.batch}</p>
                          <div className="flex items-center gap-2 mt-3">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${celebrate.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                              {celebrate.status === 'active' ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        </div>
                        {celebrate.companyLogo && (
                          <img 
                            src={celebrate.companyLogo} 
                            alt={celebrate.company} 
                            className="w-12 h-12 object-contain bg-white p-1 rounded shadow-sm"
                          />
                        )}
                      </div>
                      <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                        <button 
                          onClick={() => toggleStatus(celebrate._id)}
                          className={`flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${celebrate.status === 'active' ? 'bg-orange-50 text-orange-700 hover:bg-orange-100' : 'bg-green-50 text-green-700 hover:bg-green-100'}`}
                        >
                          {celebrate.status === 'active' ? (
                            <><MdVisibilityOff /> Deactivate</>
                          ) : (
                            <><MdVisibility /> Activate</>
                          )}
                        </button>
                        <button 
                          onClick={() => deleteCelebrate(celebrate._id)}
                          className="flex-1 flex items-center justify-center gap-1 py-2 px-3 bg-red-50 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100"
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
}

export default CelebrateTab;