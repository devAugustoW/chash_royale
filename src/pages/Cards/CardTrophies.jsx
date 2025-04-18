import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getVictoriesWithLessCrowns, getCardsList } from '../../services/cardService';
import {
	CardsContainer,
	Title,
	Description,
	LoadingMessage,
} from './styles';

import bannerClash from '../../assets/banner-clash-royale.webp'

function CardTrophies() {
	const [selectedCardId, setSelectedCardId] = useState('');
	const [trophyDisadvantage, setTrophyDisadvantage] = useState(20);
	const [battleDuration, setBattleDuration] = useState(2);
	const [towersDestroyed, settowersDestroyed] = useState(2);
	const [result, setResult] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [cards, setCards] = useState([]);
	const [loadingCards, setLoadingCards] = useState(false);

	// Carregar cartas para o Select
	useEffect(() => {
		const fetchCards = async () => {
			try {
				setLoadingCards(true);

				const cardsData = await getCardsList();

				setCards(cardsData);
				setLoadingCards(false);

			} catch (err) {
				console.error('Erro ao carregar lista de cartas:', err);
				setLoadingCards(false);

			}
		};

		fetchCards();
	}, []);

	// Handlers para os inputs numéricos
	const decrementBattleDuration = () => {
		if (battleDuration > 1) setBattleDuration(battleDuration - 1);
	};
	const incrementBattleDuration = () => {
		if (battleDuration < 5) setBattleDuration(battleDuration + 1);
	};

	const decrementtowersDestroyed = () => {
		if (towersDestroyed > 0) settowersDestroyed(towersDestroyed - 1);
	};
	const incrementtowersDestroyed = () => {
		if (towersDestroyed < 3) settowersDestroyed(towersDestroyed + 1);
	};

	// Função tratamento de erros 'handleSearch'
	const errorHandlerSearch = (err) => {
		if (err.response) {
			if (err.response.status === 500) {
				return `Erro no servidor: ${
					err.response.data?.error || 
					err.response.data?.message || 
					'Erro interno no servidor'}. Verifique se o servidor pode estar temporariamente indisponível.`;

			} else if (err.response.data && (err.response.data.message || err.response.data.error)) {
				return `Erro: ${err.response.data.message || err.response.data.error}`;

			} else {
				return `Erro de resposta do servidor: ${err.response.status}`;

			}
		} else if (err.request) {
			return 'Não foi possível conectar ao servidor. Verifique sua conexão com a internet.';

		} else {
			return `Erro inesperado: ${err.message}`;

		}
	}

	// Função para buscar as vitórias nos requisitos da pesquisa
	const handleSearch = async () => {
		if (!selectedCardId) {
			setError('Por favor, selecione uma carta para continuar.');
			return;
		}

		try {
			setLoading(true);
			setError(null);

			const data = await getVictoriesWithLessCrowns(
				selectedCardId,
				trophyDisadvantage,
				battleDuration,
				towersDestroyed
			);

			setResult(data);
			setLoading(false);

		} catch (err) {
			setLoading(false);
			console.error('Erro ao buscar vitórias:', err);
			setError(errorHandlerSearch(err));
		}
	};

	return (
		<ContainerCardsTrophies>
			<BannerCardsTrophiesContainer>
			  <img src={bannerClash} alt="Clash Royale Banner" />
			</BannerCardsTrophiesContainer>

			<CardsContainer>
				<Title>Vitórias em Condições Desafiadoras</Title>
				<Description>
					Descubra quantas vitórias foram obtidas usando uma carta específica em situações desafiadoras!
				</Description>
				<ConditionsList>
					<li>Desvantagem de troféus em relação ao adversário</li>
					<li>Mesmo ganhando, sofrendo perda de torres</li>
				</ConditionsList>

				<StatsContainer>
					<StatsTitle>Faça a sua Combinação</StatsTitle>
					<StatsSubtitle>
						Busque quantas vitórias foram obtidas usando uma carta específica, mesmo em desvantagem de troféus, em partidas rápidas e com o adversário derrubando torres.
					</StatsSubtitle>

					<ContentWrapper>
						<FormSection>
							<FormContainer>
								<FormGroup>
									<FormLabel>Carta</FormLabel>
									{loadingCards ? (
										<div style={{ color: '#a1a3aa', padding: '8px 0' }}>Carregando cartas...</div>
									) : (
										<Select
											value={selectedCardId}
											onChange={(e) => setSelectedCardId(e.target.value)}
											disabled={cards.length === 0}
										>
											<option value="">Selecione uma carta</option>
											{cards.map(card => (
												<option key={card.id} value={card.id}>
													{card.name}
												</option>
											))}
										</Select>
									)}
								</FormGroup>

								<SliderContainer>
									<SliderLabel>
										<div>
											<span>Desvantagem de troféus (%)</span>
											<Tooltip>
												<div className="icon">?</div>
												<div className="content">
													Percentual mínimo de troféus a menos que o jogador vencedor tinha em relação ao perdedor. Quanto maior, mais desafiadora foi a vitória.
												</div>
											</Tooltip>
										</div>
										<span>{trophyDisadvantage}%</span>
									</SliderLabel>
									<Slider
										type="range"
										min="1"
										max="50"
										value={trophyDisadvantage}
										onChange={(e) => setTrophyDisadvantage(parseInt(e.target.value))}
									/>
								</SliderContainer>

								<NumberInputContainer>
									<NumberInputLabel>
										<div>
											<span>Duração máxima da batalha (minutos)</span>
											<Tooltip>
												<div className="icon">?</div>
												<div className="content">
													Apenas batalhas concluídas em menos tempo que este valor serão contabilizadas. Partidas mais rápidas demonstram eficiência.
												</div>
											</Tooltip>
										</div>

										<span>{battleDuration}</span>

									</NumberInputLabel>
									<NumberInput>
										<button
											onClick={decrementBattleDuration}
											disabled={battleDuration <= 1}
										>-</button>

										<span>{battleDuration}</span>

										<button
											onClick={incrementBattleDuration}
											disabled={battleDuration >= 5}
										>+</button>
									</NumberInput>
								</NumberInputContainer>

								<NumberInputContainer>
									<NumberInputLabel>
										<div>
											<span>Torres perdidas pelo vencedor</span>
											<Tooltip>
												<div className="icon">?</div>
												<div className="content">
													Torres perdidas pelo jogador durante a vitória. Vitórias mesmo perdendo torres demonstram resiliência. Zero torres significa vitória perfeita!
												</div>
											</Tooltip>
										</div>
										<span>{towersDestroyed}</span>
									</NumberInputLabel>

									<NumberInput>
										<button
											onClick={decrementtowersDestroyed}
											disabled={towersDestroyed <= 0}
										>-</button>
										<span>{towersDestroyed}</span>
										<button
											onClick={incrementtowersDestroyed}
											disabled={towersDestroyed >= 3}
										>+</button>
									</NumberInput>
								</NumberInputContainer>

								<SearchButton
									onClick={handleSearch}
									disabled={loading || !selectedCardId}
								>
									{loading ? 'Buscando...' : 'Buscar Vitórias'}
								</SearchButton>
							</FormContainer>
						</FormSection>

						<ResultSection>
							{error && <LoadingMessage>{error}</LoadingMessage>}

							{loading && <LoadingMessage>Buscando vitórias...</LoadingMessage>}

							{!loading && !error && result && (
								<ResultContainer>
									<ResultTitle>
										Vitórias encontradas com <CardName>{result.card.name}</CardName>
									</ResultTitle>
									<ResultCount>{result.statistics?.victoryCount || 0}</ResultCount>

									{result.statistics && (
										<StatisticsGrid>
											<StatBox>
												<div className="value">{result.statistics.battlesWithCard}</div>
												<div className="label">Batalhas com esta carta</div>
											</StatBox>
											<StatBox>
												<div className="value">{result.statistics.winningBattles}</div>
												<div className="label">Vitórias totais</div>
											</StatBox>
										</StatisticsGrid>
									)}

									<CardDetails>
										<CardImageContainer>
											{result.card.iconUrl ? (
												// Exibe a imagem da carta
												<CardImage src={result.card.iconUrl} alt={result.card.name} />
											) : (
												// Exibe a primeira letra da carta
												<div style={{
													width: '40px',
													height: '40px',
													background: '#3e4251',
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center',
													color: '#a1a3aa',
													fontSize: '16px'
												}}>
													{result.card.name.charAt(0)}
												</div>
											)}
										</CardImageContainer>
									</CardDetails>

									<ConditionsTitle>Condições da pesquisa:</ConditionsTitle>
									<ResultConditionsList>
										<ConditionsItem>
											Desvantagem de troféus: <strong>{result.criteria.trophyDifference || `${trophyDisadvantage}%`}</strong>
										</ConditionsItem>
										<ConditionsItem>
											Duração máxima: <strong>{result.criteria.matchDuration ? `${Math.floor(parseInt(result.criteria.matchDuration) / 60)} minutos` : `${battleDuration} minutos`}</strong>
										</ConditionsItem>
										<ConditionsItem>
											Torres perdidas: <strong>{result.criteria.towersDestroyed}</strong>
										</ConditionsItem>
									</ResultConditionsList>
								</ResultContainer>
							)}
						</ResultSection>
					</ContentWrapper>
				</StatsContainer>
			</CardsContainer>
		</ContainerCardsTrophies>
	);
}

