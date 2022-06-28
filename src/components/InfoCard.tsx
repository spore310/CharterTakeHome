import React, {FC} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import style from './InfoCard.module.css';
const InfoCard:FC =() =>{


    const myState = (state: RootState) => state.movie;

    const State = useSelector(myState);
    const movie =  State.infoSelect;
    return(<div className={style.container}>
        <h2>{movie.title}</h2>
        <img className={style.image}
  src={process.env.PUBLIC_URL + `/movieHeroImages/${movie.id}.jpeg`}
  alt='not found lol'
  onError={({ currentTarget }) => {
    currentTarget.onerror = null; // prevents looping
    currentTarget.src=process.env.PUBLIC_URL +"movieHeroImages/defaultImage.jpeg";
  }}
/>
    <p>ID: {movie.id}</p>
    </div>)
}

export default InfoCard;
