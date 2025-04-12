import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  SidebarContainer, 
  Logo, 
  NavMenu, 
  NavItem, 
  SubMenu, 
  SubMenuItem,
  NavToggle 
} from './styles';
import logoImg from '../../assets/logo-img-clash-royale.webp';

function Sidebar() {
  const [isCardsSubmenuOpen, setIsCardsSubmenuOpen] = useState(false);
  const location = useLocation();

  const toggleCardsSubmenu = () => {
    setIsCardsSubmenuOpen(!isCardsSubmenuOpen);
  };

  return (
    <SidebarContainer>
      <Logo>
        <img src={logoImg} alt="Clash Royale" />
      </Logo>
      <NavMenu>
        <NavItem>
          <Link to="/">Início</Link>
        </NavItem>
        <NavItem>
          <Link to="/batalhas">Batalhas</Link>
        </NavItem>
        <NavItem>
          <NavToggle 
            onClick={toggleCardsSubmenu} 
            $isOpen={isCardsSubmenuOpen}
          >
            Cartas
            <span className="arrow">&#9660;</span>
          </NavToggle>
          <SubMenu $isOpen={isCardsSubmenuOpen}>
            <SubMenuItem>
              <Link 
                to="/cartas" 
                className={location.pathname === '/cartas' ? 'active' : ''}
              >
                Visão Geral
              </Link>
            </SubMenuItem>
            <SubMenuItem>
              <Link 
                to="/cartas/populares" 
                className={location.pathname === '/cartas/populares' ? 'active' : ''}
              >
                10 Mais Populares
              </Link>
            </SubMenuItem>
            <SubMenuItem>
              <Link 
                to="/cartas/menos-populares" 
                className={location.pathname === '/cartas/menos-populares' ? 'active' : ''}
              >
                10 Menos Populares
              </Link>
            </SubMenuItem>
          </SubMenu>
        </NavItem>
        <NavItem>
          <Link to="/jogadores">Jogadores</Link>
        </NavItem>
      </NavMenu>
    </SidebarContainer>
  );
}

export default Sidebar;