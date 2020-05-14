import React, { Component } from 'react'
import   disease_prediction from './images/disease_prediction.png';
import './assets/css/main.css';
import { render } from 'react-dom';
import { Levels } from 'react-activity';
import 'react-activity/dist/react-activity.css';
import {Alert} from 'react-bootstrap'
import 'react-bootstrap'
import "./assets/css/sb-admin-2.min.css";
import DiseasePrecaution from './DiseasePrecaution';


export class DiseasePerdiction extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             results:{},
             Error:null,
             showError:false,
             MaxTemp:null,
             MinTemp:null,
             Humidity:null,
             WindSpeed:null,
             datagethered:false,
             Precaution:null
        }
        this.AlertDismissibleExample=this.AlertDismissibleExample.bind(this)
    }

    getDiseasePerdiction=(MaxTemp,MinTemp,Humidity,WindSpeed)=>{
        this.setState({datagethered:false})
        if(Humidity<40&&MaxTemp>=30&&MinTemp>=30){
            Humidity=40;
          }
        fetch(`https://weather-care.herokuapp.com/Prediction?MinTemp=${MinTemp}&MaxTemp=${MaxTemp}&WindSpeed=${WindSpeed}&Humidity=${Humidity}`)
         .then(Response=>Response.json())
         .then(myjson=>{
              this.setState({results:myjson.results})
              this.setState({datagethered:true})
              console.log(this.state.results);
              
         }).catch(error=>{
            this.setState({Error:'We are sorry there is an error while generating Disease Perdiction try again by Pressing Reload Perdiction button or by reloading the app'})
            this.setState({showError:true})
            
         })
    }
    
    
    componentDidMount(){
         this.state.MinTemp=this.props.MinTemp;
         this.state.MaxTemp=this.props.MaxTemp;
         this.state.Humidity=this.props.Humidity;
         this.state.WindSpeed=this.props.WindSpeed;
         console.log('Disease perdiction '+this.state.MaxTemp, this.state.MinTemp, this.state.Humidity, this.state.WindSpeed);
         
         this.getDiseasePerdiction( this.state.MaxTemp, this.state.MinTemp, this.state.Humidity, this.state.WindSpeed);
        
    }

    PerdictionMaking=()=>{
       return (<div>
                   <h3>Generating Disease Prediction</h3>
                     <Levels  size='25px'/>
               </div>)
    }

    //error message
 AlertDismissibleExample() {
    
    return (
      <Alert variant="danger">
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          {this.state.Error}
        </p>
        <button onClick={()=>{this.getDiseasePerdiction( this.state.MaxTemp, this.state.MinTemp, this.state.Humidity, this.state.WindSpeed);this.setState({showError:false});this.setState({Error:null})}} >Reload Prediction</button>
      </Alert>
    );
}
 graphcolor=(data=0.6)=>{
    if (data<=0){
      return `rgba(60, 241, 118,1)`
    }
    else if(data<=20) {
      return `rgba(37, 167, 246 ,1)`
    }
    else if(data<=40) {
      return `rgba(216, 241, 60,1)`
    }
    else if(data<=60){
      return `rgba(246, 129, 37 ,1)`
    }
    else if(data<=80){
      return `rgba(2241, 87, 60,1)`
    }
    else if(data<=100){
      return `rgba(200, 30, 30,1)`
    }
    else{
      return `rgba(37, 167, 246 ,1)`
    }
};


ShowPrecautions=()=>{
    return  <DiseasePrecaution  Request='Disease' Disease={this.state.Precaution} HidePrecaution={this.HidePrecaution}/>
}

HidePrecaution=()=>{
    this.setState({Precaution:null})
}










