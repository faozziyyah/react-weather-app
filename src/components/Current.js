import React, { useState } from 'react'
import styled from "styled-components";
import searchImg from '../assets/Vector.png';
import arrow from '../assets/arrow.png';

const url= "https://api.openweathermap.org/data/2.5/"
const apiKey = '5ee5730275c2be88687659f263c66764'

const Header = styled.div`
width: 90%;
margin: auto;
display: flex;
justify-content: space-between;
align-items: center;
text-align: center;
`;

const ArrowImg = styled.img`
    width: 3%;
`;

const CityBox = styled.div`
    background-color: rgba(255,255,255, 0.1);
    display: flex;
    align-items: center;
    width: 78%;
    margin: auto;
    border-radius: 10px;
    padding-left: 1em;
`;

const CityBar = styled.input`
    background-color: transparent;
    border: none;
    outline: none;
    width: 80%;
    padding-left: 10px;
    ::placeholder,
  ::-webkit-input-placeholder {
    color: #fff;
  }
`;

const Button = styled.button`
    background-color: #8862fc;
    color: #fff;
    border: none;
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 17%;
    padding: 15px 1em;
    border-radius: 15px;
`;

function Current() {

    const [query, setQuery] = useState('lagos');
    const [weather, setWeather] = useState('');


   // eslint-disable-next-line no-lone-blocks
   const search = evt => {
    evt.preventDefault();
    if (evt.key === "Enter") {
        fetch(`${url}weather?q=${query}&units=metric&appid=${apiKey}`)
            .then(res => res.json())
            .then(result => {
                setWeather(result);
                console.log(result);
            })
    }
}

    return (
        <div>
            <Header>
                <ArrowImg src={arrow} alt={searchImg} />
                <CityBox className="search-box">
                    <img src={searchImg} alt={searchImg} />
                    <CityBar 
                        type="text" 
                        className="" 
                        placeholder="Check for the weather in a location"
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={search}
                    />
                    <Button type="button" className="btn" onClick={search}>Search</Button>
                </CityBox>
            </Header>
            
            <h3 className=""> {weather.name}</h3>
        </div>
    )
}

export default Current
