export default function SongList({ songs, deleteSong, playSong }) {
  return (
    <div className="w-full">
      {/* Iterate over each song in the songs array */}
      {songs.map((song) => (
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
      ))}
    </div>
  );
}