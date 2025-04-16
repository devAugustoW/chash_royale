import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getCardsList, getComboNCards } from '../../services/cardService';
import { getBattlesStats } from '../../services/battleService';
import {
	CardsContainer,
	Title,
	Description,
	LoadingMessage,
} from './styles';

const ContainerComboNCards = styled.div``;

// Componentes estilizados
const StatsContainer = styled.div`
  margin-top: 40px;
	padding-left: 20px;
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

const BannerContainer = styled.div`
  width: 100%;
  height: 180px;
  border-radius: 12px;
  margin-bottom: 30px;
  overflow: hidden;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(30,33,48,0.7));
  }
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

const DateInput = styled.input`
  background-color: #252836;
  border: 1px solid #3e4251;
  border-radius: 4px;
  padding: 8px 12px;
  color: #fff;
  font-size: 14px;
  width: 100%;
  outline: none;
  font-family: inherit;
  
  &:focus {
    border-color: #f3a952;
  }
  
  &::-webkit-calendar-picker-indicator {
    filter: invert(1);
    cursor: pointer;
  }
  
  /* Garantir que todos os campos de data sejam visíveis e editáveis */
  &::-webkit-datetime-edit-year-field,
  &::-webkit-datetime-edit-month-field,
  &::-webkit-datetime-edit-day-field,
  &::-webkit-datetime-edit-text {
    color: #fff;
  }
  
  /* Estilos para o Firefox */
  &::-moz-datetime-edit-year-field,
  &::-moz-datetime-edit-month-field,
  &::-moz-datetime-edit-day-field,
  &::-moz-datetime-edit-text {
    color: #fff;
  }
  
  /* Estilo para o seletor de data em navegadores específicos */
  &::-webkit-inner-spin-button {
    display: none;
  }
  
  &::-webkit-clear-button {
    display: none;
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

// Componentes para exibição dos resultados
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

const ResultTitle = styled.h3`
  font-size: 18px;
  color: #cbccd1;
  margin: 15px 0;
  text-align: center;
`;

const ResultCount = styled.div`
  font-size: 48px;
  font-weight: bold;
  color: #f3a952;
  text-align: center;
  margin: 10px 0;
`;

const ResultDescription = styled.p`
  font-size: 16px;
  color: #a1a3aa;
  line-height: 1.5;
  text-align: center;
  margin-bottom: 20px;
`;

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

// Cards Grid para resultados
const CardsGridContainer = styled.div`
  margin-top: 20px;
`;

const CardsGridTitle = styled.h4`
  font-size: 16px;
  color: #cbccd1;
  margin-bottom: 15px;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 15px;
`;

const CardItem = styled.div`
  background-color: #252836;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .card-image {
    width: 60px;
    height: 72px;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 8px;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  
  .card-name {
    font-size: 14px;
    color: #cbccd1;
    margin: 4px 0;
  }
  
  .card-stat {
    font-size: 12px;
    color: #f3a952;
  }
`;

const CriteriaList = styled.div`
  background-color: #252836;
  border-radius: 8px;
  padding: 15px;
  margin-top: 20px;
`;

const CriteriaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #cbccd1;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &:before {
    content: "✓";
    color: #4caf50;
    font-weight: bold;
  }
`;

// Função para normalizar os dados recebidos da API, garantindo tratamento para diferentes formatos
const normalizeApiResponse = (data) => {
	// Se a resposta já for um array de combos
	if (Array.isArray(data)) {
		return data;
	}
	
	// Se a resposta tiver uma estrutura aninhada como resultado.combos
	if (data && data.result && Array.isArray(data.result.combos)) {
		return data.result.combos;
	}
	
	// Se a resposta for um único objeto de combo (não um array)
	if (data && data.combo) {
		return [data];
	}
	
	// Caso não reconheça o formato
	console.warn('Formato de resposta da API não reconhecido:', data);
	return [];
};

