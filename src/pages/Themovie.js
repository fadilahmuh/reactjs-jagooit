import { useEffect, useState } from 'react';
import {OverlayTrigger, Pagination, Placeholder, Tooltip} from 'react-bootstrap';
import '../Movie.css';

const baseUrl = 'https://api.themoviedb.org/3';
const api_key = 'api_key=4695bcb03bfb7e422fa7fb8340bcddad';
const posterUrl = 'http://image.tmdb.org/t/p/w500/';
const backdropUrl = 'http://image.tmdb.org/t/p/original/';
// let movie_genre = {};

function HeadSection({genres}){
    const [popular, setPopular] = useState([]);
    const [headLoading, setHeadLoading] = useState(true);

    useEffect(() => {
      setHeadLoading(true);

      fetch(`${baseUrl}/movie/popular?${api_key}`)
      .then((res)=>res.json())
      .then(data=>{
        // console.log(data);
        const d = new Date();
        let iter = d.getDate() % 20;
        if (iter > 20) {
          iter = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
        }
        setPopular(data.results[iter]);
        setHeadLoading(false);        
      });
    },[]);

    let selected_genre = genres.filter( i => popular.genre_ids.includes( i.id ) );

    return (
      <>       
        {!headLoading ? 
        <section className="movie-detail"
          style={{            
            background: `linear-gradient(rgba(18, 26, 36, 1), rgba(18, 26, 36, 0.7)), url(${backdropUrl}${popular.backdrop_path}) no-repeat center center / cover`,
          }}>
          <div className="container justify-content-center">
  
            <div className="movie-detail-banner">
              <img src={`${posterUrl}${popular.poster_path}`} alt=""/>   
  
            </div>
  
            <div className="movie-detail-content">
  
              <p className="detail-subtitle">Popular</p>
  
              <h1 className="h1 detail-title text-white">
                <strong className='text-white'>{popular.title}</strong>
              </h1>
  
              <div className="meta-wrapper mb-2">
  
                <div className="ganre-wrapper">
                  {selected_genre.map(gen=>(
                    <a href="#" key={gen.id} className='text-decoration-none'>{gen.name}</a>                
                  ))}
                </div>
                    <br/>              
              </div>
  
              <div className='meta-wrapper'>
                {popular.adult ? 
                <div className="badge-wrapper">
                  <div className="badge badge-fill">PG 18</div>
                </div>
                :
                ' '
                }
  
                <div className="date-time">
                  
                  <div>
                    <i className="theme-icon fa-solid fa-star"></i>
                    <p className='m-0'>{popular.vote_average}</p>
                  </div>    
  
                  <div>
                    <i className="theme-icon fa-regular fa-calendar"></i>
                    <p className='m-0'>{new Date(popular.release_date).getFullYear()}</p>
                  </div>    
  
                </div>
              </div>              
  
              <p className="storyline">
                {popular.overview}
              </p>
          
  
            </div>
  
          </div>
        </section>
        :
        <div className='row g-3 justify-content-center p-5'>
          <div className='col-3 text-center'>
            <Placeholder animation="glow">
              <Placeholder className="ratio ratio-1x1"  xs={12} />
            </Placeholder>
            
          </div>  
          <div className='col-9'>
            <Placeholder animation="glow">
              <Placeholder xs={12} />
              <Placeholder xs={8} />
              <Placeholder xs={8} />
              <Placeholder xs={6} />
            </Placeholder>
          </div>
        </div>
        }
      </>
    );
}

