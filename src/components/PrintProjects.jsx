export default function PrintProjects({ projects }) {
  return (
    <section className="print-projects" aria-label="프로젝트 상세">
      <div className="page">
        <h2>프로젝트 상세</h2>
        {projects.map((project) => (
          <article className="print-project" key={project.id}>
            <header className="print-project-header">
              <div>
                <h3>{project.title}</h3>
                {project.period && <p className="print-project-period">{project.period}</p>}
              </div>
              <strong>기여도 {project.contribution}%</strong>
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
                <h4>내가 기여한 역할</h4>
                <ul>{project.roles.map((role) => <li key={role}>{role}</li>)}</ul>
              </div>
              <div className="print-detail print-trouble">
                <h4>트러블슈팅</h4>
                {project.trouble.map((item) => (
                  <div className="print-trouble-item" key={item.title}>
                    <strong>{item.title}</strong>
                    <p><span className="print-trouble-label">상황</span>{item.situation}</p>
                    <div className="print-trouble-actions">
                      <span className="print-trouble-label">조치</span>
                      <ol>{item.action.map((step) => <li key={step}>{step}</li>)}</ol>
                    </div>
                    <p><span className="print-trouble-label">결과</span>{item.result}</p>
                    {item.code && <pre className="print-code"><code>{item.code.snippet}</code></pre>}
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
