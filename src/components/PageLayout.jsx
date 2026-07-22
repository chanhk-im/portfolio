import { GithubIcon, MailIcon } from './Icons';

export function Navigation({ items }) {
  return <nav><div className="page">{items.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}<a href="#/blog">Blog</a></div></nav>;
}

export function Hero({ profile }) {
  return (
    <header id="home"><div className="page hero">
      <div>
        <p className="eyebrow">{profile.eyebrow}</p>
        <h1>{profile.name}</h1>
        <p className="hero-copy">{profile.hero}</p>
        <div className="contact-list" aria-label="contact">
          <a className="contact-item" href={`mailto:${profile.email}`} aria-label="Email"><MailIcon /></a>
          <a className="contact-item" href={profile.github} aria-label="GitHub"><GithubIcon /></a>
        </div>
      </div>
    </div></header>
  );
}

export function Footer({ handle }) {
  return <footer><div className="page"><p>{handle}</p></div></footer>;
}
