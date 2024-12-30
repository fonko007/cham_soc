import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import '../../css/AdminDashboard.css';

const ArticleManagement = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkPermission = async () => {
      const email = localStorage.getItem('email');
      if (!email) {
        navigate('/admin/login');
        return;
      }
      try {
        const response = await axios.post('https://cssuckhoe.xyz/api/check-permission', { email });
        if (response.data.isAdmin !== 'admin') {
          navigate('/admin/login');
        }
      } catch (error) {
        console.error('Lỗi kiểm tra quyền:', error);
        navigate('/admin/login');
      }
    };

    const fetchArticles = async () => {
      try {
        const response = await axios.get('https://cssuckhoe.xyz/api/articles'); // Thay đổi API endpoint cho phù hợp
        setArticles(response.data.articles); // Ensure articles are accessed correctly
      } catch (error) {
        console.error('Lỗi lấy danh sách bài viết:', error);
      }
    };

    checkPermission();
    fetchArticles();
  }, [navigate]);

  const removeArticle = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này không?')) {
      try {
        await axios.delete(`https://cssuckhoe.xyz/api/articles/${id}`); // Thay đổi API endpoint cho phù hợp
        setArticles(articles.filter(article => article.id !== id));
      } catch (error) {
        console.error('Lỗi xóa bài viết:', error);
      }
    }
  };

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <h1>Quản lý bài viết</h1>
        <button className="button" onClick={() => navigate('/admin/articles/create')}>Tạo bài viết mới</button> {/* Add button to create new article */}
        <table>
          <thead>
            <tr>
              <th>Tiêu đề</th>
              <th>Tác giả</th>
              <th>Ngày tạo</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id}>
                <td>{article.title}</td> 
                <td>{article.author}</td> 
                <td>{new Date(article.create_time).toLocaleDateString()}</td> 
                <td>
                  <button className="button" onClick={() => navigate(`/admin/articles/${article.id}/edit`)}>Sửa</button> 
                  <button className="button" onClick={() => removeArticle(article.id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ArticleManagement;