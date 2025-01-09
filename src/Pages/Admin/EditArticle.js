import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../components/Sidebar';
import '../../css/AdminDashboard.css';

const EditArticle = () => {
  const [article, setArticle] = useState({ title: '', author: '', content: '', image: '' });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`https://cssuckhoe.xyz/api/articles/${id}`);
        setArticle(response.data); // Fix data structure
      } catch (error) {
        console.error('Lỗi lấy bài viết:', error);
        toast.error('Lỗi lấy bài viết');
      }
    };

    fetchArticle();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle({ ...article, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://cssuckhoe.xyz/api/articles/${id}`, article);
      navigate('/admin/articlesmanage');
      toast.success('Cập nhật bài viết thành công');
    } catch (error) {
      console.error('Lỗi cập nhật bài viết:', error);
      toast.error('Lỗi cập nhật bài viết');
    }
  };

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <h1>Chỉnh sửa bài viết</h1>
        {article && ( // Add check to ensure article is defined
          <form className="edit-article-form" onSubmit={handleSubmit}>
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
        )}
      </div>
    </div>
  );
};

export default EditArticle;
