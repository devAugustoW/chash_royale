import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getTopDecks } from '../../services/cardService';
import {
  Title,
  Description,
	StatsContainer,
  LoadingMessage
} from './styles';

const CardsContainer = styled.div``;

const StatsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
`;

const StatsTitle = styled.h2`
  font-size: 24px;
  color: #cbccd1;
`;

const DateRangeSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const DateInput = styled.input`
  background-color: #2c2f3b;
  border: 1px solid #3e4251;
  border-radius: 4px;
  padding: 8px 12px;
  color: #fff;
  font-size: 14px;
  outline: none;
  
  &:focus {
    border-color: #f3a952;
  }
`;

const StatsButton = styled.button`
  background-color: #f3a952;
  color: #1e2130;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #e59a43;
  }
  
  &:disabled {
    background-color: #5c5d65;
    cursor: not-allowed;
  }
`;

const ThresholdSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

const ThresholdLabel = styled.label`
  color: #cbccd1;
  font-size: 14px;
`;

const ThresholdInput = styled.input`
  width: 60px;
  background-color: #2c2f3b;
  border: 1px solid #3e4251;
  border-radius: 4px;
  padding: 8px 12px;
  color: #fff;
  font-size: 14px;
  outline: none;
  
  &:focus {
    border-color: #f3a952;
  }
`;

const DecksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 20px;
`;

const DeckCard = styled.div`
  background-color: #2c2f3b;
  border-radius: 12px;
  overflow: hidden;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const DeckHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #3e4251;
`;

const DeckStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const DeckTitle = styled.h3`
  font-size: 18px;
  color: #fff;
  margin: 0;
`;

const DeckDetail = styled.div`
  font-size: 14px;
  color: #a1a3aa;
  
  span {
    color: #f3a952;
    font-weight: bold;
  }
`;

const PlayerInfo = styled.div`
  margin-top: 5px;
  padding-top: 5px;
  border-top: 1px dashed #3e4251;
`;

const PlayerTag = styled.span`
  background-color: #3e4251;
  color: #cbd5e1;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 4px;
  margin-right: 8px;
`;

const PlayerName = styled.span`
  color: #cbd5e1;
  font-weight: bold;
`;

const TrophyBadge = styled.span`
  display: inline-flex;
  align-items: center;
  margin-left: 10px;
  color: #f1c40f;
  font-size: 13px;
  
  &::before {
    content: "🏆";
    margin-right: 3px;
  }
`;

const LevelBadge = styled.span`
  display: inline-flex;
  align-items: center;
  margin-left: 10px;
  color: #3498db;
  font-size: 13px;
  
  &::before {
    content: "📊";
    margin-right: 3px;
  }
`;

const WinRate = styled.div`
  background-color: #4caf50;
  color: white;
  font-weight: bold;
  font-size: 18px;
  padding: 10px 15px;
  border-radius: 8px;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
`;

const CardItem = styled.div`
  background-color: #252836;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 8px;
`;

const CardImageWrapper = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => getCardRarityColor(props.$rarity)};
  position: relative;
  padding: 5px;
`;

const CardImage = styled.img`
  width: 70px;
  height: 70px;
  object-fit: contain;
`;

const ElixirCost = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #9b59b6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 12px;
`;

const CardName = styled.span`
  font-size: 12px;
  color: #cbccd1;
  margin-top: 5px;
  text-align: center;
  padding: 0 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

const TimeRange = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #a1a3aa;
  
  span {
    color: #f3a952;
    font-weight: bold;
  }
`;

const DeckActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
`;

const CopyButton = styled.button`
  background-color: #3e4251;
  border: none;
  border-radius: 4px;
  color: #cbd5e1;
  padding: 8px 12px;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #4b546b;
  }
  
  &::before {
    content: "📋";
    margin-right: 5px;
  }
`;

const CopySuccess = styled.span`
  color: #4caf50;
  font-size: 13px;
  margin-right: 10px;
`;

const FilterSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

const FilterLabel = styled.label`
  color: #cbccd1;
  font-size: 14px;
`;

const FilterInput = styled.input`
  background-color: #2c2f3b;
  border: 1px solid #3e4251;
  border-radius: 4px;
  padding: 8px 12px;
  color: #fff;
  font-size: 14px;
  outline: none;
  width: 200px;
  
  &:focus {
    border-color: #f3a952;
  }
`;

const ClearFilterButton = styled.button`
  background-color: #3e4251;
  border: none;
  border-radius: 4px;
  color: #cbd5e1;
  padding: 6px 10px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #4b546b;
  }
