import React, { useState, useEffect, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { 
  MdUpload, 
  MdDelete, 
  MdVisibility, 
  MdVisibilityOff, 
  MdAdd,
  MdClear,
  MdLink,
  MdPerson,
  MdWork,
  MdImage,
  MdRefresh
} from 'react-icons/md';
import { maestorAPI } from '../../../config/api.js';

export default function Maestor() {
  const [maestros, setMaestros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('create');

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const fileRef = useRef(null);

  useEffect(() => { 
    fetchMaestros(); 
    return () => { 
      if (imagePreview) URL.revokeObjectURL(imagePreview); 
    } 
  }, []);

  const fetchMaestros = async () => {
    setLoading(true);
    try {
      const res = await maestorAPI.getAllMaestros();
      setMaestros(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load maestros');
    } finally { 
      setLoading(false); 
    }
  };

  const onSelectFile = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    
    // Validate file type
    if (!f.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    
    // Validate file size (5MB max)
    if (f.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }
    
    setImageFile(f);
    try { 
      setImagePreview(URL.createObjectURL(f)); 
    } catch(e){}
    setImageUrl('');
  };

  const clearForm = () => {
    setName(''); 
    setRole(''); 
    setLinkedIn(''); 
    setImageFile(null); 
    setImageUrl('');
    if (fileRef.current) fileRef.current.value = null;
    if (imagePreview) { 
      try { 
        URL.revokeObjectURL(imagePreview); 
      } catch(e){} 
      setImagePreview(null); 
    }
  };

  const submit = async () => {
    if (!name.trim() || !role.trim()) { 
      toast.error('Name and role are required'); 
      return; 
    }
    if (!imageFile && !imageUrl.trim()) { 
      toast.error('Provide an image file or image URL'); 
      return; 
    }

    const form = new FormData();
    form.append('name', name.trim());
    form.append('role', role.trim());
    form.append('linkedIn', linkedIn.trim() || '');
    if (imageFile) form.append('image', imageFile);
    else form.append('img', imageUrl.trim());

    try {
      setSubmitting(true);
      toast.loading('Creating maestro...', { id: 'maestro-create' });
      const res = await maestorAPI.uploadMaestor(form);
      toast.dismiss('maestro-create');
      toast.success('Maestro created successfully');
      
      if (res && res.data && res.data.maestro) {
        setMaestros(prev => [res.data.maestro, ...(prev || [])]);
      } else {
        fetchMaestros();
      }
      clearForm();
      setActiveTab('manage');
    } catch (err) {
      console.error(err);
      toast.dismiss('maestro-create');
      toast.error(err?.response?.data?.message || 'Failed to create maestro');
    } finally { 
      setSubmitting(false); 
    }
  };

  const toggleStatus = async (id) => {
    try {
      const cur = maestros.find(m => m._id === id) || {};
      const newStatus = cur.status === 'active' ? 'inactive' : 'active';
      
      // Optimistic update
      setMaestros(ms => ms.map(m => m._id === id ? { ...m, status: newStatus } : m));
      await maestorAPI.updateMaestroStatus(id, newStatus);
      toast.success(`Maestro ${newStatus === 'active' ? 'activated' : 'deactivated'}`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to update status');
      fetchMaestros();
    }
  };

  const deleteMaestro = async (id) => {
    if (!window.confirm('Are you sure you want to delete this maestro? This action cannot be undone.')) return;
    
    const toastId = toast.loading('Deleting maestro...');
    try {
      await maestorAPI.deleteMaestro(id);
      setMaestros(ms => ms.filter(m => m._id !== id));
      toast.dismiss(toastId); 
      toast.success('Maestro deleted successfully');
    } catch (err) {
      console.error(err);
      toast.dismiss(toastId);
      toast.error('Failed to delete maestro');
      fetchMaestros();
    }
  };

  const activeMaestros = maestros.filter(m => m.status === 'active');
  const inactiveMaestros = maestros.filter(m => m.status === 'inactive');

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Maestros Management</h1>
          <p className="text-gray-600">Manage your team of expert instructors and mentors</p>
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
              Create Maestro
            </button>
            <button
              onClick={() => setActiveTab('manage')}
              className={`flex items-center gap-2 px-6 py-4 font-medium border-b-2 transition-colors ${
                activeTab === 'manage' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <MdPerson className="text-lg" />
              Manage Maestros
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                {maestros.length}
              </span>
            </button>
          </div>

          {/* Create Tab Content */}
          {activeTab === 'create' && (
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Form Section */}
                <div className="space-y-6">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <MdPerson className="text-gray-400" />
                      Full Name *
                    </label>
                    <input
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Enter full name"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <MdWork className="text-gray-400" />
                      Role / Position *
                    </label>
                    <input
                      value={role}
                      onChange={e => setRole(e.target.value)}
                      placeholder="e.g., Senior Web Developer, UX Designer"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <MdLink className="text-gray-400" />
                      LinkedIn Profile URL
                    </label>
                    <input
                      value={linkedIn}
                      onChange={e => setLinkedIn(e.target.value)}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <MdImage className="text-gray-400" />
                      Profile Image
                    </label>
                    <div className="space-y-3">
                      <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        onChange={onSelectFile}
                        className="hidden"
                        id="maestro-file"
                      />
                      <label
                        htmlFor="maestro-file"
                        className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-colors group"
                      >
                        <MdUpload className="text-gray-400 group-hover:text-blue-500 text-xl" />
                        <span className="text-gray-600 group-hover:text-blue-600">
                          {imageFile ? imageFile.name : 'Choose image file'}
                        </span>
                      </label>
                      
                      <div className="text-center text-gray-500 text-sm">OR</div>
                      
                      <input
                        value={imageUrl}
                        onChange={e => setImageUrl(e.target.value)}
                        placeholder="Enter image URL"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={submit}
                      disabled={submitting}
                      className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors"
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Creating...
                        </>
                      ) : (
                        <>
                          <MdAdd />
                          Create Maestro
                        </>
                      )}
                    </button>
                    
                    <button
                      onClick={clearForm}
                      className="flex items-center gap-2 px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors"
                    >
                      <MdClear />
                      Clear Form
                    </button>
                  </div>
                </div>

                {/* Preview Section */}
                <div className="lg:border-l lg:border-gray-200 lg:pl-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
                  
                  {imagePreview ? (
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex flex-col items-center text-center">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-32 h-32 rounded-full object-cover border-4 border-gray-100 mb-4"
                        />
                        <h4 className="text-xl font-semibold text-gray-900">
                          {name || 'Full Name'}
                        </h4>
                        <p className="text-gray-600 mt-1">
                          {role || 'Role / Position'}
                        </p>
                        {linkedIn && (
                          <a
                            href={linkedIn}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 mt-2 text-sm"
                          >
                            <MdLink />
                            LinkedIn Profile
                          </a>
                        )}
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
                  <h3 className="text-lg font-semibold text-gray-900">
                    All Maestros ({maestros.length})
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {activeMaestros.length} active, {inactiveMaestros.length} inactive
                  </p>
                </div>
                
                <button
                  onClick={fetchMaestros}
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
                  <span className="ml-3 text-gray-600">Loading maestros...</span>
                </div>
              ) : maestros.length === 0 ? (
                <div className="text-center py-12">
                  <MdPerson className="text-gray-400 text-5xl mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No Maestros Found</h4>
                  <p className="text-gray-600 mb-4">Get started by creating your first maestro</p>
                  <button
                    onClick={() => setActiveTab('create')}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Create Maestro
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {maestros.map(maestro => (
                    <div
                      key={maestro._id}
                      className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={maestro.img}
                          alt={maestro.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
                        />
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 truncate">
                            {maestro.name}
                          </h4>
                          <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                            {maestro.role}
                          </p>
                          
                          {maestro.linkedIn && (
                            <a
                              href={maestro.linkedIn}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm mt-2"
                            >
                              <MdLink />
                              LinkedIn
                            </a>
                          )}
                          
                          <div className="flex items-center gap-2 mt-3">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              maestro.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {maestro.status === 'active' ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                        <button
                          onClick={() => toggleStatus(maestro._id)}
                          className={`flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                            maestro.status === 'active'
                              ? 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                              : 'bg-green-50 text-green-700 hover:bg-green-100'
                          }`}
                        >
                          {maestro.status === 'active' ? (
                            <>
                              <MdVisibilityOff />
                              Deactivate
                            </>
                          ) : (
                            <>
                              <MdVisibility />
                              Activate
                            </>
                          )}
                        </button>
                        
                        <button
                          onClick={() => deleteMaestro(maestro._id)}
                          className="flex-1 flex items-center justify-center gap-1 py-2 px-3 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg text-sm font-medium transition-colors"
                        >
                          <MdDelete />
                          Delete
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