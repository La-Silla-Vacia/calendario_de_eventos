import React, { Component } from 'react';
import cx from 'classnames';
import BigCalendar from './Components/BigCalendar';
import moment from 'moment';
import events from './events';

import s from './base.css';
const data = require('../data/data.json');

BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

let formats = {
  timeGutterFormat: 'HH:mm',
  eventTimeRangeFormat: ({ start, end }, culture, local) =>
  local.format(start, 'HH:mm', culture) + '-' +
  local.format(end, 'HH:mm', culture),
  dayFormat: 'dddd DD',

  agendaTimeRangeFormat: ({ start, end }, culture, local) =>
  local.format(start, 'HH:mm', culture) + '-' +
  local.format(end, 'HH:mm', culture),
  agendaDateFormat: 'MM-DD' + ' ' + '星期' + 'dd',

  dayRangeHeaderFormat: ({ start, end }, culture, local) =>
  local.format(start, 'MMMM DD', culture) + ' - ' +
  local.format(end, 'DD', culture)

};

const currentDate = moment().format('D MMM YYYY');

export default class Base extends Component {

  constructor() {
    super();

    this.state = {
      data: [],
      view: 'week',
      date: new Date(),
      hidden: false
    };

    this.changeView = this.changeView.bind(this);
  }

  componentWillMount() {
    this.setData();
  }

  setData() {
    let dataExists = true;
    let interactiveData;
    let dataUri;
    try {
      if (calendario_de_eventos_data) {
        dataExists = true;
        interactiveData = calendario_de_eventos_data;
      }
    } catch (e) {
      dataExists = false;
    }

    if (!dataExists) {
      this.setState({ data: data });
    } else {
      if (interactiveData.hidden) {
        this.setState({hidden: true});
        interactiveData.hidden = () => {
          this.setState({hidden: !this.state.hidden});
        };
      }
      if (interactiveData.dataUri) {
        dataUri = interactiveData.dataUri;
        this.fetchData(dataUri);
      }
    }
  }

  fetchData(uri) {
    fetch(uri)
      .then((response) => {
        return response.json()
      }).then((json) => {
      this.setState({ data: json });
    }).catch((ex) => {
      console.log('parsing failed', ex)
    })
  }

  changeView(type) {
    this.setState({ view: type });
  }

  render() {
    const { view, date, hidden } = this.state;
    return (
      <div className={cx(s.container, {[s.hidden]: hidden})}>
        <BigCalendar
          culture="es"
          events={events}
          onView={this.changeView}
          view={view}
          defaultDate={date}
          messages={{
            allDay: 'Todo el dia',
            previous: 'Anterior',
            next: "Siguiente",
            today: 'Hoy',
            month: 'Mes',
            week: 'Semana',
            day: 'Día',
            agenda: 'Agenda',
          }}
          min={new Date(`${currentDate}, 08:30`)}
          max={new Date(`${currentDate}, 20:30`)}
          formats={formats}
        />
      </div>
    )
  }
}
