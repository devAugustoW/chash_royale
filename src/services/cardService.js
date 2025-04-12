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