// Melhorar a função formatDateForUI
const formatDateForUI = (dateString) => {
	if (!dateString) return '';
	
	// Se dateString já estiver no formato YYYY-MM-DD (formato do input date)
	if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
		// Quebra a data em partes e formata manualmente para DD/MM/YYYY
		const [year, month, day] = dateString.split('-');
		return `${day}/${month}/${year}`;
	}
	
	try {
		// Para outros formatos, tenta converter usando Date, mas com ajuste para evitar problemas de timezone
		// Cria uma string no formato YYYY-MM-DDT12:00:00Z para garantir que o dia não mude
		let date;
		
		if (typeof dateString === 'string' && dateString.includes('T')) {
			// Se já for uma string ISO, usa ela diretamente
			date = new Date(dateString);
		} else {
			// Tenta extrair apenas a data e adicionar o horário do meio-dia em UTC
			let dateOnly = dateString;
			if (dateString instanceof Date) {
				dateOnly = dateString.toISOString().split('T')[0];
			}
			date = new Date(`${dateOnly}T12:00:00Z`);
		}
		
		if (isNaN(date.getTime())) {
			console.warn('Data inválida:', dateString);
			return '';
		}
		
		// Formatar no padrão brasileiro (dia/mês/ano)
		return date.toLocaleDateString('pt-BR');
	} catch (error) {
		console.error('Erro ao formatar data para UI:', error, dateString);
		return '';
	}
};

