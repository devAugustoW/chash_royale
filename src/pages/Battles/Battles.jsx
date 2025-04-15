import React, { useState, useEffect } from 'react';
import { getBattlesStats, getBattleList } from '../../services/battleService';
import { 
  BattlesContainer, 
  BannerContainer,
  Banner,
  ContentContainer,
  Title, 
  Description, 
  BattlesList, 
  BattleCard,
  BattleTitle,
  BattleDetail,
  BattleSection,
  LoadingMessage,
  StatsContainer,
  StatsCard,
  BattleTable,
  TableHeader,
  TableRow,
  PlayerRank,
  PlayerResult,
  PlayerCrowns,
  TabsContainer,
  Tab,
  BattleHeader
} from './styles';

import bannerImage from '../../assets/banner-deck.png';

function Battles() {
  const [battleList, setBattleList] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeView, setActiveView] = useState('list'); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsData, battleListData] = await Promise.all([
          getBattlesStats(),
          getBattleList()
        ]);
        
        setStats(statsData);
        setBattleList(battleListData.battles);
        setLoading(false);

      } catch (err) {
        setError('Erro ao carregar dados das batalhas');
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPlayerId = (id) => {
    if (!id) return 'N/A';
    return id.length > 10 ? `${id.substring(0, 10)}...` : id;
  };

  if (loading) {
    return <LoadingMessage>Carregando dados de batalhas...</LoadingMessage>;
  }

  if (error) {
    return <LoadingMessage>Erro: {error}</LoadingMessage>;
  }

  return (
    <BattlesContainer>
      <BannerContainer>
				<Banner $backgroundImage={bannerImage} />
      </BannerContainer>
      
      <ContentContainer>
        <Title>Batalhas</Title>
        <Description>Análise das últimas 15 batalhas registradas.</Description>
        
        {stats && (
          <StatsContainer>
            <StatsCard>
              <h3>Total de Batalhas</h3>
              <div className="value">{stats.totalBattles.toLocaleString('pt-BR')}</div>
              <div className="detail">Número total de batalhas no banco de dados</div>
            </StatsCard>
            
            <StatsCard>
              <h3>Período das Batalhas</h3>
              <div className="detail">
                <strong>Mais antiga:</strong> {formatDate(stats.dateRange.oldestBattle)}
              </div>
              <div className="detail">
                <strong>Mais recente:</strong> {formatDate(stats.dateRange.newestBattle)}
              </div>
              <div className="detail">
                <strong>Período:</strong> {stats.dateRange.daysSpan} dias
              </div>
            </StatsCard>
          </StatsContainer>
        )}

        <TabsContainer>
          <Tab 
            $active={activeView === 'list'} 
            onClick={() => setActiveView('list')}
          >
            Batalhas
          </Tab>
        </TabsContainer>
        
        {activeView === 'list' && (
          <BattleTable>
            <TableHeader>
              <div>ID da Batalha</div>
              <div>Ranking</div>
              <div>Resultado</div>
              <div>Coroas</div>
            </TableHeader>
            
            {battleList.map((battle) => (
              <React.Fragment key={battle.battleId}>
                <BattleHeader>
                  Batalha #{battle.battleId.substring(0, 8)}... - {formatDate(battle.battleTime)}
                </BattleHeader>
                <TableRow>
                  <div>{formatPlayerId(battle.player1Id)}</div>
                  <div>
                    <PlayerRank>#{battle.player1Rank || 'N/A'}</PlayerRank>
                  </div>
                  <div>
                    <PlayerResult $won={battle.player1HasWon}>
                      {battle.player1HasWon ? 'Venceu' : 'Perdeu'}
                    </PlayerResult>
                  </div>
                  <div>
                    <PlayerCrowns>{battle.player1Crowns || 0}</PlayerCrowns>
                  </div>
                </TableRow>
                
                <TableRow>
                  <div>{formatPlayerId(battle.player2Id)}</div>
                  <div>
                    <PlayerRank>#{battle.player2Rank || 'N/A'}</PlayerRank>
                  </div>
                  <div>
                    <PlayerResult $won={battle.player2HasWon}>
                      {battle.player2HasWon ? 'Venceu' : 'Perdeu'}
                    </PlayerResult>
                  </div>
                  <div>
                    <PlayerCrowns>{battle.player2Crowns || 0}</PlayerCrowns>
                  </div>
                </TableRow>
              </React.Fragment>
            ))}
          </BattleTable>
        )}

        {activeView === 'cards' && (
          <BattlesList>
            {battleList.map((battle) => (
              <BattleCard key={battle.battleId}>
                <BattleTitle>
                  Batalha #{battle.battleId.substring(0, 8)}...
                </BattleTitle>
                
                <BattleDetail>
                  <strong>Data:</strong> {formatDate(battle.battleTime)}
                </BattleDetail>
                
                <BattleSection>
                  <h4>Jogador 1</h4>
                  <BattleDetail>
                    <strong>ID:</strong> {formatPlayerId(battle.player1Id)}
                  </BattleDetail>
                  <BattleDetail>
                    <strong>Ranking:</strong> #{battle.player1Rank || 'N/A'}
                  </BattleDetail>
                  <BattleDetail>
                    <strong>Resultado:</strong>{' '}
                    <PlayerResult $won={battle.player1HasWon}>
                      {battle.player1HasWon ? 'Venceu' : 'Perdeu'}
                    </PlayerResult>
                  </BattleDetail>
                  <BattleDetail>
                    <strong>Coroas:</strong> {battle.player1Crowns || 0}
                  </BattleDetail>
                </BattleSection>
                
                <BattleSection>
                  <h4>Jogador 2</h4>
                  <BattleDetail>
                    <strong>ID:</strong> {formatPlayerId(battle.player2Id)}
                  </BattleDetail>
                  <BattleDetail>
                    <strong>Ranking:</strong> #{battle.player2Rank || 'N/A'}
                  </BattleDetail>
                  <BattleDetail>
                    <strong>Resultado:</strong>{' '}
                    <PlayerResult $won={battle.player2HasWon}>
                      {battle.player2HasWon ? 'Venceu' : 'Perdeu'}
                    </PlayerResult>
                  </BattleDetail>
                  <BattleDetail>
                    <strong>Coroas:</strong> {battle.player2Crowns || 0}
                  </BattleDetail>
                </BattleSection>
              </BattleCard>
            ))}
          </BattlesList>
        )}
      </ContentContainer>
    </BattlesContainer>
  );
}

export default Battles;