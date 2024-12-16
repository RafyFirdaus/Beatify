import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Layout from './Layout';
import Library from '../pages/Library';
import AddMusic from '../pages/AddMusic';
import NotFound from '../pages/NotFound';

function AppContent() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const navigate = useNavigate();

  // Function to add a new song to the list
  const addSong = (url, title) => {
    const videoId = url.split('v=')[1];
    const newSong = {
      id: videoId,
      title: title,
      url: url
    };
    setSongs([...songs, newSong]);
  };

  // Function to delete a song from the list
  const deleteSong = (id) => {
    setSongs(songs.filter(song => song.id !== id));
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