function ComboNCards() {
	const [numCards, setNumCards] = useState(3);
	const [winrateThreshold, setWinrateThreshold] = useState(60);
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [result, setResult] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [battlesStats, setBattlesStats] = useState(null);
	const [loadingStats, setLoadingStats] = useState(false);
	const [totalMatchingCombos, setTotalMatchingCombos] = useState(0);

	

	const formatDateForDisplay = (dateString) => {
		if (!dateString) return '';
		try {
			// Criar uma nova data a partir da string e formatá-la como YYYY-MM-DD
			const date = new Date(dateString);
			if (isNaN(date.getTime())) {
	
				return '';
			}
			
			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const day = String(date.getDate()).padStart(2, '0');
			return `${year}-${month}-${day}`;
		} catch (error) {
			console.error('Erro ao formatar data:', error);
			return '';
		}
	};

	// Buscar estatísticas de batalhas 
	useEffect(() => {
		const fetchBattlesStats = async () => {
			try {
				setLoadingStats(true);
				const stats = await getBattlesStats();
				setBattlesStats(stats);
				setLoadingStats(false);
			} catch (err) {
				console.error('Erro ao buscar estatísticas de batalhas:', err);
				setLoadingStats(false);
			}
		};

		fetchBattlesStats();
	}, []);
	

	useEffect(() => {
		const initializeDates = () => {
			// statísticas de batalhas, usar o intervalo de datas dessas batalhas
			if (battlesStats && battlesStats.dateRange) {
				const oldestDate = formatDateForDisplay(battlesStats.dateRange.oldestBattle);
				const newestDate = formatDateForDisplay(battlesStats.dateRange.newestBattle);
				
				setStartDate(oldestDate);
				setEndDate(newestDate);
			} else {
				// Caso contrário, usar o padrão de 30 dias
				const currentDate = new Date();
				const pastDate = new Date();
				pastDate.setDate(currentDate.getDate() - 30);

				setStartDate(pastDate.toISOString().slice(0, 10));
				setEndDate(currentDate.toISOString().slice(0, 10));
			}
		};
		
		// Só inicializar as datas se elas ainda não foram definidas
		if (!startDate || !endDate) {
			initializeDates();
		}
	}, [battlesStats, startDate, endDate]);

	// Função handleSearch para validação
	const handleSearch = async () => {
		if (!startDate || !endDate) {
			setError('Por favor, selecione as datas de início e fim.');
			return;
		}

		try {
			setLoading(true);
			setError(null);

			// Chamada da API 
			const rawData = await getComboNCards(numCards, winrateThreshold, startDate, endDate);
			
			// Extrair totalMatchingCombos da resposta da API
			if (rawData && rawData.result && rawData.result.totalMatchingCombos !== undefined) {
				setTotalMatchingCombos(rawData.result.totalMatchingCombos);
			} else {
				// Fallback para o número de combos retornados
				const combosArray = rawData && rawData.result && Array.isArray(rawData.result.combos) 
					? rawData.result.combos 
					: [];
				setTotalMatchingCombos(combosArray.length);
			}
			
			// Normalizar dados para um formato consistente
			const normalizedData = normalizeApiResponse(rawData);
			setResult(normalizedData);
			setLoading(false);

		} catch (err) {
			setLoading(false);
			console.error('Erro ao buscar combos de cartas:', err);

			if (err.response) {
				if (err.response.status === 500) {
					const errorMessage = err.response.data?.error || err.response.data?.message || 'Erro interno no servidor';
					setError(`Erro no servidor (500): ${errorMessage}. Isso pode indicar um problema com os parâmetros enviados ou com o processamento no backend.`);
				} else if (err.response.data && (err.response.data.message || err.response.data.error)) {
					setError(`Erro: ${err.response.data.message || err.response.data.error}`);
				} else {
					setError(`Erro de resposta do servidor: ${err.response.status}`);
				}
			} else if (err.request) {
				setError('Não foi possível conectar ao servidor. Verifique sua conexão com a internet.');
			} else {
				setError(`Erro inesperado: ${err.message}`);
			}
		}
	};


	return (
		<ContainerComboNCards>
			<CardsContainer>
				<Title>Combo de N Cartas</Title>
				<Description>
					Pesquisas sobre Combos de N cartas com mais de Y% vitórias.
				</Description>

				<StatsContainer>
					<StatsTitle>Descubra os melhores combos de cartas</StatsTitle>
					<StatsSubtitle>
						Analise quais combinações de cartas têm as melhores taxas de vitória em batalhas. Selecione o número de cartas no combo e a taxa mínima de vitória para encontrar as combinações mais eficientes.
					</StatsSubtitle>

					<ContentWrapper>
						<FormSection>
							<FormContainer>
								<SliderContainer>
									<SliderLabel>
										<div>
											<span>Número de cartas no combo</span>
											<Tooltip>
												<div className="icon">?</div>
												<div className="content">
													Quantidade de cartas que estarão presentes no combo. Combos maiores são mais específicos, enquanto combos menores são mais comuns.
												</div>
											</Tooltip>
										</div>
										<span>{numCards}</span>
									</SliderLabel>
									<Slider
										type="range"
										min="2"
										max="8"
										value={numCards}
										onChange={(e) => setNumCards(parseInt(e.target.value))}
									/>
								</SliderContainer>

								<SliderContainer>
									<SliderLabel>
										<div>
											<span>Taxa mínima de vitória (%)</span>
											<Tooltip>
												<div className="icon">?</div>
												<div className="content">
													A porcentagem mínima de vitórias que os combos devem ter para aparecer nos resultados. Valores mais altos mostram apenas os combos mais eficientes.
												</div>
											</Tooltip>
										</div>
										<span>{winrateThreshold}%</span>
									</SliderLabel>
									<Slider
										type="range"
										min="50"
										max="90"
										value={winrateThreshold}
										onChange={(e) => setWinrateThreshold(parseInt(e.target.value))}
									/>
								</SliderContainer>

								<FormGroup>
									<FormLabel>
										Data de início
										{loadingStats && <small style={{ marginLeft: '8px', color: '#a1a3aa' }}>(Carregando datas...)</small>}
									</FormLabel>
									<DateInput
										type="date"
										value={startDate}
										onChange={(e) => {
											const newDate = e.target.value;
											setStartDate(newDate);
										}}
									/>
									{battlesStats && (
										<small style={{ color: '#a1a3aa', fontSize: '11px', marginTop: '4px' }}>
											Sugestão: data mais antiga disponível {formatDateForUI(battlesStats.dateRange.oldestBattle)}
										</small>
									)}
								</FormGroup>

								<FormGroup>
									<FormLabel>
										Data de fim
										{loadingStats && <small style={{ marginLeft: '8px', color: '#a1a3aa' }}>(Carregando datas...)</small>}
									</FormLabel>
									<DateInput
										type="date"
										value={endDate}
										onChange={(e) => {
											const newDate = e.target.value;
											setEndDate(newDate);
										}}
									/>
									{battlesStats && (
										<small style={{ color: '#a1a3aa', fontSize: '11px', marginTop: '4px' }}>
											Sugestão: data mais recente disponível {formatDateForUI(battlesStats.dateRange.newestBattle)}
										</small>
									)}
								</FormGroup>

								<SearchButton
									onClick={handleSearch}
									disabled={loading || !startDate || !endDate}
								>
									{loading ? 'Buscando...' : 'Buscar Combos'}
								</SearchButton>
							</FormContainer>
						</FormSection>

						<ResultSection>
							{error && <LoadingMessage>{error}</LoadingMessage>}

							{loading && <LoadingMessage>Buscando combos de cartas...</LoadingMessage>}

							{!loading && !error && result && (
								<ResultContainer>
									<ResultTitle>
										Combos encontrados com {numCards} cartas e taxa de vitória acima de {winrateThreshold}%
									</ResultTitle>
									<ResultCount>
										{totalMatchingCombos || (Array.isArray(result) ? result.length : 0)}
									</ResultCount>
									<ResultDescription>
										{totalMatchingCombos > 0 ? 
											`Total de ${totalMatchingCombos} combos encontrados no período` :
											`Análise de combos entre ${formatDateForUI(startDate)} e ${formatDateForUI(endDate)}`}
									</ResultDescription>

									{/* Se totalMatchingCombos for maior que o número de resultados exibidos */}
									{totalMatchingCombos > 0 && Array.isArray(result) && result.length < totalMatchingCombos && (
										<div style={{ textAlign: 'center', marginTop: '10px', color: '#a1a3aa', fontSize: '14px' }}>
											Mostrando os top {result.length} combos mais relevantes
										</div>
									)}

									<CriteriaList>
										<CriteriaItem>
											Combos com exatamente {numCards} cartas
										</CriteriaItem>
										<CriteriaItem>
											Taxa de vitória mínima de {winrateThreshold}%
										</CriteriaItem>
										<CriteriaItem>
											Período: {formatDateForUI(startDate)} a {formatDateForUI(endDate)}
										</CriteriaItem>
									</CriteriaList>

									{result.length === 0 ? (
										<div style={{ 
											margin: '30px 0', 
											textAlign: 'center', 
											padding: '20px', 
											backgroundColor: '#252836', 
											borderRadius: '8px',
											color: '#a1a3aa'
										}}>
											<p>Nenhum combo encontrado com os critérios selecionados.</p>
											<p>Tente reduzir a taxa mínima de vitória ou alterar o período de busca.</p>
										</div>
									) : (
										result.map((comboData, comboIndex) => (
											<CardsGridContainer key={comboIndex}>
												<CardsGridTitle>
													Combo #{comboIndex + 1} - Taxa de Vitória: {comboData.winRate?.toFixed(1) || 0}% ({comboData.totalBattles || 0} batalhas)
													{comboData.averageElixirCost && (
														<span style={{ marginLeft: '10px', fontSize: '14px', color: '#a1a3aa' }}>
															| Custo médio: {comboData.averageElixirCost.toFixed(1)} de elixir
														</span>
													)}
												</CardsGridTitle>
												<CardsGrid>
													{Array.isArray(comboData.combo) && comboData.combo.map((card) => (
														<CardItem key={card.id}>
															<div className="card-image">
																{card.iconUrl ? (
																	<img src={card.iconUrl} alt={card.name} />
																) : (
																	<img src={`https://cdn.clashroyale.com/cards/300/blank.png`} alt={card.name} onError={(e) => {
																		e.target.onerror = null;
																		e.target.src = `https://via.placeholder.com/60x72/252836/f3a952?text=${card.name.charAt(0)}`;
																	}} />
																)}
															</div>
															<div className="card-name">{card.name}</div>
															<div className="card-stat">{card.elixirCost || '?'} elixir</div>
														</CardItem>
													))}
												</CardsGrid>
											</CardsGridContainer>
										))
									)}
								</ResultContainer>
							)}
						</ResultSection>
					</ContentWrapper>
				</StatsContainer>
			</CardsContainer>
		</ContainerComboNCards>
	);
}

export default ComboNCards; 