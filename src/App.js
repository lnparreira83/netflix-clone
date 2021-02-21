import React,{useEffect, useState} from 'react';
import Tmdb from './Tmdb.js';
import MovieRow from './components/MovieRow';
import './App.css';
import FeaturedMovie from './components/FeaturedMovie'
import Header from './components/Header'

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect (() => {
    const loadAll = async () => {
      //Pegando a lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //Pegando o featured filme em destaque
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    }

    loadAll();
  }, []);

  useEffect(()=>{
    const scrolListener = () => {
        if(window.scrollY > 10){
          setBlackHeader(true);
        } else {
          setBlackHeader(false);
        }
    }
    window.addEventListener('scroll', scrolListener);

    return () => {
      window.removeEventListener('scroll', scrolListener);
    }
  })
  return (
  <div className="page">
    <Header black={blackHeader}/>

    {featuredData &&
    <FeaturedMovie item={featuredData} />
      }

    <section className="lists">
      {movieList.map((item, key)=> (
       <div>
          <MovieRow key={key} title={item.title} items={item.items} />
       </div>
      ))}
    </section>

    <footer>
      Feito com <span role="img" aria-label="coração">❤️</span> por LNP<br />
      Direitos de imagem para Netflix<br/>
      Dados pegos do site Themoviedb.org
    </footer>
  
    {movieList.length <= 0 &&
    <div className="loading">
        <img src="https://i.pinimg.com/originals/f9/0f/76/f90f7689233948005f465d98ead56d44.gif" alt="Carregando" />
    </div>
    }
  </div>
  );
}