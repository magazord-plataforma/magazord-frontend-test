import React,{ Component } from 'react';
import axios from 'axios';
import Header from '../header/Header.js';
import './Profiles.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";






class GithubProfile extends Component {
  state = {
    profile: {},
    repos: [],
    followers: [],
    showRepos: false,
    showStarred: false,
    showSelectMenu: false,
    starred: [],
  };

  componentDidMount() {
    
    const username = this.props.username;
    //extrair nome e foto via api do git
    axios
      .get(`https://api.github.com/users/${username}`)
      .then(res => {
        this.setState({ profile: res.data });
      });
      //extrair dados via api do git
    axios
      .get(`https://api.github.com/users/${username}/repos`)
      .then(res => {
        this.setState({ repos: res.data });
      });

        //extrair seguidores
    axios
      .get(`https://api.github.com/users/${username}/followers`)
      .then(res => {
        this.setState({ followers: res.data });
      });


      //extrair favoritos
      axios
      .get(`https://api.github.com/users/${username}/starred`)
      .then(res => {
        this.setState({ starred: res.data });
      });
      
    
  }
    //evento de clicar no botao repositorios
  toggleRepos = () => {
    this.setState({ showRepos: !this.state.showRepos, showStarred: false });
  };
    
    //evento de clicar no botao starred
  toggleStarred = () => {
    this.setState({ showStarred: !this.state.showStarred, showRepos: false });
    this.getStarred();
  }
        //evento de clicar no botao type
  handleDropdownButtonClick = () => {
    this.setState(prevState => ({
      showSelectMenu: !prevState.showSelectMenu
    }));
  };

  handleDropdownButtonClick2 = () => {
    this.setState(prevState => ({
      showSelectMenu2: !prevState.showSelectMenu2
    }));
  };


  render() {
    const { profile, repos, followers, showRepos ,  starred } = this.state;
    return (
      <div className="Profile">
        <Header />
        
        <div className="Profile-main">
             {/*Foto do perfil*/} 
          <img src={profile.avatar_url} alt="Profile picture" className="Profile-main-img"/>
               {/*nome do perfil*/} 
          <h1 className="Profile-main-h1">{profile.name}</h1>        
          <p className="Profile-main-p">{profile.bio}</p>
             {/*seguidores*/} 
          <div className="Profile-followers">
            <i className="fas fa-users"></i>
            <span className="Profile-followers-count">{followers.length}</span>
          </div>
        </div>
           {/*card com informaçoes do perfil*/} 
        <div className="vcard">
        <div className="icon">
          {/*icone link*/}
        <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" 
        data-view-component="true" class="octicon octicon-link"> <path fill-rule="evenodd" 
        d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path> </svg>
              {/*icone localização*/}
      <svg className="octicon octicon-location" viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true">
      <path fill-rule="evenodd" d="M6 0C2.69 0 0 2.5 0 5.5 0 10.02 6 16 6 16s6-5.98 6-10.5C12 2.5 9.31 0 6 0zm0 14.55C4.14 12.52 1 8.44 1 5.5 1 3.02 3.25 1 6 1c1.34 0 2.61.48 3.56 1.36.92.86 1.44 1.97 1.44 3.14 0 2.94-3.14 7.02-5 9.05zM8 5.5c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z"></path>
      </svg>
    </div>  
      <div className="vcard-details">
        <p>{profile.bio}</p>
        <p>{profile.location}</p>
        <p>
            <a href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </p>

        <p>{profile.company}</p>
        <p> 
          <a href={profile.url}>
            {profile.url}
          </a>
        </p>
      </div>
    </div>
        <div className="Profile-repos">
                {/*botao repositorios */} 
          <button className="Profile-repos-button" onClick={this.toggleRepos}>Repositórios</button>
               
                {/*botao starred */} 
          <button className="Profile-starred-button" onClick={this.toggleStarred}>Starred</button>
              
              {/*botao type */} 
          <button class="dropdown-button" onClick={this.handleDropdownButtonClick}>
            <span> <FontAwesomeIcon className='icondown'icon={faCaretDown}/> Type </span>
          </button>
             
              {/*botao language */} 
          <button class="dropdown-button2"onClick={this.handleDropdownButtonClick2}>
            <span> <FontAwesomeIcon className='icondown'icon={faCaretDown}/> Language </span>
          </button>


               {/*barra de pesquisa*/}  

          <div className="Profile-search">
                     
          <form onSubmit={this.handleSubmit}>
          <input className='Profile-search-input' value={this.state.query} onChange={this.handleChange} />
          <button className='pesq' type="submit">.</button>
        </form>
        
          </div>
          
          {this.state.showStarred && (
  <div className="Profile-starred">
    {starred.map(star => (
      <div key={star.id} className="Profile-star-block">
        <h3 className="Profile-star-title">
          <a href={star.html_url}>{star.name}</a>
        </h3>
        <p className="Profile-star-description">{star.description}</p>
        
      </div>
    ))}
  </div>
)}        

            {/*chamada do botao type para apresentar a tabela*/}               
          {this.state.showSelectMenu && (
              <div className='menu-lista'>
              <table className='tabela'>
  <tr>
    <th>Select Type</th>
  </tr>
  <tr>
    <td>All</td>
  </tr>
  <tr>
    <td>Sources</td>
  </tr>
  <tr>
    <td>Forks</td>
  </tr>
  <tr>
    <td>Archived</td>
  </tr>
  <tr>
    <td>Mirrors</td>
  </tr>
  <tr>
    <td>Templates</td>
  </tr>
</table>
            </div>
          )} 
           {/*evendo de clicar no botao language*/} 
          {this.state.showSelectMenu2 && (
              <div className='menu-languages'>
              <table className='tabela2'>
  <tr>
    <th>Select language</th>
  </tr>
  <tr>
    <td>All</td>
  </tr>
  <tr>
    <td>HTML</td>
  </tr>
  <tr>
    <td>JavaScript</td>
  </tr>
  <tr>
    <td>C#</td>
  </tr>
  <tr>
    <td>TypeScript</td>
  </tr>
  <tr>
    <td>Shell</td>
  </tr>
</table>
            </div>
          )} 

          {showRepos && (
            <div className="Profile-repos-content">
              
              {repos.map(repo => (
                <div key={repo.id} className="Profile-repo-block">
                  <h3 className="Profile-repo-title">
                    <a href={repo.html_url}>{repo.name}</a>
                  </h3>
                  
                  <p className="Profile-repo-description">{repo.description}</p>
                  <p className="Profile-repo-language">{repo.language}</p>
                  <p className="Profile-repo-meta"></p>
                  <i className="octicon octicon-star"></i>
                  <img src={`https://github.githubassets.com/images/icons/emoji/unicode/2b50.png`} class="octicon octicon-star"/> 
                  <span className="Profile-repo-star-count">{repo.stargazers_count}</span>

                  <i className="octicon octicon-repo-forked"></i>
                    <img src="https://github.githubassets.com/images/icons/emoji/unicode/1f466.png"  className="Profile-repo-fork-icon"/>
                    <span className="Profile-repo-fork-count">{repo.forks_count}</span>
                   
     
    
                </div>
              ))}
            </div>
          )}
         
        </div>
      </div>
    );
  }
}

export default GithubProfile;