const ContainerCardsTrophies = styled.div`
	width: auto;
	height: 100%;
	overflow: hidden;
`; 

const BannerCardsTrophiesContainer = styled.div`
	width: 100%;
  height: 330px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	position: relative;
  overflow: hidden;
	
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

const ConditionsList = styled.ul`
  list-style-type: none;
  padding-left: 20px;
  margin-top: -15px;
  margin-bottom: 20px;
  
  li {
    position: relative;
    padding-left: 20px;
    margin-bottom: 4px;
    color: #a1a3aa;
    
    &:before {
      content: "•";
      position: absolute;
      left: 0;
      color: #f3a952;
    }
  }
`;

const StatsContainer = styled.div`
  margin-top: 40px;
	padding-left: 20px;
	padding-right: 20px;
`;

const StatsTitle = styled.h2`
  font-size: 24px;
  color: #cbccd1;
  margin-bottom: 5px;
`;

const StatsSubtitle = styled.p`
  font-size: 14px;
  color: #a1a3aa;
  max-width: 500px;
`;

// Layout de duas colunas
const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin-top: 20px;
`;

const FormSection = styled.div`
  flex: 1;
  min-width: 350px;
`;

const ResultSection = styled.div`
  flex: 1.5;
  min-width: 350px;
`;

// Componentes do formulário
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: #2c2f3b;
  border-radius: 12px;
  padding: 20px;
  min-width: 350px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const FormLabel = styled.label`
  color: #cbccd1;
  font-size: 14px;
`;

