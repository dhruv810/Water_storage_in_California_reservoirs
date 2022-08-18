
import React, { useState } from 'react';
import MonthPicker from './monthPicker';
import { Bar } from "react-chartjs-2";
import './App.css';
import {UserData} from './data';
import usePostRequest from './usePostRequest';
import Chart from 'chart.js/auto';

class App extends React.Component {
  
  constructor() {
    super();
    this.state = { 
      showChart: false,
      date: { month: 4, year: 2022 },
    };
    this.monthChange = this.monthChange.bind(this);
    this.yearChange = this.yearChange.bind(this);
  }
  
  yearChange(newYear) {
    this.setState ({ 
      showChart : true,
      date: {month: this.state.date.month, year: newYear}
    })
  }

  monthChange(newMonth) {
    this.setState ({ 
      showChart : true,
      date: {month: newMonth, year: this.state.date.year}
    })
  }

  render() {
    if(this.state.showChart == false) 
    return (
     <main>
      <div className="row">
        <div className="col">
          <p>California's reservoirs are part of a <a href="https://www.ppic.org/wp-content/uploads/californias-water-storing-water-november-2018.pdf">complex water storage system</a>.  The State has very variable weather, both seasonally and from year-to-year, so storage and water management is essential.  Natural features - the Sierra snowpack and vast underground aquifers - provide more storage capacity,  but reservoirs are the part of the system that people control on a day-to-day basis.  Managing the flow of surface water through rivers and aqueducts, mostly from North to South, reduces flooding and attempts to provide a steady flow of water to cities and farms, and to maintain natural riparian habitats.  Ideally, it also transfers some water from the seasonal snowpack into long-term underground storage.  Finally, hydro-power from the many dams provides carbon-free electricity. </p>
          <p>California's water managers monitor the reservoirs carefully, and the state publishes daily data on reservoir storage.</p>
          <button onClick={() => this.setState({ showChart: !this.state.showChart })}>See more</button>
        </div>
        <div className="col">
          <div className="img-caption">
          <img src="https://cdn.theatlantic.com/thumbor/HYdYHLTb9lHl5ds-IB0URvpSut0=/900x583/media/img/photo/2014/09/dramatic-photos-of-californias-historic-drought/c01_53834006/original.jpg
            "/>
          <p className="caption">Lake Oroville in the 2012-2014 drought. Image credit Justin Sullivan, from The Atlantic article Dramatic Photos of California's Historic Drought.</p>
          </div>
        </div>
        </div>
      </main> 
    );
    else
      return (
        <main>
      <div className="row">
        <div className="col text">
          <p>California's reservoirs are part of a <a href="https://www.ppic.org/wp-content/uploads/californias-water-storing-water-november-2018.pdf">complex water storage system</a>.  The State has very variable weather, both seasonally and from year-to-year, so storage and water management is essential.  Natural features - the Sierra snowpack and vast underground aquifers - provide more storage capacity,  but reservoirs are the part of the system that people control on a day-to-day basis.  Managing the flow of surface water through rivers and aqueducts, mostly from North to South, reduces flooding and attempts to provide a steady flow of water to cities and farms, and to maintain natural riparian habitats.  Ideally, it also transfers some water from the seasonal snowpack into long-term underground storage.  Finally, hydro-power from the many dams provides carbon-free electricity. </p>
          <p>California's water managers monitor the reservoirs carefully, and the state publishes daily data on reservoir storage.</p>
          <button onClick={() => this.setState({ showChart: !this.state.showChart })}>See less</button>
        </div>
        <div className="col">
          <div className="img-caption">
          <img src="https://cdn.theatlantic.com/thumbor/HYdYHLTb9lHl5ds-IB0URvpSut0=/900x583/media/img/photo/2014/09/dramatic-photos-of-californias-historic-drought/c01_53834006/original.jpg
            "/>
          <p className="caption">Lake Oroville in the 2012-2014 drought. Image credit Justin Sullivan, from The Atlantic article Dramatic Photos of California's Historic Drought.</p>
          </div>
        </div>
        </div>
        <div className="row2">
        <div className="col2">
          <ShowWaterChart
            date={this.state.date}
            />
        </div>
        <div className="col2">
          <p>Here's a quick look at some of the data on reservoirs from the <a href="https://cdec.water.ca.gov/index.html">California Data Exchange Center</a>, which consolidates climate and water data from multiple federal and state government agencies, and  electric utilities.  Select a month and year to see storage levels in the eleven largest in-state reservoirs.</p>
          <p id="picker-title">Change month:</p>
          <MonthPicker
            date = {this.state.date}
            monthFun={this.monthChange}
            yearFun={this.yearChange}
          />
        </div>
      </div>
      </main>
      );
  }
}

const watercapacities = UserData.map((data) => data.capacity);
const names = UserData.map((data) => data.name);

// build water chart
function WaterChart(props) {
  let userData = props.userData;
  const config = {
    options: {
      responsive: true,
      scales: {
        x: {
          stacked: true,
          beginAtZero: true,
          grid: {
            display: false
          }
        },
        y: {
          stacked: true,
          grid: {
            display: false
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  }
  
  return (
    <div id="chart-container">
      <Bar options={config.options} data={userData}/>
    </div>
  );
}

// display water chart
function ShowWaterChart(props) {
  // const [chart, setChart] = useState([]);
  console.log( "show water chart called!!");
  const [userData, setUserData] = useState({
    labels: names,
    datasets: [{
      data: [],
      backgroundColor: 'rgb(66, 145, 152)',
      maxBarThickness: 25,
    }
    , {
      data: watercapacities,
      backgroundColor: 'rgb(120, 199, 227)',
      maxBarThickness: 25,
    }
    ],
  })
  
  // this function will get the data for given month and year as below 
  usePostRequest('/query/getList', props.date, thenFun, catchFun);
  
  function thenFun(result) {
    let temp = result.map((data) => data.value);
    let capMinustemp = [];
    for (let i = 0; i < temp.length; i++) {
      capMinustemp[i] = watercapacities[i] - temp[i];
    }
    
    console.log('temp : ', temp);
    
    let dataset =  [{
      data: temp,
      backgroundColor: 'rgb(66, 145, 152)',
      maxBarThickness: 25,
    }
    , {
      data: capMinustemp,
      backgroundColor: 'rgb(120, 199, 227)',
      maxBarThickness: 25,
    }
    ];
    
    setUserData({labels: names, datasets: dataset});
  }

  function catchFun(error) {
    console.log(error);
  }

  console.log("selected date: ", props.date);
  if (userData) {
    return (
      <WaterChart userData={userData}/>
    );
  }
    
  else {
    return (
      <p>Loading...</p>
    );
  }
  
}

export default App;
