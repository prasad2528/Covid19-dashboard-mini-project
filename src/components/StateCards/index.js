import {Component} from 'react'
import './index.css'

class StateCards extends Component {
  state = {
    confirmedDetails: {},
    activeDetails: {},
    recoveredDetails: {},
    deceasedDetails: {},
  }

  componentDidMount() {
    this.getTotalDistrict()
  }

  getTotalDistrict = () => {
    const {totalStateCards} = this.props
    const totalConfirmed = totalStateCards.confirmed
    console.log(`totalConfirmed:${totalConfirmed}`)
    const totalRecoveredCases = totalStateCards.recovered
    const totalDeceasedCases = totalStateCards.deceased
    const active = totalConfirmed - totalRecoveredCases - totalDeceasedCases
    const confirmedObject = {
      name: 'Confirmed',
      logo:
        'https://res.cloudinary.com/dildvihdw/image/upload/v1705745082/check-mark_1_oilffq.png',
      value: totalConfirmed,
    }
    const activeObject = {
      name: 'Active',
      logo:
        'https://res.cloudinary.com/dildvihdw/image/upload/v1705746826/protection_1_wqdilu.png',
      value: active,
    }
    const recoveredObject = {
      name: 'Recovered',
      logo:
        'https://res.cloudinary.com/dildvihdw/image/upload/v1705747057/recovered_1_z7edsc.png',
      value: totalRecoveredCases,
    }
    const deceasedObject = {
      name: 'Deceased',
      logo:
        'https://res.cloudinary.com/dildvihdw/image/upload/v1705747067/breathing_1_wvwlhs.png',
      value: totalDeceasedCases,
    }
    this.setState({
      confirmedDetails: confirmedObject,
      activeDetails: activeObject,
      recoveredDetails: recoveredObject,
      deceasedDetails: deceasedObject,
    })
  }

  cardClick = value => {
    const {stateListCards} = this.props
    stateListCards(value)
    console.log(`mainValue is ${value}`)
  }

  render() {
    const {
      confirmedDetails,
      activeDetails,
      recoveredDetails,
      deceasedDetails,
    } = this.state
    return (
      <>
        <ul className="cases-details">
          <li
            className="card-item box1"
            key={confirmedDetails.name}
            value={confirmedDetails.name}
            onClick={() => this.cardClick(confirmedDetails.name)}
          >
            <div className="cases-active-card">
              <p className="case-name">{confirmedDetails.name}</p>
              <img src={confirmedDetails.logo} className="tick" alt="" />
              <p className="count">{confirmedDetails.value}</p>
            </div>
          </li>
          <li
            className="card-item box2"
            key={activeDetails.name}
            value={activeDetails.name}
            onClick={() => this.cardClick(activeDetails.name)}
          >
            <p className="case-name active">{activeDetails.name}</p>
            <img src={activeDetails.logo} className="tick" alt="" />
            <p className="count active">{activeDetails.value}</p>
          </li>
          <li
            className="card-item box3"
            key={recoveredDetails.name}
            value={recoveredDetails.name}
            onClick={() => this.cardClick(recoveredDetails.name)}
          >
            <p className="case-name recover">{recoveredDetails.name}</p>
            <img src={recoveredDetails.logo} className="tick" alt="" />
            <p className="count recover">{recoveredDetails.value}</p>
          </li>
          <li
            className="card-item box4"
            key={deceasedDetails.name}
            value={deceasedDetails.name}
            onClick={() => this.cardClick(deceasedDetails.name)}
          >
            <p className="case-name decease">{deceasedDetails.name}</p>
            <img src={deceasedDetails.logo} className="tick" alt="" />
            <p className="count decease">{deceasedDetails.value}</p>
          </li>
        </ul>
      </>
    )
  }
}
export default StateCards
