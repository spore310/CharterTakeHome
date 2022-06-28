import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { InputField } from './inputField';
import { Provider } from 'react-redux';
import  renderObj  from "../../utils/test-utils"
import { RootState } from '../../redux/store';
import { initialState } from '../../redux/movieSlice';

describe("InputField", () => {

    test("snapshot test", () => {
        const {renderWithProvider} = renderObj;
        const view =renderWithProvider(<InputField />);
        expect(view.asFragment()).toMatchSnapshot();
    });
    test('renders Input Field', () => {
        const {renderWithProvider} = renderObj;
       renderWithProvider(<InputField />);
        const wrapperEl = screen.getByTestId("inputfield-wrapper");
        expect(wrapperEl).toBeInTheDocument();
    });
    test("should render genre list", () => {
        const {renderWithProvider} = renderObj;
        renderWithProvider(<InputField />, {
            preloadedState: {
                movie: {
                    movieList: [],
                    genres: ['Action','Thriller','Crime drama'],
                    loading: false,
                    searchList: [],
                    keyword: '',
                    genre: '',
                    infoSelect: { id: "0", title: '', genres: [''] }
                }
            }
        });
        const genreBtn = screen.getByText("Genre");
        expect(genreBtn).toBeInTheDocument();
        fireEvent.click(genreBtn);
        const ActionOptionEl =  screen.getByText("Action");
        expect(ActionOptionEl).toBeInTheDocument();
    })

})
