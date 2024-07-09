// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import CrytocurrenciesList from '../CryptocurrenciesList'

import './index.css'

const apiUrl = 'https://apis.ccbp.in/crypto-currency-converter'

class CryptocurrencyTracker extends Component {
  state = {
    cryptocurrenciesData: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getCrytocurrencies()
  }

  getCrytocurrencies = async () => {
    const response = await fetch(apiUrl)
    const fetchedDate = await response.json()

    this.setState({
      cryptocurrenciesData: fetchedDate.map(eachCryptocurrency => ({
        id: eachCryptocurrency.id,
        currencyLogoUrl: eachCryptocurrency.currency_logo,
        currencyName: eachCryptocurrency.currency_name,
        usdValue: eachCryptocurrency.usd_value,
        euroValue: eachCryptocurrency.euro_value,
      })),
      isLoading: false,
    })
  }

  renderCrytocurrenciesList = () => {
    const {cryptocurrenciesData} = this.state

    return <CrytocurrenciesList cryptocurrenciesData={cryptocurrenciesData} />
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="Ring" color="#ffffff" height={80} width={80} />
    </div>
  )

  render() {
    const {isLoading} = this.state

    return (
      <div className="app-container">
        {isLoading ? this.renderLoader() : this.renderCrytocurrenciesList()}
      </div>
    )
  }
}

export default CryptocurrencyTracker
