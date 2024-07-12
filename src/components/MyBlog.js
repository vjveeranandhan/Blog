import React, {useEffect, useState} from "react"
import ApiService from './apiService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons';
import './MyBlog.css'


function MyBlog(){

    const [myblogs, setBlogs] = useState([]);

    useEffect(() => {
        // console.log("useEffect")
        const token = localStorage.getItem('token');
        const fetchData = async () => {
            try {
                const response = await ApiService.my_blogs('/api/my-blogs/', localStorage.getItem('user'),token);
                console.log('Successful API response:', response);
                setBlogs(response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return(
        <div className='main-blog'>
            <h2>My Blogs</h2>
        {myblogs.map(blog => (
        <div key={blog.id} className='blog-container'>
            <h2 className='blog-header'>{blog.title}</h2>
            <p className="blog-details">Published on {blog.publication_date}</p>
            <div className="blog-content">
                <p>{blog.content}</p>
            </div>
            <div className="like-comment-icons">
                <FontAwesomeIcon icon={faThumbsUp} /> 
                <FontAwesomeIcon icon={faComment} />
            </div>
            <div className='button-container'>
                <button className='edit-button'>Edit</button>
                <button className='delete-button'>Delete</button>
            </div>
        </div>
        ))}
    </div>
    )
}

export default MyBlog