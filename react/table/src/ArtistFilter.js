import React, { Component } from 'react';

export default class ArtistFilter extends Component {
    constructor(props) {
        super(props);
        this.filter = {
            name: '',
            genre: '',
            year: '',
        };
    }

    doFilter(field, e) {
        this.filter[field] = e.target.value;
        const arstists = this.props.initialData;
        const filteredArstists = arstists.filter(user => {
            let flag = true;
            for (let i in this.filter) {
                if (this.filter[i].length) {
                    flag = user[i] === this.filter[i];
                }
                if (flag === false) return flag;
            }
            return flag;
        });
        this.props.update({
            data: filteredArstists
        });
    }

    render() {
        return (
            <div className="filter">
                <div className="filter-title">Arstist</div>
                <select onChange={(e) => this.doFilter('name', e)}>
                    <option value="">All</option>
                    <option value="Robbie Williams">Robbie Williams</option>
                    <option value="Linkin Park">Linkin Park</option>
                    <option value="Ozzy Osbourne">Ozzy Osbourne</option>
                </select>
                <div className="filter-title">Genre</div>
                <select onChange={(e) => this.doFilter('genre', e)}>
                    <option value="">All</option>
                    <option value="Alternative rock">Alternative rock</option>
                    <option value="Pop rock">Pop rock</option>
                    <option value="Soft rock">Soft rock</option>
                    <option value="Heavy metal">Heavy metal</option>
                    <option value="Blues rock">Blues rock</option>
                    <option value="Hard rock">Hard rock</option>
                </select>
                <div className="filter-title">Year</div>
                <select onChange={(e) => this.doFilter('year', e)}>
                    <option value="">All</option>
                    <option value="1980">1980</option>
                    <option value="1981">1981</option>
                    <option value="1991">1991</option>
                    <option value="2001">2001</option>
                    <option value="2003">2003</option>
                    <option value="2010">2010</option>
                    <option value="2012">2012</option>
                    <option value="2014">2014</option>
                </select>
            </div>
        )
    }
}