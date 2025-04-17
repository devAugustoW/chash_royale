import styled from 'styled-components';

export const HomeContainer = styled.div`
 	width: 100%;
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
	position: relative;
`;

export const Banner = styled.div`
  width: 100%;
  height: 40%;
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

export const Content = styled.div`
  flex: 1;
  height: 100%;
	display: flex;
	text-align: center;
	flex-direction: column;
	justify-content: space-around;
  position: relative;
  padding: 20px;

`;

export const Title = styled.h1`
  font-size: 32px;
  color: #cbccd1;

`;

export const Description = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: rgb(161, 163, 170);
	margin-top: -45px;
	margin-bottom: 20px;
`;

export const ImagesContainer = styled.div`
 	width: 100%;
	height: 50%;
  display: flex;
  justify-content: space-around;
  gap: 20px;
	
  
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