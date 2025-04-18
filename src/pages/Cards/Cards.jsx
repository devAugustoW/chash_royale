import React, { useState } from 'react';
import { getCardStats } from '../../services/cardService';
import bannerImageCards from '../../assets/banner-deck.png';
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

function formatDate(date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('pt-BR');
}

function Cards() {
  const [startDate, setStartDate] = useState('2025-02-02');
  const [endDate, setEndDate] = useState('2025-03-29');
  const [cardStats, setCardStats] = useState([]);
  const [timeRange, setTimeRange] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

	// ajuste da Data
  const adjustDate = (dateStr) => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
  };

	// tratamento de erros
	const handleError = (err) => {
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
    
    return errorMessage;
  };

	// busca estatísticas
  const handleFetchStats = async () => {
    if (!startDate || !endDate) {
      setError('Por favor, selecione um intervalo de datas válido.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await getCardStats(adjustDate(startDate), adjustDate(endDate));

      setCardStats(data.cards);
      setTimeRange(data.timeRange);
			
      setLoading(false);

    } catch (err) {
      setError(handleError(err));
      setLoading(false);
    }
  };

  return (
    <CardsContainer>
      <BannerContainer>
        <Banner $backgroundImage={bannerImageCards} />
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
            />
            <DateInput 
              type="date" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)}
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