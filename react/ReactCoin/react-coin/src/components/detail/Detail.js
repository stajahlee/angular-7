import React from 'react';
import Loading from '../common/Loading';
import { API_URL } from '../../config';
import { handleResponse, renderChangePercent } from '../../helpers';
import './Detail.css';

class Detail extends React.Component {
  constructor() {
    super();

    this.state = {
      currency: {},
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    const currencyId = this.props.match.params.id;

    this.setState({ loading: true });

    fetch(`${API_URL}/cryptocurrencies/${currencyId}`)
      .then(handleResponse)
      .then((currency) => {
        this.setState({ 
          loading: false,
          error: null,
          currency: currency,
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
          error: error.errorMessage,
        })
      });
  }

  render() {
    const { loading, error, currency } = this.state;

    // Render loading component only if loading state is set to true
    if (loading) {
      return <div className="loading-container"><Loading /></div>
    }

    // Render error message only if error occurred while fetching data
    if (error) {
      return <div className="error">{error}</div>
    }

    return (
      <div className="Detail">
        <h1 className="Detail-heading">
          {currency.name} ({currency.symbol})
        </h1>

        <div className="Detail-container">
          <div className="Detail-item">
            Price <div className="Detail-value">$ {currency.price}</div>
          </div>
          <div className="Detail-item">
            Rank <div className="Detail-value">{currency.rank}</div>
          </div>
          <div className="Detail-item">
            24H Change <div className="Detail-value">{renderChangePercent(currency.percentChange24h)}</div>
          </div>
          <div className="Detail-item">
            <span className="Detail-title">Market cap</span>
            <span className="Detail-dollar">$</span>
            {currency.marketCap}
          </div>
          <div className="Detail-item">
            <span className="Detail-title">24H Volume</span>
            <span className="Detail-dollar">$</span>
            {currency.volume24h}
          </div>
          <div className="Detail-item">
            <span className="Detail-title">Total supply</span>
            {currency.totalSupply}
          </div>                  
        </div>
      </div>
    );
  }
}

export default Detail;