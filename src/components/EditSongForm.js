import React, { useState } from 'react';

export default function EditSongForm({ song, onSave, onClose }) {
  const [title, setTitle] = useState(song.title);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...song, title });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-spotify-dark p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold text-white mb-4">Edit Song Details</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-spotify-light text-white rounded-md focus:outline-none focus:ring-2 focus:ring-spotify-green"
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-white hover:bg-spotify-light rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium bg-spotify-green text-black rounded-md hover:bg-opacity-90 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
