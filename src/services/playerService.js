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

export const getPlayerByTag = async (tag) => {
  try {
    // Remover o # se presente
    const formattedTag = tag.startsWith('#') ? tag.substring(1) : tag;
    
    // Se necessário, encodar a tag para URL
    const encodedTag = encodeURIComponent(formattedTag);
    
    // Confirme a URL base e o prefixo da rota
    const response = await api.get(`/api/players/${encodedTag}`);
    console.log('Resposta da API:', response.data); // Adicionando um log para debug
    
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar jogador por tag:', error);
    throw error;
  }
};