ShowDiseases=()=>{
    return (
      
        <div className="column  Card_column">
<div className="col-xl-11 col-md-6 mb-4  ml-1 disease-cintainer" onClick={()=> this.setState({Precaution:'flu'})}>
            <div className="card  shadow h-100 w-100 py-2" style={{borderLeft:` .25rem solid ${this.graphcolor(parseInt(this.state.results.FluProbability)*10)}`,justifyContent:"center"}}>
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className=" h5  text-xl font-weight-bold  text-uppercase mb-1 ml-2" style={{color:`${this.graphcolor(parseInt(this.state.results.FluProbability)*10)}`}}>Flu</div>
                    <div className="row no-gutters align-items-center">
                      <div className="col-auto">
                           <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{parseInt(this.state.results.FluProbability)*10}%</div>
                      </div>
                      <div className="col">
                        <div className="progress progress-sm mr-2">
                          <div className="progress-bar " role="progressbar" style={{width:`${parseInt(this.state.results.FluProbability)*10}%`,backgroundColor:`${this.graphcolor(parseInt(this.state.results.FluProbability)*10)}`}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
          <div className="col-xl-11 col-md-6 mb-4 ml-1 disease-cintainer" onClick={()=> this.setState({Precaution:'heatStroke'})}>
            <div className="card  shadow h-100 w-100 py-2"  style={{borderLeft:` .25rem solid ${this.graphcolor(parseInt(this.state.results.HeatStrokeProbability)*10)}`}}>
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className=" h5  text-xl font-weight-bold  text-uppercase mb-1 ml-2" style={{color:`${this.graphcolor(parseInt(this.state.results.HeatStrokeProbability)*10)}`}}>Heat Stroke</div>
                    <div className="row no-gutters align-items-center">
                      <div className="col-auto">
                        <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{parseInt(this.state.results.HeatStrokeProbability)*10}%</div>
                      </div>
                      <div className="col">
                        <div className="progress progress-sm mr-2">
                          <div className="progress-bar " role="progressbar" style={{width:`${parseInt(this.state.results.HeatStrokeProbability)*10}%`,backgroundColor:`${this.graphcolor(parseInt(this.state.results.HeatStrokeProbability)*10)}`}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>



         


          <div className="col-xl-11 col-md-6 mb-4 ml-1 disease-cintainer" onClick={()=> this.setState({Precaution:'dangue'})}>
            <div className="card  shadow h-100 w-100 py-2" style={{borderLeft:` .25rem solid ${this.graphcolor(parseInt(this.state.results.Dangueprobability)*10)}`}}>
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className=" h5 text-xl font-weight-bold  text-uppercase mb-1 ml-2" style={{color:`${this.graphcolor(parseInt(this.state.results.Dangueprobability)*10)}`}}>Dangue</div>
                    <div className="row no-gutters align-items-center">
                      <div className="col-auto">
                        <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{parseInt(this.state.results.Dangueprobability)*10}%</div>
                      </div>
                      <div className="col">
                        <div className="progress progress-sm mr-2">
                          <div className="progress-bar " role="progressbar" style={{width: `${parseInt(this.state.results.Dangueprobability)*10}%`,backgroundColor:`${this.graphcolor(parseInt(this.state.results.Dangueprobability)*10)}`}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>










          <div className="col-xl-11 col-md-6 mb-4 ml-1 disease-cintainer" onClick={()=> this.setState({Precaution:'cold'})}>
            <div className="card  shadow h-100 w-100 py-2" style={{borderLeft:` .25rem solid ${this.graphcolor(parseInt(this.state.results.ColdProbability)*10)}`}}>
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className=" h5  text-xl font-weight-bold  text-uppercase mb-1 ml-2" style={{color:`${this.graphcolor(parseInt(this.state.results.ColdProbability)*10)}`}}>Cold</div>
                    <div className="row no-gutters align-items-center">
                      <div className="col-auto">
                  <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{parseInt(this.state.results.ColdProbability)*10}%</div>
                      </div>
                      <div className="col">
                        <div className="progress progress-sm mr-2">
                          <div className="progress-bar " role="progressbar" style={{width:`${parseInt(this.state.results.ColdProbability)*10}%`,backgroundColor:`${this.graphcolor(parseInt(this.state.results.ColdProbability)*10)}`}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
</div>


                          
    )
}







    render() {
          
       
        return (
           
            <article>
                 
							<div className="image round">
								<img src={disease_prediction} className='logo'alt="Disease Perdiction Logo" />
							</div>
							<header>
								<h3>Disease Prediction</h3>
							</header>
                            {this.state.showError==true? <this.AlertDismissibleExample />:
                                   this.state.datagethered==false? this.PerdictionMaking():
                                   this.state.Precaution!=null? this.ShowPrecautions():
                                    <this.ShowDiseases/>
                                    }
                              
			</article>
            
        )
    }
}

export default DiseasePerdiction
