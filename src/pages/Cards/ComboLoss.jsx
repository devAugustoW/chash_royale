import React, { useState, useEffect } from 'react';
import { getComboLoss, getCardsList } from '../../services/cardService';
import comboLossImage from '../../assets/combo-loss-img.jpg';
import {
  CardsContainer,
	BannerContainer,
	Banner,
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

import bannerBattles from '../../assets/banner-battles.webp';

function ComboLoss() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cards, setCards] = useState([]);
  const [card1, setCard1] = useState('');
  const [card2, setCard2] = useState('');
  const [startDate, setStartDate] = useState('2025-02-02');
  const [endDate, setEndDate] = useState('2025-03-29');
  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState('');

	// Busca a lis de cartas para abastecer os selects
  useEffect(() => {
    const loadCards = async () => {
      try {
        setLoading(true);

        const cardsData = await getCardsList();
        setCards(cardsData || []); 

      } catch (err) {
        console.error('Erro ao carregar lista de cartas:', err);
        setError('Erro ao carregar lista de cartas. Usando lista alternativa.');

      } finally {
        setLoading(false);
      }
    };

    loadCards();
  }, []);

	// Validação do formulário
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

	// Ajuste do retorno da Data pela API
	const adjustDate = (dateStr) => {
		const date = new Date(dateStr);
		date.setDate(date.getDate() + 1); 
		return date.toISOString().split('T')[0]; 
	};

	// Função para buscar os dados de combos perdedores
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const combo = [card1, card2];
      const data = await getComboLoss(
				combo, 
				adjustDate(startDate), 
				adjustDate(endDate)
			);

      setResult(data);

    } catch (err) {
      setError('Erro ao buscar dados de combos perdedores');
      console.error(err);

    } finally {
      setLoading(false);

    }
  };

	// Formatação da Data para exibição
  const formatDate = (dateString) => {
    if (!dateString) return 'Não especificado';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };


  return (
    <CardsContainer>
			<BannerContainer>
				<Banner $backgroundImage={bannerBattles} />
			</BannerContainer>
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