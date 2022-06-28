import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import renderObj from './utils/test-utils';
import App from './App';
import { movielist } from './mockdata/movielist';

describe("InputField", () => {

    test("snapshot test", () => {
        const { renderWithProvider } = renderObj;
        const view = renderWithProvider(<App />);
        expect(view.asFragment()).toMatchSnapshot();
    });
/* 

*/
    test("search input should update the search list",()=>{
        const { renderWithProvider } = renderObj;
       renderWithProvider(<App />, {
            preloadedState: {
                movie: {
                    movieList: movielist,
                    genres: ['Action','Thriller','Crime drama'],
                    loading: false,
                    searchList: [],
                    keyword: '',
                    genre: '',
                    infoSelect: { id: "0", title: '', genres: [''] }
                }
            }
        });
        const inputEl = screen.getByTestId("inputfield-input");
        expect(inputEl).toBeInTheDocument()
        fireEvent.change(inputEl, {target:{value:"geo"}});
        let movieItemCardEl = screen.getByText("Georgetown");
        expect(movieItemCardEl).toBeInTheDocument();
        fireEvent.change(inputEl, {target:{value:"geg"}});
        movieItemCardEl = screen.queryByText("Georgetown") as any;
        expect(movieItemCardEl).not.toBeInTheDocument();

    })
})