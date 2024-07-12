import React from 'react';
import Header from './header/Header';
import SignupPage from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import Blogs from './components/Blogs';
import HomePage from './components/HomePage';
import MyBlog from './components/MyBlog';
import CreateBlog from './components/CreateBlog';
import ViewBlog from './components/ViewBlog';

class BlogApp extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            currentSelectedMenu: 'home'
        };
    }   
    handleMenuSelection=(value)=>{
        console.log(value)
        this.setState({
            currentSelectedMenu: value
        })
    }

    handleBlogSelection=(value, blog_id)=>{
        console.log(blog_id)
        this.setState({
            currentSelectedMenu: value,
            blog_id: blog_id
        })
    }

    render(){
        let content = null;
        switch (this.state.currentSelectedMenu) {
            case 'home':
                content = <HomePage/>;
                break;
            case 'signup':
                content = <SignupPage/>;
                break;
            case 'login':
                content = <Login/>;
                break;
            case 'logout':
                content = <Logout/>;
                break;
            case 'blogs':
                content = <Blogs onMenuSelect={this.handleBlogSelection}/>;
                break;
            case 'view-blog':
                content = <ViewBlog blog_id={this.state.blog_id}/>;
                break
            case 'my-blogs':
                content = <MyBlog/>;
                break
            case 'create-blog':
                content = <CreateBlog/>;
                break
            default:
                content = null;
                break;
        }
        return(
            <div className='main-div'>
                <div className='MyApp'>
                    <Header onMenuSelect={this.handleMenuSelection}/>
                    {content}
                </div>
            </div>
        );
    }
}

export default BlogApp