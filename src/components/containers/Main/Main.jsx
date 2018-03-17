import React, { Component } from 'react';
import './Main.css';

// components:
import Calendar from 'components/containers/Calendar';

class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Calendar />
            </div>
        );
    }
}

export default Main;
