import styled from 'styled-components';

export const BannerPlayersContainer = styled.div`
	width: 100%;
	height: 300px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	position: relative;
	overflow: hidden;
	margin-bottom: 30px;

	img {
		width: 100%;
		height: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		display: block;
		object-fit: cover;
		object-position: center bottom;
	}
`;
export const StatsContainer = styled.div`
  margin-top: 30px;
  padding: 0 20px;
`;

export const StatsOverview = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

export const StatCard = styled.div`
  background-color: #2c2f3b;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  .stat-value {
    font-size: 36px;
    font-weight: bold;
    color: #f3a952;
    margin: 10px 0;
  }
  
  .stat-label {
    font-size: 14px;
    color: #a1a3aa;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 24px;
  color: #cbccd1;
  margin: 30px 0 15px;
`;

export const ChartContainer = styled.div`
  background-color: #2c2f3b;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  h3 {
    color: #cbccd1;
    margin-top: 0;
    margin-bottom: 20px;
  }
`;

export const BarChart = styled.div`
  display: flex;
  height: 250px;
  align-items: flex-end;
  gap: 8px;
  padding-bottom: 20px;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    background-color: #3e4251;
  }
`;

export const Bar = styled.div`
  flex: 1;
	height: ${props => props.height}%;
	min-height: 1px;
  background-color: #f3a952;
  position: relative;
  border-radius: 3px 3px 0 0;
  
  &:hover {
    background-color: #e59a43;
  }
  
  .bar-value {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    color: #cbccd1;
    font-size: 12px;
  }
  
  .bar-label {
    position: absolute;
    bottom: -20px;
    left: 25%;
    transform-origin: left top;
    color: #a1a3aa;
    font-size: 12px;
    white-space: nowrap;
  }
`;

export const PlayersTable = styled.div`
  overflow-x: auto;
  background-color: #2c2f3b;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  table {
    width: 100%;
    border-collapse: collapse;
    
    th, td {
      padding: 12px 15px;
      text-align: left;
    }
    
    th {
      color: #cbccd1;
      font-weight: 500;
      border-bottom: 1px solid #3e4251;
    }
    
    td {
      color: #a1a3aa;
    }
    
    tr:hover td {
      background-color: #252836;
    }
    
    .trophy-value {
      color: #f1c40f;
      font-weight: bold;
    }
    
    .player-rank {
      display: flex;
      align-items: center;
      gap: 10px;
      
      .rank {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: #3e4251;
        color: #fff;
        font-size: 12px;
      }
      
      .name {
        color: #cbccd1;
      }
    }
  }
`;

export const PlayerSearchContainer = styled.div`
  background-color: #2c2f3b;
  border-radius: 12px;
  padding: 20px;
  margin-top: 30px;
	margin-bottom: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const SearchForm = styled.form`
  display: flex;
  gap: 10px;
	
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  background-color: #1f2129;
  border: 1px solid #3e4251;
  border-radius: 4px;
  padding: 10px 15px;
  color: #cbccd1;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #f3a952;
  }
  
  &::placeholder {
    color: #6c6f7e;
  }
`;

export const SearchButton = styled.button`
  background-color: #f3a952;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  color: #1f2129;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #e59a43;
  }
  
  &:disabled {
    background-color: #6c6f7e;
    cursor: not-allowed;
  }
`;

export const PlayerCard = styled.div`
  background-color: #252836;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const PlayerHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  
  .player-info {
    flex: 1;
  }
  
  .player-name {
    font-size: 24px;
    font-weight: bold;
    color: #cbccd1;
  }
  
  .player-tag {
    font-size: 14px;
    color: #a1a3aa;
  }
  
  .player-trophies {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #f1c40f;
    font-weight: bold;
    font-size: 18px;
  }
`;

export const PlayerStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 15px;
  
  .stat-item {
    padding: 10px;
    background-color: #2c2f3b;
    border-radius: 4px;
    
    .stat-label {
      font-size: 12px;
      color: #a1a3aa;
      margin-bottom: 5px;
    }
    
    .stat-value {
      font-size: 18px;
      color: #cbccd1;
      font-weight: 500;
    }
  }
`;

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
  margin-top: 20px;
  
  .card-item {
    background-color: #2c2f3b;
    border-radius: 8px;
    padding: 10px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.2s;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }
    
    .card-image {
      width: 80px;
      height: 80px;
      object-fit: contain;
      margin-bottom: 8px;
      border-radius: 8px;
    }
    
    .card-name {
      font-size: 12px;
      color: #cbccd1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 4px;
    }
    
    .card-level {
      font-size: 11px;
      color: #8f9195;
      margin-bottom: 4px;
    }
    
    .card-elixir {
      font-size: 11px;
      color: #3498db;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2px;
      
      &:before {
        content: '💧';
        font-size: 10px;
      }
    }
    
    .card-rarity {
      font-size: 10px;
      padding: 2px 5px;
      border-radius: 3px;
      margin-top: 4px;
      
      &.Common { background-color: #bdc3c7; color: #2c3e50; }
      &.Rare { background-color: #3498db; color: #fff; }
      &.Epic { background-color: #9b59b6; color: #fff; }
      &.Legendary { background-color: #f1c40f; color: #7f8c8d; }
      &.Champion { background-color: #e74c3c; color: #fff; }
    }
  }
`;

export const ErrorMessage = styled.div`
  color: #e74c3c;
  padding: 10px;
  background-color: rgba(231, 76, 60, 0.1);
  border-radius: 4px;
  margin-top: 10px;
`;
