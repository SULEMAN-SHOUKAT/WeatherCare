import React, { Component } from 'react'
import   dressing_suggestions from './images/dressing_suggestions.png';
import DiseasePerdiction from './DiseasePerdiction.js'
import './assets/css/main.css';
import DressingSuggestion from './DressingSuggestion';
import { render } from 'react-dom';
import { Dots } from 'react-activity';
import 'react-activity/dist/react-activity.css';
import {Alert} from 'react-bootstrap'
export class Perdiction extends Component {
constructor(props) {
    super(props)

    this.state = {
        MaxTemp:null,
        MinTemp:null,
        Humidity:null,
        WindSpeed:null,
        datagethered:false,
        Error:null,
        showError:false,
        Temp:null,
        Location:'no location yet'
        
    }
    this.getLocation=this.getLocation.bind(this);
   this.GetWeatherData=this.GetWeatherData.bind(this);
this.AlertDismissibleExample=this.AlertDismissibleExample.bind(this);

}

HandelManualPerdiction(MaxTemp,MinTemp,Humidity,WindSpeed){
 this.setState({MaxTemp:MaxTemp})
 this.setState({MinTemp:MinTemp})
 this.setState({Humidity:Humidity})
 this.setState({WindSpeed:WindSpeed})
 this.setState({Temp:(parseInt(MaxTemp)+parseInt(MinTemp))/2})
 console.log("this is temp " +this.state.Temp);
 
 this.setState({datagethered:true})
}



//this will get the user current location
getLocation() {
    console.log('location etting');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.GetWeatherData);
    } else { 
      this.setState({Error:'We are sorry there is an error while getting your Location Please allow Location ecess or try again by reloading'})
      this.setState({showError:true})
    }
  }

 
  GetWeatherData(position) {
   var Lat=position.coords.latitude
   var Lang=position.coords.longitude
   if(Lat==null||Lang==null){
    this.setState({Error:'We are sorry there is an error while getting your Location Please allow Location ecess or try again by reloading'})
    this.setState({showError:true})
   }
   else{
     this.setState({Location:`${Lat} and ${Lang}`})
      fetch(`https://api.openweathermap.org/data/2.5/weather?&lat=${Lat}&lon=${Lang}&units=metric&appid=d4a3ad358199cfea3aece95f5afc4d42`)
      .then(response=>response.json())
      .then(myjson=>{
        this.setState({MaxTemp:Number((myjson.main.temp_max).toFixed())})
        this.setState({MinTemp:Number((myjson.main.temp_min).toFixed())})
        this.setState({Humidity:Number((myjson.main.humidity).toFixed())})
        this.setState({WindSpeed:Number((myjson.wind.speed).toFixed())})
        this.setState({Temp:Number((myjson.main.temp).toFixed())})
        this.setState({datagethered:true})
      })
      .catch(error=>{
        this.setState({Error:'We are sorry there is an error while getting Weather Data try again by reloading'})
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
					<div className="flex flex-2" style={{justifyContent:'space-arround'}}>
                        {this.state.datagethered==true?  <DiseasePerdiction MaxTemp={this.state.MaxTemp} MinTemp={this.state.MinTemp} Humidity={this.state.Humidity} WindSpeed={this.state.WindSpeed}/> :<article><h3>Loading Disease Prediction</h3> <Dots  size='25px'/><p>Please wait while we getting weather data</p></article>}

                        {this.state.datagethered==true? <DressingSuggestion Temp={this.state.Temp}  MaxTemp={this.state.MaxTemp} MinTemp={this.state.MinTemp} Humidity={this.state.Humidity} /> :<article>  <h3>Loading Dressing suggestions</h3> <Dots size='25px'/><p>Please wait while we getting weather data</p></article>}
						
						
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
            <div><a href='https://drive.google.com/open?id=15diD8koJVU4qrNaPr6CJVOYKNWWHumv8' target="_blank">Get our Android App for free</a></div>
					</div>  
          
            </div>
        )
    }
}

export default Perdiction
