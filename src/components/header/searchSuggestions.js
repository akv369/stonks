import { React, Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './searchSuggestions.module.css';
import { Link } from 'react-router-dom';

class searchSuggestions extends Component {
  state = {
    show: true,
  };
  render() {
    let displayData = () => {
      let nameArr = this.props.nameArr;
      let codeArr = this.props.codeArr;
      let j = 0;
      return (
        <div className={styles.Item}>
          {nameArr.map((stockName) => {
            return (
              <Link
                to={'/stock/' + codeArr[j]}
                // onClick={() => this.props.clicked(codeArr[j+1])}
              >
                <span className="float-left">{stockName}</span>
                <span className="float-right">{codeArr[j++]}</span>
                <br />
                <hr className="text-muted" style={{ margin: '1px' }} />
              </Link>
            );
          })}
        </div>
      );
    };
    const showSuggestions = () => {
      if (this.state.show) return <div className="shadow">{displayData()}</div>;
    };
    return <div className={styles.Box}>{showSuggestions()}</div>;
  }
}

export default searchSuggestions;
