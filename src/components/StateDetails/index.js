import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Charts from '../Charts'
import StateCards from '../StateCards'
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
class StateDetails extends Component {
  state = {
    stateNameDetail: '',
    totalsCasesTested: '',
    updatedDate: '',
    localStorageData: [],
    mainStateCode: '',
    category: 'Confirmed',
    totalState: '',
    isLoading: true,
  }

  componentDidMount() {
    this.getDetailsById()
  }

  getDetailsById = async () => {
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    console.log(`stateDetails: ${stateCode}`)
    const url = 'https://apis.ccbp.in/covid19-state-wise-data/'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const stateTested = data[stateCode].total.tested
      const isStateCode = statesList.filter(
        eachItem => eachItem.state_code === stateCode,
      )
      const stateName = isStateCode[0].state_name
      const newDate = new Date(data[stateCode].meta.last_updated)
      const totalStateData = data[stateCode].total
      this.setState({
        stateNameDetail: stateName,
        totalsCasesTested: stateTested,
        updatedDate: newDate,
        localStorageData: data,
        mainStateCode: stateCode,
        totalState: totalStateData,
        isLoading: false,
      })
    }
  }

  stateData = () => {
    const {mainStateCode, localStorageData, category} = this.state
    const listOfDistrict = localStorageData[mainStateCode].districts
    const listOfDistrictName = Object.keys(listOfDistrict)
    const lowerCaseDis =
      typeof category === 'string' ? category.toLowerCase() : category
    console.log(`res:${lowerCaseDis}`)
    const dataElement = listOfDistrictName.map(eachItem => ({
      districtNameList: eachItem,
      districtValue: listOfDistrict[eachItem].total[lowerCaseDis]
        ? listOfDistrict[eachItem].total[lowerCaseDis]
        : 0,
    }))
    dataElement.sort((a, b) => b.districtValue - a.districtValue)
    const stateActiveCase = listOfDistrictName.map(eachItem => ({
      districtNameList: eachItem,
      districtValue:
        listOfDistrict[eachItem].total.confirmed -
        (listOfDistrict[eachItem].total.recovered +
          listOfDistrict[eachItem].total.deceased)
          ? listOfDistrict[eachItem].total.confirmed -
            (listOfDistrict[eachItem].total.recovered +
              listOfDistrict[eachItem].total.deceased)
          : 0,
    }))
    stateActiveCase.sort((a, b) => b.districtValue - a.districtValue)
    if (lowerCaseDis === 'active') {
      return stateActiveCase
    }
    return dataElement
  }

  stateListCards = card => {
    const {category} = this.state
    this.setState({category: card})
    console.log(`category:${category}`)
  }

  districtName = () => {
    const {
      stateNameDetail,
      totalsCasesTested,
      updatedDate,
      mainStateCode,
      category,
      totalState,
    } = this.state
    const topDistrictList = this.stateData()
    console.log(category)
    const dateString = new Date(updatedDate)
    const date = dateString.getDate()
    const month = dateString.getMonth()
    const year = dateString.getFullYear()
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    const currentNameMonth = months[month]
    return (
      <>
        <div className="state-main-container">
          <div className="state-details-container">
            <div className="state-name-container">
              <p className="state-detail-name">{stateNameDetail}</p>
              <p className="date">
                Last update on {currentNameMonth} {date}{' '}
                {date > 3 ? <span>th</span> : ''}
                {year}
              </p>
            </div>
            <div className="tested-container">
              <p className="test-heading">tested</p>
              <p className="test-results">{totalsCasesTested}</p>
            </div>
          </div>
        </div>
        <StateCards
          stateListCards={this.stateListCards}
          totalStateCards={totalState}
        />
        <div className="top-districts-container">
          <h1 className="top-districts">Top Districts</h1>
          <ul className="top-districts-list">
            {topDistrictList.map(eachItem => (
              <li className="district-item" key={eachItem.districtNameList}>
                <p className="district-value">{eachItem.districtValue}</p>
                <p className="district-name">{eachItem.districtNameList}</p>
              </li>
            ))}
          </ul>
        </div>
        {console.log(`highCode:${mainStateCode}`)}
        <Charts
          districtCode={mainStateCode}
          districtChartList={this.stateListCards}
        />
      </>
    )
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="Oval" color="#007BFF" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Header />
        <div className="state-container">
          {isLoading ? this.renderLoader() : this.districtName()}
        </div>
      </>
    )
  }
}
export default StateDetails
