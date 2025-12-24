import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { user, loading } = useAuth();

  if (!loading && user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-6xl font-extrabold mb-6 text-blue-500">StudyFlow</h1>
      <p className="text-2xl text-gray-400 mb-12 text-center max-w-2xl">
        Domine sua jornada de aprendizado com checklists estruturados e insights personalizados.
      </p>
      <div className="flex gap-4">
        <Link to="/login" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold transition">
          Entrar
        </Link>
        <Link to="/register" className="px-8 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-bold transition">
          Registrar
        </Link>
      </div>
    </div>
  );
};

export default Home;
