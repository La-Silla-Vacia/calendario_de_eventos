import PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';
import message from './utils/messages';
import { navigate } from './utils/constants';

import s from '../sidebar.css';

class Toolbar extends React.Component {
  static propTypes = {
    view: PropTypes.string.isRequired,
    views: PropTypes.arrayOf(
      PropTypes.string,
    ).isRequired,
    label: PropTypes.node.isRequired,
    messages: PropTypes.object,
    onNavigate: PropTypes.func.isRequired,
    onViewChange: PropTypes.func.isRequired,
  };

  render() {
    let { messages, label, view } = this.props;

    label = label.replace(/^\s*\w+/, `<span class="${s.month}">$&</span>`);

    messages = message(messages);

    return (
      <aside className={s.container}>

        <div className={s.btn_group}>
        {
          this.viewNamesGroup(messages)
        }
        </div>

        <div className={s.date} dangerouslySetInnerHTML={{__html: label}} />

        <span className={s.btn_group}>
          <button
            type='button'
            onClick={this.navigate.bind(null, navigate.TODAY)}
          >
            {messages.today}
          </button>
          <button
            type='button'
            onClick={this.navigate.bind(null, navigate.PREVIOUS)}
          >
            {messages.previous}
          </button>
          <button
            type='button'
            onClick={this.navigate.bind(null, navigate.NEXT)}
          >
            {messages.next}
          </button>
        </span>
      </aside>
    );
  }

  navigate = (action) => {
    this.props.onNavigate(action)
  };

  view = (view) => {
    this.props.onViewChange(view)
  };

  viewNamesGroup(messages) {
    let viewNames = this.props.views
    const view = this.props.view

    if (viewNames.length > 1) {
      return (
        viewNames.map(name =>
          <button type='button' key={name}
            className={cn(s.changeViewButton, {[s.is_active]: view === name})}
            onClick={this.view.bind(null, name)}
          >
            {messages[name]}
          </button>
        )
      )
    }
  }
}

export default Toolbar;
