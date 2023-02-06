import React from 'react';
import './Header.css';

const Header = () => (
  <header className="Header">
    <nav>
      <ul>
      <li>
  <a>
    <img src="./imagens/logo.svg" />
  </a>
</li>
<li>
  <a>
    <img src="./imagens/logo2.svg" />
  </a>
</li>
        <li className='barra'><a>/</a></li>
        <li className='profile'>
          <a href="https://github.com/rudierimachado">Profile</a>
</li>
      </ul>
    </nav>
  </header>
);

export default Header;
