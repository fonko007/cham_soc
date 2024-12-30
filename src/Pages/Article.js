import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/Article.css';
import Sidebar from '../components/Sidebar';

function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`https://cssuckhoe.xyz/api/articles/${id}`);
        setArticle(response.data);
      } catch (error) {
        setError('Failed to load article');
      }
    };

    fetchArticle();
  }, [id]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="article-page">
      <Sidebar />
      <div className="article-content">
        <h1>{article.title}</h1>
        <div className="article-meta">
          <span>Tạo Ngày {new Date(article.create_time).toLocaleDateString()}</span>
          <span>Tác giả: {article.author}</span> {/* Display author */}
        </div>
        {article.image && <img src={article.image} alt={article.title} className="article-image" />}
        <p className="article-text">{article.content.split('\n').map((line, index) => (
          <span key={index}>{line}<br /></span>
        ))}</p>
        {article.link && <a href={article.link} target="_blank" rel="noopener noreferrer">Read more</a>}
      </div>
    </div>
  );
}

export default ArticlePage;
