import React, {FC} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import style from './InfoCard.module.css';
const InfoCard:FC =() =>{


    const myState = (state: RootState) => state.movie;

    const State = useSelector(myState);
    const movie =  State.infoSelect;
    return(<>
    {movie?.title?<div className={style.container}>
          <div className={style.title}>{movie.title}</div>
          <img className={style.image}
    src={process.env.PUBLIC_URL + `/movieHeroImages/${movie.id}.jpeg`}
    alt='not found lol'
    onError={({ currentTarget }) => {
      currentTarget.onerror = null; // prevents looping
      currentTarget.src=process.env.PUBLIC_URL +"movieHeroImages/defaultImage.jpeg";
    }}
  />
      <div className={style.id}>ID: {movie.id}</div>
      </div>:null}
    </>)
}

export default InfoCard;
