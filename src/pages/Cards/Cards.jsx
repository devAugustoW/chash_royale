import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getCardStatsOptimized } from '../../services/cardService';
import {
  CardsContainer,
  Title,
  Description,
  LoadingMessage
} from './styles';

const CardOptionContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
  margin-top: 30px;
  margin-bottom: 40px;
`;

const CardOption = styled(Link)`
  background-color: #2c2f3b;
  border-radius: 12px;
  padding: 25px;
  text-decoration: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  }
`;

const OptionTitle = styled.h3`
  font-size: 20px;
  color: #fff;
  margin-bottom: 10px;
`;

const OptionDescription = styled.p`
  font-size: 16px;
  color: #a1a3aa;
  line-height: 1.5;
`;

const StatsContainer = styled.div`
  margin-top: 40px;
`;

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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
`;

const StatCard = styled.div`
  background-color: #2c2f3b;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const CardImage = styled.div`
  background-color: ${props => getCardRarityColor(props.$rarity)};
  padding: 15px;
  display: flex;
  justify-content: center;
  position: relative;
  
  img {
    width: 100px;
    height: 100px;
    object-fit: contain;
  }
`;

const ElixirCost = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: #9b59b6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
`;

const CardInfo = styled.div`
  padding: 15px;
`;

const CardName = styled.h3`
  font-size: 16px;
  color: #fff;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StatsBar = styled.div`
  height: 30px;
  background-color: #3e4251;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 10px;
  display: flex;
`;

const WinBar = styled.div`
  height: 100%;
  background-color: #4caf50;
  width: ${props => props.$percentage || 0}%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
`;

const LossBar = styled.div`
  height: 100%;
  background-color: #f44336;
  width: ${props => props.$percentage || 0}%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
`;

const StatsDetail = styled.div`
  margin-top: 10px;
  font-size: 13px;
  color: #a1a3aa;
  
  span {
    color: #cbccd1;
    font-weight: bold;
  }
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

function Cards() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [cardStats, setCardStats] = useState([]);
  const [timeRange, setTimeRange] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Definir datas padrão (últimos 30 dias)
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 30);

    setEndDate(end.toISOString().split('T')[0]);
    setStartDate(start.toISOString().split('T')[0]);
  }, []);

  const handleFetchStats = async () => {
    if (!startDate || !endDate) {
      setError('Por favor, selecione um intervalo de datas válido.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await getCardStatsOptimized(startDate, endDate);
      setCardStats(data.cards);
      setTimeRange(data.timeRange);
      setLoading(false);
    } catch (err) {
      console.error(err);
      let errorMessage = 'Erro ao carregar estatísticas das cartas';
      
      if (err.response) {
        if (err.response.status === 400) {
          errorMessage = err.response.data?.error || 'Parâmetros de data inválidos';
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

  return (
    <CardsContainer>
      <Title>Cartas</Title>
      <Description>
        Curiosidades sobre as cartas do Clash Royale.
      </Description>

      <CardOptionContainer>
        <CardOption to="/cartas/populares">
          <OptionTitle>10 Cartas Mais Populares</OptionTitle>
          <OptionDescription>
            Descubra quais são as 10 cartas mais utilizadas entre os 100 melhores jogadores do mundo.
          </OptionDescription>
        </CardOption>

        <CardOption to="/cartas/menos-populares">
          <OptionTitle>10 Cartas Menos Populares</OptionTitle>
          <OptionDescription>
            Veja quais são as 10 cartas menos utilizadas entre os 100 melhores jogadores do mundo.
          </OptionDescription>
        </CardOption>
      </CardOptionContainer>

      <StatsContainer>
        <StatsHeader>
          <StatsTitle>Estatísticas de Vitória/Derrota por Carta</StatsTitle>
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
              onClick={handleFetchStats}
              disabled={loading || !startDate || !endDate}
            >
              {loading ? 'Carregando...' : 'Buscar'}
            </StatsButton>
          </DateRangeSelector>
        </StatsHeader>

        {error && <LoadingMessage>{error}</LoadingMessage>}

        {timeRange && !loading && !error && (
          <TimeRange>
            Mostrando dados de <span>{formatDate(timeRange.startDate)}</span> até <span>{formatDate(timeRange.endDate)}</span>
          </TimeRange>
        )}

        {loading && <LoadingMessage>Carregando estatísticas das cartas...</LoadingMessage>}

        {!loading && !error && cardStats.length > 0 && (
          <StatsGrid>
            {cardStats.map(card => (
              <StatCard key={card.cardId}>
                <CardImage $rarity={card.rarity}>
                  {card.elixirCost !== null && (
                    <ElixirCost>{card.elixirCost}</ElixirCost>
                  )}
                  <img 
                    src={card.iconUrl || 'https://cdn.royaleapi.com/static/img/cards-150/no-image.png'} 
                    alt={card.name}
                    onError={(e) => {
                      e.target.src = 'https://cdn.royaleapi.com/static/img/cards-150/no-image.png';
                    }}
                  />
                </CardImage>
                
                <CardInfo>
                  <CardName>{card.name}</CardName>
                  <StatsBar>
                    <WinBar $percentage={card.winPercentage}>
                      {card.winPercentage}%
                    </WinBar>
                    <LossBar $percentage={card.lossPercentage}>
                      {card.lossPercentage}%
                    </LossBar>
                  </StatsBar>
                  <StatsDetail>
                    Vitórias: <span>{card.wins}</span> | Derrotas: <span>{card.losses}</span>
                  </StatsDetail>
                  <StatsDetail>
                    Total de batalhas: <span>{card.totalBattles}</span>
                  </StatsDetail>
                </CardInfo>
              </StatCard>
            ))}
          </StatsGrid>
        )}

        {!loading && !error && cardStats.length === 0 && timeRange && (
          <LoadingMessage>
            Nenhuma estatística encontrada para o período selecionado.
          </LoadingMessage>
        )}
      </StatsContainer>
    </CardsContainer>
  );
}

export default Cards;