import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getPlayerStats, getPlayerByTag } from '../../services/playerService';
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

// Adicione os novos componentes estilizados
const PlayerSearchContainer = styled.div`
  background-color: #2c2f3b;
  border-radius: 12px;
  padding: 20px;
  margin-top: 40px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SearchForm = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
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

const SearchButton = styled.button`
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

const PlayerCard = styled.div`
  background-color: #252836;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const PlayerHeader = styled.div`
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

const PlayerStats = styled.div`
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

const CardsGrid = styled.div`
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

const ErrorMessage = styled.div`
  color: #e74c3c;
  padding: 10px;
  background-color: rgba(231, 76, 60, 0.1);
  border-radius: 4px;
  margin-top: 10px;
`;

function Players() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playerStats, setPlayerStats] = useState(null);
  
  // Estados para busca de jogador por tag
  const [tagInput, setTagInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [playerData, setPlayerData] = useState(null);
  const [searchError, setSearchError] = useState(null);
  
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
  
  // Função para buscar jogador por tag
  const searchPlayerByTag = async (e) => {
    e.preventDefault();
    
    if (!tagInput.trim()) {
      setSearchError('Por favor, insira uma tag de jogador válida');
      return;
    }
    
    try {
      setIsSearching(true);
      setSearchError(null);
      setPlayerData(null);
      
      // Limpar a tag - remover espaços e caracteres especiais
      let formattedTag = tagInput.trim();
      
      // Remover o # se presente no início
      if (formattedTag.startsWith('#')) {
        formattedTag = formattedTag.substring(1);
      }
      
      console.log('Buscando jogador com tag:', formattedTag);
      
      const data = await getPlayerByTag(formattedTag);
      setPlayerData(data);
      setIsSearching(false);
    } catch (err) {
      console.error('Erro ao buscar jogador:', err);
      
      // Mensagem de erro mais detalhada
      let errorMessage = 'Erro ao buscar jogador. Por favor, tente novamente.';
      
      if (err.response) {
        if (err.response.status === 404) {
          errorMessage = `Jogador com tag ${tagInput} não encontrado`;
        } else if (err.response.data && err.response.data.error) {
          errorMessage = err.response.data.error;
        } else {
          errorMessage = `Erro ${err.response.status}: ${err.response.statusText}`;
        }
      }
      
      setSearchError(errorMessage);
      setIsSearching(false);
    }
  };
  
  // Encontrar o valor máximo para normalizar o gráfico
  const getMaxDistributionCount = () => {
    if (!playerStats || !playerStats.trophyDistribution) return 0;
    return Math.max(...playerStats.trophyDistribution.map(item => item.count));
  };
  
  // Formatar números com separador de milhares
  const formatNumber = (num, decimals = 0) => {
    return new Intl.NumberFormat('pt-BR', { 
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals 
    }).format(num);
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
          
          {/* Formulário de busca por tag */}
          <SectionTitle>Buscar Jogador por Tag</SectionTitle>
          <PlayerSearchContainer>
            <SearchForm onSubmit={searchPlayerByTag}>
              <SearchInput 
                type="text"
                placeholder="Digite a tag do jogador (ex: #2P0LYQ)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
              />
              <SearchButton type="submit" disabled={isSearching}>
                {isSearching ? 'Buscando...' : 'Buscar Jogador'}
              </SearchButton>
            </SearchForm>
            
            {searchError && <ErrorMessage>{searchError}</ErrorMessage>}
            
            {playerData && (
              <PlayerCard>
                <PlayerHeader>
                  <div className="player-info">
                    <div className="player-name">{playerData.name}</div>
                    <div className="player-tag">{playerData.tag}</div>
                  </div>
                  <div className="player-trophies">
                    {formatNumber(playerData.trophies)} troféus
                  </div>
                </PlayerHeader>
                
                <PlayerStats>
                  <div className="stat-item">
                    <div className="stat-label">Nível</div>
                    <div className="stat-value">{playerData.expLevel}</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-label">Recorde de Troféus</div>
                    <div className="stat-value">{formatNumber(playerData.bestTrophies || playerData.trophies)}</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-label">Vitórias</div>
                    <div className="stat-value">{formatNumber(playerData.wins)}</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-label">Derrotas</div>
                    <div className="stat-value">{formatNumber(playerData.losses)}</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-label">Batalhas Totais</div>
                    <div className="stat-value">{formatNumber(playerData.battleCount)}</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-label">Cartas no Deck</div>
                    <div className="stat-value">{formatNumber(playerData.currentDeck?.length || 0)}</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-label">Total de Cartas</div>
                    <div className="stat-value">{formatNumber(playerData.cards?.length || 0)}</div>
                  </div>
                </PlayerStats>
                
                {playerData.cards && playerData.cards.length > 0 && (
                  <>
                    <SectionTitle>Cartas do Jogador</SectionTitle>
                    <CardsGrid>
                      {playerData.cards.slice(0, 16).map((card, index) => (
                        <div className="card-item" key={index}>
                          {card.iconUrl ? (
                            <img 
                              src={card.iconUrl} 
                              alt={card.name} 
                              className="card-image"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/80?text=Sem+Imagem';
                              }}
                            />
                          ) : (
                            <div className="card-image-placeholder">
                              {card.name.charAt(0)}
                            </div>
                          )}
                          <div className="card-name">{card.name}</div>
                          <div className="card-level">Nível {card.level}</div>
                          {card.elixirCost && (
                            <div className="card-elixir">{card.elixirCost}</div>
                          )}
                          {card.rarity && (
                            <div className={`card-rarity ${card.rarity}`}>
                              {card.rarity}
                            </div>
                          )}
                        </div>
                      ))}
                    </CardsGrid>
                    {playerData.cards.length > 16 && (
                      <div style={{ textAlign: 'center', marginTop: '10px', color: '#a1a3aa', fontSize: '14px' }}>
                        Mostrando 16 de {playerData.cards.length} cartas
                      </div>
                    )}
                  </>
                )}
                
                {playerData.supportCards && playerData.supportCards.length > 0 && (
                  <>
                    <SectionTitle>Cartas de Suporte</SectionTitle>
                    <CardsGrid>
                      {playerData.supportCards.map((card, index) => (
                        <div className="card-item" key={index}>
                          {card.iconUrl ? (
                            <img 
                              src={card.iconUrl} 
                              alt={card.name} 
                              className="card-image"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/80?text=Sem+Imagem';
                              }}
                            />
                          ) : (
                            <div className="card-image-placeholder">
                              {card.name.charAt(0)}
                            </div>
                          )}
                          <div className="card-name">{card.name}</div>
                          <div className="card-level">Nível {card.level}</div>
                          {card.elixirCost && (
                            <div className="card-elixir">{card.elixirCost}</div>
                          )}
                          {card.rarity && (
                            <div className={`card-rarity ${card.rarity}`}>
                              {card.rarity}
                            </div>
                          )}
                        </div>
                      ))}
                    </CardsGrid>
                  </>
                )}
              </PlayerCard>
            )}
          </PlayerSearchContainer>
        </StatsContainer>
      )}
    </CardsContainer>
  );
}

export default Players;
