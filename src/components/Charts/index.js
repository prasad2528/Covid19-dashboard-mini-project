import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {
  LineChart,
  Legend,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  BarChart,
  Bar,
} from 'recharts'
import './index.css'

class Charts extends Component {
  state = {chartsList: '', chartsOthers: '', isLoading: true}

  componentDidMount() {
    this.getChartsData()
    console.log('component rendered')
  }

  getChartsData = async () => {
    const url = 'https://apis.ccbp.in/covid19-timelines-data/'
    const options = {
      method: 'GET',
    }
    const {districtCode} = this.props
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const dateObject = Object.keys(data[districtCode].dates)
      //  console.log(`dateObject : ${dateObject}`)
      const dataState = dateObject.map(eachDate => ({
        eachDate,
        confirmed: data[districtCode].dates[eachDate].total.confirmed,
        recovered: data[districtCode].dates[eachDate].total.recovered,
        deceased: data[districtCode].dates[eachDate].total.deceased,
        tested: data[districtCode].dates[eachDate].total.tested,
        active:
          data[districtCode].dates[eachDate].total.confirmed -
          (data[districtCode].dates[eachDate].total.recovered +
            data[districtCode].dates[eachDate].total.deceased),
      }))
      const dataCharts = dateObject.map(eachDate => ({
        eachDate,
        confirmed: data[districtCode].dates[eachDate].total.confirmed,
        recovered: data[districtCode].dates[eachDate].total.recovered,
        deceased: data[districtCode].dates[eachDate].total.deceased,
        tested: data[districtCode].dates[eachDate].total.tested,
        active:
          data[districtCode].dates[eachDate].total.confirmed -
          (data[districtCode].dates[eachDate].total.recovered +
            data[districtCode].dates[eachDate].total.deceased),
      }))
      //   console.log(`dataState : ${dataState}`)
      //   console.log(`dataCharts : ${dataCharts}`)
      // console.log(`dataState ${dataState}`)
      this.setState({
        chartsList: dataState,
        chartsOthers: dataCharts,
        isLoading: false,
      })
    }
  }

  getCharts = (caseList, color) => {
    const {chartsOthers} = this.state
    return (
      <div>
        <LineChart
          width={900}
          height={250}
          data={chartsOthers}
          margin={{top: 5, right: 50, left: 20, bottom: 5}}
        >
          <XAxis
            dataKey="eachDate"
            style={{
              fontFamily: 'Roboto',
              fontWeight: 500,
              textTransform: 'upperCase',
            }}
            dy={5}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={caseList} stroke={color} />
        </LineChart>
      </div>
    )
  }

  getAllCharts = () => (
    <div className="charts-graph-container">
      <h1 className="charts-heading">Daily Spread Trends</h1>
      <div className="chart-graph red-graph">
        {this.getCharts('confirmed', '#FF073A')}
      </div>
      <div className="chart-graph blue-graph">
        {this.getCharts('active', '#007Bff')}
      </div>
      <div className="chart-graph green-graph">
        {this.getCharts('recovered', '#27a243')}
      </div>
      <div className="chart-graph ash-graph">
        {this.getCharts('deceased', '#6c7570')}
      </div>
      <div className="chart-graph ash-graph">
        {this.getCharts('tested', '#9673B9')}
      </div>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="Oval" color="#007BFF" height={50} width={50} />
    </div>
  )

  render() {
    const {chartsList, isLoading} = this.state
    //  console.log(`chartList : ${chartsList}`)
    const maxBarChart = chartsList.slice(Math.max(chartsList.length - 10, 0))
    const {districtChartList} = this.props
    const barChart = Array.isArray(districtChartList)
      ? 'defaultCase'
      : districtChartList

    let barColor = '#9A0E31'
    if (barChart === 'confirmed') {
      barColor = '#9A0E31'
      console.log(`barChart : ${barChart}`)
    } else if (barChart === 'active') {
      barColor = '#0A4FA0'
    } else if (barChart === 'recovered') {
      barColor = '#216837'
    } else if (barChart === 'deceased') {
      barColor = '#474C57'
    }
    return (
      <>
        {isLoading ? (
          this.renderLoader()
        ) : (
          <div className="charts-container">
            <div className="bar-charts">
              <BarChart
                width={700}
                height={240}
                barSize={35}
                data={maxBarChart}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis
                  dataKey="eachDate" // Ensure eachDate is passed as a string
                  stroke={`${barColor}`}
                  interval={0}
                  axisLine={false}
                  fontSize={10}
                  tickLine={0}
                  strokeWidth={1}
                  style={{
                    fontFamily: 'Roboto',
                    fontWeight: 500,
                    textTransform: 'upperCase',
                  }}
                  dy={10}
                />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey={barChart}
                  fill={`${barColor}`}
                  label={{position: 'top', fill: `${barColor}`, fontSize: 10}}
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </div>
            <div>{this.getAllCharts()}</div>
          </div>
        )}
      </>
    )
  }
}
export default Charts
