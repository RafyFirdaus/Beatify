import { useEffect, useRef, useState } from 'react';
import YouTube from 'react-youtube';
import { base64toBlob } from '../utils/fileUtils';

export default function Player({ song, onNext, onPrevious }) {
  const playerRef = useRef(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(100);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // Play the media when a new song is loaded
  useEffect(() => {
    const audio = audioRef.current;
    const initPlayer = async () => {
      try {
        if (song?.isLocal && audio) {
          // Convert base64 to blob URL if needed
          if (song.url.startsWith('data:')) {
            audio.src = base64toBlob(song.url);
          } else {
            audio.src = song.url;
          }
          audio.volume = volume / 100;
          const playPromise = audio.play();
          if (playPromise !== undefined) {
            await playPromise;
          }
        } else if (playerRef.current) {
          await playerRef.current.internalPlayer.playVideo();
        }
        setIsPlaying(true);
      } catch (error) {
        console.error("Error playing media:", error);
      }
    };

    if (song) {
      initPlayer();
    }

    return () => {
      if (audio) {
        audio.pause();
        if (audio.src.startsWith('blob:')) {
          URL.revokeObjectURL(audio.src);
        }
      }
    };
  }, [song, volume]);

  // Update progress bar every second
  useEffect(() => {
    const interval = setInterval(async () => {
      if (song?.isLocal && audioRef.current && isPlaying) {
        setProgress(audioRef.current.currentTime);
        setDuration(audioRef.current.duration);
      } else if (playerRef.current && isPlaying) {
        const currentTime = await playerRef.current.internalPlayer.getCurrentTime();
        const videoDuration = await playerRef.current.internalPlayer.getDuration();
        setProgress(currentTime);
        setDuration(videoDuration);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, song]);

  // Toggle play/pause state
  const togglePlayPause = async () => {
    if (song?.isLocal && audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            await playPromise;
          }
        }
        setIsPlaying(!isPlaying);
      } catch (error) {
        console.error("Error toggling play/pause:", error);
      }
    } else if (playerRef.current) {
      if (isPlaying) {
        await playerRef.current.internalPlayer.pauseVideo();
      } else {
        await playerRef.current.internalPlayer.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle volume change with mute functionality
  const handleVolumeChange = async (e) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (song?.isLocal && audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    } else if (playerRef.current) {
      await playerRef.current.internalPlayer.setVolume(newVolume);
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  // Handle seeking in the progress bar
  const handleSeek = async (e) => {
    const seekTime = Number(e.target.value);
    if (song?.isLocal && audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setProgress(seekTime);
    } else if (playerRef.current) {
      await playerRef.current.internalPlayer.seekTo(seekTime);
      setProgress(seekTime);
    }
  };

  // Toggle mute state
  const toggleMute = async () => {
    if (song?.isLocal && audioRef.current) {
      audioRef.current.muted = !isMuted;
    } else if (playerRef.current) {
      if (isMuted) {
        await playerRef.current.internalPlayer.unMute();
        await playerRef.current.internalPlayer.setVolume(volume);
      } else {
        await playerRef.current.internalPlayer.mute();
      }
    }
    setIsMuted(!isMuted);
  };

  // Format time in minutes and seconds
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!song) return null;

  return (
    <div className="px-4 py-3 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
      {/* Song Info */}
      <div className="w-full md:w-1/4">
        <h3 className="text-white font-medium truncate">{song.title}</h3>
      </div>

      {/* Player Controls */}
      <div className="flex-1">
        <div className="flex flex-col items-center">
          {/* Control Buttons */}
          <div className="flex items-center space-x-4 mb-2">
            <button 
              onClick={onPrevious}
              className="text-spotify-light hover:text-white"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
              </svg>
            </button>
            <button 
              onClick={togglePlayPause}
              className="bg-white rounded-full p-2 hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <svg className="w-6 h-6" fill="black" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="black" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>
            <button 
              onClick={onNext}
              className="text-spotify-light hover:text-white"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
              </svg>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full flex items-center space-x-2">
            <span className="text-xs text-spotify-light">
              {formatTime(progress)}
            </span>
            <div className="flex-1 relative group">
              <div className="w-full h-1 bg-gray-800 rounded-lg">
                <div 
                  className="absolute h-full bg-gradient-to-r from-spotify-green via-green-400 to-green-300 rounded-lg"
                  style={{ width: `${(progress / duration) * 100}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg group-hover:scale-125 transition-transform" />
                </div>
              </div>
              <input
                type="range"
                min="0"
                max={duration}
                value={progress}
                onChange={handleSeek}
                className="absolute top-0 w-full h-1 opacity-0 cursor-pointer"
              />
            </div>
            <span className="text-xs text-spotify-light">
              {formatTime(duration)}
            </span>
          </div>
        </div>
      </div>

      {/* Volume Control */}
      <div className="w-full md:w-1/4 flex items-center justify-end space-x-2">
        <button onClick={toggleMute} className="text-spotify-light">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            {isMuted ? (
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            ) : (
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            )}
          </svg>
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="w-24 h-1 bg-gray-600 rounded-lg appearance-none
                    [&::-webkit-slider-thumb]:appearance-none 
                    [&::-webkit-slider-thumb]:w-3 
                    [&::-webkit-slider-thumb]:h-3 
                    [&::-webkit-slider-thumb]:bg-white 
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:hover:scale-110"
        />
      </div>

      {song.isLocal ? (
        <audio
          ref={audioRef}
          src={song.url}
          className="hidden"
          onEnded={onNext}
          onLoadedMetadata={(e) => setDuration(e.target.duration)}
        />
      ) : (
        <YouTube
          ref={playerRef}
          videoId={song.id}
          opts={{
            height: '0',
            width: '0',
            playerVars: {
              autoplay: 1,
              controls: 0,
            },
          }}
          onEnd={onNext}
          className="hidden"
        />
      )}
    </div>
  );
}