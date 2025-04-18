import React, { useState, useEffect } from 'react';
import { getPlayersStats, getPlayerByTag } from '../../services/playerService';
import { BannerPlayersContainer } from './styles';
import { 
  Title, 
  Description, 
  LoadingMessage 
} from '../Cards/styles';

import {
  StatsContainer,
  StatsOverview,
  StatCard,
  SectionTitle,
  ChartContainer,
  BarChart,
  Bar,
  PlayersTable,
  PlayerSearchContainer,
  SearchForm,
  SearchInput,
  SearchButton,
  PlayerCard,
  PlayerHeader,
  PlayerStats,
  CardsGrid,
  ErrorMessage,
} from './styles';

import bannerPlayers from '../../assets/benner-top-decks.webp'

function Players() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playerStats, setPlayerStats] = useState(null);
  
  // Estados para busca de jogador por tag
  const [tagInput, setTagInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [playerData, setPlayerData] = useState(null);
  const [searchError, setSearchError] = useState(null);
  
	// Carrega as Estatísticas dos Jogadores
  useEffect(() => {
    const fetchPlayersStats = async () => {
      try {
        setLoading(true);
        const data = await getPlayersStats();

        setPlayerStats(data);
        setLoading(false);

      } catch (err) {
        console.error('Erro ao carregar estatísticas de jogadores:', err);
        setError('Erro ao carregar estatísticas de jogadores. Por favor, tente novamente mais tarde.');
        setLoading(false);

      }
    };
    
    fetchPlayersStats();
  }, []);

	// Função para tratar erro de searchPlayerByTag
	const errorSearchPlayerByTag = (err, tag) => {
		let errorMessage = 'Erro ao buscar jogador. Por favor, tente novamente.';
  
  	if (err.response) {
			if (err.response.status === 404) {
				errorMessage = `Jogador com tag ${tag} não encontrado`;
			} else if (err.response.data && err.response.data.error) {
				errorMessage = err.response.data.error;
			} else {
				errorMessage = `Erro ${err.response.status}: ${err.response.statusText}`;
			}
  	}
  
  	return errorMessage;
	}
  
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
      
      const data = await getPlayerByTag(formattedTag);
      setPlayerData(data);
      setIsSearching(false);

    } catch (err) {
      console.error('Erro ao buscar jogador:', err);
  		setSearchError(errorSearchPlayerByTag(err, tagInput));
  		setIsSearching(false);
    }
  };
  
  // Encontrar o valor máximo para normalizar o gráfico
  const getMaxDistributionCount = () => {
    if (!playerStats || !playerStats.trophyDistribution) return 0;
    return Math.max(...playerStats.trophyDistribution.map(item => item.count));
  };
  
  // Função para formatar números com separador de milhares
  const formatNumber = (num, decimals = 0) => {
    return new Intl.NumberFormat('pt-BR', { 
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals 
    }).format(num);
  };
  
  // Formatar as faixas de troféus do gráfico
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
    <div>
			<BannerPlayersContainer>
				<img src={bannerPlayers} alt="Banner Jogadores" />
			</BannerPlayersContainer>
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
                const heightPercentage = (range.count / maxCount) * 90; 
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
    </div>
  );
}

export default Players;
