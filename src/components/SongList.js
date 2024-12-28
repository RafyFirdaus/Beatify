export default function SongList({ songs, deleteSong, playSong }) {
  // Separate songs by source
  const youtubeMusic = songs.filter(song => !song.isLocal);
  const localMusic = songs.filter(song => song.isLocal);

  // Function to render a song item
  const SongItem = ({ song }) => (
    <div 
      key={song.id} 
      className="mb-3 rounded-lg transition-colors group"
    >
      <div className="flex items-center justify-between p-4 bg-spotify-dark hover:bg-opacity-80 w-full rounded-lg">
        <div className="flex items-center flex-1 min-w-0">
          {/* Play button */}
          <button
            onClick={() => playSong(song)}
            className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-spotify-green rounded-full text-black opacity-0 group-hover:opacity-100 transition-opacity mr-4"
            aria-label="Play song"
          >
            ▶
          </button>
          
          {/* Song info */}
          <div className="flex-1">
            <h3 className="text-white font-medium truncate">{song.title}</h3>
            <p className="text-sm text-gray-400">{song.isLocal ? 'Local Audio' : 'YouTube'}</p>
          </div>
        </div>

        {/* Delete button */}
        <button
          onClick={() => deleteSong(song.id)}
          className="ml-4 text-spotify-light hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Delete song"
        >
          ✕
        </button>
      </div>
    </div>
  );

  return (
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
  );
}