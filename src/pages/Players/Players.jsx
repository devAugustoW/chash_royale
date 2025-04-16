import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getPlayerStats } from '../../services/playerService';
import { 
  CardsContainer, 
  Title, 
  Description, 
  LoadingMessage 
} from '../Cards/styles';

// Componentes estilizados
const StatsContainer = styled.div`
  margin-top: 30px;
  padding: 0 20px;
`;

const StatsOverview = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

const StatCard = styled.div`
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

const SectionTitle = styled.h2`
  font-size: 24px;
  color: #cbccd1;
  margin: 30px 0 15px;
`;

const ChartContainer = styled.div`
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

const BarChart = styled.div`
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

const Bar = styled.div`
  flex: 1;
  background-color: #f3a952;
  position: relative;
  height: ${props => props.height}%;
  min-height: 1px;
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

const PlayersTable = styled.div`
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

function Players() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playerStats, setPlayerStats] = useState(null);
  
  useEffect(() => {
    const fetchPlayerStats = async () => {
      try {
        setLoading(true);
        const data = await getPlayerStats();
        setPlayerStats(data);
        setLoading(false);
      } catch (err) {
        console.error('Erro ao carregar estatísticas de jogadores:', err);
        setError('Erro ao carregar estatísticas de jogadores. Por favor, tente novamente mais tarde.');
        setLoading(false);
      }
    };
    
    fetchPlayerStats();
  }, []);
  
  // Encontrar o valor máximo para normalizar o gráfico
  const getMaxDistributionCount = () => {
    if (!playerStats || !playerStats.trophyDistribution) return 0;
    return Math.max(...playerStats.trophyDistribution.map(item => item.count));
  };
  
  // Formatar números com separador de milhares
  const formatNumber = (num) => {
    return new Intl.NumberFormat('pt-BR').format(num);
  };
  
  // Formatar as faixas de troféus para exibição
  const formatTrophyRange = (min, max) => {
    if (max === "10000+") return `${formatNumber(min)}+`;
    return `${formatNumber(min)}-${formatNumber(max)}`;
  };
  
  if (loading) {
    return <LoadingMessage>Carregando estatísticas de jogadores...</LoadingMessage>;
  }
  
  if (error) {
    return <LoadingMessage>{error}</LoadingMessage>;
  }
  
  return (
    <CardsContainer>
      <Title>Estatísticas de Jogadores</Title>
      <Description>
        Informações e estatísticas sobre jogadores do Clash Royale em nossa base de dados.
      </Description>
      
      {playerStats && (
        <StatsContainer>
          <SectionTitle>Visão Geral</SectionTitle>
          <StatsOverview>
            <StatCard>
              <div className="stat-value">{formatNumber(playerStats.totalPlayers)}</div>
              <div className="stat-label">Total de Jogadores</div>
            </StatCard>
            
            <StatCard>
              <div className="stat-value">{formatNumber(Math.round(playerStats.statistics.avgTrophies))}</div>
              <div className="stat-label">Média de Troféus</div>
            </StatCard>
            
            <StatCard>
              <div className="stat-value">{formatNumber(playerStats.statistics.maxTrophies)}</div>
              <div className="stat-label">Máximo de Troféus</div>
            </StatCard>
            
            <StatCard>
              <div className="stat-value">{playerStats.statistics.avgExpLevel}</div>
              <div className="stat-label">Nível Médio</div>
            </StatCard>
            
            <StatCard>
              <div className="stat-value">{formatNumber(Math.round(playerStats.statistics.avgWins))}</div>
              <div className="stat-label">Média de Vitórias</div>
            </StatCard>
            
            <StatCard>
              <div className="stat-value">{formatNumber(Math.round(playerStats.statistics.avgBattleCount))}</div>
              <div className="stat-label">Média de Batalhas</div>
            </StatCard>
          </StatsOverview>
          
          <SectionTitle>Distribuição de Troféus</SectionTitle>
          <ChartContainer>
            <h3>Número de jogadores por faixa de troféus</h3>
            <BarChart>
              {playerStats.trophyDistribution.map((range, index) => {
                const maxCount = getMaxDistributionCount();
                const heightPercentage = (range.count / maxCount) * 90; // 90% da altura máxima
                const minValue = range._id === "10000+" ? 10000 : range._id;
                const maxValue = range._id === "10000+" ? "10000+" : 
                  (index < playerStats.trophyDistribution.length - 1 ? 
                    playerStats.trophyDistribution[index + 1]._id : minValue + 1000);
                  
                return (
                  <Bar 
                    key={minValue} 
                    height={heightPercentage}
                    title={`${range.count} jogadores com ${formatTrophyRange(minValue, maxValue)} troféus`}
                  >
                    <div className="bar-value">{formatNumber(range.count)}</div>
                    <div className="bar-label">{formatTrophyRange(minValue, maxValue)}</div>
                  </Bar>
                );
              })}
            </BarChart>
          </ChartContainer>
          
          <SectionTitle>Top 10 Jogadores</SectionTitle>
          <PlayersTable>
            <table>
              <thead>
                <tr>
                  <th>Classificação</th>
                  <th>Jogador</th>
                  <th>Troféus</th>
                  <th>Nível</th>
                  <th>Vitórias</th>
                  <th>Derrotas</th>
                  <th>Total de Batalhas</th>
                </tr>
              </thead>
              <tbody>
                {playerStats.topPlayers.map((player, index) => (
                  <tr key={player.tag}>
                    <td>
                      <div className="player-rank">
                        <div className="rank">{index + 1}</div>
                      </div>
                    </td>
                    <td>
                      <div className="player-name">
                        <span className="name">{player.name}</span>
                        <span className="tag" style={{ fontSize: '12px', color: '#a1a3aa', marginLeft: '5px' }}>
                          {player.tag}
                        </span>
                      </div>
                    </td>
                    <td className="trophy-value">{formatNumber(player.trophies)}</td>
                    <td>{player.expLevel}</td>
                    <td>{formatNumber(player.wins)}</td>
                    <td>{formatNumber(player.losses)}</td>
                    <td>{formatNumber(player.battleCount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </PlayersTable>
        </StatsContainer>
      )}
    </CardsContainer>
  );
}

export default Players;
