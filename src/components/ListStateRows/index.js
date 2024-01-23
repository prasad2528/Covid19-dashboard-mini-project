import './index.css'

const ListStateRows = props => {
  const {stateDetails} = props
  const {
    stateName,
    stateCode,
    listOfConfirmed,
    listOfRecovered,
    listOfDeceased,
    listOfOther,
    listOfPopulation,
  } = stateDetails
  const active =
    listOfConfirmed - listOfRecovered - listOfDeceased - listOfOther
  return (
    <li className="list-state" key={stateCode} id={stateCode}>
      <p className="state-name main">{stateName}</p>
      <p className="state-confirmed main">{listOfConfirmed}</p>
      <p className="state-active main">{active}</p>
      <p className="state-recovered main">{listOfRecovered}</p>
      <p className="state-deceased main">{listOfDeceased}</p>
      <p className="state-population main">{listOfPopulation}</p>
    </li>
  )
}
export default ListStateRows
