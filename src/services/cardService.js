import api from './api';

// Chamada para buscar as cartas mais populares
export const getPopularCards = async () => {
  try {
    const response = await api.get('/api/cards/popular');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar cartas populares:', error);
    throw error;
  }
};

// Chamada para buscar as cartas menos populares
export const getLessPopularCards = async () => {
  try {
    const response = await api.get('/api/cards/least-popular');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar cartas menos populares:', error);
    throw error;
  }
};

export const getCardsList = async () => {
  try {
    const response = await api.get('/api/cards/all');
    return response.data.cards;

  } catch (error) {
    console.error('Erro ao buscar lista de cartas:', error);
    throw error;

  }
};

export const getCardStats = async (startDate, endDate) => {
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

export const getTopDecks = async (startDate, endDate, winrateThreshold = 0.6) => {
  try {
    const response = await api.get('/api/cards/top-decks', {
      params: { 
        startDate, 
        endDate,
        winrateThreshold
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar decks vencedores:', error);
    throw error;
  }
};

export const getComboLoss = async (combo, startDate, endDate) => {
  try {
		const queryParams = {
      combo: Array.isArray(combo) ? JSON.stringify(combo) : combo,
      startDate,
      endDate
    };
    
    const response = await api.get('/api/cards/combo-loss', { params: queryParams });
    return response.data;

  } catch (error) {
    console.error('Erro ao buscar dados de combos perdedores:', error);
    throw error;

  }
};

export const getVictoriesWithLessCrowns = async (cardId, trophyDisadvantage, maxBattleDuration, opponentTower) => {
  try {
    // Converter os minutos para segundos para a API
    const matchDurationInSeconds = maxBattleDuration * 60;
    
		// Formatação de parâmetros para a API
    const queryParams = {
      cardId,
      trophyPercentage: trophyDisadvantage,
      matchDuration: matchDurationInSeconds,
      towersDestroyed: opponentTower
    };
    
    const response = await api.get('/api/cards/victories-with-less', { params: queryParams });

    return response.data;

  } catch (error) {
    console.error('Erro ao buscar vitórias com carta específica:', error);
    throw error;

  }
};

export const getComboNCards = async (numCards, winrateThreshold, startDate, endDate) => {
  try {
    // Formatação de parâmetros para a API
    const queryParams = {
      comboSize: numCards,
      winRateThreshold: winrateThreshold, 
      startDate,
      endDate
    };
 
    const response = await api.get(`/api/cards/winning-combo`, { params: queryParams });

    return response.data;

  } catch (error) {
    console.error('Erro ao buscar combos de cartas:', error);
    throw error;

  }
};