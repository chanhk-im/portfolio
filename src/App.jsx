import { useEffect, useState } from 'react';
import portfolio from './data/portfolio.json';
import { TerminalIcon } from './components/Icons';
import { Footer, Hero, Navigation } from './components/PageLayout';
import PortfolioSections from './components/PortfolioSections';
import ProjectModal from './components/ProjectModal';
import Terminal from './components/Terminal';
import { BlogPage, BlogPost } from './components/Blog';

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [hash, setHash] = useState(window.location.hash);

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

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (hash.startsWith('#/blog')) {
      window.scrollTo({ top: 0, left: 0 });
    } else if (hash.length > 1) {
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
    }
  }, [hash]);

  if (hash === '#/blog' || hash === '#/blog/') {
    return (
      <>
        <Navigation items={portfolio.navItems} />
        <BlogPage />
        <Footer handle={portfolio.profile.handle} />
      </>
    );
  }

  const postMatch = hash.match(/^#\/blog\/(.+)$/);
  if (postMatch) {
    let postSlug = postMatch[1];
    try {
      postSlug = decodeURIComponent(postSlug);
    } catch {
      // Keep the raw value so malformed URLs render the not-found state.
    }
    return (
      <>
        <Navigation items={portfolio.navItems} />
        <BlogPost slug={postSlug} />
        <Footer handle={portfolio.profile.handle} />
      </>
    );
  }

  return (
    <>
      <Navigation items={portfolio.navItems} />
      <Hero profile={portfolio.profile} />
      <PortfolioSections data={portfolio} onOpenProject={setSelectedProject} />
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
