import { React, Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './searchSuggestions.module.css';
// import { Link, Redirect } from 'react-router-dom';

class searchSuggestions extends Component {
  render() {
    let displayData = () => {
      let nameArr = this.props.nameArr;
      let codeArr = this.props.codeArr;
      let j = 0;
      return (
        <div className={styles.Item}>
          {nameArr.map((stockName) => {
            return (
              <a href={'/stock/' + codeArr[j]}>
                <span className="float-left">{stockName}</span>
                <span className="float-right">{codeArr[j++]}</span>
                <br />
                <hr className="text-muted" style={{ margin: '1px' }} />
              </a>
            );
          })}
        </div>
      );
    };
    return (
      <div className={styles.Box}>
        <div className="shadow">{displayData()}</div>
      </div>
    );
  }
}

export default searchSuggestions;
