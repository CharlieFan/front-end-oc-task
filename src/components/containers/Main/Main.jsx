import React, { Component } from 'react';
import './Main.css';

// components:
import Calendar from 'components/containers/Calendar';
import Todos from 'components/containers/Todos';
import EventWin from 'components/containers/EventWin';

class Main extends Component {
    constructor(props) {
        super(props);
        let now = new Date();
        this.state = {
            currentSelect: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
            isShow: false
        };
    }


    selectDate = (dateStr) => {
        let data = Object.assign({}, this.state);
        data.currentSelect = dateStr;
        this.setState(data);
    }

    openWin = () => {
        let data = Object.assign({}, this.state);
        data.isShow = true;
        this.setState(data);
    }

    closeWin = () => {
        let data = Object.assign({}, this.state);
        data.isShow = false;
        this.setState(data);
    }

    submitEvent = (data) => {
        console.log(data);
        this.closeWin();
    }

    render() {
        return (
            <div className="view-main">
                <Calendar current={this.state.currentSelect}  selectDate={this.selectDate}/>

                <div className="event-top-bar">
                    <h2>{this.state.currentSelect}</h2>
                    <button className="btn btn-primary"
                        onClick={() => {this.openWin();}}>
                        Add New Event
                    </button>
                </div>

                <Todos />
                <EventWin isShow={this.state.isShow}
                    onSubmit={this.submitEvent}/>
            </div>
        );
    }
}

export default Main;
