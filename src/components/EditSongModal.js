import React, { useState, useEffect } from 'react';

export default function EditSongModal({ song, isOpen, onClose, onSave }) {
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (song) {
      setTitle(song.title);
    }
  }, [song]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...song, title });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-gradient-to-b from-spotify-darker to-spotify-dark p-6 rounded-xl w-full max-w-md shadow-2xl border border-spotify-lighter/10 transform transition-all">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Edit Song Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
              Song Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 bg-white rounded-lg border border-gray-600 text-black 
                       focus:outline-none focus:border-spotify-green focus:ring-1 focus:ring-spotify-green
                       transition-all placeholder-gray-400"
              placeholder="Enter song title"
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium text-white bg-spotify-darker hover:bg-spotify-lighter 
                       rounded-lg transition-colors duration-200 border border-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-medium bg-spotify-green text-black rounded-lg 
                       hover:bg-spotify-green/90 transition-colors duration-200 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-spotify-green"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
