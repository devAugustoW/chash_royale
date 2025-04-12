import api from './api';

export const getPopularCards = async () => {
  try {
    const response = await api.get('/api/cards/popular');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar cartas populares:', error);
    throw error;
  }
};

export const getLessPopularCards = async () => {
  try {
    const response = await api.get('/api/cards/least-popular');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar cartas menos populares:', error);
    throw error;
  }
};

export const getCardStatsOptimized = async (startDate, endDate) => {
  try {
    const response = await api.get('/api/cards/stats', {
      params: { startDate, endDate }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar estatísticas das cartas:', error);
    throw error;
  }
}; 