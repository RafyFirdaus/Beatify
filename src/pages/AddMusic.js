import AddSongForm from '../components/AddSongForm';

export default function AddMusic({ addSong, onClose }) {
  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">Add New Music</h2>
        <p className="text-gray-400">Add your favorite YouTube music to your library</p>
      </div>
      
      <div className="max-w-md mx-auto">
        <AddSongForm addSong={addSong} onClose={onClose} />
      </div>
    </div>
  );
} 