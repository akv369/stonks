import { React, Component } from 'react';
import { Redirect } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './searchSuggestions.module.css';

class searchSuggestions extends Component {
  state = {
    redirect: false,
    link: '',
  };
  render() {
    const showSuggestions = () => {
      let data = this.props.data;
      return (
        <div className="shadow">
          {data.map((stock) => {
            const name =
              stock.name.length > 20
                ? stock.name.slice(0, 18) + '...'
                : stock.name;
            return (
                <button
                  className={styles.suggestionButton}
                  key={stock.code}
                  onClick={() => {
                    this.setState({
                      link: `/stock/${stock.code}`,
                      redirect: true,
                    });
                  }}
                >
                  <span className="float-left">{name}</span>
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
