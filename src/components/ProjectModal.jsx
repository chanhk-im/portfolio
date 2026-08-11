import { useEffect } from 'react';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return undefined;
    const handleKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-panel" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3>{project.title}</h3>
            <div className="contribution-detail" aria-label={`프로젝트 기여도 ${project.contribution}%`}>
              <span>기여도</span>
              <strong>{project.contribution}%</strong>
              <div className="contribution-track" aria-hidden="true">
                <span style={{ width: `${project.contribution}%` }} />
              </div>
            </div>
            {(project.links?.github || project.links?.web) && (
              <div className="project-links" aria-label="프로젝트 링크">
                {project.links.github && (
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                    GitHub <span aria-hidden="true">↗</span>
                  </a>
                )}
                {project.links.web && (
                  <a href={project.links.web} target="_blank" rel="noopener noreferrer">
                    Web <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            )}
          </div>
          <button className="modal-close" type="button" onClick={onClose} aria-label="닫기">×</button>
        </div>
        <div className="modal-body">
          <div className="detail-block">
            <h4>프로젝트 개요</h4>
            <p>{project.summary}</p>
            <p>{project.result}</p>
          </div>
          <div className="detail-block">
            <h4>아키텍처</h4>
            <div className="arch-diagram">
              <div className="arch-flow">
                {project.architecture.map(([name, desc], index) => (
                  <div className={`arch-node ${['', 'teal', 'green', 'amber', 'rose'][index % 5]}`} key={name}>
                    <strong>{name}</strong><span>{desc}</span>
                  </div>
                ))}
              </div>
              <div className="arch-support">
                {project.support.map(([name, desc]) => <div key={name}><strong>{name}</strong>{desc}</div>)}
              </div>
            </div>
          </div>
          <div className="detail-block">
            <h4>내가 기여한 역할</h4>
            <ul>{project.roles.map((role) => <li key={role}>{role}</li>)}</ul>
          </div>
          <div className="detail-block">
            <h4>트러블슈팅</h4>
            <div className="trouble-list">
              {project.trouble.map((item) => (
                <div className="trouble-item" key={item.title}>
                  <strong>{item.title}</strong>
                  <p className="trouble-row"><span className="trouble-label">상황</span>{item.situation}</p>
                  <div className="trouble-row trouble-actions-row">
                    <span className="trouble-label">조치</span>
                    <ol className="trouble-actions">
                      {item.action.map((step) => <li key={step}>{step}</li>)}
                    </ol>
                  </div>
                  <p className="trouble-row trouble-result"><span className="trouble-label">결과</span>{item.result}</p>
                  {item.code && (
                    <pre className="code-block"><code>{item.code.snippet}</code></pre>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
