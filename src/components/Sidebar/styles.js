import styled from 'styled-components';

export const SidebarContainer = styled.aside`
  width: 250px;
  background-color: #1e293b;
  color: white;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
`;

export const Logo = styled.div`
  padding: 0 20px;
  margin-bottom: 30px;
  
  img {
    max-width: 100%;
  }
`;

export const NavMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const NavItem = styled.li`
  a {
    display: block;
    padding: 15px 20px;
    color: white;
    text-decoration: none;
    font-size: 16px;
    transition: background-color 0.3s;
    
    &:hover {
      background-color: #2d3748;
    }
  }
`;