import React, { Component } from 'react'
import   dressing_suggestions from './images/dressing_suggestions.png';
import DiseasePerdiction from './DiseasePerdiction.js'
import './assets/css/main.css';
import DressingSuggestion from './DressingSuggestion';
import Medicine from './MedicenTrend';
import { render } from 'react-dom';
import { Dots } from 'react-activity';
import 'react-activity/dist/react-activity.css';
import {Alert} from 'react-bootstrap'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export class Perdiction extends Component {
constructor(props) {
    super(props)

    this.state = {
        MaxTemp:null,
        MinTemp:null,
        Humidity:null,
        WindSpeed:null,
        Week_MinTemp:null,
        Week_MaxTemp:null,
        Week_Humidity:null,
        Week_WindSpeed:null,
        datagethered:false,
        FutureDatagethered:false,
        Error:null,
        showError:false,
        Temp:null,
        Location:'no location yet'
        
    }
    this.getLocation=this.getLocation.bind(this);
   this.GetWeatherData=this.GetWeatherData.bind(this);
this.AlertDismissibleExample=this.AlertDismissibleExample.bind(this);


}
responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

HandelManualPerdiction(MaxTemp,MinTemp,Humidity,WindSpeed){
 this.setState({MaxTemp:MaxTemp})
 this.setState({MinTemp:MinTemp})
 this.setState({Humidity:Humidity})
 this.setState({WindSpeed:WindSpeed})
 this.setState({Temp:(parseInt(MaxTemp)+parseInt(MinTemp))/2})
 this.setState({Week_MaxTemp:MaxTemp})
 this.setState({Week_MinTemp:MinTemp})
 this.setState({Week_Humidity:Humidity})
 this.setState({Week_WindSpeed:WindSpeed})
 this.setState({FutureDatagethered:true})
 console.log("this is temp " +this.state.Temp);
 
 this.setState({datagethered:true})
}



//this will get the user current location
getLocation() {
    console.log('location etting');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.GetWeatherData);
    } else { 
      this.setState({Error:'We are sorry there is an error while getting your Location Please allow Location access or try again by reloading'})
      this.setState({showError:true})
    }
  }

 
  GetWeatherData(position) {
   var Lat=position.coords.latitude
   var Lang=position.coords.longitude
   if(Lat==null||Lang==null){
    this.setState({Error:'We are sorry there is an error while getting your Location Please allow Location access or try again by reloading'})
    this.setState({showError:true})
   }
   else{
     
      fetch(`https://api.openweathermap.org/data/2.5/weather?&lat=${Lat}&lon=${Lang}&units=metric&appid=d4a3ad358199cfea3aece95f5afc4d42`)
      .then(response=>response.json())
      .then(myjson=>{
        console.log('wether result ',myjson.main.temp_max);
        this.setState({MaxTemp:parseInt(myjson.main.temp_max)})
        this.setState({MinTemp:parseInt(myjson.main.temp_min)})
        this.setState({Humidity:parseInt(myjson.main.humidity)})
        this.setState({WindSpeed:parseInt(myjson.wind.speed)})
        this.setState({Temp:parseInt(myjson.main.temp)})
        this.setState({datagethered:true})
       
      }).then(data=>{
        this.GetFutureWeatherData(position)
      })
      .catch(error=>{
        this.setState({Error:'We are sorry there is an error while getting current Weather Data try again by reloading'})
        this.setState({showError:true})
      })
   }
  }


  GetFutureWeatherData=(position) =>{
    var Lat=position.coords.latitude
   var Lang=position.coords.longitude
    console.log(Lat,Lang);
    
    if(Lat==null||Lang==null){
     this.setState({Error:'We are sorry there is an error while getting your Location Please allow Location access or try again by reloading'})
     this.setState({showError:true})
    }
    else{
      
       fetch(`https://api.openweathermap.org/data/2.5/onecall?&lat=${Lat}&lon=${Lang}&exclude=current,minutely,hourly&units=metric&appid=d4a3ad358199cfea3aece95f5afc4d42`)
       .then(response=>response.json())
       .then(myjson=>{
         //7 days weather implementation.................
         var Sum_Week_MinTemp=0;
         var Sum_Week_MaxTemp=0;
         var Sum_Week_Humidity=0;
         var Sum_Week_WindSpeed=0;
         for(var i=0;i<8;i++){
           Sum_Week_MinTemp=Sum_Week_MinTemp+parseInt(myjson.daily[i].temp.min)
           Sum_Week_MaxTemp=Sum_Week_MaxTemp+parseInt(myjson.daily[i].temp.max)
           Sum_Week_Humidity=Sum_Week_Humidity+parseInt(myjson.daily[i].humidity)
           Sum_Week_WindSpeed=Sum_Week_WindSpeed+parseInt(myjson.daily[i].wind_speed)
         }
         this.setState({Week_MaxTemp:parseInt( parseInt(Sum_Week_MaxTemp)/8)})
         this.setState({Week_MinTemp:parseInt( parseInt(Sum_Week_MinTemp)/8)})
         this.setState({Week_Humidity:parseInt( parseInt(Sum_Week_Humidity)/8)})
         this.setState({Week_WindSpeed:parseInt( parseInt(Sum_Week_WindSpeed)/8)})
         console.log('send it to fetch',this.state.Week_Humidity,this.state.Week_MaxTemp);
         
         this.setState({FutureDatagethered:true})
       })
       .catch(error=>{
         this.setState({Error:'We are sorry there is an error while getting Future Weather Data try again by reloading'})
         this.setState({showError:true})
       })
    }
   }


