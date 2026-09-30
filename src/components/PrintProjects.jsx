import ProjectRoles from './ProjectRoles';
import EmphasizedText from './EmphasizedText';

export default function PrintProjects({ projects }) {
  return (
    <section className="print-projects" id="project-detail" aria-label="프로젝트 상세">
      <div className="page">
        <h2>프로젝트 상세</h2>
        {projects.map((project) => (
          <article className="print-project" id={`project-${project.id}`} key={project.id}>
            <header className="print-project-header">
              <div>
                <h3>{project.title}</h3>
                {project.period && <p className="print-project-period">{project.period}</p>}
              </div>
            </header>
            <div className="print-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <div className="print-detail-grid">
              <div className="print-detail print-overview">
                <h4>프로젝트 개요</h4>
                <p>{project.summary}</p>
                <p>{project.result}</p>
              </div>
              <div className="print-detail print-architecture">
                <h4>아키텍처</h4>
                <div className="print-arch-flow">
                  {project.architecture.map(([name, description]) => (
                    <div key={name}><strong>{name}</strong><span>{description}</span></div>
                  ))}
                </div>
                <div className="print-support">
                  {project.support.map(([name, description]) => <p key={name}><strong>{name}</strong> {description}</p>)}
                </div>
              </div>
              <div className="print-detail">
                <h4>내 역할</h4>
                <ProjectRoles roles={project.roles} />
              </div>
              <div className="print-detail print-trouble">
                <h4>트러블슈팅</h4>
                {project.trouble.map((item) => (
                  <div className="print-trouble-item" key={item.title}>
                    <strong>{item.title}</strong>
                    <p><span className="print-trouble-label">문제</span><EmphasizedText text={item.situation} /></p>
                    <div className="print-trouble-actions">
                      <span className="print-trouble-label">해결</span>
                      <ol>{item.action.map((step) => <li key={step}><EmphasizedText text={step} /></li>)}</ol>
                    </div>
                    <p><span className="print-trouble-label">결과</span><EmphasizedText text={item.result} /></p>
                    {item.code && <pre className="print-code"><code>{item.code.snippet}</code></pre>}
                  </div>
                ))}
              </div>
              <div className="print-detail">
                <h4>회고</h4>
                <ul>{project.retrospective.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
