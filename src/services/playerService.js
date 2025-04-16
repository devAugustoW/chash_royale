import api from '../services/api';

export const getPlayerStats = async () => {
  try {
    const response = await api.get('/api/players/stats');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar estatísticas de jogadores:', error);
    throw error;
  }
};