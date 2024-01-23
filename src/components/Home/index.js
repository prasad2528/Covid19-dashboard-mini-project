import {Component} from 'react'
import {MdOutlineSearch} from 'react-icons/md'
import {FiGithub, FiTwitter} from 'react-icons/fi'
import Loader from 'react-loader-spinner'
import {IoLogoInstagram} from 'react-icons/io5'
import Header from '../Header'
import ListStateRows from '../ListStateRows'
import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

class Home extends Component {
  state = {
    totalConfirmed: 0,
    totalRecovered: 0,
    totalDeceased: 0,
    totalActive: 0,
    listOfStates: [],
    searchInput: '',
    listOfSearchResults: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getStateWiseData()
  }

  getStateWiseData = async () => {
    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      let confirmedCase = 0
      let recoveredCase = 0
      let deceasedCase = 0
      let activeCase = 0

      statesList.forEach(eachState => {
        if (data[eachState.state_code]) {
          const {total} = data[eachState.state_code]
          confirmedCase += total.confirmed ? total.confirmed : 0
          recoveredCase += total.recovered ? total.recovered : 0
          deceasedCase += total.deceased ? total.deceased : 0
        }
      })
      activeCase += confirmedCase - (recoveredCase + deceasedCase)

      const updatedList = statesList.map(eachState => ({
        stateName: eachState.state_name,
        stateCode: eachState.state_code,
        listOfConfirmed: Object.keys(data)
          .filter(stateItem => stateItem === eachState.state_code)
          .map(each => data[each].total.confirmed),
        listOfRecovered: Object.keys(data)
          .filter(stateItem => stateItem === eachState.state_code)
          .map(each => data[each].total.recovered),
        listOfDeceased: Object.keys(data)
          .filter(stateItem => stateItem === eachState.state_code)
          .map(each => data[each].total.deceased),
        listOfOther: Object.keys(data)
          .filter(stateItem => stateItem === eachState.state_code)
          .map(each => data[each].total.other),
        listOfPopulation: Object.keys(data)
          .filter(stateItem => stateItem === eachState.state_code)
          .map(each => data[each].meta.population),
      }))
      this.setState({
        totalConfirmed: confirmedCase,
        totalRecovered: recoveredCase,
        totalDeceased: deceasedCase,
        totalActive: activeCase,
        listOfStates: updatedList,
        isLoading: false,
      })
      const {totalConfirmed} = this.state
      console.log(totalConfirmed)
      console.log('hello')
    }
  }

  renderTableView = () => {
    const {listOfStates} = this.state
    return (
      <div className="table-headings" data-testid="stateWiseCovidDataTable">
        <div className="table-row">
          <div className="sorting list">
            <p className="name">States/UT</p>
            <button
              className="button"
              type="button"
              aria-label="ascending"
              onClick={this.increasingOrder}
            >
              <img
                src="https://res.cloudinary.com/dildvihdw/image/upload/v1705748698/sort_uvks5o.png"
                className="sort-icon"
                alt=""
              />
            </button>
            <button
              className="button"
              type="button"
              aria-label="descending"
              onClick={this.decreasingOrder}
            >
              <img
                src="https://res.cloudinary.com/dildvihdw/image/upload/v1705748945/sort_nbuqfj.png"
                className="sort-icon"
                alt=""
              />
            </button>
          </div>
          <p className="list">Confirmed</p>
          <p className="list">Active</p>
          <p className="list">Recovered</p>
          <p className="list">Deceased</p>
          <p className="list">Population</p>
        </div>
        <ul className="table">
          {listOfStates.map(eachState => (
            <ListStateRows stateDetails={eachState} key={eachState.stateCode} />
          ))}
        </ul>
      </div>
    )
  }

  onChangeSearchInput = event => {
    const {searchInput} = this.state
    this.setState({searchInput: event.target.value})
    const searchResults = statesList.filter(eachItem =>
      eachItem.state_name.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return this.setState({listOfSearchResults: searchResults})
  }

  renderSearchResults = () => {
    const {listOfSearchResults} = this.state
    return (
      <ul className="search-list-container">
        {listOfSearchResults.map(eachItem => (
          <li className="search-item" key={eachItem.state_code}>
            <p className="search-name">{eachItem.state_name}</p>
            <div className="icon-box">
              <p className="search-code">{eachItem.state_code}</p>
              <img
                src="https://res.cloudinary.com/dildvihdw/image/upload/v1705816214/Line_s5ojjf.png"
                alt=""
                className="right-icon"
              />
            </div>
          </li>
        ))}
      </ul>
    )
  }

  onRemoveSearchResults = () => {
    this.setState({listOfSearchResults: []})
  }

  decreasingOrder = () => {
    const {listOfStates} = this.state
    const sort = listOfStates.sort((sortA, sortB) => {
      const a = sortA.stateName.toUpperCase()
      const b = sortB.stateName.toUpperCase()
      return a < b ? 1 : -1
    })
    this.setState({listOfStates: sort})
  }

  increasingOrder = () => {
    const {listOfStates} = this.state
    const sort = listOfStates.sort((sortA, sortB) => {
      const a = sortA.stateName.toUpperCase()
      const b = sortB.stateName.toUpperCase()
      return a > b ? 1 : -1
    })
    this.setState({listOfStates: sort})
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="Oval" color="#007BFF" height={50} width={50} />
    </div>
  )

  render() {
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    console.log('id is')
    const {data} = this.state
    console.log(stateCode === data[0].state_code)
    const {
      totalConfirmed,
      totalRecovered,
      totalDeceased,
      totalActive,
      listOfSearchResults,
      searchInput,
      isLoading,
    } = this.state
    const searchAllResults =
      listOfSearchResults.length === 0 ? '' : this.renderSearchResults()
    console.log(totalConfirmed)
    console.log(totalRecovered)
    console.log(totalDeceased)
    console.log(totalActive)
    console.log(totalConfirmed)
    console.log(listOfSearchResults)
    return (
      <>
        <Header />
        <div className="home-container">
          {isLoading ? (
            this.renderLoader()
          ) : (
            <>
              <div className="search-container">
                <MdOutlineSearch className="icon" />
                <input
                  type="search"
                  placeholder="Enter the State"
                  className="search-input"
                  onChange={this.onChangeSearchInput}
                  value={searchInput}
                />
              </div>
              {searchInput.length > 0 ? searchAllResults : ''}
              <div className="cases-details">
                <div className="case-item">
                  <p className="case-name">Confirmed</p>
                  <img
                    src="https://res.cloudinary.com/dildvihdw/image/upload/v1705745082/check-mark_1_oilffq.png"
                    className="tick"
                    alt=""
                  />
                  <p className="count">{totalConfirmed}</p>
                </div>
                <div className="case-item">
                  <p className="case-name active">Active</p>
                  <img
                    src="https://res.cloudinary.com/dildvihdw/image/upload/v1705746826/protection_1_wqdilu.png"
                    className="tick"
                    alt=""
                  />
                  <p className="count active">{totalActive}</p>
                </div>
                <div className="case-item">
                  <p className="case-name recover">Recovered</p>
                  <img
                    src="https://res.cloudinary.com/dildvihdw/image/upload/v1705747057/recovered_1_z7edsc.png"
                    className="tick"
                    alt=""
                  />
                  <p className="count recover">{totalConfirmed}</p>
                </div>
                <div className="case-item">
                  <p className="case-name decease">Deceased</p>
                  <img
                    src="https://res.cloudinary.com/dildvihdw/image/upload/v1705747067/breathing_1_wvwlhs.png"
                    className="tick"
                    alt=""
                  />
                  <p className="count decease">{totalDeceased}</p>
                </div>
              </div>
              {this.renderTableView()}
            </>
          )}
          <footer className="footer-container">
            <h1 className="heading">
              COVID19<span className="span-heading">INDIA</span>
            </h1>
            <p className="footer-description">
              We stand with everyone fighting on the front lines
            </p>
            <div className="footer-icons">
              <FiGithub className="git" />
              <IoLogoInstagram className="instagram" />
              <FiTwitter className="twitter" />
            </div>
          </footer>
        </div>
      </>
    )
  }
}
export default Home
