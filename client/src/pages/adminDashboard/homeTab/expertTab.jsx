import React, { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { MdUpload, MdDelete, MdVisibility, MdVisibilityOff, MdAdd, MdClear, MdWork, MdLink, MdImage, MdRefresh, MdPerson } from 'react-icons/md';
import { adminAPI } from '../../../config/api.js';

export default function ExpertAdmin() {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('create');

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const fileRef = useRef(null);

  useEffect(() => {
    fetchExperts();
    return () => { if (imagePreview) URL.revokeObjectURL(imagePreview); }
  }, []);

  const fetchExperts = async () => {
    setLoading(true);
    try {
      const res = await adminAPI.getExperts();
      let expertsData = res.data;
      if (Array.isArray(expertsData)) {
        setExperts(expertsData);
      } else if (expertsData && Array.isArray(expertsData.data)) {
        setExperts(expertsData.data);
      } else {
        setExperts([]);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to load experts');
    } finally { setLoading(false); }
  };

  const onSelectFile = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    if (!f.type.startsWith('image/')) { toast.error('Please select an image file'); return; }
    if (f.size > 5 * 1024 * 1024) { toast.error('Image size should be less than 5MB'); return; }
    setImageFile(f);
    try { setImagePreview(URL.createObjectURL(f)); } catch (e) { }
  };

  const clearForm = () => {
    setName(''); setRole(''); setCompany(''); setLinkedIn(''); setImageFile(null);
    if (fileRef.current) fileRef.current.value = null;
    if (imagePreview) { try { URL.revokeObjectURL(imagePreview); } catch (e) { } setImagePreview(null); }
  };

  const submit = async () => {
    if (!name.trim() || !role.trim() || !company.trim()) { toast.error('Name, role and company are required'); return; }
    if (!imageFile) { toast.error('Please upload an image file'); return; }

    const form = new FormData();
    form.append('name', name.trim());
    form.append('role', role.trim());
    form.append('company', company.trim());
    form.append('linkedIn', linkedIn.trim() || '');
    if (imageFile) form.append('image', imageFile);

    try {
      setSubmitting(true);
      toast.loading('Creating expert...', { id: 'expert-create' });
      const res = await adminAPI.createExpert(form);
      toast.dismiss('expert-create');
      toast.success('Expert created successfully');
      if (res && res.data && res.data.expert) setExperts(prev => [res.data.expert, ...(prev || [])]);
      else fetchExperts();
      clearForm();
      setActiveTab('manage');
    } catch (err) {
      console.error(err);
      toast.dismiss('expert-create');
      toast.error(err?.response?.data?.message || 'Failed to create expert');
    } finally { setSubmitting(false); }
  };

  const toggleStatus = async (id) => {
    try {
      const cur = experts.find(e => e._id === id) || {};
      const newStatus = cur.status === 'active' ? 'inactive' : 'active';
      setExperts(es => es.map(x => x._id === id ? { ...x, status: newStatus } : x));
      await adminAPI.updateExpert(id, { status: newStatus });
      toast.success(`Expert ${newStatus === 'active' ? 'activated' : 'deactivated'}`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to update status');
      fetchExperts();
    }
  };

  const deleteExpert = async (id) => {
    if (!window.confirm('Are you sure you want to delete this expert?')) return;
    const t = toast.loading('Deleting expert...');
    try {
      await adminAPI.deleteExpert(id);
      setExperts(es => es.filter(x => x._id !== id));
      toast.dismiss(t); toast.success('Expert deleted');
    } catch (err) {
      console.error(err);
      toast.dismiss(t); toast.error('Failed to delete expert');
      fetchExperts();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Experts Management</h1>
          <p className="text-gray-600">Manage industry experts and guest mentors</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="flex border-b border-gray-200">
            <button onClick={() => setActiveTab('create')} className={`flex items-center gap-2 px-6 py-4 font-medium border-b-2 transition-colors ${activeTab === 'create' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              <MdAdd className="text-lg" /> Create Expert
            </button>
            <button onClick={() => setActiveTab('manage')} className={`flex items-center gap-2 px-6 py-4 font-medium border-b-2 transition-colors ${activeTab === 'manage' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              <MdPerson className="text-lg" /> Manage Experts
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">{experts.length}</span>
            </button>
          </div>

          {activeTab === 'create' && (
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"><MdPerson className="text-gray-400" /> Full Name *</label>
                    <input value={name} onChange={e => setName(e.target.value)} placeholder="Full name" className="w-full p-3 border border-gray-300 rounded-lg" />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"><MdWork className="text-gray-400" /> Role *</label>
                    <input value={role} onChange={e => setRole(e.target.value)} placeholder="Role / Position" className="w-full p-3 border border-gray-300 rounded-lg" />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"><MdWork className="text-gray-400" /> Company *</label>
                    <input value={company} onChange={e => setCompany(e.target.value)} placeholder="Company" className="w-full p-3 border border-gray-300 rounded-lg" />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"><MdLink className="text-gray-400" /> LinkedIn</label>
                    <input value={linkedIn} onChange={e => setLinkedIn(e.target.value)} placeholder="https://linkedin.com/in/username" className="w-full p-3 border border-gray-300 rounded-lg" />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"><MdImage className="text-gray-400" /> Profile Image</label>
                    <div className="space-y-3">
                      <input ref={fileRef} type="file" accept="image/*" onChange={onSelectFile} className="hidden" id="expert-file" />
                      <label htmlFor="expert-file" className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer">
                        <MdUpload className="text-gray-400 text-xl" /> <span className="text-gray-600">{imageFile ? imageFile.name : 'Choose image file'}</span>
                      </label>
                      {/* removed image URL input - only file uploads accepted */}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button onClick={submit} disabled={submitting} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg">
                      {submitting ? (<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />) : (<><MdAdd /> Create Expert</>)}
                    </button>
                    <button onClick={clearForm} className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg"><MdClear /> Clear</button>
                  </div>
                </div>

                <div className="lg:border-l lg:border-gray-200 lg:pl-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
                  {imagePreview ? (
                    <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                      <img src={imagePreview} alt="Preview" className="w-32 h-32 rounded-full object-cover mx-auto mb-4" />
                      <h4 className="text-xl font-semibold">{name || 'Full Name'}</h4>
                      <p className="text-gray-600">{role || 'Role'}</p>
                      <p className="text-gray-600">{company || 'Company'}</p>
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

          {activeTab === 'manage' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">All Experts ({experts.length})</h3>
                  <p className="text-gray-600 text-sm">{experts.filter(e => e.status === 'active').length} active, {experts.filter(e => e.status === 'inactive').length} inactive</p>
                </div>
                <button onClick={fetchExperts} disabled={loading} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg"> <MdRefresh className={`${loading ? 'animate-spin' : ''}`} /> Refresh</button>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div><span className="ml-3 text-gray-600">Loading experts...</span></div>
              ) : experts.length === 0 ? (
                <div className="text-center py-12"><MdPerson className="text-gray-400 text-5xl mx-auto mb-4" /><h4 className="text-lg font-medium">No Experts Found</h4><p className="text-gray-600 mb-4">Create your first expert</p><button onClick={() => setActiveTab('create')} className="px-6 py-2 bg-blue-600 text-white rounded-lg">Create Expert</button></div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {experts.map(expert => (
                    <div key={expert._id} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md">
                      <div className="flex items-start gap-4">
                        <img src={expert.img} alt={expert.name} className="w-16 h-16 rounded-full object-cover" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 truncate">{expert.name}</h4>
                          <p className="text-gray-600 text-sm mt-1">{expert.role} • {expert.company}</p>
                          {expert.linkedIn && (<a href={expert.linkedIn} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm mt-2"><MdLink /> LinkedIn</a>)}
                          <div className="flex items-center gap-2 mt-3"><span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${expert.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{expert.status === 'active' ? 'Active' : 'Inactive'}</span></div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                        <button onClick={() => toggleStatus(expert._id)} className={`flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${expert.status === 'active' ? 'bg-orange-50 text-orange-700' : 'bg-green-50 text-green-700'}`}>{expert.status === 'active' ? (<><MdVisibilityOff /> Deactivate</>) : (<><MdVisibility /> Activate</>)}</button>
                        <button onClick={() => deleteExpert(expert._id)} className="flex-1 flex items-center justify-center gap-1 py-2 px-3 bg-red-50 text-red-700 rounded-lg text-sm font-medium"><MdDelete /> Delete</button>
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
}
