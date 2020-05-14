import React, { Component } from 'react'
import   dressing_suggestions from './images/dressing_suggestions.png';
import './assets/css/main.css';
import { render } from 'react-dom';
import { Levels } from 'react-activity';
import 'react-activity/dist/react-activity.css';
import {Alert,Card,Carousel,Col,Image} from 'react-bootstrap'
import DiseasePrecaution from './DiseasePrecaution';



export class DressingSuggestion extends Component {

	constructor(props) {
        super(props)
    
        this.state = {
             results:{},
             Error:null,
             showError:false,
             MaxTemp:null,
			 MinTemp:null,
			 Humidity:null,
			 datagethered:null,
       Precaution:null,
       Temp:null,
       index:0
        }
        this.AlertDismissibleExample=this.AlertDismissibleExample.bind(this)
        this.ControlledCarousel=this.ControlledCarousel.bind(this)
	}
	
	getDressingSuggestions=(MaxTemp,MinTemp)=>{
    this.setState({datagethered:null})
    var _MinTemp=MinTemp;
    var _MaxTemp=MaxTemp
		if((MinTemp==MaxTemp) ||(MinTemp-MaxTemp<6)){
      _MaxTemp=MaxTemp+5;
				 _MinTemp=MinTemp-5;
		}
        fetch(`https://weather-care.herokuapp.com/Dressing?MinTemp=${_MinTemp}&MaxTemp=${_MaxTemp}`)
         .then(Response=>Response.json())
         .then( async myjson=>{
              await this.setState({results:myjson.urls})
              this.setState({datagethered:true})
              console.log(this.state.results);
              
         }).catch(error=>{
            this.setState({Error:'We are sorry there is an error while generating Dressing Suggestion try again by Pressing Reload Perdiction button or by reloading the app'})
            this.setState({showError:true})
            
         })
    }

	componentDidMount(){
		this.state.MinTemp=this.props.MinTemp;
		this.state.MaxTemp=this.props.MaxTemp;
		this.state.Humidity=this.props.Humidity;
		console.log('dressing suggestion '+this.state.MaxTemp, this.state.MinTemp,this.state.Humidity);
		this.getDressingSuggestions( this.state.MaxTemp, this.state.MinTemp);
	   
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
        <button onClick={()=>{this.getDressingSuggestions( this.state.MaxTemp, this.state.MinTemp);this.setState({showError:false});this.setState({Error:null})}} >Reload Suggestions</button>
      </Alert>
    );
}
ShowPrecautions=()=>{
    return  <DiseasePrecaution Request='Dressig'  Disease={this.state.Precaution} HidePrecaution={this.HidePrecaution}/>
}

HidePrecaution=()=>{
    this.setState({Precaution:null})
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


 




ControlledCarousel() {
 
console.log('carusal runig');

  const handleSelect = (selectedIndex, e) => {
    this.setState({index:selectedIndex})
  };
  if(this.state.datagethered!=null){
  return (
    <Carousel activeIndex={this.state.index} onSelect={handleSelect}>
    
    <Carousel.Item>
    <Image  rounded
      className="Image_height"
      alt="Image"
        src={this.state.results[0].url}
      />
    </Carousel.Item>


    <Carousel.Item>
    <Image  rounded
        className="Image_height"
      alt="Image"
      height="290px"
        src={this.state.results[1].url}
      />
    </Carousel.Item>


   <Carousel.Item>
   <Image  rounded
 className="Image_height"
      alt="Image"
        src={this.state.results[2].url}
      />
   </Carousel.Item>


   <Carousel.Item>
   <Image  rounded
      alt="Image"
      className="Image_height"
        src={this.state.results[4].url}
      />
   </Carousel.Item>
   <Carousel.Item>
   <Image  rounded
      alt="Image"
      className="Image_height"
        src={this.state.results[3].url}
      />
    </Carousel.Item>
   <Carousel.Item>
   <Image  rounded
      alt="Image"
      className="Image_height"
        src={this.state.results[5].url}
      />
   </Carousel.Item>


    </Carousel>
  );
}
else{
 return( <div>
      <h3>Generating Dresses</h3>
        <Levels  size='25px'/>
    </div>)
}
}
































    render() {
        return (
            <article>
							<div className="image round">
								<img src={dressing_suggestions} className='logo'alt="Disease Perdiction Logo" />
							</div>
							<header>
								<h3>Dressing Suggestions</h3>
							</header>
							{this.state.showError==true? <this.AlertDismissibleExample />:
								   this.state.datagethered==null? this.PerdictionMaking():
								   this.state.Precaution!=null? this.ShowPrecautions():
                                     <div >
                                       <div style={{display:'flex',justifyContent:'space-around',flexDirection:'row'}}>
                                       <Card style={{ width: '13rem' }}>
                                              <Card.Body>
                                                      <Card.Title><div className=" h8  text-xl   text-uppercase mb-1 ml-2" style={{fontWeight:'-moz-initial'}}>TEMP</div></Card.Title>
                                              <Card.Text className=" h8  text-xl font-weight-bold  text-uppercase mb-1 ml-2" style={{borderLeft:` .25rem solid ${this.graphcolor(parseInt(this.props.Temp))}`,color:`${this.graphcolor(parseInt(this.props.Temp))}`}}>
                                             {this.props.Temp}°C
                                        </Card.Text>
                                      </Card.Body>
                                    </Card>
                                    <Card style={{ width: '13rem' }}>
                                              <Card.Body>
                                                      <Card.Title> <div className=" h5  text-xl   text-uppercase mb-1 ml-2"  style={{fontWeight:'-moz-initial'}}>Humidity</div></Card.Title>
                                              <Card.Text className=" h8  text-xl font-weight-bold  text-uppercase mb-1 ml-2" style={{borderLeft:` .25rem solid ${this.graphcolor(parseInt(this.props.Humidity))}`,color:`${this.graphcolor(parseInt(this.props.Humidity))}`}}>
                                              {this.props.Humidity}%
                                        </Card.Text>
                                      </Card.Body>
                                    </Card>

                                       </div>
                                     <br />
                                     <div  className="justify-content-md-center">
                                       <Card>
                                            <Card.Header>Dressing Suggestions</Card.Header>
                                            <Card.Body>
                                              <this.ControlledCarousel/>
                                            </Card.Body>
                                          </Card>
                                          <br />
                                     <button className="button"onClick={()=> this.setState({Precaution:`${this.state.results[0].weather}`})}>Description</button>
                                     </div>
                                     </div>
									 
								
									}
								
	                         
						</article>
        )
    }
}

export default DressingSuggestion
