import React, { Component } from 'react'
import './assets/css/main.css';
import {Modal} from 'react-bootstrap'
import Perdiction from './Perdiction';

export class Form extends Component {


    constructor(props) {
        super(props)
    
        this.state = {
             MaxTemp:null,
             MinTemp:null,
             Humidity:null,
             WindSpeed:null,
             MaxTempWarning:null,
             MinTempWarning:null,
             WindspeedWarning:null,
             HumidityWarning:null,
            FormModalShow:false,
            FormError:null,
            ManualPerdiction:null
        }
        this.handleFormChange= this.handleFormChange.bind(this);
        this.MyVerticallyCenteredModal=this.MyVerticallyCenteredModal.bind(this);
    }
    
    
    // handling form changes and errors
    handleFormChange(event){
        if(event.target.name==='MaxTemp'){
            console.log(typeof event.target.value);
            this.setState({MaxTemp:event.target.value});
                this.setState({MaxTempWarning:null})
                this.setState({ManualPerdiction:false})
              if(event.target.value>60 || event.target.value < -60){
                    this.setState({MaxTempWarning:'be realistic only (-60 to 60)°C Temperature accepted'})
                  
                }
            
           
             
        }
        if(event.target.name==='MinTemp'){
            this.setState({MinTemp: event.target.value});
            this.setState({MinTempWarning:null})
            this.setState({ManualPerdiction:false}) 
            
            if(event.target.value<-60 || event.target.value>60){
                this.setState({MinTempWarning:'be realistic only (-60 to 60)°C Temperature accepted'})
                
            }

          
        }
        if(event.target.name==='Humidity'){
            this.setState({Humidity: event.target.value});
            this.setState({HumidityWarning:null})
            this.setState({ManualPerdiction:false}) 
            if(event.target.value>100 || event.target.value<0){
                this.setState({HumidityWarning:'Humidity must be between (0,100)%'})
                
            }
        }
        if(event.target.name==='WindSpeed'){
            this.setState({WindSpeed: event.target.value});
            this.setState({WindspeedWarning:null})
            this.setState({ManualPerdiction:false})
            if(event.target.value>100 || event.target.value<0){
                this.setState({WindspeedWarning:'wind speed must be between (0,100)(miles per hour)'})
              
            }
        }
        
      }
    
    //handel manual Perdiction
      ManualPerdiction=()=>{
          console.log(this.state.MaxTemp,this.state.MinTemp);
          
             if(this.state.MaxTemp==null || this.state.MinTemp==null || this.state.Humidity==null || this.state.WindSpeed==null){
                this.setState({FormError:"Please fill out all the feilds every feild required as it is important to generate perdiction and also fill the data correctly and try again"})        
                this.setState({FormModalShow:true})
                this.setState({ManualPerdiction:false})
                         
             }
             else if ((this.state.MaxTemp>60 ||this.state.MaxTemp< -60) || (this.state.MinTemp>60 || this.state.MinTemp<-60) || (this.state.Humidity>100 || this.state.Humidity <0) ||(this.state.WindSpeed>100 || this.state.WindSpeed<-60)){
                this.setState({FormError:"Please fill all the feilds as required you may violate the rule of range or typed wrong value. please read the discriptions given in input or feilds or read the red line and try again"})        
                this.setState({FormModalShow:true}) 
                this.setState({ManualPerdiction:false})
                
                
             }
             else if(parseInt(this.state.MaxTemp)    < parseInt(this.state.MinTemp)  ){
                this.setState({FormError:"Please fill all the feilds as required you give minimum temperature value greater then  the maximum temperature value please correct them"})        
                this.setState({FormModalShow:true}) 
                this.setState({ManualPerdiction:false})
             }
             else{
                console.log(this.state.MaxTemp,this.state.MinTemp,this.state.Humidity,this.state.WindSpeed,this.state.ManualPerdiction);
                 
                 this.setState({ManualPerdiction:true})
                
             }
      }
    
    
    
    
       MyVerticallyCenteredModal(props) {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header >
              <Modal.Title id="contained-modal-title-vcenter">
              Form Submission Error
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Error Discription</h4>
              <p>
                {this.state.FormError}
              </p>
            </Modal.Body>
            <Modal.Footer>
              <button onClick={props.onHide} >Close</button>
            </Modal.Footer>
          </Modal>
        );
      }
    
