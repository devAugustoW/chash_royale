import { Link } from 'react-router-dom';
import { SidebarContainer, Logo, NavMenu, NavItem } from './styles';
import logoImg from '../../assets/logo-img-clash-royale.webp';

function Sidebar() {
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
          <Link to="/cartas">Cartas</Link>
        </NavItem>
        <NavItem>
          <Link to="/jogadores">Jogadores</Link>
        </NavItem>
      </NavMenu>
    </SidebarContainer>
  );
}

export default Sidebar;