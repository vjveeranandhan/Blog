import React, {useState} from 'react';
import './Header.css';
import Logout from '../components/Logout';

function Header(props) {
  const { onMenuSelect } = props;
  const token = localStorage.getItem('token');
  const [showMyBlogsDropdown, setShowMyBlogsDropdown] = useState(false);
  
  const handleLogout = async () => {
    console.log("Inside logout")
    await Logout();
  };    

  return (
    <div className='main-div'>
      <div className='app-main-header'>
        <h2>Blog</h2>
          <div className='app-header'>
            <span className='nav-menu-main' onMouseLeave={() => { setShowMyBlogsDropdown(false) }} onClick={() => { onMenuSelect('home')}}>Home</span>
            {token ? (
              <>
                <span className='nav-menu-main' onMouseLeave={() => { setShowMyBlogsDropdown(false) }} onClick={() => { onMenuSelect('blogs') }}>Blogs</span>
                <span className='nav-menu-main' 
                  onMouseEnter={() => { setShowMyBlogsDropdown(true) }}
                  >My Blogs</span>
                {showMyBlogsDropdown && (
                  <div className="dropdown-content">
                    <span className='nav-menu' onClick={() => { onMenuSelect('create-blog') }}>Create Blog</span>
                    <span className='nav-menu' onClick={() => { onMenuSelect('my-blogs') }}>My Blog</span>
                  </div>
                )}
                <LogoutButton onLogout={handleLogout} onMouseLeave={() => { setShowMyBlogsDropdown(false) }} />
              </>
            ) : (
              <>
                <span className='nav-menu-main' onClick={() => { onMenuSelect('signup') }}>Signup</span>
                <span className='nav-menu-main' onClick={() => { onMenuSelect('login') }}>Login</span>
              </>
            )}
          </div>
      </div>
    </div>
  );
}

const LogoutButton = ({ onLogout }) => (
    <span className='nav-menu' onClick={onLogout}>Logout</span>
  );

export default Header;
