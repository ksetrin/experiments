import React, { Component } from 'react';
import ArtistData from './ArtistData';
import ArstistSort from './ArstistSort';

export default class ArtistList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            count: 10, // кол-во строк в выводе
            page: 0, // текущая выбраная страница
            pages: 1, // всего страниц
        };
    }

    setCount(cnt) {
        this.setState({
            count: cnt,
            page: 0,
            pages: parseInt(this.props.data.length / cnt, 10) + (((this.props.data.length % cnt) > 0) ? 1 : 0)
        });
    }

    setPage(page) {
        this.setState({
            page: page,
        });
    }

    render() {
        const offset = this.state.count * this.state.page;
        const countAll = this.state.count * (this.state.page + 1);

        const offsetDO = countAll > this.props.data.length ? this.props.data.length : countAll;

        const arstists = this.props.data.slice(offset, offsetDO).map((arstist, index) => {
            return (<ArtistData arstist={arstist} key={`arstist-${index}`} />);
        });


        const pages = [];
        for (let i = 0; i < this.state.pages; i++) {
            pages.push(<div className="pagination-pages-el" onClick={() => this.setPage(i)} key={`pages-${i}`}>{i+1}</div>)
        }

        return (
            <div>
                <table className="arstists">
                    <thead>
                    <tr>
                        <th>
                            arstist
                            <ArstistSort sortBy="name" data={this.props.data} update={this.props.update} />
                        </th>
                        <th>
                            track
                            <ArstistSort sortBy="track" data={this.props.data} update={this.props.update} />
                        </th>
                        <th>
                            genre
                            <ArstistSort sortBy="genre" data={this.props.data} update={this.props.update} />
                        </th>
                        <th>
                            year
                            <ArstistSort sortBy="year" data={this.props.data} update={this.props.update} />
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                        {arstists}
                    </tbody>
                </table>
                <div className="pagination">

                    <div className="pagination-pages">
                        {pages}
                    </div>
                    <div>
                        <div className="pagination-count" onClick={() => this.setCount(2)}>2</div>
                        <div className="pagination-count" onClick={() => this.setCount(5)}>5</div>
                        <div className="pagination-count" onClick={() => this.setCount(10)}>10</div>
                    </div>
                </div>
            </div>
        );
    }


};