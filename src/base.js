import React, { Component } from 'react';
import cx from 'classnames';
import BigCalendar from './Components/BigCalendar';
import moment from 'moment';
import events from './events';

import s from './base.css';
const data = require('../data/data.json');

BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

export default class Base extends Component {

  constructor() {
    super();

    this.state = {
      data: [],
      view: 'week',
      date: new Date()
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
    const { view, date } = this.state;
    return (
      <div className={s.container}>
        <BigCalendar
          culture="es"
          events={events}
          onView={this.changeView}
          view={view}
          defaultDate={date}
        />
      </div>
    )
  }
}