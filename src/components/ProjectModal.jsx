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
          <div><h3>{project.title}</h3><p>{project.summary}</p></div>
          <button className="modal-close" type="button" onClick={onClose} aria-label="닫기">×</button>
        </div>
        <div className="modal-body">
          <div className="detail-grid">
            <div className="detail-block architecture-block">
              <h4>아키텍처 구조</h4>
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
              <h4>역할과 주요 기능</h4>
              <ul>{project.roles.map((role) => <li key={role}>{role}</li>)}</ul>
            </div>
            <div className="detail-block">
              <h4>트러블슈팅 / 성능 개선</h4>
              {project.trouble.map(([title, body]) => <p key={title}><strong>{title}</strong><br />{body}</p>)}
            </div>
          </div>
          <div className="detail-block"><h4>정리</h4><p>{project.result}</p></div>
        </div>
      </div>
    </div>
  );
}
