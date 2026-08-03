import { useEffect, useState } from 'react';
import portfolio from './data/portfolio.json';
import { TerminalIcon } from './components/Icons';
import { Footer, Hero, Navigation } from './components/PageLayout';
import PortfolioSections from './components/PortfolioSections';
import PrintProjects from './components/PrintProjects';
import ProjectModal from './components/ProjectModal';
import Terminal from './components/Terminal';

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    function handleKey(event) {
      const tag = event.target.tagName;
      if (event.key === '`' && tag !== 'INPUT' && tag !== 'TEXTAREA') {
        event.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <>
      <Navigation items={portfolio.navItems} />
      <Hero profile={portfolio.profile} />
      <PortfolioSections data={portfolio} onOpenProject={setSelectedProject} />
      <PrintProjects projects={portfolio.projects} />
      <Footer handle={portfolio.profile.handle} />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      {!terminalOpen && (
        <button type="button" className="terminal-toggle" onClick={() => setTerminalOpen(true)} aria-label="터미널 열기" title="터미널 열기 (단축키: `)">
          <TerminalIcon />
        </button>
      )}
      <Terminal open={terminalOpen} onClose={() => setTerminalOpen(false)} onOpenProject={setSelectedProject} data={portfolio} />
    </>
  );
}

export default App;
