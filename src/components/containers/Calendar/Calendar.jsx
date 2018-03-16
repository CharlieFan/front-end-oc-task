import React ,{ Component } from 'react';
import './Calendar.css';

const TotalScale = 42;

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };
    }

    getFirstDay(year, month) {
        month = month - 1;
        let firstDay = new Date(year, month, 1);
        firstDay = firstDay.getDay();
        console.log('firstday is:', firstDay);
        return firstDay;
    }

    getLastDateOfMonth(year, month) {
        let lastDate = new Date(year, month, 0);
        console.log('total is:', lastDate.getDate());
        return lastDate.getDate();
    }

    generateDayList(firstday, week = 0, totalDays, month, year) {
        let dateArray = [];

        for(let i = 1; i <= totalDays; i++) {
            if (firstday >= 7) {
                week++;
            }
            firstday = firstday % 7;
            let day = {
                day: firstday,
                date: i,
                month: month,
                year: year,
                week: week
            };

            dateArray.push(day);
            firstday++;
        }

        return dateArray;
    }

    initCalendar(year, month) {
        let firstday = this.getFirstDay(year, month);
        let totalDays = this.getLastDateOfMonth(year, month);
        let week = 0;
        let dateArray = this.generateDayList(firstday, week, totalDays, month, year);

        let start = dateArray[0];
        let prepend = [];
        for(let i = 0; i < start.day; i++) {
            prepend.push({
                day: i,
                date: new Date(year, start.month - 1, 1 - start.day + i).getDate(),
                month: start.month - 1,
                year: start.year,
                week: start.week
            });
        }
        
        // console.log(prepend);
        dateArray = prepend.concat(dateArray);
        
        let remain = TotalScale - dateArray.length;
        let end = dateArray[dateArray.length - 1];
        let appendFirstDay = end.day;
        let appendWeek = end.week;
        let append = this.generateDayList(appendFirstDay, appendWeek, remain, month + 1, year);
        
        console.log(append);
        dateArray = dateArray.concat(append);
        console.log(dateArray);
        
        // let dateMatrix = [[],[],[],[],[],[]];
        // dateArray.forEach(day => {
        //     dateMatrix[day.week][day.day] = day;
        // });


        // console.log(dateMatrix);
    }

    render() {
        this.initCalendar(2018, 3);
        return (
            <div className="calendar">
                <div className="cal-header">
                    <div className="arrowbox">&lt;</div>
                    <div className="mon-year-box">
                        <p>March</p>
                        <p>2018</p>
                    </div>
                    <div className="arrowbox">&gt;</div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Su</th>
                            <th>Mo</th>
                            <th>Tu</th>
                            <th>We</th>
                            <th>Th</th>
                            <th>Fr</th>
                            <th>Sa</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>4</td>
                            <td>5</td>
                            <td>6</td>
                            <td>7</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>4</td>
                            <td>5</td>
                            <td>6</td>
                            <td>7</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Calendar;