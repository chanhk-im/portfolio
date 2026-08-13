import ProjectCard from './ProjectCard';

export default function PortfolioSections({ data, onOpenProject, children }) {
  const { about, history, strengths, projects, caseStudies, skills, awards, education } = data;
  return (
    <main>
      <section id="about"><div className="page section-head"><h2>About</h2><div>
        {about.map((paragraph) => <p className="lead" key={paragraph}>{paragraph}</p>)}
      </div></div></section>
      {history && history.length > 0 && (
        <section id="history"><div className="page section-head">
          <h2>연혁</h2>
          <div className="timeline-groups">
            {history.map((group) => (
              <div className="timeline-group" key={group.year}>
                <span className="timeline-year">{group.year}</span>
                <ul className="timeline-items">
                  {group.items.map((item) => (
                    <li key={item.title}>
                      <strong>{item.title}</strong>
                      {item.description && <span className="timeline-desc">{item.description}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div></section>
      )}
      <section id="strengths" className="compact-section"><div className="page section-head">
        <h2>핵심 역량</h2>
        <div className="grid strength-list">{strengths.map((strength) => <div className="card compact-card" key={strength.title}><h3>{strength.title}</h3><p>{strength.description}</p></div>)}</div>
      </div></section>
      <section id="projects"><div className="page section-head">
        <h2>프로젝트</h2>
        <div className="grid project-list">{projects.map((project) => <ProjectCard project={project} key={project.id} onOpen={onOpenProject} />)}</div>
      </div></section>
      <section id="cases"><div className="page section-head">
        <h2>문제 해결 사례</h2>
        <div className="case-study">{caseStudies.map((study) => <div className="case-row" key={study.title}><strong>{study.title}</strong><p>{study.description}</p></div>)}</div>
      </div></section>
      <section id="skills"><div className="page section-head">
        <h2>기술 스택</h2>
        <div className="skill-table">{skills.map(([name, value]) => <div className="skill-row" key={name}><strong>{name}</strong><span>{value}</span></div>)}</div>
      </div></section>
      {children}
      {awards && awards.length > 0 && (
        <section id="awards"><div className="page section-head">
          <h2>수상</h2>
          <ul className="awards-list">{awards.map((item) => <li key={item}>{item}</li>)}</ul>
        </div></section>
      )}
      <section id="education"><div className="page section-head">
        <h2>교육</h2>
        <div className="education-list">{education.map((entry) => (
          <div className="education-row" key={entry.id}>
            <div className="education-row-head">
              <h3>{entry.title}</h3>
              <p>{entry.period}</p>
            </div>
            {entry.items && entry.items.length > 0 && <ul>{entry.items.map((item) => <li key={item}>{item}</li>)}</ul>}
          </div>
        ))}</div>
      </div></section>
    </main>
  );
}