const Select = styled.select`
  background-color: #252836;
  border: 1px solid #3e4251;
  border-radius: 4px;
  padding: 8px 12px;
  color: #fff;
  font-size: 14px;
  width: 100%;
  outline: none;
  
  &:focus {
    border-color: #f3a952;
  }
  
  option {
    background-color: #252836;
    color: #fff;
  }
`;

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 10px;
`;

const SliderLabel = styled.div`
  display: flex;
  justify-content: space-between;
  color: #a1a3aa;
  font-size: 13px;
  
  span {
    color: #f3a952;
  }
`;

const Slider = styled.input`
  width: 100%;
  -webkit-appearance: none;
  height: 5px;
  background: #3e4251;
  outline: none;
  border-radius: 5px;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #f3a952;
    cursor: pointer;
  }
  
  &::-moz-range-thumb {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #f3a952;
    cursor: pointer;
  }
`;

const SearchButton = styled.button`
  background-color: #f3a952;
  color: #1e2130;
  border: none;
  border-radius: 4px;
  padding: 10px 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 10px;
  
  &:hover {
    background-color: #e59a43;
  }
  
  &:disabled {
    background-color: #5c5d65;
    cursor: not-allowed;
  }
`;

const CardName = styled.span`
  color: #f3a952;
  font-weight: bold;
