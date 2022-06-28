import { listenerCancelled } from '@reduxjs/toolkit/dist/listenerMiddleware/exceptions';
import React, {FC, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import {hydrateList} from '../redux/movieSlice';
import { ResponseAxios } from './inputField';
import style from './searchResult.module.css';
const SearchResult:FC = () =>{
    const dispatch = useDispatch<AppDispatch>();

    const myState = (state: RootState) => state.movie;

    const State = useSelector(myState);

    const [myList, getList] = useState<ResponseAxios[]>([]);

     useEffect(()=>{
        let temp = [...State.movieList];
        if(State.genre){
        temp = temp.filter((ele:ResponseAxios, index:number)=>{
            return ele.genres.includes(State.genre)
        })
        }
        if(State.keyword){
            temp = temp.filter((ele:ResponseAxios)=>ele.title.includes(State.keyword))
        }
        getList(temp);
     },[State.genre,State.keyword]);

     useEffect(()=>{
        
            dispatch(hydrateList())
            getList(State.movieList)
     },[]);
    return(<div className={style.container}>
        <ul>
            {myList.length>0 && myList.map((ele:ResponseAxios, index:number)=><li key={index}>{ele.title}</li>)}
        </ul>
    </div>)
} 

export default SearchResult;