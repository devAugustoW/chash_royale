import styled from 'styled-components';

export const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
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
  color:rgb(161, 163, 170);
`;