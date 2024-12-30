import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/News.css';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

function NewsPage() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9; // Change this to 9 or 12

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('https://cssuckhoe.xyz/api/articles');
        setNews(response.data.articles);
      } catch (error) {
        setError('Failed to load articles');
      }
    };

    fetchArticles();
  }, []);

  const truncateContent = (content, maxLength) => {
    if (content.length > maxLength) {
      return content.substring(0, maxLength) + '...';
    }
    return content;
  };

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = news ? news.slice(indexOfFirstArticle, indexOfLastArticle) : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="news-page">
      <Sidebar />
      <div className="news-content">
        {error ? (
          <div className="error">{error}</div>
        ) : (
          <>
            <ul className="articles-list">
              {currentArticles.map((article, index) => (
                <li key={index} className="article-block">
                  <Link to={`/news/${article.id}`} className="article-link">
                    <img src={article.image} alt={article.title} className="article-image" />
                    <h2 className="article-title">{article.title}</h2>
                    <p className="article-content">{truncateContent(article.content, 100)}</p>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="pagination">
              {Array.from({ length: Math.ceil(news.length / articlesPerPage) }, (_, index) => (
                <button key={index} onClick={() => paginate(index + 1)}>
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default NewsPage;