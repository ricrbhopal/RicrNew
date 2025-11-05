import React, { useEffect, useState, useRef } from 'react';
import { adminAPI } from '../../../config/api';
import toast, { Toaster } from 'react-hot-toast';
import { 
  MdUpload, 
  MdDelete, 
  MdVisibility, 
  MdVisibilityOff, 
  MdAdd,
  MdClear,
  MdLink,
  MdImage,
  MdRefresh,
  MdCloudUpload
} from 'react-icons/md';

const StoriesTab = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('create');
  
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [linkInput, setLinkInput] = useState('');
  
  const fileRef = useRef(null);

  useEffect(() => {
    fetchStories();
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, []);

  const fetchStories = async () => {
    setLoading(true);
    try {
      const res = await adminAPI.getAllStories();
      setStories(res.data || []);
    } catch (err) {
      toast.error('Failed to load stories');
      setStories([]);
    }
    setLoading(false);
  };

  const handleFileChange = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    
    if (!f.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    
    if (f.size > 8 * 1024 * 1024) {
      toast.error('Image size should be less than 8MB');
      return;
    }
    
    setFile(f);
    setImagePreview(URL.createObjectURL(f));
    setImageUrlInput('');
  };

  const clearForm = () => {
    setFile(null);
    setImagePreview(null);
    setImageUrlInput('');
    setLinkInput('');
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    
    if (!linkInput.trim()) {
      toast.error('Link is required');
      return;
    }
    
    if (!file && !imageUrlInput.trim()) {
      toast.error('Please provide an image file or image URL');
      return;
    }

    const formData = new FormData();
    formData.append('Url', linkInput.trim());
    if (file) formData.append('image', file);
    else formData.append('image', imageUrlInput.trim());

    setUploading(true);
    try {
      toast.loading('Creating story...', { id: 'story-create' });
      await adminAPI.createStory(formData);
      toast.dismiss('story-create');
      toast.success('Story created successfully');
      clearForm();
      fetchStories();
      setActiveTab('manage');
    } catch (err) {
      console.error(err);
      toast.dismiss('story-create');
      toast.error(err?.response?.data?.message || 'Failed to create story');
    }
    setUploading(false);
  };

  const handleStatusToggle = async (id, status) => {
    try {
      const currentStory = stories.find(s => s._id === id);
      const newStatus = status === 'active' ? 'inactive' : 'active';
      
      // Optimistic update
      setStories(prev => prev.map(s => 
        s._id === id ? { ...s, status: newStatus } : s
      ));
      
      await adminAPI.updateStoryStatus(id, newStatus);
      toast.success(`Story ${newStatus === 'active' ? 'activated' : 'deactivated'}`);
    } catch (err) {
      toast.error('Failed to update status');
      fetchStories();
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this story? This action cannot be undone.')) return;
    
    const toastId = toast.loading('Deleting story...');
    try {
      await adminAPI.deleteStory(id);
      setStories(prev => prev.filter(s => s._id !== id));
      toast.dismiss(toastId);
      toast.success('Story deleted successfully');
    } catch (err) {
      console.error(err);
      toast.dismiss(toastId);
      toast.error('Failed to delete story');
      fetchStories();
    }
  };

  const handleRefreshMetadata = async (id) => {
    const toastId = toast.loading('Refreshing metadata...');
    try {
      const res = await adminAPI.refreshStoryMetadata(id);
      const metadata = res.data?.metadata;
      toast.dismiss(toastId);
      if (metadata) {
        const likes = metadata.likes ?? metadata.like_count ?? 0;
        const comments = metadata.comments ?? metadata.comment_count ?? 0;
        toast.success(`Metadata fetched — likes: ${likes}, comments: ${comments}`);
        // do not persist into local story since backend does not save metadata to DB
      } else {
        toast.success('Metadata fetched (no details available)');
      }
    } catch (err) {
      console.error('Failed to refresh metadata', err);
      toast.dismiss(toastId);
      toast.error('Failed to refresh metadata');
    }
  };

  const activeStories = stories.filter(s => s.status === 'active');
  const inactiveStories = stories.filter(s => s.status === 'inactive');

  return (
    <div className="min-h-screen bg-gray-50 p-6 mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Stories Management</h1>
          <p className="text-gray-600">Manage your featured stories with images and links</p>
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
              Create Story
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
              Manage Stories
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                {stories.length}
              </span>
            </button>
          </div>

          {/* Create Tab Content */}
          {activeTab === 'create' && (
            <div className="p-6">
              <form onSubmit={handleCreate}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Form Section */}
                  <div className="space-y-6">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <MdLink className="text-gray-400" />
                        Story Link *
                      </label>
                      <input
                        type="url"
                        value={linkInput}
                        onChange={(e) => setLinkInput(e.target.value)}
                        placeholder="https://example.com/your-story"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <MdImage className="text-gray-400" />
                        Story Image *
                      </label>
                      <div className="space-y-3">
                        <input
                          ref={fileRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                          id="story-file"
                        />
                        <label
                          htmlFor="story-file"
                          className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-colors group"
                        >
                          <MdCloudUpload className="text-gray-400 group-hover:text-blue-500 text-xl" />
                          <span className="text-gray-600 group-hover:text-blue-600">
                            {file ? file.name : 'Choose image file'}
                          </span>
                        </label>
                        
                        <div className="text-center text-gray-500 text-sm">OR</div>
                        
                        <input
                          type="text"
                          placeholder="Paste image URL"
                          value={imageUrlInput}
                          onChange={(e) => { 
                            setImageUrlInput(e.target.value); 
                            setFile(null); 
                            if (fileRef.current) fileRef.current.value = '';
                          }}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Provide either an image file or URL. Maximum file size: 8MB
                      </p>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="submit"
                        disabled={uploading}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors"
                      >
                        {uploading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Creating...
                          </>
                        ) : (
                          <>
                            <MdAdd />
                            Create Story
                          </>
                        )}
                      </button>
                      
                      <button
                        type="button"
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
                    
                    {(imagePreview || imageUrlInput) ? (
                      <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <div className="flex flex-col items-center text-center">
                          <img
                            src={imagePreview || imageUrlInput}
                            alt="Story preview"
                            className="w-full h-48 rounded-lg object-cover mb-4"
                          />
                          <a
                            href={linkInput}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            <MdLink />
                            {linkInput || 'Story Link'}
                          </a>
                          <p className="text-gray-500 text-xs mt-2">
                            Click the link to view the story
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                        <MdImage className="text-gray-400 text-4xl mx-auto mb-3" />
                        <p className="text-gray-500">Story preview will appear here</p>
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Manage Tab Content */}
          {activeTab === 'manage' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    All Stories ({stories.length})
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {activeStories.length} active, {inactiveStories.length} inactive
                  </p>
                </div>
                
                <button
                  onClick={fetchStories}
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
                  <span className="ml-3 text-gray-600">Loading stories...</span>
                </div>
              ) : stories.length === 0 ? (
                <div className="text-center py-12">
                  <MdImage className="text-gray-400 text-5xl mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No Stories Found</h4>
                  <p className="text-gray-600 mb-4">Get started by creating your first story</p>
                  <button
                    onClick={() => setActiveTab('create')}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Create Story
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {stories.map(story => (
                    <div
                      key={story._id}
                      className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
                    >
                      <img
                        src={story.image}
                        alt="Story"
                        className="w-full h-40 rounded-lg object-cover mb-4 border border-gray-100"
                      />
                      
                      <div className="space-y-3">
                        <a
                          href={story.Url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium truncate"
                        >
                          <MdLink />
                          {story.Url}
                        </a>
                        
                        <div className="flex items-center justify-between">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            story.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {story.status === 'active' ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                        <button
                          onClick={() => handleStatusToggle(story._id, story.status)}
                          className={`flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                            story.status === 'active'
                              ? 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                              : 'bg-green-50 text-green-700 hover:bg-green-100'
                          }`}
                        >
                          {story.status === 'active' ? (
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
                            onClick={() => handleRefreshMetadata(story._id)}
                            className="flex-1 flex items-center justify-center gap-1 py-2 px-3 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-sm font-medium transition-colors"
                          >
                            <MdRefresh />
                            Refresh
                          </button>

                          <button
                            onClick={() => handleDelete(story._id)}
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
};

export default StoriesTab;