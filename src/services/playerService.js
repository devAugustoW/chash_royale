import api from '../services/api';

export const getPlayersStats = async () => {
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
    
    // encodar a tag para URL
    const encodedTag = encodeURIComponent(formattedTag);
    
    // Confirme a URL base e o prefixo da rota
    const response = await api.get(`/api/players/${encodedTag}`);

    
    return response.data;

  } catch (error) {
    console.error('Erro ao buscar jogador por tag:', error);
    throw error;

  }
};