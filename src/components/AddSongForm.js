import { useState } from 'react';

export default function AddSongForm({ addSong, onClose }) {
  const [url, setUrl] = useState('');
  const [songTitle, setSongTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!url.trim() || !songTitle.trim() || !artist.trim()) {
      setError('Please fill in all fields');
      return;
    }

    // Validate YouTube URL
    if (!url.includes('youtube.com/watch?v=') && !url.includes('youtu.be/')) {
      setError('Please enter a valid YouTube URL');
      return;
    }

    // Format title: Artist - Song Title
    const formattedTitle = `${artist.trim()} - ${songTitle.trim()}`;
    
    addSong(url, formattedTitle); // Add song to the list
    resetForm(); 
  };

  
  const resetForm = () => {
    setUrl('');
    setSongTitle('');
    setArtist('');
    setError('');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">Add New Song</h3>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* URL Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            YouTube URL
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://youtube.com/watch?v=..."
            className="w-full p-3 rounded-lg bg-spotify-black border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-spotify-green focus:ring-1 focus:ring-spotify-green transition-all"
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
            value={songTitle}
            onChange={(e) => setSongTitle(e.target.value)}
            placeholder="Song title"
            className="w-full p-3 rounded-lg bg-spotify-black border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-spotify-green focus:ring-1 focus:ring-spotify-green transition-all"
          />
        </div>

        {/* Preview */}
        {(artist || songTitle) && (
          <div className="p-3 rounded-lg bg-spotify-black/50 border border-gray-700">
            <p className="text-sm text-gray-400">Preview:</p>
            <p className="text-white font-medium">
              {artist && songTitle 
                ? `${artist.trim()} - ${songTitle.trim()}`
                : artist || songTitle}
            </p>
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
            Add Song
          </button>
        </div>
      </form>
    </div>
  );
}
