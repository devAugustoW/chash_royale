import { HomeContainer, Banner, Content, Title, Description, ImagesContainer } from './styles';
import bannerImg from '../../assets/banner-clash-royale.webp';
import homeImg01 from '../../assets/home-img-01.webp';
import homeImg02 from '../../assets/home-img-02.webp';

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
				<ImagesContainer>
					<img src={homeImg01} alt="Clash Royale Imagem 1" />
					<img src={homeImg02} alt="Clash Royale Imagem 2" />
				</ImagesContainer>
			</Content>
    </HomeContainer>
  );
}

export default Home;