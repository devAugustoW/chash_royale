import React, { useState, useEffect } from 'react';
import { getLessPopularCards } from '../../services/cardService';
import {
  CardsContainer,
	BannerLessPopularContainer,
	BannerLessPopular,
  Title,
  Description,
  LoadingMessage,
  CardGrid,
  CardItem,
  CardImage,
  ElixirCost,
  CardInfo,
  CardName,
  CardRarity,
  CardStatistic,
  CardUsage,
  CardRank
} from './styles';

import bannerLessPopular from '../../assets/banner-loss-popular.jpg';

function LessPopularCards() {
  const [lessPopularCards, setLessPopularCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLessPopularCards = async () => {
      try {
        setLoading(true);
        const data = await getLessPopularCards();
        setLessPopularCards(data.cards);
        setLoading(false);
      } catch (err) {
        console.error(err);
        let errorMessage = 'Erro ao carregar dados das cartas menos populares';
        
        if (err.response) {
          if (err.response.status === 404) {
            errorMessage = 'Recurso não encontrado. A API para cartas menos populares pode não estar disponível ainda.';
          } else {
            errorMessage = `Erro ${err.response.status}: ${err.response.data?.message || 'Erro no servidor'}`;
          }
        } else if (err.request) {
          errorMessage = 'Não foi possível conectar ao servidor. Verifique sua conexão.';
        }
        
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchLessPopularCards();
  }, []);

  // Função para traduzir as raridades em português
  const translateRarity = (rarity) => {
    const translations = {
      'Common': 'Comum',
      'Rare': 'Rara',
      'Epic': 'Épica',
      'Legendary': 'Lendária',
      'Champion': 'Campeã'
    };
    
    return translations[rarity] || rarity;
  };

  if (loading) {
    return <LoadingMessage>Carregando dados das cartas menos populares...</LoadingMessage>;
  }

  if (error) {
    return <LoadingMessage>Erro: {error}</LoadingMessage>;
  }

  return (
    <CardsContainer>
			<BannerLessPopularContainer>
				<BannerLessPopular $backgroundImage={bannerLessPopular} />
			</BannerLessPopularContainer>
      <Title>Cartas Menos Populares</Title>
      <Description>
        As 10 cartas menos populares entre os 100 melhores jogadores do mundo.
      </Description>

      <CardGrid>
        {lessPopularCards.map((card, index) => (
          <CardItem key={card.cardId}>
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
              {card.rarity && (
                <CardRarity $rarity={card.rarity}>
                  {translateRarity(card.rarity)}
                </CardRarity>
              )}
              
              <CardStatistic>
                <CardUsage>
                  Uso: <span>{card.count}</span> vezes
                </CardUsage>
                <CardRank>{index + 1}</CardRank>
              </CardStatistic>
            </CardInfo>
          </CardItem>
        ))}
      </CardGrid>
    </CardsContainer>
  );
}

export default LessPopularCards; 