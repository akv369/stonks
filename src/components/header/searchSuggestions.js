import { React, Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './searchSuggestions.module.css';
import { Redirect } from 'react-router-dom';

class searchSuggestions extends Component {
  state = {
    redirect: false,
    link: '',
  };
  render() {
    const showSuggestions = () => {
      const data = this.props.data;
      return (
        <div className="shadow">
          {data.map((stock) => {
            return (
              <button
                key={stock.code}
                className={styles.suggestionButton}
                onClick={() => {
                  this.setState({
                    redirect: true,
                    link: `/stock/${stock.code}`,
                  });
                }}
              >
                <span className="float-left">{stock.name}</span>
                <span className="float-right">{stock.code}</span>
                <br />
                <hr className="text-muted" style={{ margin: '1px' }} />
              </button>
            );
          })}
        </div>
      );
    };
    const redirectingToStock = () => {
      if (this.state.link !== '' && this.state.redirect) {
        this.setState({ redirect: false });
        return <Redirect to={this.state.link} />;
      }
    };
    return (
      <div className={styles.Box}>
        {redirectingToStock()}
        {showSuggestions()}
      </div>
    );
  }
}

export default searchSuggestions;
