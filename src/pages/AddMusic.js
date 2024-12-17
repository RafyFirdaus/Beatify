import { useState } from 'react';
import AddSongForm from '../components/AddSongForm';
import AddLocalMusic from './AddLocalMusic';

export default function AddMusic({ addSong, onClose }) {
  const [activeTab, setActiveTab] = useState('youtube');

  const tabStyle = (isActive) => `
    px-4 py-2 font-medium rounded-t-lg 
    ${isActive 
      ? 'bg-gray-700 text-white' 
      : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'}
  `;

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">Add New Music</h2>
        <p className="text-gray-400">Add music to your library from YouTube or local files</p>
      </div>
      
      <div className="max-w-md mx-auto">
        <div className="flex mb-4 border-b border-gray-700">
          <button
            className={tabStyle(activeTab === 'youtube')}
            onClick={() => setActiveTab('youtube')}
          >
            Add from YouTube
          </button>
          <button
            className={tabStyle(activeTab === 'local')}
            onClick={() => setActiveTab('local')}
          >
            Upload Local Audio
          </button>
        </div>

        {activeTab === 'youtube' ? (
          <AddSongForm addSong={addSong} onClose={onClose} />
        ) : (
          <AddLocalMusic addSong={addSong} onClose={onClose} />
        )}
      </div>
    </div>
  );
}