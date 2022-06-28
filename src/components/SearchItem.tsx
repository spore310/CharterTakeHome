import React, {FC, useEffect} from 'react';
import { isPropertyAccessOrQualifiedName } from 'typescript';
import {ResponseAxios} from './inputField';
import style from './SearchItem.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { selectMovie } from '../redux/movieSlice';

const ListItem:FC<ResponseAxios> = ({id, title}) => {
  const dispatch = useDispatch<AppDispatch>();

    const myState = (state: RootState) => state.movie;

    const State = useSelector(myState);
return(<div className={style.container} onClick={()=>dispatch(selectMovie(id))}>
    <div className={style.cardImage}><img 
  src={process.env.PUBLIC_URL + `/movieHeroImages/${id}.jpeg`}
  onError={({ currentTarget }) => {
    currentTarget.onerror = null; // prevents looping
    currentTarget.src=process.env.PUBLIC_URL +"movieHeroImages/defaultImage.jpeg";
  }}
/></div>
    <div className={style.cardWrapper}>{title}</div>
</div>)
}

export default ListItem;