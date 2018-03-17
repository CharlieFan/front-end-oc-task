import React ,{ Component } from 'react';
import './Calendar.css';

const TotalScale = 42;

class Calendar extends Component {
    constructor(props) {
        super(props);
        let now = new Date();
        this.state = {
            date: now,
            selectedDate: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}}`
        };
    }

    getFirstDay(year, month) {
        month = month - 1;
        let firstDay = new Date(year, month, 1);
        firstDay = firstDay.getDay();
        return firstDay;
    }

    getLastDateOfMonth(year, month) {
        let lastDate = new Date(year, month, 0);
        return lastDate.getDate();
    }

    checkCurrent(year, month, date) {
        let current = new Date();
        let currentDate = current.getDate();
        let currentMonth = current.getMonth() + 1;
        let currentYear = current.getFullYear();
        if (year === currentYear && month === currentMonth && date === currentDate) {
            return true;
        } else {
            return false;
        }
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
                week: week,
                dateStr: `${year}-${month}-${i}`,
                isCurrent: this.checkCurrent(year, month, i)
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
            let date = new Date(year, start.month - 1, 1 - start.day + i).getDate();
            prepend.push({
                day: i,
                date: date,
                month: start.month - 1,
                year: start.year,
                week: start.week,
                dateStr: `${start.year}-${start.month - 1}-${date}`,
                isCurrent: this.checkCurrent(start.year, start.month - 1, date)
            });
        }

        // console.log(prepend);
        dateArray = prepend.concat(dateArray);
        // console.log(dateArray);

        let remain = TotalScale - dateArray.length;
        let end = dateArray[dateArray.length - 1];
        let appendFirstDay = end.day + 1;
        let appendWeek = end.week;
        let append = this.generateDayList(appendFirstDay, appendWeek, remain, month + 1, year);

        // console.log(append);
        dateArray = dateArray.concat(append);
        // console.log(dateArray);

        let dateMatrix = [[],[],[],[],[],[]];
        dateArray.forEach(day => {
            dateMatrix[day.week][day.day] = day;
        });

        // console.log(dateMatrix);

        return dateMatrix.map((dateItem, key) =>
            <tr key={key}>
                {
                    dateItem.map((item, key) => {
                        return (
                            <td key={key}
                                className={
                                    `${item.dateStr === this.state.selectedDate ? 'active' : ''} ${item.isCurrent ? 'current' : ''}`
                                }
                                onClick={() => { this.selectDate(item);}}>{item.date}</td>
                        );
                    })
                }
            </tr>
        );
    }

    selectDate(dateObj) {
        // console.log(dateObj.dateStr);
        let data = Object.assign({}, this.state);
        let selectDate = `${dateObj.year}-${dateObj.month}-${dateObj.date}`;
        data.selectedDate = selectDate;
        this.setState(data);
    }

    render() {
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
                        {
                            this.initCalendar(this.state.date.getFullYear(), this.state.date.getMonth() + 1)
                        }
                    </tbody>
                </table>

            </div>
        );
    }
}

export default Calendar;
