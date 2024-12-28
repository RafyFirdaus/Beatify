import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { loadSongs, addSongToStorage, deleteSongFromStorage } from '../utils/songStorage';
import Layout from './Layout';
import Library from '../pages/Library';
import AddMusic from '../pages/AddMusic';
import NotFound from '../pages/NotFound';

function AppContent() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const navigate = useNavigate();

  // Load songs when component mounts
  useEffect(() => {
    const loadSavedSongs = async () => {
      const savedSongs = await loadSongs();
      setSongs(savedSongs);
    };
    loadSavedSongs();
  }, []);

  // Function to add a new song to the list
  const addSong = async (url, title, isLocalFile = false) => {
    let id, embedUrl;
    
    if (isLocalFile) {
      id = `local_${Date.now()}`; 
      embedUrl = url;
    } else {
      id = url.includes('youtube.com/watch?v=') 
        ? url.split('v=')[1].split('&')[0]  
        : url.includes('youtu.be/') 
          ? url.split('youtu.be/')[1].split('?')[0]  
          : '';
      embedUrl = `https://www.youtube.com/embed/${id}?autoplay=1`;
    }

    const newSong = {
      id: id,
      title: title,
      url: embedUrl,
      isLocal: isLocalFile
    };
    await addSongToStorage(newSong);
    setSongs(prevSongs => [...prevSongs, newSong]);
  };

  // Function to delete a song from the list
  const deleteSong = async (id) => {
    await deleteSongFromStorage(id);
    setSongs(prevSongs => prevSongs.filter(song => song.id !== id));
    if (currentSong && currentSong.id === id) {
      setCurrentSong(null);
    }
  };

  // Function to play a selected song
  const playSong = (song) => {
    setCurrentSong(song);
  };

  // Function to play the next song
  const handleNext = () => {
    if (songs.length > 0 && currentSong) {
      const currentIndex = songs.findIndex(song => song.id === currentSong.id);
      const nextIndex = (currentIndex + 1) % songs.length;
      setCurrentSong(songs[nextIndex]);
    }
  };

  // Function to play the previous song
  const handlePrevious = () => {
    if (songs.length > 0 && currentSong) {
      const currentIndex = songs.findIndex(song => song.id === currentSong.id);
      const previousIndex = (currentIndex - 1 + songs.length) % songs.length;
      setCurrentSong(songs[previousIndex]);
    }
  };

  const handleClose = () => {
    navigate('/library');
  };

  return (
    <Routes>
      <Route path="/" element={<Layout currentSong={currentSong} onNext={handleNext} onPrevious={handlePrevious} />}>
        <Route index element={<Navigate to="/library" replace />} />
        <Route 
          path="library" 
          element={
            <Library 
              songs={songs} 
              deleteSong={deleteSong} 
              playSong={playSong} 
            />
          } 
        />
        <Route 
          path="add-music" 
          element={
            <AddMusic 
              addSong={addSong}
              onClose={handleClose}
            />
          } 
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default AppContent; 