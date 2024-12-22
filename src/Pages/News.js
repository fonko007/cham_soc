import React, { useState, useEffect } from 'react';
import '../css/News.css';
import Sidebar from '../components/Sidebar';

function NewsPage() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = '940b0aff63aa4643bc7f8e4c3e76fcc1'; // Replace with your actual API key
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    fetch(apiUrl)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setNews(data.articles);
      })
      .catch(err => {
        setError(err);
      });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  
  return (
    <div className='news-page'>
      <Sidebar/>
      <h1>Latest News</h1>
      <ul>
        {news.map(article => (
          <li key={article.url}>
            <h2>{article.title}</h2>
            {article.urlToImage && <img src={article.urlToImage} alt={article.title} />}
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NewsPage;