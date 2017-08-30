import React, { Component } from 'react';
import ArtistData from './ArtistData';
import ArstistSort from './ArstistSort';

export default class ArtistList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            count: 10, // entries per page
            page: 0, // selected page
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            page: 0,
        });
    }

    setCount(cnt) {
        this.setState({
            count: cnt,
            page: 0,
        });
    }

    setPage(page) {
        this.setState({
            page: page,
        });
    }

    render() {
        const offset = this.state.count * this.state.page;
        const offsetPage = this.state.count * (this.state.page + 1);
        const offsetFix = offsetPage > this.props.data.length ? this.props.data.length : offsetPage;
        const arstists = this.props.data.slice(offset, offsetFix).map((arstist, index) => {
            return (<ArtistData arstist={arstist} key={`arstist-${index}`} />);
        });

        const pagesTotal = parseInt(this.props.data.length / this.state.count, 10) + (((this.props.data.length % this.state.count) > 0) ? 1 : 0);
        const pages = [];
        for (let i = 0; i < pagesTotal; i++) {
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
                        <div className={this.state.count === 2 ? 'pagination-count active' : 'pagination-count'} onClick={() => this.setCount(2)}>2</div>
                        <div className={this.state.count === 5 ? 'pagination-count active' : 'pagination-count'} onClick={() => this.setCount(5)}>5</div>
                        <div className={this.state.count === 10 ? 'pagination-count active' : 'pagination-count'} onClick={() => this.setCount(10)}>10</div>
                        <div className={this.state.count === 100 ? 'pagination-count active' : 'pagination-count'} onClick={() => this.setCount(100)}>100</div>
                    </div>
                </div>
            </div>
        );
    }


};