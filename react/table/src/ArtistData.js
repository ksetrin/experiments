import React from 'react';

export default ({ arstist }) => {
    return (
        <tr>
            <td>{arstist.name}</td>
            <td>{arstist.track}</td>
            <td>{arstist.genre}</td>
            <td>{arstist.year}</td>
        </tr>
    );
};