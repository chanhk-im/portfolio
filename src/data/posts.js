const modules = import.meta.glob('../../post/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

function parseValue(value) {
  const trimmed = value.trim();
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    return trimmed.slice(1, -1).split(',')
      .map((item) => item.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean);
  }
  return trimmed.replace(/^['"]|['"]$/g, '');
}

function parsePost(path, source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  const attributes = {};
  const body = match ? match[2].trim() : source.trim();
  if (match) {
    match[1].split(/\r?\n/).forEach((line) => {
      const separator = line.indexOf(':');
      if (separator === -1) return;
      attributes[line.slice(0, separator).trim()] = parseValue(line.slice(separator + 1));
    });
  }
  const filename = path.split('/').pop().replace(/\.md$/, '');
  const plainText = body.replace(/```[\s\S]*?```/g, '').replace(/[#>*_`\[\]-]/g, ' ')
    .replace(/\([^)]*\)/g, '').replace(/\s+/g, ' ').trim();
  return {
    slug: attributes.slug || filename,
    title: attributes.title || filename,
    date: attributes.date || '',
    category: attributes.category || 'Other',
    tags: Array.isArray(attributes.tags) ? attributes.tags : [],
    description: attributes.description || `${plainText.slice(0, 150)}${plainText.length > 150 ? '...' : ''}`,
    body,
  };
}

export const posts = Object.entries(modules)
  .map(([path, source]) => parsePost(path, source))
  .sort((a, b) => b.date.localeCompare(a.date));
export const categories = [...new Set(posts.map((post) => post.category))].sort();
export const tags = [...new Set(posts.flatMap((post) => post.tags))].sort();
