import { useState } from 'react';
import EditSongModal from './EditSongModal';
import { updateSongInStorage } from '../utils/songStorage';

export default function SongList({ songs, deleteSong, playSong }) {
  const [selectedSong, setSelectedSong] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(null);

  // Separate songs by source
  const youtubeMusic = songs.filter(song => !song.isLocal);
  const localMusic = songs.filter(song => song.isLocal);

  // Function to render a song item
  const SongItem = ({ song }) => (
    <div 
      key={song.id} 
      className="mb-3 rounded-xl transition-all duration-200 group hover:bg-spotify-lighter/5"
    >
      <div className="flex items-center justify-between p-4 bg-spotify-dark/60 hover:bg-spotify-dark w-full rounded-xl transition-colors duration-200">
        <div className="flex items-center flex-1 min-w-0">
          {/* Play button */}
          <button
            onClick={() => playSong(song)}
            className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-spotify-green 
                     rounded-full text-black opacity-0 group-hover:opacity-100 transition-all duration-200 
                     hover:scale-105 mr-4 shadow-lg"
            aria-label="Play song"
          >
            <span className="text-xl">▶</span>
          </button>
          
          {/* Song info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-medium truncate text-lg">{song.title}</h3>
            <p className="text-sm text-gray-400 flex items-center">
              {song.isLocal ? (
                <>
                  <span className="mr-1">🎵</span> Local Audio
                </>
              ) : (
                <>
                  <span className="mr-1">▶</span> YouTube
                </>
              )}
            </p>
          </div>
        </div>

        {/* Three dots menu */}
        <div className="relative ml-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(showMenu === song.id ? null : song.id);
            }}
            className="p-2 text-spotify-light hover:text-white opacity-0 group-hover:opacity-100 
                     transition-all duration-200 rounded-full hover:bg-spotify-lighter/10"
            aria-label="More options"
          >
            <span className="text-xl">⋮</span>
          </button>
          
          {/* Dropdown menu */}
          {showMenu === song.id && (
            <div 
              className="absolute right-0 mt-2 w-48 rounded-xl shadow-xl bg-spotify-darker 
                       ring-1 ring-black ring-opacity-5 z-10 border border-spotify-lighter/10
                       backdrop-blur-sm transform transition-all duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="py-1">
                <button
                  onClick={() => {
                    setSelectedSong(song);
                    setIsModalOpen(true);
                    setShowMenu(null);
                  }}
                  className="flex items-center w-full px-4 py-3 text-sm text-gray-300 
                           hover:bg-spotify-lighter/10 hover:text-white transition-colors"
                >
                  <span className="mr-2">✏️</span> Edit Details
                </button>
                <button
                  onClick={() => {
                    deleteSong(song.id);
                    setShowMenu(null);
                  }}
                  className="flex items-center w-full px-4 py-3 text-sm text-red-400 
                           hover:bg-red-500/10 hover:text-red-300 transition-colors"
                >
                  <span className="mr-2">🗑️</span> Delete Song
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const handleSongUpdate = async (updatedSong) => {
    await updateSongInStorage(updatedSong.id, updatedSong);
    window.location.reload(); // Refresh to show updated data
  };

  return (
    <>
      <div className="w-full space-y-8">
        {/* YouTube Music Section */}
        {youtubeMusic.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <span className="text-spotify-green mr-2">▶</span>
              YouTube Music
              <span className="ml-2 text-sm font-normal text-gray-400">
                ({youtubeMusic.length} {youtubeMusic.length === 1 ? 'song' : 'songs'})
              </span>
            </h2>
            <div>
              {youtubeMusic.map(song => (
                <SongItem key={song.id} song={song} />
              ))}
            </div>
          </div>
        )}

        {/* Local Music Section */}
        {localMusic.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <span className="text-spotify-green mr-2">🎵</span>
              Local Music
              <span className="ml-2 text-sm font-normal text-gray-400">
                ({localMusic.length} {localMusic.length === 1 ? 'song' : 'songs'})
              </span>
            </h2>
            <div>
              {localMusic.map(song => (
                <SongItem key={song.id} song={song} />
              ))}
            </div>
          </div>
        )}

        {/* Empty Song */}
        {songs.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">No songs in your library yet.</p>
          </div>
        )}
      </div>

      {/* Edit Song Modal */}
      <EditSongModal
        song={selectedSong}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedSong(null);
        }}
        onSave={handleSongUpdate}
      />
    </>
  );
}