componentDidMount(){
    console.log('form component did mount');
    console.log(this.state.MinTemp);
    console.log(this.state.MaxTemp);
}
setFormView=()=>{
    this.setState((state,prop)=>({
        MaxTemp:null,
        MinTemp:null,
        Humidity:null,
        WindSpeed:null,
        MaxTempWarning:null,
        MinTempWarning:null,
        WindspeedWarning:null,
        HumidityWarning:null,
       FormModalShow:false,
       FormError:null,
       ManualPerdiction:null
    }))
    
    
}

    render() {
        if(this.state.ManualPerdiction==true){
            return <Perdiction MaxTemp={this.state.MaxTemp} MinTemp={this.state.MinTemp} Humidity={this.state.Humidity} WindSpeed={this.state.WindSpeed} Process='Manual Perdiction' setFormView={this.setFormView} />
        }
        else{
        return (
          
            <footer id="footer">
				<div className="inner">

					<h3>Manual Perdiction</h3>
                    <form onSubmit={(e)=>e.preventDefault()}>
						<div className="field half first">
							<label htmlFor="name">Maximum Temperature of day in °C</label>
							<input name="MaxTemp" type="number" id="MaxTemp"  maxLength='3'   onChange={this.handleFormChange} placeholder="Give temperatue in between (-60 to 60)°C" />
                            <label htmlFor="name" style={{color:`red`}}>{this.state.MaxTempWarning}</label>
                        </div>
						<div className="field half">
							<label htmlFor="email">Minimum Temperature of day in °C</label>
                            <input name="MinTemp" type="number" id="MinTemp" maxLength='3'   onChange={this.handleFormChange}  placeholder="Give temperatue in between (-60 to 60)°C"/>
                            <label htmlFor="name" style={{color:`red`}}>{this.state.MinTempWarning}</label>
                        </div>
						<div className="field half first">
							<label htmlFor="name">Humidity of day in %</label>
							<input name="Humidity" type="number" id="Humidity" maxLength='3'   onChange={this.handleFormChange}  placeholder="Give humidity in between (0 to 100)%" />
                            <label htmlFor="name" style={{color:`red`}}>{this.state.HumidityWarning}</label>
                        </div>
						<div className="field half">
							<label htmlFor="email">Wind Speed of day in mph (miles per hour)</label>
							<input name="WindSpeed" type="number" id="WindSpeed" maxLength='3'  onChange={this.handleFormChange}  placeholder="Give Wind speed in between (0 to 100)mph"/>
                            <label htmlFor="name" style={{color:`red`}}>{this.state.WindspeedWarning}</label>
                        </div>
						<ul className="actions">
						<li><a  href="#"  className="button alt" onClick={(e)=>{this.ManualPerdiction();e.preventDefault()}}>Generate Prediction</a></li>
						</ul>
					</form>
                    
					<div className="copyright">
						&copy;Weather Care +
                        
					</div>
                    <div className="copyright">
						Developed by <a href='https://suleman-shoukat.github.io/Myportfolio/' target="_blank">Suleman Shoukat</a>
                        <div><a href='https://drive.google.com/open?id=1J3WK88EeLjgDYdllY4mBjfIx92XtFwXu' target="_blank">Get our Android App for free</a></div>
				
                    </div>
                    	</div>

                

                <this.MyVerticallyCenteredModal
        show={this.state.FormModalShow}
        onHide={() => this.setState({FormModalShow:false})}
      />
         

			</footer>
            
        )}
    }
}

export default Form
