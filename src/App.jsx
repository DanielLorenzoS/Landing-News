import { useEffect, useRef, useState } from 'react'
import './App.css'
import React from 'react';
import NewModel from './models/NewModel';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function App() {

  const [data, setData] = useState([])
  const [listCategory, setListCategory] = useState(['negocios&freshness', 'entretenimiento&freshness', 'economia%20digital&freshness']);
  const [category, setCategory] = useState(['negocios&freshness']);
  const newsContainerRef = useRef(null);

  let getNews = async () => {
    setData([]);
    const url = `https://bing-news-search1.p.rapidapi.com/news/search?q=${category}=Day&textFormat=Raw&safeSearch=Off`;
    const options = {
      method: 'GET',
      headers: {
        'X-BingApis-SDK': 'true',
        'X-RapidAPI-Key': '0e036d1cb1mshac0b72b0f677d61p1c1bdcjsn05933c06349d',
        'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setData(result.value);
      newsContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      console.log(result.value);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getNews();
  }, [category])

  let changeNews = (event) => {
    setCategory(event.target.value);
  }


  return (
    <>
      <div ref={newsContainerRef} className='ref'></div>
      <div className="container">
        <div className="title">
          <p>
            Noticias recientes
          </p>
          <FormControl fullWidth className='formControl'>
            <InputLabel id="demo-simple-select-label">Categoría</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label='Cateogry'
              onChange={changeNews}
              defaultValue={listCategory[0]}
            >
              <MenuItem value={listCategory[0]}>Negocios</MenuItem>
              <MenuItem value={listCategory[1]}>Entretenimiento</MenuItem>
              <MenuItem value={listCategory[2]}>Economía digital</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className='news-container'>
          <div className="cards">

            {
              data.map((item, index) => {
                if (item.image != undefined) {
                  return (
                    <NewModel
                      key={index}
                      urlImage={item.image.thumbnail.contentUrl}
                      title={item.name}
                      content={item.description}
                      date={item.datePublished}
                      urlNew={item.url}
                    />
                  )
                } else {
                  return (
                    <NewModel
                      key={index}
                      urlImage='https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'
                      title={item.name}
                      content={item.description}
                      date={item.datePublished}
                      urlNew={item.url}
                    />
                  )
                }
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default App
