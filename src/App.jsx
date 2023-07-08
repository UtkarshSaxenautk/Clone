import { ProjectContext } from './Context';
import Navbar from './components/Navbar';
import Drawer from './components/Drawer';
import { useState } from 'react';
import MainPage from './components/Main';

function App() {
   const [project, setProject] = useState('Mobile App');
  return (
    <>
       <ProjectContext.Provider value={{ project , setProject }}>
      <div className="flex min-h-screen">
        <Drawer />
        <div className="flex flex-col flex-1">
          <Navbar />
          <MainPage />
        </div>
        </div>
        </ProjectContext.Provider>
    </>
  );
}

export default App;
