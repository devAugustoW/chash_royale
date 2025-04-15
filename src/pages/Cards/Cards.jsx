import React, { useState, useEffect } from 'react';
import { getCardStatsOptimized } from '../../services/cardService';
import bannerImage from '../../assets/banner-deck.png';
import {
	BannerContainer,
	Banner,
	Title,
  Description,
  CardsContainer,
	CardOptionContainer,
	CardOption,
	OptionTitle,
	OptionDescription,
	StatsContainer,
  StatsHeader,
	StatsTitle,
	DateRangeSelector,
	DateInput,
	StatsButton,
	StatsGrid,
	StatCard,
	CardImage,
	ElixirCost,
	CardInfo,
	CardName,
	StatsBar,
	WinBar,
	LossBar,
	StatsDetail,
	TimeRange,
  LoadingMessage
} from './styles';


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
      <BannerContainer>
        <Banner backgroundImage={bannerImage} />
      </BannerContainer>
      
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
        
        <CardOption to="/cartas/decks">
          <OptionTitle>Decks Vencedores</OptionTitle>
          <OptionDescription>
            Descubra os melhores decks com altas taxas de vitória em diferentes períodos.
          </OptionDescription>
        </CardOption>

        <CardOption to="/cartas/trofeus">
          <OptionTitle>Cartas - Troféus</OptionTitle>
          <OptionDescription>
            Encontre vitórias impressionantes com cartas específicas onde o jogador estava em desvantagem de troféus.
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