componentDidMount(){
    if(this.props.Process=='Manual Perdiction'){
        this.HandelManualPerdiction(this.props.MaxTemp, this.props.MinTemp, this.props.Humidity,this.props.WindSpeed)
        
    }
    else if(this.props.Process=='Auto Perdiction'){
       
       this.getLocation()
        
    }
    
}

//error message
 AlertDismissibleExample() {
    
      return (
        <Alert variant="danger" onClose={() =>{this.setState({showError:false});this.setState({Error:null})}}>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>
            {this.state.Error}
          </p>
          <button onClick={()=>{this.getLocation();this.setState({showError:false});this.setState({Error:null})}} >Reload</button>
        </Alert>
      );
  }

    render() {
   
    
      
        return (
            <div>
               
			<section id="three" className="wrapper align-center background" >
				<div className="inner"  >
         
                    {this.state.showError==true? <this.AlertDismissibleExample />:
                    <div>
					<div className="flex flex-2" style={{justifyContent:'space-arround'}}>
            
                        {this.state.datagethered==true?  <DiseasePerdiction MaxTemp={this.state.MaxTemp} MinTemp={this.state.MinTemp} Humidity={this.state.Humidity} WindSpeed={this.state.WindSpeed}/> :<article><h3>Loading Disease Prediction</h3> <Dots  size='25px'/><p>Please wait while we getting weather data</p></article>}

                        {this.state.datagethered==true? <DressingSuggestion Temp={this.state.Temp}  MaxTemp={this.state.MaxTemp} MinTemp={this.state.MinTemp} Humidity={this.state.Humidity} /> :<article>  <h3>Loading Dressing suggestions</h3> <Dots size='25px'/><p>Please wait while we getting weather data</p></article>}
                       
					</div>
           <div className="flex flex-1" style={{justifyContent:'center',alignItems:'center'}}>
           {this.state.FutureDatagethered==true? <Medicine style={{alignSelf:'center'}} Week_Humidity={this.state.Week_Humidity} Week_MaxTemp={this.state.Week_MaxTemp} Week_MinTemp={this.state.Week_MinTemp} Week_WindSpeed={this.state.Week_WindSpeed}  MaxTemp={this.state.MaxTemp} MinTemp={this.state.MinTemp} Humidity={this.state.Humidity} WindSpeed={this.state.WindSpeed} /> :<article>  <h3>Loading Medicine Trends</h3> <Dots size='25px'/><p>Please wait while we getting weather data</p></article>}
          </div>
          </div>
         
                           }
				</div>
                
			</section>



           
			




                 {this.props.Process=='Manual Perdiction'? <button className='button mb-3' onClick={()=>this.props.setFormView()}>Go Back to Form</button>:null}


            
					<div className="copyright">
						&copy;Weather Care +
                        
					</div>
          <div className="copyright mb-4">
						Developed by <a href='https://suleman-shoukat.github.io/Myportfolio/' target="_blank">Suleman Shoukat</a>
            <div><a href='https://drive.google.com/open?id=1J3WK88EeLjgDYdllY4mBjfIx92XtFwXu' target="_blank">Get our Android App for free</a></div>
					</div>  
          
            </div>
        )
    }
}

export default Perdiction
