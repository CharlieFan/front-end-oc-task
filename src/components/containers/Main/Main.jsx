import React, { Component } from 'react';
import './Main.css';

// components:
import Calendar from 'components/containers/Calendar';

class Main extends Component {
    constructor(props) {
        super(props);
        let now = new Date();
        this.state = {
            currentSelect: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
        };
    }


    selectDate = (dateStr) => {
        let data = Object.assign({}, this.state);
        data.currentSelect = dateStr;
        this.setState(data);
    }

    render() {
        return (
            <div>
                <Calendar current={this.state.currentSelect}  selectDate={this.selectDate}/>
                date: {this.state.currentSelect}
            </div>
        );
    }
}

export default Main;
