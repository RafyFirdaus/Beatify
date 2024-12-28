import { useState } from 'react';
import { fileToBase64 } from '../utils/fileUtils';

export default function AddLocalMusic({ addSong, onClose }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file || !title.trim() || !artist.trim()) {
      setError('Please fill in all fields');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('audio/')) {
      setError('Please upload an audio file');
      return;
    }

    try {
      const formattedTitle = `${artist.trim()} - ${title.trim()}`;
      const base64Data = await fileToBase64(file);
      
      await addSong(base64Data, formattedTitle, true);
      onClose();
      resetForm();
    } catch (error) {
      console.error('Error processing file:', error);
      setError('Error uploading file. Please try again.');
    }
  };

  const resetForm = () => {
    setFile(null);
    setTitle('');
    setArtist('');
    setError('');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">Upload Local Audio</h3>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* File Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Audio File
          </label>
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full p-3 rounded-lg bg-spotify-black border border-gray-700 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-spotify-green file:text-black file:font-semibold hover:file:bg-green-400 file:transition-colors"
          />
        </div>

        {/* Artist Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Artist Name
          </label>
          <input
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            placeholder="Artist name"
            className="w-full p-3 rounded-lg bg-spotify-black border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-spotify-green focus:ring-1 focus:ring-spotify-green transition-all"
          />
        </div>

        {/* Song Title Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Song Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Song title"
            className="w-full p-3 rounded-lg bg-spotify-black border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-spotify-green focus:ring-1 focus:ring-spotify-green transition-all"
          />
        </div>

        {/* Preview */}
        {(artist || title || file) && (
          <div className="p-3 rounded-lg bg-spotify-black/50 border border-gray-700">
            <p className="text-sm text-gray-400">Preview:</p>
            <p className="text-white font-medium">
              {artist && title 
                ? `${artist.trim()} - ${title.trim()}`
                : artist || title}
            </p>
            {file && (
              <p className="text-sm text-gray-400 mt-1">
                File: {file.name}
              </p>
            )}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-3 rounded-lg bg-red-900/50 border border-red-700 text-red-200 text-sm">
            {error}
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="px-4 py-2 rounded-lg text-white hover:bg-spotify-dark transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-spotify-green hover:bg-green-400 text-black font-semibold transition-colors"
          >
            Upload Song
          </button>
        </div>
      </form>
    </div>
  );
}
