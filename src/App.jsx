import { useState } from 'react';
import portfolio from './data/portfolio.json';
import { Footer, Hero, Navigation, PrintToc } from './components/PageLayout';
import PortfolioSections from './components/PortfolioSections';
import PrintProjects from './components/PrintProjects';
import ProjectModal from './components/ProjectModal';
import { Analytics } from '@vercel/analytics/react';

function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  const tocItems = [
    { href: '#about', label: 'About' },
    ...(portfolio.history?.length > 0 ? [{ href: '#history', label: 'History' }] : []),
    { href: '#strengths', label: 'Strengths' },
    {
      href: '#project-detail',
      label: '프로젝트',
      sub: portfolio.projects.map((project) => ({ href: `#project-${project.id}`, label: project.title })),
    },
    { href: '#cases', label: 'Case Studies' },
    { href: '#skills', label: 'Skills' },
    ...(portfolio.awards?.length > 0 ? [{ href: '#awards', label: 'Awards' }] : []),
    { href: '#education', label: 'Education' },
  ];

  return (
    <>
      <Analytics />
      <Navigation items={portfolio.navItems} />
      <Hero profile={portfolio.profile} />
      <PrintToc items={tocItems} />
      <PortfolioSections data={portfolio} onOpenProject={setSelectedProject}>
        <PrintProjects projects={portfolio.projects} />
      </PortfolioSections>
      <Footer handle={portfolio.profile.handle} />
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}

export default App;
