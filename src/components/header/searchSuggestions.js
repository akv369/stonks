import { React, Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './searchSuggestions.module.css';
import { Link } from 'react-router-dom';

class searchSuggestions extends Component {
  state = {
    redirect: false,
    link: '',
  };
  render() {
    const showSuggestions = () => {
      let data = this.props.data,
        name;
      return (
        <div className="shadow">
          {data.map((stock) => {
            const name =
              stock.name.length > 20
                ? stock.name.slice(0, 18) + '...'
                : stock.name;
            return (
              <Link to={this.state.link} key={stock.code}>
                <button
                  className={styles.suggestionButton}
                  onClick={() => {
                    this.setState({
                      redirect: true,
                      link: `/stock/${stock.code}`,
                    });
                  }}
                >
                  <span className="float-left">{name}</span>
                  <span className="float-right">{stock.code}</span>
                  <br />
                  <hr className="text-muted" style={{ margin: '1px' }} />
                </button>
              </Link>
            );
          })}
        </div>
      );
    };
    const redirectingToStock = () => {
      // if (this.state.link !== '' && this.state.redirect) {
      //   this.setState({ redirect: false });
      //   return <Link to={this.state.link} />;
      // }
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
