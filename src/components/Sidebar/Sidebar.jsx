import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  SidebarContainer, 
  Logo, 
  NavMenu, 
  NavItem, 
  SubMenu, 
  SubMenuItem,
  NavToggle,
  FooterImage
} from './styles';
import logoImg from '../../assets/logo-img-clash-royale.webp';
import footerImg from '../../assets/home-img-footer-02.png';

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
            <SubMenuItem>
              <Link 
                to="/cartas/decks" 
                className={location.pathname === '/cartas/decks' ? 'active' : ''}
              >
                Decks Vencedores
              </Link>
            </SubMenuItem>
						<SubMenuItem>
              <Link 
                to="/cartas/combos-perdedores" 
                className={location.pathname === '/cartas/combos-perdedores' ? 'active' : ''}
              >
                Combos Perdedores
              </Link>
            </SubMenuItem>
            <SubMenuItem>
              <Link 
                to="/cartas/trofeus" 
                className={location.pathname === '/cartas/trofeus' ? 'active' : ''}
              >
                Cartas - Troféus
              </Link>
            </SubMenuItem>
            <SubMenuItem>
              <Link 
                to="/cartas/combo-n-cartas" 
                className={location.pathname === '/cartas/combo-n-cartas' ? 'active' : ''}
              >
                Combo de N Cartas
              </Link>
            </SubMenuItem>
          </SubMenu>
        </NavItem>
        <NavItem>
          <Link to="/jogadores">Jogadores</Link>
        </NavItem>
      </NavMenu>
      <FooterImage>
        <img src={footerImg} alt="Clash Royale Footer" />
      </FooterImage>
    </SidebarContainer>
  );
}

export default Sidebar;