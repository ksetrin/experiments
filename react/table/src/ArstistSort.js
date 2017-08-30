import React, { Component } from 'react';

export default class ArstistSort extends Component {
    sort(direction) {
        const propComparator = (propName) =>
            (a, b) => a[propName] === b[propName] ? 0 : a[propName] < b[propName] ? direction : direction * -1;

        const sorted = this.props.data.sort(propComparator(this.props.sortBy));

        this.props.update({
            data: sorted
        });
    }

    render() {
        return (
            <div >
                <span className="sort" onClick={() => this.sort(1)}>&uarr;</span>
                <span className="sort" onClick={() => this.sort(-1)}>&darr;</span>
            </div>
        )
    }
}