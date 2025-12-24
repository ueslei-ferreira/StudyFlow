import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { GraduationCap } from 'lucide-react';

const Header = () => {
  const { logout } = useAuth();

  return (
    <nav className="bg-gray-800 border-b border-gray-700 px-8 py-4 flex justify-between items-center">
      <Link to="/dashboard" className="flex items-center gap-2 text-2xl font-bold text-blue-500">
        <GraduationCap size={32} />
        <span>StudyFlow</span>
      </Link>
      <div className="flex items-center gap-6">
        <Link to="/dashboard" className="text-gray-300 hover:text-white transition">Dashboard</Link>
        <Link to="/templates" className="text-gray-300 hover:text-white transition">Caminhos</Link>
        <button 
          onClick={logout}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition"
        >
          Sair
        </button>
      </div>
    </nav>
  );
};

export default Header;
