import React from 'react';
import { Link } from 'react-router-dom';
import './Writings.css';
import { writings } from '../data/writings';

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
              <li key={writing.slug}>
                <Link to={`/writings/${encodeURIComponent(writing.slug)}`}>
                  {writing.title}
                </Link>
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
