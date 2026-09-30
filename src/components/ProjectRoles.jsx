export default function ProjectRoles({ roles }) {
  return (
    <div className="project-roles">
      {roles.map((role) => (
        <section className="project-role" key={role.title}>
          <h5>{role.title}</h5>
          <p className="project-role-purpose">{role.purpose}</p>
          <ul>{role.items.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
      ))}
    </div>
  );
}
