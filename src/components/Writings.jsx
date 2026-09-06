import React from 'react';
import { Link } from 'react-router-dom';
import './Writings.css';

const writingModules = import.meta.glob('../writings/**/*.md', {
  eager: true,
  import: 'default',
  query: '?url',
});

const writings = Object.entries(writingModules)
  .map(([path, url]) => {
    const fileName = path.split('/').pop()?.replace(/\.md$/, '') ?? 'Untitled';
    const title = fileName
      .replace(/[-_]+/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());

    return { title, url };
  })
  .sort((a, b) => a.title.localeCompare(b.title));

const Writings = () => {
  return (
    <main className="writings-page">
      <section className="writings-card">
        <h1>Writings</h1>
        {writings.length === 0 ? (
          <p className="writings-empty">
            Add Markdown files under <code>src/writings</code> to list them here.
          </p>
        ) : (
          <ul className="writings-list">
            {writings.map((writing) => (
              <li key={writing.url}>
                <a href={writing.url} target="_blank" rel="noreferrer">
                  {writing.title}
                </a>
              </li>
            ))}
          </ul>
        )}
        <Link to="/" className="writings-back-link">
          ← Back to home
        </Link>
      </section>
    </main>
  );
};

export default Writings;
