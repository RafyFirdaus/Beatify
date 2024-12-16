import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <h2 className="text-4xl font-bold text-white mb-4">404</h2>
      <p className="text-gray-400 mb-8">Page not found</p>
      <Link 
        to="/library" 
        className="px-6 py-3 bg-spotify-green text-black font-semibold rounded-full hover:bg-green-400 transition-colors"
      >
        Back to Library
      </Link>
    </div>
  );
} 