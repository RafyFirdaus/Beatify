// Constants
const STORAGE_KEY = 'beetfySongs';
const JSON_FILE_PATH = '/data/songs.json';

// Function to load songs from localStorage
const loadFromLocalStorage = () => {
    try {
        const songs = localStorage.getItem(STORAGE_KEY);
        return songs ? JSON.parse(songs) : [];
    } catch (error) {
        console.error('Error loading songs from localStorage:', error);
        return [];
    }
};

// Function to load songs from JSON file
const loadFromJSON = async () => {
    try {
        const response = await fetch(JSON_FILE_PATH);
        if (!response.ok) throw new Error('Failed to load JSON file');
        return await response.json();
    } catch (error) {
        console.error('Error loading songs from JSON:', error);
        return [];
    }
};

// Function to save songs to localStorage
const saveToLocalStorage = (songs) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(songs));
        return true;
    } catch (error) {
        console.error('Error saving songs to localStorage:', error);
        return false;
    }
};

// Function to sync data between localStorage and JSON
export const syncSongs = async () => {
    try {
        const localSongs = loadFromLocalStorage();
        const jsonSongs = await loadFromJSON();
        
        // Merge songs from both sources (remove duplicates based on id)
        const mergedSongs = [...localSongs];
        jsonSongs.forEach(jsonSong => {
            if (!mergedSongs.find(song => song.id === jsonSong.id)) {
                mergedSongs.push(jsonSong);
            }
        });

        // Update localStorage with merged data
        saveToLocalStorage(mergedSongs);
        return mergedSongs;
    } catch (error) {
        console.error('Error syncing songs:', error);
        return loadFromLocalStorage(); // Fallback to localStorage if sync fails
    }
};

// Function to load songs (with sync)
export const loadSongs = async () => {
    await syncSongs();
    return loadFromLocalStorage();
};

// Function to save songs
export const saveSongs = (songs) => {
    return saveToLocalStorage(songs);
};

// Function to add a new song
export const addSongToStorage = async (song) => {
    const songs = await loadSongs();
    songs.push(song);
    return saveSongs(songs);
};

// Function to delete a song
export const deleteSongFromStorage = async (songId) => {
    const songs = await loadSongs();
    const updatedSongs = songs.filter(song => song.id !== songId);
    return saveSongs(updatedSongs);
};

// Function to get a specific song
export const getSongById = async (songId) => {
    const songs = await loadSongs();
    return songs.find(song => song.id === songId);
};
