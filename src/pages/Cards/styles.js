import styled from 'styled-components';

export const CardsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const Title = styled.h1`
  font-size: 32px;
  color: #cbccd1;
  margin-bottom: 10px;
`;

export const Description = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: rgb(161, 163, 170);
  margin-bottom: 30px;
`;

export const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  font-size: 20px;
  color: #cbccd1;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

export const CardItem = styled.div`
  background-color: #2c2f3b;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  }
`;

export const CardImageContainer = styled.div`
  background-color: ${props => getCardRarityColor(props.$rarity)};
  padding: 15px;
  display: flex;
  justify-content: center;
  position: relative;
`;

export const CardImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
`;

export const ElixirCost = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #9b59b6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

export const CardInfo = styled.div`
  padding: 15px;
`;

export const CardName = styled.h3`
  font-size: 18px;
  color: #fff;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CardRarity = styled.div`
  font-size: 14px;
  color: ${props => getCardRarityColor(props.$rarity)};
  margin-bottom: 8px;
`;

export const CardStatistic = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #3e4251;
`;

export const CardUsage = styled.div`
  font-size: 14px;
  color: #a1a3aa;
  
  span {
    font-weight: bold;
    color: #f3a952;
    font-size: 16px;
  }
`;

export const CardRank = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: #f3a952;
  color: #1e2130;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
`;

// Função auxiliar para determinar a cor com base na raridade
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