import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import { LayoutContainer, Content } from './styles';

function Layout() {
  return (
    <LayoutContainer>
      <Sidebar />
      <Content>
        <Outlet />
      </Content>
    </LayoutContainer>
  );
}

export default Layout;