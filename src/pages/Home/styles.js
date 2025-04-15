import styled from 'styled-components';

export const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Banner = styled.div`
  margin-bottom: 20px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  
  img {
    width: 100%;
    display: block;
  }
`;
export const Content = styled.div`
  flex: 1;
	flex-direction: column;
	height: 100%;
	text-align: center;
	justify-content: space-around;
  padding: 20px;
  display: flex;
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

export const ImagesContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
  
  img {
    max-width: 49%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
    }
  }
`;