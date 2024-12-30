import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import '../../css/AdminDashboard.css';

const CreateArticle = () => {
  const [article, setArticle] = useState({ title: '', author: '', content: '', image: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle({ ...article, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://cssuckhoe.xyz/api/articles', article);
      navigate('/admin/articles');
    } catch (error) {
      console.error('Lỗi tạo bài viết:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <h1>Tạo bài viết mới</h1>
        <form className="create-article-form" onSubmit={handleSubmit}>
          <label>
            Tiêu đề:
            <input type="text" name="title" value={article.title} onChange={handleChange} />
          </label>
          <label>
            Tác giả:
            <input type="text" name="author" value={article.author} onChange={handleChange} /> {/* Add author field */}
          </label>
          <label>
            Nội dung:
            <textarea name="content" value={article.content} onChange={handleChange} />
          </label>
          <label>
            Link hình ảnh:
            <input type="text" name="image" value={article.image} onChange={handleChange} />
          </label>
          <button type="submit">Lưu</button>
        </form>
      </div>
    </div>
  );
};

export default CreateArticle;
