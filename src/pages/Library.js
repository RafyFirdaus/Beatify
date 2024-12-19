import SongList from '../components/SongList';

export default function Library({ songs, deleteSong, playSong }) {
  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">Your Library</h2>
        <p className="text-gray-400">Manage and play your YouTube and your local audio music collection</p>
      </div>
      
      {songs.length === 0 ? (
        <div className="text-center py-10 md:py-20">
          <div className="text-5xl md:text-6xl mb-4">🎵</div>
          <h3 className="text-xl font-semibold mb-2 text-white">Your library is empty</h3>
          <p className="text-gray-400 mb-4">Start adding your favorite YouTube and your local audio music</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <SongList songs={songs} deleteSong={deleteSong} playSong={playSong} />
        </div>
      )}
    </div>
  );
} 