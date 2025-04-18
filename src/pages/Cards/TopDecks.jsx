import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getTopDecks } from '../../services/cardService';
import {
	CardsContainer,
  Title,
  Description,
	StatsContainer,
  LoadingMessage
} from './styles';

import bannerTopDecks from '../../assets/benner-top-decks.webp';


const BannerTopDecksContainer = styled.div`
	width: calc(100% + 20px);
	margin-bottom: 30px;
	height: 330px;
	overflow: hidden;
`;

const BannerTopDecks = styled.div`
	width: 100%;
	height: 100%;
	background-image: url(${props => props.$backgroundImage});
	background-size: cover;
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

	/* Remover as setas de rolagem do input number */
  -moz-appearance: textfield;
  appearance: textfield;
  
  /* Para navegadores WebKit (Chrome, Safari, etc.) */
  &::-webkit-inner-spin-button, 
  &::-webkit-outer-spin-button { 
    -webkit-appearance: none;
    margin: 0;
  }
  
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
  background-color: #3e4251;
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

const TotalDecksInfo = styled.div`
  background-color: #3e4251;
  border-radius: 6px;
  padding: 12px 16px;
  margin-top: 10px;
  color: #cbd5e1;
  font-size: 18px;
  display: inline-block;
  
  strong {
    color: #f3a952;
    font-size: 20px;
  }
`;

function formatDate(date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('pt-BR');
}

function TopDecks() {
  const [startDate, setStartDate] = useState('2025-02-02');
  const [endDate, setEndDate] = useState('2025-03-29');
  const [winrateThreshold, setWinrateThreshold] = useState('60');
  const [decks, setDecks] = useState([]);
  const [timeRange, setTimeRange] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalMatchingDecks, setTotalMatchingDecks] = useState(0);

	
	// Função para ajutar a data
	const adjustDate = (dateStr) => {
		const date = new Date(dateStr);
		date.setDate(date.getDate() + 1); 
		return date.toISOString().split('T')[0]; 
	};

  const handleFetchDecks = async () => {
    if (!startDate || !endDate) {
      setError('Por favor, selecione um intervalo de datas válido.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const threshold = winrateThreshold / 100;
      
      const data = await getTopDecks(
        adjustDate(startDate), 
        adjustDate(endDate), 
        threshold
      );
      
      setDecks(data.decks);
      setTimeRange(data.timeRange);
      setTotalMatchingDecks(data.totalMatchingDecks);
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

  
	const handleThresholdChange = (event) => {
		setWinrateThreshold(event.target.value);
	};
	
  return (
    <CardsContainer>
			<BannerTopDecksContainer>
				<BannerTopDecks $backgroundImage={bannerTopDecks} />
			</BannerTopDecksContainer>
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
            Mostrando {decks.length} deck{decks.length !== 1 ? 's' : ''} de <span>{formatDate(timeRange.startDate)}</span> até <span>{formatDate(timeRange.endDate)}</span> com taxa de vitória acima de <span>{winrateThreshold}%</span>
          </TimeRange>
        )}

        {timeRange && !loading && !error && totalMatchingDecks > 0 && (
          <TotalDecksInfo>
            Total de decks encontrados: <strong>{totalMatchingDecks}</strong>
          </TotalDecksInfo>
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
                      <CardImageWrapper>
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