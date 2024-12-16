import { Outlet, NavLink } from 'react-router-dom';
import Player from './Player';

export default function Layout({ currentSong, onNext, onPrevious }) {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-br from-gray-900 via-spotify-black to-gray-900">
      {/* Sidebar */}
      <div className="md:w-72 bg-black bg-opacity-50 backdrop-blur-lg p-6 flex flex-col border-r border-gray-800">
        <div className="flex items-center space-x-3 mb-10">
          <div className="w-10 h-10 bg-spotify-green rounded-lg flex items-center justify-center">
            <span className="text-2xl font-bold text-spotify-black">B</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-spotify-green to-green-400 text-transparent bg-clip-text">
            Beatify
          </h1>
        </div>

        <nav className="space-y-4 mb-8">
          <NavLink 
            to="/library"
            className={({ isActive }) =>
              `w-full text-left px-4 py-3 rounded-lg transition-all flex items-center space-x-3 text-white
              ${isActive ? 'bg-spotify-dark' : 'hover:bg-opacity-70'}`
            }
          >
            <span className="text-spotify-green">🎵</span>
            <span>Library</span>
          </NavLink>
          <NavLink 
            to="/add-music"
            className={({ isActive }) =>
              `w-full text-left px-4 py-3 rounded-lg transition-all flex items-center space-x-3 text-white
              ${isActive ? 'bg-spotify-dark' : 'hover:bg-opacity-70'}`
            }
          >
            <span className="text-spotify-green">➕</span>
            <span>Add Music</span>
          </NavLink>
        </nav>

        <div className="mt-auto mb-24 p-4 bg-gradient-to-r from-spotify-green/10 to-transparent rounded-lg">
          <p className="text-sm text-gray-300">
            Created by [MHD Rafy Firdaus]<br/>
            Final Project - 2024
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto md:overflow-y-auto">
        <Outlet />
      </div>

      {/* Player */}
      {currentSong && (
        <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-90 backdrop-blur-lg border-t border-gray-800">
          <Player 
            song={currentSong} 
            onNext={onNext}
            onPrevious={onPrevious}
          />
        </div>
      )}
    </div>
  );
} 