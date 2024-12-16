// Function to load songs from JSON file
export const loadSongs = () => {
    try {
        const songs = localStorage.getItem('beetfySongs');
        return songs ? JSON.parse(songs) : [];
    } catch (error) {
        console.error('Error loading songs:', error);
        return [];
    }
};

// Function to save songs to JSON file
export const saveSongs = (songs) => {
    try {
        localStorage.setItem('beetfySongs', JSON.stringify(songs));
        return true;
    } catch (error) {
        console.error('Error saving songs:', error);
        return false;
    }
};

// Function to add a new song
export const addSongToStorage = (song) => {
    const songs = loadSongs();
    songs.push(song);
    return saveSongs(songs);
};

// Function to delete a song
export const deleteSongFromStorage = (songId) => {
    const songs = loadSongs();
    const updatedSongs = songs.filter(song => song.id !== songId);
    return saveSongs(updatedSongs);
};

// Function to get a specific song
export const getSongById = (songId) => {
    const songs = loadSongs();
    return songs.find(song => song.id === songId);
};
