export default function ProjectCard({ project, onOpen }) {
  return (
    <article className="card project">
      <div className="project-title">
        <div className="project-heading">
          <h3>{project.title}</h3>
        </div>
        {project.period && <p className="project-period">{project.period}</p>}
        <p className="project-summary">{project.summary}</p>
      </div>
      <div className="tags">
        {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
      </div>
      <button className="project-action" type="button" onClick={() => onOpen(project)}>
        상세 보기
      </button>
    </article>
  );
}
