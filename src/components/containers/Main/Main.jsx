/**
 * Main Container Component
 */
import React, { Component } from 'react';
import './Main.css';

// components:
import Calendar from 'components/containers/Calendar';
import Todos from 'components/containers/Todos';
import EventWin from 'components/containers/EventWin';
import api from 'api';

class Main extends Component {
    constructor(props) {
        super(props);
        let now = new Date();
        this.state = {
            currentSelect: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
            isShow: false,
            todos: []
        };
    }


    selectDate = (dateStr) => {
        let data = Object.assign({}, this.state);
        data.currentSelect = dateStr;
        this.setState(data, () => {
            this.getEventsList(this.state.currentSelect);
        });
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
        data = Object.assign(data, {date: this.state.currentSelect});
        let copy = Object.assign({}, this.state);
        copy.todos = copy.todos.concat([data]);
        // console.log(copy.todos);
        this.setState({todos: copy.todos}, () => {
            api.setTodos(this.state.currentSelect, this.state.todos).then(() => {
                this.closeWin();
            });
        });
    }

    getEventsList(date) {
        api.getTodos(date).then((res) => {
            this.setState({todos: res});
        });
    }

    componentDidMount() {
        this.getEventsList(this.state.currentSelect);
    }

    render() {
        return (
            <div className="view-main">
                <Calendar current={this.state.currentSelect}
                    selectDate={this.selectDate}/>

                <div className="event-top-bar">
                    <h2>{this.state.currentSelect}</h2>
                    <button className="btn btn-primary"
                        onClick={() => {this.openWin();}}>
                        Add New Event
                    </button>
                </div>

                <Todos currentList={this.state.todos} />

                <EventWin isShow={this.state.isShow}
                    onClose={this.closeWin}
                    onSubmit={this.submitEvent}/>
            </div>
        );
    }
}

export default Main;
