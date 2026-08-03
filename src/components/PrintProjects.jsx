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
                <p>{project.summary}</p>
              </div>
              <strong>기여도 {project.contribution}%</strong>
            </header>
            <div className="print-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <div className="print-detail-grid">
              <div className="print-detail print-architecture">
                <h4>아키텍처 구조</h4>
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
                <h4>역할과 주요 기능</h4>
                <ul>{project.roles.map((role) => <li key={role}>{role}</li>)}</ul>
              </div>
              <div className="print-detail">
                <h4>트러블슈팅과 성능 개선</h4>
                {project.trouble.map(([title, body]) => <p key={title}><strong>{title}</strong><br />{body}</p>)}
              </div>
              <div className="print-detail print-result"><h4>결과</h4><p>{project.result}</p></div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
