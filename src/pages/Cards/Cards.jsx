import React, { useState, useEffect } from 'react';
import { getPopularCards } from '../../services/cardService';
import {
  CardsContainer,
  Title,
  Description,
  LoadingMessage,
  CardGrid,
  CardItem,
  CardImageContainer,
  CardImage,
  ElixirCost,
  CardInfo,
  CardName,
  CardRarity,
  CardStatistic,
  CardUsage,
  CardRank
} from './styles';

function Cards() {
  const [popularCards, setPopularCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularCards = async () => {
      try {
        setLoading(true);
        const data = await getPopularCards();
        setPopularCards(data.cards);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar dados das cartas');
        setLoading(false);
        console.error(err);
      }
    };

    fetchPopularCards();
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
    return <LoadingMessage>Carregando dados das cartas...</LoadingMessage>;
  }

  if (error) {
    return <LoadingMessage>Erro: {error}</LoadingMessage>;
  }

  return (
    <CardsContainer>
      <Title>Cartas Populares</Title>
      <Description>
        As 10 cartas mais populares entre os 100 melhores jogadores do mundo.
      </Description>

      <CardGrid>
        {popularCards.map((card, index) => (
          <CardItem key={card.cardId}>
            <CardImageContainer $rarity={card.rarity}>
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
            </CardImageContainer>
            
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

export default Cards;