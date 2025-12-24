import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../contexts/AuthContext';
import { Plus, CheckCircle, Clock, Zap, TrendingUp, Award } from 'lucide-react';
import Header from '../components/Header';

const Dashboard = () => {
  const { user } = useAuth();
  
  const { data: checklists, isLoading: isLoadingChecklists } = useQuery({
    queryKey: ['checklists'],
    queryFn: async () => {
      const response = await api.get('/checklists/');
      return response.data;
    }
  });

  const { data: summary } = useQuery({
    queryKey: ['dashboard-summary'],
    queryFn: async () => {
      const response = await api.get('/dashboard/summary/');
      return response.data;
    }
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      <div className="p-8">
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Bem-vindo(a), {user?.profile.display_name || user?.username}!
          </h1>
          <p className="text-gray-400">Seu progresso de aprendizado num relance.</p>
        </header>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <div className="flex items-center gap-3 text-blue-400 mb-2">
            <TrendingUp size={20} />
            <span className="text-sm font-bold uppercase tracking-wider">Progresso Médio</span>
          </div>
          <p className="text-3xl font-bold">{summary?.average_progress || 0}%</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <div className="flex items-center gap-3 text-yellow-400 mb-2">
            <Zap size={20} />
            <span className="text-sm font-bold uppercase tracking-wider">Sequência Atual</span>
          </div>
          <p className="text-3xl font-bold">{summary?.streak || 0} Dias</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <div className="flex items-center gap-3 text-green-400 mb-2">
            <CheckCircle size={20} />
            <span className="text-sm font-bold uppercase tracking-wider">Concluído (Semana)</span>
          </div>
          <p className="text-3xl font-bold">{summary?.items_completed_last_week || 0} Itens</p>
        </div>
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-6 rounded-xl shadow-lg flex flex-col justify-center">
          <div className="flex items-center gap-3 text-white mb-2">
            <Award size={20} />
            <span className="text-sm font-bold uppercase tracking-wider">Insight Profissional</span>
          </div>
          <p className="text-sm font-medium">{summary?.insights?.[0] || "Carregando insights..."}</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        Checklists Ativos
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/templates" className="bg-gray-800 p-6 rounded-xl border-2 border-dashed border-gray-700 hover:border-blue-500 transition flex flex-col items-center justify-center text-gray-400 hover:text-blue-500 min-h-[160px]">
          <Plus size={48} className="mb-2" />
          <span className="font-bold text-lg">Adicionar Novo Caminho</span>
        </Link>

        {isLoadingChecklists ? (
          <div className="bg-gray-800 p-6 rounded-xl animate-pulse h-40"></div>
        ) : (
          checklists?.map((checklist: any) => (
            <Link key={checklist.id} to={`/checklists/${checklist.id}`} className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:border-gray-500 transition group">
              <h3 className="text-xl font-bold mb-4 group-hover:text-blue-400 transition">{checklist.title}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <CheckCircle size={16} className={checklist.progress_cached === 100 ? "text-green-500" : ""} />
                  <span>{Math.round(checklist.progress_cached)}%</span>
                </div>
                {checklist.due_date && (
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{new Date(checklist.due_date).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
              <div className="mt-4 bg-gray-700 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full transition-all duration-500" style={{ width: `${checklist.progress_cached}%` }}></div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  </div>
  );
};

export default Dashboard;
