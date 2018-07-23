import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

export default class Index extends React.Component {
  render() {
    return (
      <div>
        <p className="title">Hello React App</p>
        <style jsx="true">{`
          .title {
            font-size: 36px;
            font-weigth: bold;
          }
        `}</style>
      </div>
    )
  }
}