`;

// Função para determinar cor com base na raridade
function getCardRarityColor(rarity) {
  switch (rarity) {
    case 'Common':
      return '#bdc3c7';
    case 'Rare':
      return '#3498db';
    case 'Epic':
      return '#9b59b6';
    case 'Legendary':
      return '#f1c40f';
    case 'Champion':
      return '#e74c3c';
    default:
      return '#95a5a6';
  }
}

function formatDate(date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('pt-BR');
}

function TopDecks() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [winrateThreshold, setWinrateThreshold] = useState(60);
  const [decks, setDecks] = useState([]);
  const [timeRange, setTimeRange] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copiedDeck, setCopiedDeck] = useState(null);
  const [playerFilter, setPlayerFilter] = useState('');
  const [allDecks, setAllDecks] = useState([]);

  useEffect(() => {
    // Definir datas padrão (últimos 30 dias)
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 30);

    setEndDate(end.toISOString().split('T')[0]);
    setStartDate(start.toISOString().split('T')[0]);
  }, []);

  // Filtrar decks quando playerFilter ou allDecks mudam
  useEffect(() => {
    if (allDecks.length === 0) return;
    
    if (!playerFilter) {
      setDecks(allDecks);
      return;
    }

    const filteredDecks = allDecks.filter(deck => {
      const playerTag = deck.player?.tag?.toLowerCase() || '';
      const filter = playerFilter.toLowerCase();
      
      return playerTag.includes(filter);
    });
    
    setDecks(filteredDecks);
  }, [playerFilter, allDecks]);

  const handleFetchDecks = async () => {
    if (!startDate || !endDate) {
      setError('Por favor, selecione um intervalo de datas válido.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setPlayerFilter('');
      const threshold = winrateThreshold / 100;
      const data = await getTopDecks(startDate, endDate, threshold);
      setAllDecks(data.decks);
      setDecks(data.decks);
      setTimeRange(data.timeRange);
      setLoading(false);
    } catch (err) {
      console.error(err);
      let errorMessage = 'Erro ao carregar decks vencedores';
      
      if (err.response) {
        if (err.response.status === 400) {
          errorMessage = err.response.data?.error || 'Parâmetros inválidos';
        } else {
          errorMessage = `Erro ${err.response.status}: ${err.response.data?.error || 'Erro no servidor'}`;
        }
      } else if (err.request) {
        errorMessage = 'Não foi possível conectar ao servidor. Verifique sua conexão.';
      }
      
      setError(errorMessage);
      setLoading(false);
    }
  };

  const handleThresholdChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 0 && value <= 100) {
      setWinrateThreshold(value);
    }
  };


  return (
    <CardsContainer>
      <Title>Decks Vencedores</Title>
      <Description>
        Descubra os melhores decks com altas taxas de vitória em diferentes períodos.
      </Description>

      <StatsContainer>
        <StatsHeader>
          <StatsTitle>Decks com Alta Taxa de Vitória</StatsTitle>
          <div>
            <DateRangeSelector>
              <DateInput 
                type="date" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)}
                placeholder="Data inicial"
              />
              <DateInput 
                type="date" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)}
                placeholder="Data final"
              />
              <StatsButton 
                onClick={handleFetchDecks}
                disabled={loading || !startDate || !endDate}
              >
                {loading ? 'Carregando...' : 'Buscar'}
              </StatsButton>
            </DateRangeSelector>
            <ThresholdSelector>
              <ThresholdLabel>Taxa de vitória mínima:</ThresholdLabel>
              <ThresholdInput 
                type="number" 
                value={winrateThreshold} 
                onChange={handleThresholdChange}
                min="0"
                max="100"
              />
              <span style={{ color: '#cbccd1' }}>%</span>
            </ThresholdSelector>
          </div>
        </StatsHeader>

        {error && <LoadingMessage>{error}</LoadingMessage>}

        {timeRange && !loading && !error && (
          <TimeRange>
            Mostrando {decks.length} deck{decks.length !== 1 ? 's' : ''} de <span>{formatDate(timeRange.startDate)}</span> até <span>{formatDate(timeRange.endDate)}</span> 
            com taxa de vitória acima de <span>{winrateThreshold}%</span>
            {playerFilter && <span> filtrados por "{playerFilter}"</span>}
          </TimeRange>
        )}

        {loading && <LoadingMessage>Carregando decks vencedores...</LoadingMessage>}

        {!loading && !error && decks.length > 0 && (
          <DecksList>
            {decks.map((deck, index) => (
              <DeckCard key={index}>
                <DeckHeader>
                  <DeckStats>
                    <DeckTitle>Deck #{index + 1}</DeckTitle>
                    <DeckDetail>
                      Batalhas: <span>{deck.total}</span> | Vitórias: <span>{deck.wins}</span>
                    </DeckDetail>
                    <DeckDetail>
                      Custo médio de elixir: <span>{deck.averageElixirCost}</span>
                    </DeckDetail>
                    {deck.player && (
                      <PlayerInfo>
                        <PlayerTag>{deck.player.tag}</PlayerTag>
                      </PlayerInfo>
                    )}
                  </DeckStats>
                  <WinRate>{deck.winratePercentage}%</WinRate>
                </DeckHeader>
                
                <CardsGrid>
                  {deck.cards.map((card) => (
                    <CardItem key={card.id}>
                      <CardImageWrapper $rarity={card.rarity}>
                        {card.elixirCost !== null && (
                          <ElixirCost>{card.elixirCost}</ElixirCost>
                        )}
                        <CardImage 
                          src={card.iconUrl || 'https://cdn.royaleapi.com/static/img/cards-150/no-image.png'} 
                          alt={card.name}
                          onError={(e) => {
                            e.target.src = 'https://cdn.royaleapi.com/static/img/cards-150/no-image.png';
                          }}
                        />
                      </CardImageWrapper>
                      <CardName title={card.name}>{card.name}</CardName>
                    </CardItem>
                  ))}
                </CardsGrid>
              </DeckCard>
            ))}
          </DecksList>
        )}

        {!loading && !error && decks.length === 0 && timeRange && (
          <LoadingMessage>
            Nenhum deck com taxa de vitória acima de {winrateThreshold}% encontrado 
            no período selecionado.
          </LoadingMessage>
        )}
      </StatsContainer>
    </CardsContainer>
  );
}

export default TopDecks; 