import React ,{ Component } from 'react';
import PropTypes from 'prop-types';
import './Todos.css';

class Todos extends Component {
    render() {
        return (
            <ul className="view-todos">
                <li>
                    Februray 2018 11:00 - Eat a burito oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
                </li>
                <li>
                    Februray 2018 11:00 - Eat a burito
                </li>
                <li>
                    Februray 2018 11:00 - Eat a burito
                </li>
            </ul>
        );
    }
}

Todos.propTypes = {
    currentList: PropTypes.array
};

export default Todos;
