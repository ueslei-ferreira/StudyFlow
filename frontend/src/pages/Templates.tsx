import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { ArrowLeft, BookOpen, Layers } from 'lucide-react';
import Header from '../components/Header';

const Templates = () => {
  const navigate = useNavigate();
  const { data: templates, isLoading } = useQuery({
    queryKey: ['templates'],
    queryFn: async () => {
      const response = await api.get('/templates/');
      return response.data;
    }
  });

  const createChecklistMutation = useMutation({
    mutationFn: async (templateId: number) => {
      const template = templates.find((t: any) => t.id === templateId);
      const response = await api.post('/checklists/', { 
        template_id: templateId,
        title: template.title
      });
      return response.data;
    },
    onSuccess: (data) => {
      navigate(`/checklists/${data.id}`);
    }
  });

  if (isLoading) return <div className="min-h-screen bg-gray-900 text-white p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      <div className="p-8">
        <Link to="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition">
          <ArrowLeft size={20} />
          Voltar para o Dashboard
        </Link>

        <h1 className="text-4xl font-bold mb-8">Escolha um Caminho de Estudo</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates?.map((template: any) => (
          <div key={template.id} className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center gap-2 text-blue-400 mb-2">
              <BookOpen size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">{template.area_name}</span>
            </div>
            <h3 className="text-xl font-bold mb-2">{template.title}</h3>
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{template.description}</p>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <Layers size={14} />
              <span>{template.level}</span>
            </div>
            <button 
              onClick={() => createChecklistMutation.mutate(template.id)}
              className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-bold transition disabled:opacity-50"
              disabled={createChecklistMutation.isPending}
            >
              Começar a Aprender
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default Templates;