`;

const ResultTitle = styled.h3`
  font-size: 18px;
  color: #cbccd1;
  margin: 15px 0;
  text-align: center;
  
  ${CardName} {
    margin-left: 5px;
  }
`;

const ResultContainer = styled.div`
  width: 100%;
  background-color: #2c2f3b;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  h3 {
    margin-top: 0;
    padding-bottom: 10px;
    border-bottom: 1px solid #3e4251;
  }
`;

const ResultCount = styled.div`
  font-size: 48px;
  font-weight: bold;
  color: #f3a952;
  text-align: center;
  margin: 10px 0;
`;

// Componente para inputs numéricos
const NumberInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 10px;
`;

const NumberInputLabel = styled.div`
  display: flex;
  justify-content: space-between;
  color: #a1a3aa;
  font-size: 13px;
  
  span {
    color: #f3a952;
  }
`;

const NumberInput = styled.div`
  display: flex;
  align-items: center;
  
  button {
    width: 32px;
    height: 32px;
    background-color: #3e4251;
    border: none;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:first-child {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    
    &:last-child {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
    
    &:hover {
      background-color: #4e5261;
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
  
  span {
    min-width: 50px;
    height: 32px;
    background-color: #252836;
    border-top: 1px solid #3e4251;
    border-bottom: 1px solid #3e4251;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 16px;
  }
`;

// Adicionar um componente de tooltip para ajudar o usuário
const Tooltip = styled.div`
  position: relative;
  display: inline-block;
  margin-left: 5px;
  
  .icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #3e4251;
    color: #a1a3aa;
    font-size: 12px;
    cursor: help;
  }
  
  .content {
    visibility: hidden;
    position: absolute;
    bottom: 125%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #1e2130;
    color: #cbccd1;
    text-align: center;
    border-radius: 4px;
    padding: 8px 12px;
    width: 200px;
    font-size: 12px;
    line-height: 1.4;
    z-index: 1;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    
    &::after {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: #1e2130 transparent transparent transparent;
    }
  }
  
  &:hover .content {
    visibility: visible;
  }
`;

const CardDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 20px 0;
  padding: 15px;
  background-color: #252836;
  border-radius: 8px;
`;

const CardImageContainer = styled.div`
  width: 60px;
  height: 72px;
  border-radius: 6px;
  overflow: hidden;
  background-color: #1a1c25;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
`;

const ConditionsTitle = styled.h4`
  color: #cbccd1;
  margin: 25px 0 10px;
  font-size: 16px;
  font-weight: 500;
`;

const ConditionsItem = styled.li`
  color: #a1a3aa;
  padding: 5px 0;
  position: relative;
  padding-left: 20px;
  
  &:before {
    content: "•";
    position: absolute;
    left: 0;
    color: #f3a952;
  }
  
  strong {
    color: #f3a952;
    font-weight: 500;
  }
`;

const ResultConditionsList = styled.ul`
  list-style-type: none;
  padding-left: 0;
  margin-top: 10px;
`;

const StatisticsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin: 20px 0;
`;

const StatBox = styled.div`
  background-color: #252836;
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  
  .value {
    font-size: 24px;
    font-weight: bold;
    color: #f3a952;
    margin-bottom: 5px;
  }
  
  .label {
    font-size: 12px;
    color: #a1a3aa;
  }
`;

export default CardTrophies; 