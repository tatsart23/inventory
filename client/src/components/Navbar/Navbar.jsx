import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Auth/AuthContext'; // Adjust the path if necessary
import "./Navbar.css";
import HomeIcon from '@mui/icons-material/Home';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import KebabDiningIcon from '@mui/icons-material/KebabDining';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

const Nav = () => {
  const navigate = useNavigate();
  const { loggedIn, logout } = useContext(AuthContext);

  const navItems = loggedIn
    ? [
        { path: '/', label: 'Home', Icon: HomeIcon },
        { path: '/pakkaamo', label: 'Pakkaamo', Icon: SupervisedUserCircleIcon },
        { path: '/kebab', label: 'Kebabkoppi', Icon: KebabDiningIcon },
        { path: '/admin', label: 'Admin', Icon: AdminPanelSettingsIcon },
        { path: '/signup', label: 'Register', Icon: LoginIcon }
      ]
    : [];

  const authItems = loggedIn
    ? [{ path:'/logout', label: 'Logout', Icon: LogoutIcon, action: logout }]
    : [
        
        { path: '/login', label: 'Login', Icon: LoginIcon },
      ];

  return (
    <div className="nav">
      <ul>
        {navItems.map(({ path, label, Icon }) => (
          <div key={path} className='nav-btn' onClick={() => navigate(path)}>
            <Icon />
            <li><a href={path}>{label}</a></li>
          </div>
        ))}
        {authItems.map(({ path, label, Icon, action }) => (
          <div key={label} className='nav-btn' onClick={action ? action : () => navigate(path)}>
            <Icon />
            <li><a href={path || '#'}>{label}</a></li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Nav;
