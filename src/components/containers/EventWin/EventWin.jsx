import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './EventWin.css';

class EventWin extends Component {
    state = {
        hour: null,
        minute: null,
        title: null
    }

    handleChange = (event) => {
        let {name, value} = event.target;
        switch(name) {
            case 'hour':
                this.setState({ hour: value });
                break;
            case 'minute':
                this.setState({ minute: value });
                break;
            case 'title':
                this.setState({ title: value });
                break;
            default:
                return false;
        }
    }

    handleSubmit(data) {
        let {minute, hour, title} = data;
        let timeStamp = hour * 60 + minute;
        this.props.onSubmit({
            timeStamp,
            hour,
            minute,
            title
        });
    }

    render() {
        return (
            <div>
                {
                    this.props.isShow ?
                        <div className="view-event-win">
                            <form className="w-100-p"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    this.handleSubmit(this.state);
                                }}>
                                <div className="flex-row w-100-p m-b-6">
                                    <input type="number"
                                        name="hour"
                                        className="flex-1 m-r-3"
                                        max="24"
                                        min="0"
                                        required
                                        placeholder="Hour(24-hour)"
                                        onChange={this.handleChange}/>
                                    <input type="number"
                                        name="minute"
                                        className="flex-1 m-l-3"
                                        max="59"
                                        min="0"
                                        required
                                        placeholder="Minute"
                                        onChange={this.handleChange}/>
                                </div>

                                <div className="flex-row w-100-p m-b-6">
                                    <input type="text"
                                        name="title"
                                        className="w-100-p"
                                        minLength="1"
                                        maxLength="50"
                                        required
                                        placeholder="Event Name"
                                        onChange={this.handleChange}/>
                                </div>
                                <button className="btn btn-primary m-l-3" type="submit">
                                    Save
                                </button>
                                <button className="btn m-l-3" type="button" onClick={this.props.onClose}>
                                    Cancel
                                </button>
                            </form>
                        </div>
                        :
                        ''
                }

            </div>
        );
    }
}

EventWin.propTypes = {
    isShow: PropTypes.bool,
    onSubmit: PropTypes.func,
    onClose: PropTypes.func
};

export default EventWin;
