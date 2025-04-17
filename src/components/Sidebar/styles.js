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
  flex: 1;
`;

export const NavItem = styled.li`
  position: relative;
  
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

export const SubMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #2d3748;
  max-height: ${props => (props.$isOpen ? '500px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
`;

export const SubMenuItem = styled.li`
  a {
    display: block;
    padding: 12px 20px 12px 35px;
    color: #cbd5e1;
    text-decoration: none;
    font-size: 14px;
    transition: background-color 0.3s;
    
    &:hover {
      background-color: #3e4c6a;
    }
    
    &.active {
      color: #f3a952;
      font-weight: 500;
    }
  }
`;

export const NavToggle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #2d3748;
  }
  
  .arrow {
    transition: transform 0.3s;
    transform: ${props => (props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  }
`;

export const FooterImage = styled.div`
  width: 100%;
	height: auto;
  padding-bottom: 10px;
  margin-left: -5px;
  
  
  img {
    max-width: 117%;
    height: auto;
  }
`;