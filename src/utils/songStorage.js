// Constants
const STORAGE_KEY = 'beetfySongs';
const AUDIO_STORAGE_KEY = 'beetfyAudioData';

// Function to load songs from localStorage
const loadFromLocalStorage = () => {
    try {
        const songs = localStorage.getItem(STORAGE_KEY);
        const audioData = localStorage.getItem(AUDIO_STORAGE_KEY);
        const parsedSongs = songs ? JSON.parse(songs) : [];
        const parsedAudioData = audioData ? JSON.parse(audioData) : {};

        // Merge audio data with songs
        return parsedSongs.map(song => {
            if (song.isLocal && parsedAudioData[song.id]) {
                return { ...song, url: parsedAudioData[song.id] };
            }
            return song;
        });
    } catch (error) {
        console.error('Error loading songs from localStorage:', error);
        return [];
    }
};

// Function to save songs to localStorage
const saveToLocalStorage = (songs) => {
    try {
        // Separate audio data from songs
        const audioData = {};
        const songsWithoutAudio = songs.map(song => {
            if (song.isLocal) {
                audioData[song.id] = song.url;
                return { ...song, url: null };
            }
            return song;
        });

        localStorage.setItem(STORAGE_KEY, JSON.stringify(songsWithoutAudio));
        localStorage.setItem(AUDIO_STORAGE_KEY, JSON.stringify(audioData));
        return true;
    } catch (error) {
        console.error('Error saving songs to localStorage:', error);
        return false;
    }
};

// Function to load songs (with sync)
export const loadSongs = async () => {
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
