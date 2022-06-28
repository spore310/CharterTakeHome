import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseAxios } from "../components/inputField";
import axios from 'axios';

export const hydrateList = createAsyncThunk('movie/hydrateList', async() => {
    
    const {data:{data}} = await axios.get('https://code-challenge.spectrumtoolbox.com/api/movies',{headers:{
                'Authorization': 'Api-Key q3MNxtfep8Gt'
            }});
    const response = data as ResponseAxios;
    return response
})
interface initVal {
    movieList: ResponseAxios[];
    genres:string[];
    loading:boolean;
    searchList:ResponseAxios[];
    keyword: string;
    genre:string;
}
const initialState:initVal = { 
    movieList:[],
    genres:[''],
    loading:false,
    searchList:[],
    keyword:'',
    genre:''
} 
const movie = createSlice({
    name:'movie',
    initialState,
    reducers:{
        filterList:(state,action)=>{
            state.genre = action.payload;
        },
        filterTitle:(state,action)=>{
            state.keyword = action.payload;
          
        }
    },
    extraReducers:{
        [hydrateList.pending as any]:(state,action) => {
            state.loading = true;
            console.log('loading...');
        },
        [hydrateList.fulfilled as any]:(state,action) => {
            state.loading = false;
            console.log('complete!');
            const genres:string[] = action.payload.map((ele:ResponseAxios)=>ele.genres).join(',').split(',');

            state.genres = genres.filter((value,index,arr)=>arr.indexOf(value) === index);
            state.movieList = action.payload;
            state.searchList = action.payload;
        },
        [hydrateList.rejected as any]:(state,action) => {
            state.loading = false;
            console.log('failed');
        },
    }
})

export const { filterList, filterTitle } = movie.actions;
export default movie.reducer;