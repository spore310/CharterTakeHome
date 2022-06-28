import React, { FC } from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hydrateList, filterList, filterTitle } from '../../redux/movieSlice';
import { RootState, AppDispatch } from '../../redux/store';

import style from './inputField.module.css';
export interface ResponseAxios {
    id: string;
    title: string;
    genres: string[]
}
export const InputField: FC<any> = () => {
    const [input, setInput] = useState<string>("");

    const [showAuto, toogleAuto] = useState<boolean>(false);

    const dispatch = useDispatch<AppDispatch>();

    const myState = (state: RootState) => state.movie;

    const State = useSelector(myState);


    

    useEffect(()=>{
        dispatch(filterTitle(input));
       /*  console.log('input', input);
        let temp = [...State.movieList];
        if(State.genre){
        temp = temp.filter((ele, index, arr)=>{
            return ele.genres.includes(State.genre)
        })
        }
        if(State.keyword){
            temp = temp.filter((ele)=>ele.title.includes(State.keyword))
        }
        console.log('state', temp) */
    },[State.genre,State.keyword, input])



    const handleChange = (e: any) => {
        setInput(e.target.value);
    };

    return (<div className={style.wrapper} data-testid="inputfield-wrapper">
       
       
        <div className={style.inputWrapper}>
            
            <input type='text' value={input} onChange={handleChange} data-testid="inputfield-input"/>
           
            <div className={style.selectorWrapper}>
                <button className={style.genreButton} onClick={()=>toogleAuto(prev=>!prev)}>Genre</button>
                <div className={style.auto}>
                    {showAuto && State.genres && State.genres.map((ele)=>{
                        return <div className={style.autoItem} onClick={()=>{
                            dispatch(filterList(ele))
                            toogleAuto(false);
                        }}>{ele}</div>}
                        )}
                </div>
            {State.genre && <button className={style.genreCancel} onClick={()=>{dispatch(filterList(''))}}>Clear Genre</button>}
            </div>
        </div>
    </div>)
}
