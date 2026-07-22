import { useMemo, useState } from 'react';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import { categories, posts, tags } from '../data/posts';

function formatDate(value) {
  if (!value) return '';
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('ko-KR', { dateStyle: 'long' }).format(date);
}

function PostMeta({ post }) {
  return <div className="post-meta">
    {post.date && <time dateTime={post.date}>{formatDate(post.date)}</time>}
    <span className="post-category">{post.category}</span>
    {post.tags.map((tag) => <span className="post-tag" key={tag}>#{tag}</span>)}
  </div>;
}

export function BlogPage() {
  const [category, setCategory] = useState('All');
  const [selectedTags, setSelectedTags] = useState([]);
  const filteredPosts = posts.filter((post) =>
    (category === 'All' || post.category === category) &&
    selectedTags.every((tag) => post.tags.includes(tag)),
  );
  const toggleTag = (tag) => setSelectedTags((current) =>
    current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag],
  );
  return <main className="blog-page"><div className="blog-shell">
    <div className="blog-main">
      <header className="blog-header">
        <p className="eyebrow">Engineering Notes</p>
        <h1>Blog</h1>
        <p>Notes on engineering, learning, and problem solving.</p>
      </header>
      <div className="blog-content">
        <div className="tag-toolbar" aria-label="Filter by tags">
          {selectedTags.length > 0 && <div className="tag-toolbar-head"><button type="button" className="clear-tags" onClick={() => setSelectedTags([])}>Clear all</button></div>}
          <div className="tag-toggles">
            {tags.map((tag) => <button type="button" aria-pressed={selectedTags.includes(tag)} className={selectedTags.includes(tag) ? 'active' : ''} onClick={() => toggleTag(tag)} key={tag}>#{tag}</button>)}
          </div>
        </div>
        <div className="post-list" aria-live="polite">
          {filteredPosts.map((post) => <article className="card post-card" key={post.slug}>
            <PostMeta post={post} />
            <h3><a href={`#/blog/${encodeURIComponent(post.slug)}`}>{post.title}</a></h3>
            <p>{post.description}</p>
            <a className="post-link" href={`#/blog/${encodeURIComponent(post.slug)}`}>Read post</a>
          </article>)}
          {!filteredPosts.length && <p className="empty-posts">No posts match these filters.</p>}
        </div>
      </div>
    </div>
    <aside className="blog-sidebar" aria-label="Blog categories">
      <nav className="category-menu" aria-label="Categories">
        <h2>Categories</h2>
        {['All', ...categories].map((item) => <button type="button" aria-pressed={category === item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)} key={item}>{item}</button>)}
      </nav>
    </aside>
  </div></main>;
}

export function BlogPost({ slug }) {
  const post = posts.find((item) => item.slug === slug);
  const html = useMemo(() => post ? DOMPurify.sanitize(marked.parse(post.body)) : '', [post]);
  if (!post) return <main className="post-page"><div className="page post-shell"><a href="#/blog">Back to blog</a><h1>Post not found.</h1></div></main>;
  return <main className="post-page"><article className="page post-shell">
    <a className="post-back" href="#/blog">Back to blog</a>
    <header className="post-header"><PostMeta post={post} /><h1>{post.title}</h1>{post.description && <p>{post.description}</p>}</header>
    <div className="markdown-body" dangerouslySetInnerHTML={{ __html: html }} />
  </article></main>;
}