function MovieContainer(){
    const [meta, setMeta] = useState([]);
    const [data, setData] = useState([]);
    const [data_popular, setDataPopular] = useState([]);
    const [popular, setPopular] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`${baseUrl}/movie/now_playing?${api_key}&page=${page}`)
        .then((res)=>res.json())
        .then(data=>{
          // console.log(data);
          setMeta(data);
          setData(data.results);
          setLoading(false);
        })  
    },[page]);

  return(
    <section className="movie-list py-5">
        <div className="container">

          <p className="section-subtitle">Movie List</p>

          <h2 className="h2 section-title text-white mb-4"><strong>Now Playing</strong></h2>

          {
          loading ? 
        <div className='row g-3 justify-content-center'>
          <div className='col-3 text-center'>
            <Placeholder animation="glow">
              <Placeholder className="ratio ratio-1x1"  xs={12} />
            </Placeholder>
            <Placeholder animation="glow">
              <Placeholder xs={7} />
            </Placeholder>
          </div> 
          <div className='col-3 text-center'>
            <Placeholder animation="glow">
              <Placeholder className="ratio ratio-1x1"  xs={12} />
            </Placeholder>
            <Placeholder animation="glow">
              <Placeholder xs={7} />
            </Placeholder>
          </div> 
          <div className='col-3 text-center'>
            <Placeholder animation="glow">
              <Placeholder className="ratio ratio-1x1"  xs={12} />
            </Placeholder>
            <Placeholder animation="glow">
              <Placeholder xs={7} />
            </Placeholder>
          </div> 
          <div className='col-3 text-center'>
            <Placeholder animation="glow">
              <Placeholder className="ratio ratio-1x1"  xs={12} />
            </Placeholder>
            <Placeholder animation="glow">
              <Placeholder xs={7} />
            </Placeholder>
          </div> 
        </div>
        :
        <>
          <ul className="movies-list">
            {data.map(mov => (            
             <MovieCard key={mov.id}  movie={mov}/>
            ))}
          </ul>

        <Paginate key={'np_paginate'} current={meta.page} lastPage={meta.total_pages} onPageChange={setPage}/>
        </>

      }

        </div>
      </section>
  )
}

function MovieCard({movie}){
return(
<li>
  <div className="movie-card">

    <a href="#">
      <figure className="card-banner">
        <img className='w-100' src={movie.poster_path !== null ? `${posterUrl}${movie.poster_path}` : `https://placehold.co/500x750.png`} alt={movie.original_title}/>   
      </figure>
    </a>

    <div className="title-wrapper">
      <a className='text-decoration-none' href="#">
        <h3 className="card-title">{movie.original_title}</h3>
      </a>

      <time >{new Date(movie.release_date).getFullYear()}</time>
    </div>

    <div className="card-meta justify-content-end">
      <div className="rating">
        <i className="theme-icon fa-solid fa-star"></i>
        <data>{movie.vote_average}</data>
      </div>
    </div>

  </div>
</li>
)
}

function Paginate({onPageChange, current, lastPage}){
  const pageNumbers = [];
  if(current - 2 >= 0){
    pageNumbers.push(
      <OverlayTrigger
          key={"tips_page_first"}
          placement="top"
          overlay={
            <Tooltip>
              First
            </Tooltip>
          }
        >
          <Pagination.First key={'page_first'} className='px-1' disabled={current === 1} onClick={()=>onPageChange(1)}/>
        </OverlayTrigger>
    );
  }

  if(current - 1 > 1){
    pageNumbers.push(
      <OverlayTrigger
          key={"tips_page_prev"}
          placement="top"
          overlay={
            <Tooltip>
              Previous
            </Tooltip>
          }
        >
          <Pagination.Prev key={'page_prev'} className='px-1' onClick={()=>onPageChange(current - 1)}/>
        </OverlayTrigger>
    );
  }

  pageNumbers.push(
    <Pagination.Item key={'page_current'} className='px-1' active="true">
      {current}
    </Pagination.Item>
  );

  if(current + 1 < lastPage){
    pageNumbers.push(
      <OverlayTrigger
          key={"tips_page_next"}
          placement="top"
          overlay={
            <Tooltip>
              Next
            </Tooltip>
          }
        >
          <Pagination.Next key={'page_next'} className='px-1' onClick={()=>onPageChange(current + 1)}/>
        </OverlayTrigger>
    );
  }

  if(current + 1 <= lastPage){
    pageNumbers.push(
      <OverlayTrigger
          key={"tips_page_last"}
          placement="top"
          overlay={
            <Tooltip>
              Last
            </Tooltip>
          }
        >
          <Pagination.Last key={'page_last'} className='px-1' disabled={current === lastPage} onClick={()=>onPageChange(lastPage)}/>
        </OverlayTrigger>
    );
  }

  return(
    <div className='col-12 mt-4 d-flex justify-content-center'>
        <Pagination key={'np_paginate_ch'}>
          {pageNumbers}
        </Pagination>
    </div>
  );
}

export default function App() {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
      fetch(`${baseUrl}/genre/movie/list?${api_key}`)
      .then((res)=>res.json())
      .then(data=>{
        setGenres(data.genres);
      });

    },[]);

  return (
    <div className='movie-bg'>       
      <HeadSection genres={genres}/>
      <MovieContainer/>
    </div>
  );
}
