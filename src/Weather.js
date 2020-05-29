import React from 'react'


export default  class Weather extends React.Component {
  constructor(props){
    super(props);
    this.fahToCel = this.fahToCel.bind(this)
  }


 fahToCel = temp =>{
    return  Math.round(temp - 273.15);
   }
  
  render(){
    
    const {city,
    country,
    temperature,
    humidity,
    description,
    icon,
    error} = this.props;


    // if(icon){
    //   let iconEl = "http://openweathermap.org/img/w/" + icon + ".png";
    // }

   return (
   <>
   <div className="weather__info">
      {icon && <img src={"http://openweathermap.org/img/w/" + icon + ".png"} />}

     {city && (
          <p className="weather__key">
            City: <span className="weather__value"> {city}</span>
          </p>
        )}

     {temperature && (
        <p className="weather__key">
          Temperature: <span className="weather__value"> {this.fahToCel(temperature)}°C</span>
        </p>
      )}
   
    {humidity && (
        <p className="weather__key">
          Humidity: <span className="weather__value"> {humidity} ppm </span>
        </p>
      )}

      {description && (
        <p className="weather__key">
          Condition: <span className="weather__value"> {description}</span>
        </p>
      )}

      {error && <p className="weather__error">{error}</p>}
   
   </div>
   </>
  );
 }
}
