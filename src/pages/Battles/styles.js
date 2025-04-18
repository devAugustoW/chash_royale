import styled from 'styled-components';

export const BattlesContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	padding: 0;
	overflow-x: hidden;
`;

export const BannerContainer = styled.div`
  width: calc(100% + 40px);
	height: 250px;
  margin-bottom: 30px;  
  overflow: hidden;
`;

export const Banner = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${props => props.$backgroundImage});
  background-repeat: repeat;
  background-size: auto;
`;

export const ContentContainer = styled.div`
	width: 100%;
  padding: 20px;
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
		font-size: 16px;
	}
`;

export const TabsContainer = styled.div`
	display: flex;
	margin-bottom: 20px;
`;

export const Tab = styled.button`
	padding: 10px 20px;
	font-size: 16px;
	font-weight: ${props => props.$active ? 'bold' : 'normal'};
	color: ${props => props.$active ? '#f3a952' : '#a1a3aa'};
	background-color: ${props => props.$active ? '#2c2f3b' : 'transparent'};
	border-bottom: 2px solid ${props => props.$active ? '#f3a952' : 'transparent'};
	border: none;	
	cursor: pointer;
	transition: all 0.3s ease;
	
	&:hover {
		color: ${props => props.$active ? '#f3a952' : '#cbccd1'};
	}
`;

export const BattleTable = styled.div`
	width: 99%;
	margin-bottom: 30px;
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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

export const BattleHeader = styled.div`
	background-color: #1e2130;
	padding: 12px 16px;
	color: #f3a952;
	font-weight: bold;
	border-bottom: 1px solid #3e4251;
	grid-column: 1 / -1;
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


export const LoadingMessage = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 300px;
	font-size: 20px;
	color: #cbccd1;
`;