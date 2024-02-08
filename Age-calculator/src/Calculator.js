import React, { useState } from 'react';
import arrow from './assets/images/icon-arrow.svg';

const UserInput = () => {
  // State variables to manage input values, errors, and age
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [inputError, setInputError] = useState(false);
  // const [dayerrorMessage,setDayerrorMessage] = useState('');
  // const [montherrorMessage,setMontherrorMessage] = useState('');
  // const [yearerrorMessage,setYearerrorMessage] = useState('');
  const [age, setAge] = useState({ years: '--', months: '--', days: '--' });

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validation and updating state based on input changes

    switch (name) {
      case 'day':
        if (value === '' || value > 31 || value < 1) {
          setInputError(true);
        }else{
          setInputError(false)
          setDay(value);
        }
        break
      case 'month':
        if (value === '' || value > 12 || value < 1) {
          setInputError(true);
        }else{
          setInputError(false)
          setMonth(value);  
        }
        break
      case 'year':
        if (value === '' || value > 2200 || value < 1800) {
          setInputError(true);
        }else{
          setInputError(false)
          setYear(value);
        }
        break
      default:
        break
    }
  };

  // Function to calculate and display age
  const getuserInput = (e) => {
    e.preventDefault();

    function calculation(){
      const currentDate = new Date();

            let ageYears =  currentDate.getFullYear() - year;
            let ageMonths = currentDate.getMonth() - month+1;
            let ageDays =Math.abs(currentDate.getDate() - day);

            if(ageMonths<0){
              ageMonths+=12;
              ageYears-=1;
            }
            let daycount=0;
            let monthcount=0;
            let yearcount=0;

            let Age_count=setInterval(()=>{

              if(daycount<ageDays){
                daycount+=1
              }
              if(monthcount<ageMonths){
                monthcount+=1
              }
              if(yearcount<ageYears){
                yearcount+=1
              }
                // Set the calculated age to state
              setAge({
                years: yearcount,
                months: monthcount,
                days: daycount,
              })
            },30);

            setTimeout(()=>{
              clearInterval(Age_count)
            },4000);
            }
    
    if( day==='' && month === '' && year===''){
      setInputError(true)
    }else if (inputError===false){
      setAge({ years: '--', months: '--', days: '--' });
      calculation();
   };
  }

  return (
    <div className="container">
      <form>
        <section className='input-container'>
          {/* Input fields for day, month, and year */}
          {['day', 'month', 'year'].map((fieldName) => (
            <div key={fieldName} className={`js-${fieldName} `}>
              <label className={ `fieldlabel ${inputError ? 'errorstate' : ''}`}>{fieldName}</label>
              <input
                type="number"
                className={`input-field ${inputError ? 'input-errstate' : ''}`}
                placeholder={fieldName.toUpperCase()}
                max={fieldName === 'day' ? 31 : 9999}
                min={fieldName === 'day' ? 1 : 1000}
                name={fieldName}
                onChange={handleInputChange}
              />
              <p className={`error-text`}>{}</p>
            </div>
          ))}
        </section>
        <div className="button-container">
          <hr></hr>
          {/* Button to calculate age */}
          <button type='submit' onClick={getuserInput}>
            <img src={arrow} alt='Click' className="js-btn"/>
          </button>
        </div>
      </form>

      <section>
        {/* Display calculated age */}
        {Object.entries(age).map(([unit, value]) => (
          <p key={unit} className='result-container'><span className={`age-${unit}`}>{value}</span> <span className='result-age'>{unit}</span></p>
        ))}
      </section>
    </div>
  );
};

export default UserInput;