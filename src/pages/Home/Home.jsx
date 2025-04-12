import { HomeContainer, Banner, Content, Title, Description } from './styles';
import bannerImg from '../../assets/banner-clash-royale.webp';

function Home() {
  return (
    <HomeContainer>
      <Banner>
        <img src={bannerImg} alt="Clash Royale Banner" />
      </Banner>
			<Content>
				<Title>Bem-vindo ao Dashboard Clash Royale</Title>
				<Description>
					Esta aplicação fornece informações detalhadas sobre o universo de Clash Royale.
					Explore batalhas, cartas e perfis de jogadores através do nosso painel interativo.
					Utilize o menu lateral para navegar entre as diferentes seções.
				</Description>
			</Content>
    </HomeContainer>
  );
}

export default Home;