import React, {useEffect, useState} from 'react';
import './Blogs.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons';
import ApiService from './apiService';

function Blogs(props){
    const { onMenuSelect } = props;
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchData = async () => {
            try {
                const response = await ApiService.all_blogs('/api/all-blogs/', token);
                // console.log('Successful API response:', response);
                setBlogs(response);
            } catch (error) {
                console.error('Error fetching data:', error);
                window.location.reload();
                localStorage['token']=''
            }
        };
        fetchData();
    }, []);

    useState(() => {
        console.log("Inside useState")
    })

    return(
            <div className='main-blog'>
                <h2>All Blogs</h2>
                {blogs.map(blog => (
                <div key={blog.id} className='blog-container' onClick={() => { onMenuSelect('view-blog', blog.id) }}>
                    <h2 className='blog-header'>{blog.title}</h2>
                    <p className="blog-details">Published on {blog.publication_date} by {blog.author.username}</p>
                    <div className="blog-content">
                        <p>{blog.content}</p>
                    </div>
                    <div className="like-comment-icons">
                        <FontAwesomeIcon icon={faThumbsUp} /> 
                        <FontAwesomeIcon icon={faComment} />
                    </div>
                </div>
                ))}
            </div>
    )
}

export default Blogs