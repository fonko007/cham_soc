import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import '../css/Services.css';

const Services = () => {
    const [values, setValues] = useState({
        fullname: '',
        email: localStorage.getItem('email'),
        sdt: '',
        address: '',
        date: '',
        time: '',
        ghichu: '',
        status: 'Todo',
    });

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();

    useEffect(() => { 
        const token = localStorage.getItem('token'); 
        if (!token) { 
            navigate('/login'); 
        }
    }, [navigate]);

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const postdata = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://s88d104.cloudnetwork.vn:5000/bookings', values);
            if (response.status === 201) {
                toast.success('Gửi thông tin thành công');
                emailjs
                    .send('service_4awgkye', 'template_jvrt3uv', values, {
                        publicKey: 'CP2rUAkU3b9nFkmjh',
                    })
                    .then(
                        () => {
                            toast.success('Gửi email thành công');
                            // Reset form after successful submission
                            setValues({
                                ...values,
                                fullname: '',
                                sdt: '',
                                address: '',
                                date: '',
                                time: '',
                                ghichu: '',
                            });
                        },
                        (error) => {
                            toast.error('Gửi email không thành công');
                        },
                    );
            }
        } catch (error) {
            toast.error('Gửi thông tin không thành công');
            console.error('Error submitting form:', error);
        }
    }

    const handleValue = (e) => {
        setValues({
            ...values, 
            [e.target.name]: e.target.value,
        });
    }

    const isValid = () => {
        const requiredFields = ['fullname', 'sdt', 'address', 'date', 'time'];
        return requiredFields.every(field => values[field].trim() !== '');
    }

    return (
        <div>
            <Sidebar isOpen={isSidebarOpen} onToggle={handleSidebarToggle} />
            <div className={`services-container ${!isSidebarOpen ? 'sidebar-active' : ''}`}>
                <form autoComplete="off" onSubmit={postdata}>
                    <div className="form-group">
                        <label htmlFor="fullname">Họ và tên</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="fullname" 
                            placeholder='Điền họ và tên' 
                            name='fullname'
                            value={values.fullname}
                            required
                            onChange={handleValue}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="sdt">Số điện thoại</label>
                        <input 
                            type="tel" 
                            className="form-control" 
                            id="sdt" 
                            placeholder='Điền Số điện thoại' 
                            name='sdt'
                            value={values.sdt}
                            required
                            pattern="[0-9]{10}"
                            onChange={handleValue}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Địa chỉ</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="address" 
                            placeholder='Điền địa chỉ' 
                            name='address'
                            value={values.address}
                            required
                            onChange={handleValue}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Ngày</label>
                        <input
                            type='date'
                            className="form-control"
                            id='date'
                            name='date'
                            value={values.date}
                            required
                            min={new Date().toISOString().split('T')[0]}
                            onChange={handleValue}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="time">Thời gian</label>
                        <input
                            type='time'
                            min="08:00"
                            max="18:00"
                            step="3600"
                            className="form-control"
                            id='time'
                            name='time'
                            value={values.time}
                            required
                            onChange={handleValue}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="ghichu">Ghi chú</label>
                        <textarea 
                            name='ghichu' 
                            className="form-control" 
                            id="ghichu"
                            value={values.ghichu}
                            style={{resize:"none"}} 
                            rows={5} 
                            onChange={handleValue}>
                        </textarea>
                    </div>
                    <button 
                        type="submit" 
                        className={`btn btn-primary ${!isValid() ? 'disabled' : ''}`} 
                        disabled={!isValid()}>
                        Đăng ký ngay
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Services;