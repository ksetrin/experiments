import React, { Component } from 'react';
import ArtistList from './ArtistList';
import ArtistFilter from './ArtistFilter';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.initialData = [
            {id: 1, name: 'Robbie Williams', track: '3 Lions 2010', genre: 'Pop rock', year: '2010'},
            {id: 2, name: 'Robbie Williams', track: 'A Man for All Seasons', genre: 'Pop rock', year: '2003'},
            {id: 3, name: 'Robbie Williams', track: 'Carry On', genre: 'Soft rock', year: '2012'},
            {id: 4, name: 'Robbie Williams', track: 'We Are the Champions', genre: 'Soft rock', year: '2001'},
            {id: 5, name: 'Linkin Park', track: 'All For Nothing', genre: 'Alternative rock', year: '2014'},
            {id: 6, name: 'Linkin Park', track: 'Final Masquerade', genre: 'Alternative rock', year: '2014'},
            {id: 7, name: 'Linkin Park', track: 'Numb', genre: 'Alternative metal', year: '2003'},
            {id: 8, name: 'Ozzy Osbourne', track: 'Mr. Crowley', genre: 'Heavy metal', year: '1980'},
            {id: 9, name: 'Ozzy Osbourne', track: 'I Don’t Know', genre: 'Blues rock', year: '1981'},
            {id: 10, name: 'Ozzy Osbourne', track: 'Mama, I’m Coming Home', genre: 'Hard rock', year: '1991'},
            {id: 11, name: 'Ozzy Osbourne', track: 'Gets Me Through', genre: 'Hard rock', year: '2001'},
        ];

        this.state = {
            data: this.initialData
        };
    }
    updateData(config) {
        this.setState(config);
    }

    render() {
        return (
            <div>
                <div className="arstists-wrap">
                    <h3>Playlist</h3>
                    <ArtistList data={this.state.data} update={this.updateData.bind(this)} />
                </div>
                <div className="filter-wrap">
                    <h3>Filter</h3>
                    <ArtistFilter initialData={this.initialData} update={this.updateData.bind(this)} />
                </div>
            </div>
        );
    }
}

export default App;
