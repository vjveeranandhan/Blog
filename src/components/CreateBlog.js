import React, {useState } from "react";
import ApiService from './apiService';

function CreateBlog(){
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        author: NaN
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
        setFormData({
            ...formData,
            author: localStorage.getItem('user')
        });
        const token = localStorage.getItem('token');
        try {
            if (!isNaN(formData['author'])) {
                console.log('user', localStorage.getItem('user'))
                const response = await ApiService.create_blog('/api/create-blog/',formData, token);
                console.log('Successful API response:', response.data);
            } else {
                setFormData({
                    ...formData,
                    author: localStorage.getItem('user')
                });}
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className='main-container'>
          <div className='container'>
            <h2 className='h2-header'>Create Blog</h2>
            <form onSubmit={handleSubmit}>
              <label>
                <input
                  type="text"
                  name="title"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  placeholder='Title'
                />
              </label>
              <br />
              <label>
                <textarea
                    style={{ width: '390px', height: '225px' , borderRadius: '8px'}}
                  type="text"
                  name="content"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder='Content'
                />
              </label>
              <br />
              <button type="submit">Post</button>
            </form>
          </div>
        </div>
      );
}
export default CreateBlog