import styled from 'styled-components';

export const BattlesContainer = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding: 20px;
`;

export const StatsContainer = styled.div`
	display: flex;
	gap: 20px;
	margin-bottom: 30px;
	flex-wrap: wrap;
`;

export const StatsCard = styled.div`
	background-color: #2c2f3b;
	border-radius: 8px;
	padding: 20px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	flex: 1;
	min-width: 250px;
	
	h3 {
		font-size: 18px;
		color: #fff;
		margin-bottom: 15px;
		border-bottom: 1px solid #3e4251;
		padding-bottom: 8px;
	}
	
	.value {
		font-size: 24px;
		font-weight: bold;
		color: #f3a952;
	}
	
	.detail {
		margin-top: 10px;
		color: #a1a3aa;
		font-size: 14px;
	}
`;

export const Title = styled.h1`
	font-size: 32px;
	color: #cbccd1;
	margin-bottom: 10px;
`;

export const Description = styled.p`
	font-size: 18px;
	line-height: 1.6;
	color: rgb(161, 163, 170);
	margin-bottom: 30px;
`;

export const LoadingMessage = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 300px;
	font-size: 20px;
	color: #cbccd1;
`;

export const BattlesList = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
	gap: 20px;
`;

export const BattleCard = styled.div`
	background-color: #2c2f3b;
	border-radius: 8px;
	padding: 16px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	transition: transform 0.2s, box-shadow 0.2s;
	
	&:hover {
		transform: translateY(-5px);
		box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
	}
`;

export const BattleTitle = styled.h3`
	font-size: 18px;
	color: #fff;
	margin-bottom: 16px;
	border-bottom: 1px solid #3e4251;
	padding-bottom: 8px;
`;

export const BattleSection = styled.div`
	margin-bottom: 16px;
	padding: 10px;
	background-color: #252836;
	border-radius: 6px;
	
	h4 {
		color: #cbccd1;
		margin-bottom: 10px;
		font-size: 16px;
	}
`;

export const BattleDetail = styled.div`
	margin-bottom: 8px;
	color: #a1a3aa;
	font-size: 14px;
	
	strong {
		color: #cbccd1;
	}
`;

export const BattleTable = styled.div`
	width: 100%;
	margin-bottom: 30px;
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const BattleHeader = styled.div`
	background-color: #1e2130;
	padding: 12px 16px;
	color: #f3a952;
	font-weight: bold;
	border-bottom: 1px solid #3e4251;
	grid-column: 1 / -1;
`;

export const TableHeader = styled.div`
	display: grid;
	grid-template-columns: 2fr 1fr 1fr 1fr;
	background-color: #2c2f3b;
	padding: 16px;
	font-weight: bold;
	color: #fff;
	
	div {
		padding: 0 10px;
	}
`;

export const TableRow = styled.div`
	display: grid;
	grid-template-columns: 2fr 1fr 1fr 1fr;
	padding: 12px 16px;
	border-bottom: 1px solid #3e4251;
	background-color: #252836;
	transition: background-color 0.2s;
	
	&:nth-child(odd) {
		background-color: #2a2d3a;
	}
	
	&:hover {
		background-color: #323544;
	}
	
	div {
		padding: 0 10px;
		display: flex;
		align-items: center;
		color: #a1a3aa;
	}
`;

export const PlayerRank = styled.span`
	font-weight: bold;
	color: #f3a952;
`;

export const PlayerResult = styled.span`
	display: inline-block;
	padding: 4px 8px;
	border-radius: 4px;
	font-size: 12px;
	font-weight: bold;
	background-color: ${props => props.$won ? '#4caf50' : '#f44336'};
	color: white;
`;

export const PlayerCrowns = styled.span`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 24px;
	height: 24px;
	border-radius: 50%;
	background-color: #3e4251;
	color: #f3a952;
	font-weight: bold;
`;

export const TabsContainer = styled.div`
	display: flex;
	margin-bottom: 20px;
`;

export const Tab = styled.button`
	padding: 10px 20px;
	background-color: ${props => props.active ? '#2c2f3b' : 'transparent'};
	border: none;
	color: ${props => props.active ? '#f3a952' : '#a1a3aa'};
	font-size: 16px;
	font-weight: ${props => props.active ? 'bold' : 'normal'};
	cursor: pointer;
	border-bottom: 2px solid ${props => props.active ? '#f3a952' : 'transparent'};
	transition: all 0.3s ease;
	
	&:hover {
		color: ${props => props.active ? '#f3a952' : '#cbccd1'};
	}
`;
