import { useState } from 'react';
import portfolio from './data/portfolio.json';
import { Footer, Hero, Navigation } from './components/PageLayout';
import PortfolioSections from './components/PortfolioSections';
import PrintProjects from './components/PrintProjects';
import ProjectModal from './components/ProjectModal';
import { Analytics } from '@vercel/analytics/react';

function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <Analytics />
      <Navigation items={portfolio.navItems} />
      <Hero profile={portfolio.profile} />
      <PortfolioSections data={portfolio} onOpenProject={setSelectedProject} />
      <PrintProjects projects={portfolio.projects} />
      <Footer handle={portfolio.profile.handle} />
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}

export default App;
