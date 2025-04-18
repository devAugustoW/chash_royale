import styled from 'styled-components';

export const CardsContainer = styled.div`
  max-width: 100%;
  padding: 0 20px 20px 0;
`;

export const BannerContainer = styled.div`
  width: calc(100% + 20px);
  margin-bottom: 30px;
  height: 330px;
  overflow: hidden;
`;

export const Banner = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${props => props.$backgroundImage});
  background-repeat: repeat;
  background-size: contain;
	
`;

export const Title = styled.h1`
  font-size: 32px;
  color: #cbccd1;
  margin-bottom: 10px;
	padding-left: 20px;
	padding-right: 20px;
`;

export const Description = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: rgb(161, 163, 170);
  margin-bottom: 30px;
	padding-left: 20px;
	padding-right: 20px;
`;

export const CardOptionContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
  margin-top: 30px;
  margin-bottom: 40px;
	padding-left: 20px;
	padding-right: 9px;
`;

export const CardOption = styled.div`
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

export const OptionTitle = styled.h3`
  font-size: 20px;
  color: #fff;
  margin-bottom: 10px;
	
`;

export const OptionDescription = styled.p`
  font-size: 16px;
  color: #a1a3aa;
  line-height: 1.5;
`;

export const StatsContainer = styled.div`
  margin-top: 40px;
	padding-left: 20px;
	padding-right: 20px;
`;

export const StatsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
	gap: 15px;
	flex-wrap: wrap;
	padding: 10px;
  margin-bottom: 20px;
	border: 3px solid red;
	border-radius: 10px;
`;

export const StatsTitle = styled.h2`
  font-size: 24px;
  color: #cbccd1;
`;

export const DateRangeSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const DateInput = styled.input`
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

export const StatsButton = styled.button`
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

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
`;

export const StatCard = styled.div`
  background-color: #2c2f3b;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

export const CardImage = styled.div`
  background-color: ${props => getCardRarityColor(props.$rarity)};
  padding: 15px;
  display: flex;
  justify-content: center;
  position: relative;
  
  img {
    width: 110px;
    height: 110px;
    object-fit: contain;
  }
`;

export const ElixirCost = styled.div`
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

export const CardInfo = styled.div`
  padding: 15px;
`;

export const CardName = styled.h3`
  font-size: 16px;
  color: #fff;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StatsBar = styled.div`
  height: 30px;
  background-color: #3e4251;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 10px;
  display: flex;
`;

export const WinBar = styled.div`
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

export const LossBar = styled.div`
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

export const StatsDetail = styled.div`
  margin-top: 10px;
  font-size: 13px;
  color: #a1a3aa;
  
  span {
    color: #cbccd1;
    font-weight: bold;
  }
`;

export const TimeRange = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #a1a3aa;
  
  span {
    color: #f3a952;
    font-weight: bold;
  }
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

// Estilos para a página de Combos Perdedores
export const ComboLossContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
`;

export const ComboLossLeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 500px;
`;

export const ComboLossForm = styled.form`
  width: 95%;
  background-color: #2c2f3b;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	margin-left: 20px
`;

export const ComboLossImgContainer = styled.div`
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	margin-left: 20px;
  
  img {
    width: 95%;
    height: auto;
    display: block;
    object-fit: cover;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #cbccd1;
  font-weight: 500;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #3e4251;
  border-radius: 4px;
  background-color: #252836;
  color: #cbccd1;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #f3a952;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #3e4251;
  border-radius: 4px;
  background-color: #252836;
  color: #cbccd1;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #f3a952;
  }
`;

export const Button = styled.button`
  background-color: #f3a952;
  color: #1e293b;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #e69c43;
  }
  
  &:disabled {
    background-color: #68686d;
    cursor: not-allowed;
  }
`;

export const ComboLossResult = styled.div`
  flex: 1;
  min-width: 300px;
`;

export const ComboLossCard = styled.div`
	height: 100%;
  background-color: #2c2f3b;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  h3 {
    margin-top: 0;
    color: #cbccd1;
    font-size: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #3e4251;
    padding-bottom: 10px;
		text-align: center;
  }
  
  h4 {
    color: #cbccd1;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      padding: 8px 12px;
      margin-bottom: 5px;
      background-color: #3e4251;
      border-radius: 4px;
      color: #cbccd1;
    }
  }
`;

export const ComboLossValue = styled.div`
  font-size: 60px;
  font-weight: bold;
  color: #f3a952;
  text-align: center;
  margin: 20px 0 5px;
`;

export const ComboLossInfo = styled.div`
  text-align: center;
  color: #a1a3aa;
  margin-bottom: 20px;
`;

export const DateRange = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: #252836;
  border-radius: 6px;
  
  p {
		font-size: 20px;
    margin: 5px 0;
    color: #a1a3aa;
  }
  
  strong {
	font-size: 22px;
    color: #cbccd1;
  }
`;

// Novos componentes estilizados para exibição de cartas
export const ComboCardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 20px 0;
	
`;

export const ComboCardItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #252836;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 120px;
  position: relative;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  .card-placeholder {
    width: 80px;
    height: 80px;
    background-color: #3e4251;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    color: #f3a952;
    font-weight: bold;
  }
`;

export const ComboCardImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin-bottom: 8px;
  border-radius: 8px;
`;

export const ComboCardInfo = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 8px;
`;

export const ComboCardName = styled.div`
  font-weight: bold;
  color: #f3a952;
  font-size: 20px;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ComboCardDetail = styled.div`
  color: #a1a3aa;
  font-size: 16px;
`;

export const ComboPlusIcon = styled.div`
  font-size: 32px;
  color: #cbccd1;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ComboCardElixir = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 26px;
  height: 26px;
  background-color: #9c59db;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  
  span {
    color: white;
    font-size: 14px;
    font-weight: bold;
  }
`;