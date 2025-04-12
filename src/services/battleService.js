import api from './api';


export const getBattlesStats = async () => {
  try {
    const response = await api.get('/api/battles/stats');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar estatísticas de batalhas:', error);
    throw error;
  }
};

export const getBattleList = async () => {
  try {
    const response = await api.get('/api/battles/list');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar lista de batalhas:', error);
    throw error;
  }
};