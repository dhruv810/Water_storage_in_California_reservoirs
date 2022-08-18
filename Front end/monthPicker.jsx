import React, {useState} from 'react';
// an third-party component from NPM
import MonthYearPicker from 'react-month-year-picker';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function MonthPicker(props) {
  const [visible,updateVisible] = useState(false);
  const [smonth, setMonth] = useState(props.date.month);
  const [syear, setYear] = useState(props.date.year);
  function showFun () {
    updateVisible(!visible);
  }
  
  function pickedYear (year) {
    setYear(year);
    props.yearFun(year);
  }
  
  function pickedMonth (month) {
    updateVisible(false);
    setMonth(month);
    props.monthFun(month);
    
  }
  
  if (visible) {
    return (
      <div id="monthDiv">
        <input onClick={() => showFun()} value={months[smonth-1]+" "+syear}></input>
        <MonthYearPicker
            caption=""
            selectedMonth={smonth}
            selectedYear={syear}
            minYear={2000}
            maxYear={2022}
            onChangeYear={(year) => pickedYear(year)}
            onChangeMonth={(month) => pickedMonth(month)}
          />
      </div> );
  }

  else {
    return (
      <div id="monthDiv">
        <input onClick={() => showFun()} value={months[smonth-1]+" "+syear}></input>
      </div>
    )
  }
}
