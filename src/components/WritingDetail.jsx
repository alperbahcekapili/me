import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { writings } from '../data/writings';
import './WritingDetail.css';

const WritingDetail = () => {
  const { slug: slugParam } = useParams();
  const slug = decodeURIComponent(slugParam ?? '');
  const writing = writings.find((item) => item.slug === slug);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    if (!writing) {
      setError('Writing not found.');
      return () => {
        active = false;
      };
    }

    setError('');
    fetch(writing.url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load writing.');
        }

        return response.text();
      })
      .then((markdown) => {
        if (active) {
          setContent(markdown);
        }
      })
      .catch(() => {
        if (active) {
          setError('Unable to load writing.');
        }
      });

    return () => {
      active = false;
    };
  }, [writing]);

  return (
    <main className="writing-detail-page">
      <article className="writing-detail-card">
        <Link to="/writings" className="writing-detail-back-link">
          ← Back to writings
        </Link>
        {error ? (
          <p className="writing-detail-error">{error}</p>
        ) : (
          <ReactMarkdown>{content}</ReactMarkdown>
        )}
      </article>
    </main>
  );
};

export default WritingDetail;
