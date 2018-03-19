import React from 'react';
import PropTypes from 'prop-types';
import './Todos.css';

function Todos(props) {
    let sortedList = props.currentList.sort((a, b) => {
        return a.timeStamp - b.timeStamp;
    });
    // console.log(sortedList);

    return (
        <ul className="view-todos">
            {
                sortedList.map((item, key) => {
                    return (
                        <li key={key}>
                            {`${key + 1}) ${item.date} ${item.time} ${item.title}`}
                        </li>
                    );
                })
            }
        </ul>
    );
}

Todos.propTypes = {
    currentList: PropTypes.array
};

export default Todos;
