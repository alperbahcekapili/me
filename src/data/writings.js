const writingModules = import.meta.glob('../writings/**/*.md', {
  eager: true,
  import: 'default',
  query: '?url',
});

export const writings = Object.entries(writingModules)
  .map(([path, url]) => {
    const fileName = path.split('/').pop()?.replace(/\.md$/, '') ?? 'untitled';
    const title = fileName
      .replace(/[-_]+/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());

    return { title, slug: fileName, url };
  })
  .sort((a, b) => a.title.localeCompare(b.title));
