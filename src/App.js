import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from "./Weather";
// import Form from "./Form";
import './App.css';

// variables
// store the variables in an env file
const API_KEY = process.env.REACT_APP_API_KEY ;
const geocode_apiKey = process.env.REACT_APP_geocode_apiKey;
const CORS = "https://cors-anywhere.herokuapp.com";
const spinnerEl  = document.querySelector("spinner-wrapper")

// Form component
const Form = ({ onWeather }) => {
  return (
    <form onSubmit={e => onWeather(e)}>
      <input className="form-input" type="text" name="city" placeholder="City..." />
      <input className="form-input" type="text" name="country" placeholder="Country..." />
      <button className="button" type="submit">Get Weather</button>
    </form>
  );
};

//main App 
export default class App  extends React.Component{
   constructor(props){
     super(props);
     this.state = {
       temperature : '',
       humidity:'',
       city:'',
       country : '',
       description:'',
       icon:"",
       error :'Please enter values',
       bState: 'none'
     }
   }

   handleDisplayOn() {
    this.setState({
      bState: 'block'
    })
  }

  handleDisplayOff() {
    this.setState({
      bState: 'none'
    })
  }
  
// function for gettin weather***
  getWeather =(e) => {
    e.preventDefault();
    const city = e.currentTarget.elements.city.value;
    const country = e.currentTarget.elements.country.value;
// get the coordinates and then the weather--
    if(city && country){
    const geocode_url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${geocode_apiKey}`;
    this.handleDisplayOn()
     fetch(geocode_url)
    .then(data=>{
        const result = data.json();
        return result;
    })
    .then(data=>{
        let lat = data.results[0].geometry.location.lat;
        let lon = data.results[0].geometry.location.lng;
        console.log(lat)
   //put the coordinate in the fucntion that gets the weather--
        Weather(lat,lon)
      })

  //function for getting the weather from the coordinates---- 
    const Weather =  (lat,lon) =>{
     try{
        // this.handleDisplayOn()
        fetch(`https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
        .then(data =>{
          const result = data.json();
          return result;
       })
       .then(res=>{
           this.setState({
            city:res.name,
            temperature : res.main.temp,
            humidity : res.main.humidity,
            description: res.weather[0].description,
            icon : res.weather[0].icon,
            error:""
          })
          this.handleDisplayOff()
         })
    //set the state of the weather componet here 
     
       }
      catch(err){
        if(err){
          console.log("invalid values")
        }
      }
     }
   //end of the try nd catch block--

    }

    else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "please enter a valid values."
      });
    }
  }
  


  render(){
    return (
      <div className="wrapper " id="container">

       <div className="spinner-wrapper "  style={{display:this.state.bState}}>
          <div className="spinner">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
        

        <div className="main">
          <h1 id="title">Weather Finder</h1>
           <div className="main__wrapper">
            <Form onWeather={this.getWeather} />
            <Weather
              temperature={this.state.temperature}
              city={this.state.city}
              country={this.state.country}
              humidity={this.state.humidity}
              description={this.state.description}
              icon = {this.state.icon}
              error={this.state.error}
            /> 
            </div>
          </div>
      </div>
    );
  }
}


