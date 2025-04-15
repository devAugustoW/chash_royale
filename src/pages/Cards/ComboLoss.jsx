import React, { useState, useEffect } from 'react';
import { getComboLoss } from '../../services/cardService';
import { getCardsList } from '../../services/cardService';
import comboLossImage from '../../assets/combo-loss-img.jpg';
import {
  CardsContainer,
  Title,
  Description,
  LoadingMessage,
  ComboLossContainer,
  ComboLossForm,
  FormGroup,
  Label,
  Input,
  Select,
  Button,
  ComboLossResult,
  ComboLossCard,
  ComboLossValue,
  ComboLossInfo,
  DateRange,
  ComboCardContainer,
  ComboCardImage,
  ComboCardInfo,
  ComboCardItem,
  ComboCardName,
  ComboCardDetail,
  ComboPlusIcon,
  ComboCardElixir,
  ComboLossImgContainer,
  ComboLossLeftColumn
} from './styles';

function ComboLoss() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cards, setCards] = useState([]);
  const [card1, setCard1] = useState('');
  const [card2, setCard2] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const loadCards = async () => {
      try {
        setLoading(true);
        const cardsData = await getCardsList();
        setCards(cardsData || []); // Se cardsData for undefined, usa array vazio
      } catch (err) {
        console.error('Erro ao carregar lista de cartas:', err);
        setError('Erro ao carregar lista de cartas. Usando lista alternativa.');
        
        // Lista de fallback com algumas cartas comuns caso a API falhe
        setCards([
          { id: 'card1', name: 'Gigante' },
          { id: 'card2', name: 'Bola de Fogo' },
          { id: 'card3', name: 'Valquíria' },
          { id: 'card4', name: 'Bruxa' },
          { id: 'card5', name: 'Mosqueteira' },
          { id: 'card6', name: 'Goblins' },
          { id: 'card7', name: 'Príncipe' },
          { id: 'card8', name: 'Baby Dragon' },
          { id: 'card9', name: 'Lenhador' },
          { id: 'card10', name: 'Cavaleiro' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadCards();
  }, []);

  const validateForm = () => {
    if (!card1) {
      setFormError('Selecione a primeira carta');
      return false;
    }
    
    if (!card2) {
      setFormError('Selecione a segunda carta');
      return false;
    }
    
    if (card1 === card2) {
      setFormError('Selecione duas cartas diferentes');
      return false;
    }
    
    if (!startDate) {
      setFormError('A data inicial é obrigatória');
      return false;
    }
    
    if (!endDate) {
      setFormError('A data final é obrigatória');
      return false;
    }
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start > end) {
      setFormError('A data inicial não pode ser maior que a data final');
      return false;
    }
    
    setFormError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const combo = [card1, card2];
      const data = await getComboLoss(combo, startDate, endDate);
      setResult(data);
    } catch (err) {
      setError('Erro ao buscar dados de combos perdedores');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Não especificado';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Apenas para exibição no componente
  const today = new Date().toISOString().split('T')[0];
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  const oneMonthAgoStr = oneMonthAgo.toISOString().split('T')[0];

  return (
    <CardsContainer>
      <Title>Combos Perdedores</Title>
      <Description>
        Analise o número de derrotas com uma combinação específica de duas cartas.
        Selecione exatamente duas cartas diferentes para verificar quantas vezes esse combo resultou em derrota.
      </Description>

      {loading && cards.length === 0 ? (
        <LoadingMessage>Carregando lista de cartas...</LoadingMessage>
      ) : (
        <ComboLossContainer>
          {error && (
            <div style={{ 
              color: '#f3a952', 
              padding: '10px 15px', 
              backgroundColor: '#2c2f3b', 
              borderRadius: '8px', 
              marginBottom: '20px',
              width: '100%'
            }}>
              {error}
            </div>
          )}

          <ComboLossLeftColumn>
            <ComboLossForm onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="card1Select">Primeira Carta:</Label>
                <Select 
                  id="card1Select" 
                  value={card1}
                  onChange={(e) => setCard1(e.target.value)}
                  required
                  disabled={cards.length === 0}
                >
                  <option value="">Selecione a primeira carta</option>
                  {cards.map(card => (
                    <option key={`card1-${card.id}`} value={card.name}>
                      {card.name}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="card2Select">Segunda Carta:</Label>
                <Select 
                  id="card2Select" 
                  value={card2}
                  onChange={(e) => setCard2(e.target.value)}
                  required
                  disabled={cards.length === 0}
                >
                  <option value="">Selecione a segunda carta</option>
                  {cards.map(card => (
                    <option key={`card2-${card.id}`} value={card.name}>
                      {card.name}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="startDate">Data Inicial:</Label>
                <Input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  max={today}
                  placeholder={oneMonthAgoStr}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="endDate">Data Final:</Label>
                <Input
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  max={today}
                  placeholder={today}
                  required
                />
              </FormGroup>

              {formError && (
                <div style={{ color: '#f44336', marginBottom: '15px', fontSize: '14px' }}>
                  {formError}
                </div>
              )}

              <Button type="submit" disabled={loading || cards.length === 0}>
                {loading ? 'Buscando...' : 'Analisar Combo'}
              </Button>
            </ComboLossForm>

            <ComboLossImgContainer>
              <img src={comboLossImage} alt="Combinações de cartas para análise" />
            </ComboLossImgContainer>
          </ComboLossLeftColumn>

          {loading && <LoadingMessage>Carregando dados...</LoadingMessage>}
          
          {result && (
            <ComboLossResult>
              <ComboLossCard>
                <h3>Resultado da Análise</h3>
                <ComboLossValue>{result.lossCount}</ComboLossValue>
                <ComboLossInfo>derrotas com este combo</ComboLossInfo>
                
                <h4>Combinação analisada:</h4>
                <ComboCardContainer>
                  {result.combo.map((card, index) => (
                    <React.Fragment key={card.id || index}>
                      <ComboCardItem>
                        {card.iconUrl ? (
                          <ComboCardImage src={card.iconUrl} alt={card.name} />
                        ) : (
                          <div className="card-placeholder">
                            {card.name.charAt(0)}
                          </div>
                        )}
                        <ComboCardInfo>
                          <ComboCardName>{card.name}</ComboCardName>
                          {card.elixirCost && (
                            <ComboCardElixir>
                              <span>{card.elixirCost}</span>
                            </ComboCardElixir>
                          )}
                          {card.rarity && (
                            <ComboCardDetail>{card.rarity}</ComboCardDetail>
                          )}
                        </ComboCardInfo>
                      </ComboCardItem>
                      
                      {index === 0 && (
                        <ComboPlusIcon>+</ComboPlusIcon>
                      )}
                    </React.Fragment>
                  ))}
                </ComboCardContainer>

                {result.dateRange && (
                  <DateRange>
                    <p><strong>Período analisado:</strong></p>
                    <p>De: {formatDate(result.dateRange.startDate)}</p>
                    <p>Até: {formatDate(result.dateRange.endDate)}</p>
                  </DateRange>
                )}
              </ComboLossCard>
            </ComboLossResult>
          )}
        </ComboLossContainer>
      )}
    </CardsContainer>
  );
}

export default ComboLoss; 