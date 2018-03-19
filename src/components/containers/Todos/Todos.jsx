/**
 * Todo Component
 * @param currentList array of event list in current date
 */
import React from 'react';
import PropTypes from 'prop-types';
import './Todos.css';


function Todos(props) {
    let sortedList = props.currentList.sort((a, b) => {
        return a.timeStamp - b.timeStamp;
    });
    // console.log(sortedList);
    const lists = sortedList.map((item, key) => {
        return (
            <li key={key}>
                {`${key + 1}) ${item.date} ${item.time} ${item.title}`}
            </li>
        );
    });

    return (
        <ul className="view-todos">
            {
                lists.length > 0 ? lists : <li>No Event Founded</li>
            }
        </ul>
    );
}

Todos.propTypes = {
    currentList: PropTypes.array
};

export default Todos;
