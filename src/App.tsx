import { SideBar } from './components/SideBar';
import { Content } from './components/Content';
import './styles/global.scss';
import './styles/sidebar.scss';
import './styles/content.scss';
import { MoviesProvider } from './MovieContext';

export function App() {
  
  return (
     <MoviesProvider>

  <div style={{ display: 'flex', flexDirection: 'row' }}>
     <SideBar />
    <Content />
  </div>

  </MoviesProvider>
  )
 
   
 

  
}