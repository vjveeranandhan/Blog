import React, {useEffect, useState} from 'react';
import ApiService from './apiService';
import './ViewBlog.css'

function ViewBlog(props){
    const { blog_id } = props;
    const [viewblogs, setBlogs] = useState({ blog: {}, comments: [] });
    const [formData, setFormData] = useState({
        text: '',
        blog_id: '',
        author: ''
      });

    const handleChange = (e) => {
    console.log("Change in input data")
    const { name, value } = e.target;
    setFormData(prevState => ({
        ...prevState,
        [name]: value
    }));
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const author = localStorage.getItem('user')
    try {
        const response = await ApiService.create_comment('/api/create-comment/',  {
            ...formData,
            blog_id: blog_id, // Set blog_id from props
            author: author
          }, token);
        console.log("response", response)
        // setFormData({
        // text: '',
        // });
        // window.location.reload();
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    };

    useEffect(() => {
        // console.log("useEffect")
        const token = localStorage.getItem('token');
        const fetchData = async () => {
            try {
                const response = await ApiService.view_blog('/api/all-blogs/',token, blog_id);
                console.log('Successful API response:', response);
                setBlogs(response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        if (blog_id) {
            fetchData();
        }
    }, [blog_id]);
    
    return (
        <div className='blog-container'>
          {viewblogs.blog && (
            <>
            <div>            
                <h2 className='blog-header'>{viewblogs.blog.title}</h2>
                <p className="blog-details">Published on {viewblogs.blog.publication_date} by {viewblogs.blog.author?.username }</p>
                <div className="blog-content">
                    <p>{viewblogs.blog.content}</p>
                </div>
            </div>
              {/* <h2>{viewblogs.blog.title}</h2>
              <p>{viewblogs.blog.content}</p>
              <p>Publication Date: {viewblogs.blog.publication_date}</p>
              <p>Author: {viewblogs.blog.author?.name}</p> Use optional chaining for safety */}
            </>
          )}
        <form onSubmit={handleSubmit}>
            <div>
            <label>
                <input
                type="text"
                name="text"
                value={formData.text}
                onChange={handleChange}
                required
                placeholder='Comment'
                className='comment-text'
                />
            </label>
            <button className= "comment-submit" type="submit">comment</button>
          </div>
        </form>
          <h3>Comments:</h3>
          <ul>
            {viewblogs.comments.map(comment => (
              <li key={comment.id}>
                <p>{comment.author?.username}</p>
                <p>{comment.created_at}</p>
                <p>{comment.text}</p>
              </li>
            ))}
          </ul>
        </div>
      );      
    }
export default ViewBlog