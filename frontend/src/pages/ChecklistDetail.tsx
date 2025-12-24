import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';
import { ArrowLeft, CheckCircle, Circle } from 'lucide-react';
import Header from '../components/Header';

const ChecklistDetail = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  
  const { data: checklist, isLoading } = useQuery({
    queryKey: ['checklist', id],
    queryFn: async () => {
      const response = await api.get(`/checklists/${id}/`);
      return response.data;
    }
  });

  const toggleItemMutation = useMutation({
    mutationFn: async ({ itemId, isDone }: { itemId: number, isDone: boolean }) => {
      await api.patch(`/checklists/${id}/items/${itemId}/`, { is_done: isDone });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['checklist', id] });
      queryClient.invalidateQueries({ queryKey: ['checklists'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-summary'] });
    }
  });

  if (isLoading) return <div className="min-h-screen bg-gray-900 text-white p-8">Carregando...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      <div className="p-8">
        <Link to="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition">
          <ArrowLeft size={20} />
          Voltar para o Dashboard
        </Link>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{checklist.title}</h1>
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl">
          {checklist.items.map((item: any) => (
            <div 
              key={item.id} 
              className={`p-4 border-b border-gray-700 flex items-center justify-between hover:bg-gray-750 transition cursor-pointer ${item.is_done ? 'opacity-50' : ''}`}
              onClick={() => toggleItemMutation.mutate({ itemId: item.id, isDone: !item.is_done })}
            >
              <div className="flex items-center gap-4">
                {item.is_done ? <CheckCircle className="text-green-500" /> : <Circle className="text-gray-500" />}
                <span className={item.is_done ? 'line-through' : ''}>{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
};

export default ChecklistDetail;
