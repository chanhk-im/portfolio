import { DownloadIcon, GithubIcon, MailIcon } from './Icons';

export function Navigation({ items }) {
  return <nav><div className="page nav-content">
    <div className="nav-links">{items.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}</div>
    <button className="pdf-download" type="button" onClick={() => window.print()} aria-label="포트폴리오를 PDF로 저장">
      <DownloadIcon />
      <span>PDF로 저장</span>
    </button>
  </div></nav>;
}

export function Hero({ profile }) {
  return (
    <header id="home"><div className="page hero">
      <div className="hero-intro">
        <p className="eyebrow">{profile.eyebrow}</p>
        <h1>{profile.name}</h1>
      </div>
      <div className="contact-list" aria-label="contact">
        <a className="contact-item" href={`mailto:${profile.email}`}>
          <span className="contact-icon"><MailIcon /></span>
          <span>{profile.email}</span>
        </a>
        <a className="contact-item" href={profile.github}>
          <span className="contact-icon"><GithubIcon /></span>
          <span>{profile.handle}</span>
        </a>
      </div>
    </div></header>
  );
}

export function PrintToc({ items }) {
  return (
    <section className="print-toc" aria-hidden="true">
      <div className="page">
        <h2>목차</h2>
        <ol className="print-toc-list">
          {items.map((item) => (
            <li key={item.href}>
              <a href={item.href}>
                <span className="print-toc-label">{item.label}</span>
                <span className="print-toc-leader" />
              </a>
              {item.sub && item.sub.length > 0 && (
                <ol className="print-toc-sub">
                  {item.sub.map((sub) => (
                    <li key={sub.href}>
                      <a href={sub.href}>
                        <span className="print-toc-label">{sub.label}</span>
                        <span className="print-toc-leader" />
                      </a>
                    </li>
                  ))}
                </ol>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Footer({ handle }) {
  return <footer><div className="page"><p>{handle}</p></div></footer>;
}
