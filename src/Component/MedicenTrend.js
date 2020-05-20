import React, { Component } from 'react'

import MedicineTrend from './images/medicen_trend.png'
import './assets/css/main.css';
import { render } from 'react-dom';
import { Levels } from 'react-activity';
import 'react-activity/dist/react-activity.css';
import {Alert,Container,Row,Card,Carousel,Col,Image} from 'react-bootstrap'
import HorizontalScroll from 'react-scroll-horizontal'


export class Medicine extends Component {

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
             current_results:null,
             Future_results:null,
       Precaution:null,
       Temp:null,
       index:0,
       indexFuture:0
        }
        this.AlertDismissibleExample=this.AlertDismissibleExample.bind(this)
        
	}
	
	getCurrentMedi=(MaxTemp,MinTemp,Humidity,WindSpeed)=>{
    this.setState({datagethered:null})
    if(MinTemp>=30 && MaxTemp >=30 && Humidity<40){
        Humidity=50
        }
        console.log('Medicine suggestion '+ MaxTemp, MinTemp,Humidity,WindSpeed);
        fetch(`https://weather-care.herokuapp.com/Medicine?MinTemp=${MinTemp}&MaxTemp=${MaxTemp}&WindSpeed=${WindSpeed}&Humidity=${Humidity}`)
         .then(Response=>Response.json())
         .then( async myjson=>{
            this.setState({current_results:myjson.results})
              this.getFutureMedicines(this.props.Week_MinTemp,this.props.Week_MaxTemp,this.props.Week_Humidity,this.props.Week_WindSpeed)
              
         }).catch(error=>{
            this.setState({Error:'We are sorry there is an error while generating  current Medicine Trends try again by Pressing Reload Perdiction button or by reloading the app'})
            this.setState({showError:true})
            
         })
    }





     getFutureMedicines=(MinTemp,MaxTemp,Humidity,WindSpeed)=>{
        console.log('future '+ MaxTemp, MinTemp,Humidity,WindSpeed);
        if(MinTemp>=30 && MaxTemp >=30 && Humidity<40){
        Humidity=50
        }
        if(Humidity<40){
            Humidity=50  
        }
        fetch(`https://weather-care.herokuapp.com/Medicine?MinTemp=${MinTemp}&MaxTemp=${MaxTemp}&WindSpeed=${WindSpeed}&Humidity=${Humidity}`)
            .then((response)=> response.json())
            .then( (myjson)=>{
                console.log('Future result ',myjson.results);
             this.setState({Future_results:myjson.results})
             this.setState({datagethered:true})
         
       }).catch((err)=> {
        this.setState({Error:'We are sorry there is an error while generating  Future Medicine Trends try again by Pressing Reload Perdiction button or by reloading the app'})
        this.setState({showError:true})         
      })
    }















	componentDidMount(){
		this.state.MinTemp=this.props.MinTemp;
		this.state.MaxTemp=this.props.MaxTemp;
		this.state.Humidity=this.props.Humidity;
		
		this.getCurrentMedi( this.props.MaxTemp, this.props.MinTemp,this.props.Humidity,this.props.WindSpeed);
	   
   }

   PerdictionMaking=()=>{
	return (<div style={{marginTop:'6rem'}}>
				<h3>Generating Medicine Trends</h3>
				  <Levels  size='25px'/>
			</div>)
 }

 //error message
 AlertDismissibleExample() {
    
    return (
      <Alert variant="danger" >
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          {this.state.Error}
        </p>
        <button onClick={()=>{this.getCurrentMedi( this.props.MaxTemp, this.props.MinTemp,this.props.Humidity,this.props.WindSpeed);this.setState({showError:false});this.setState({Error:null})}} >Reload Medicine Trends</button>
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


 

FluNames=['Theraflu for (Flu)','NeoCitran for (Flu)','Panadol for (Flu)','Infuza for (Flu)','Daytime for (Flu)','equate for (Flu)']

ColdNames=['Umcka for (Cold)','ActionCold for (Cold)','Coldrex for (Cold)','Codral for (Cold)','EaseACold for (Cold)','Mucinex for (Cold)']

DengueNames=['Paplate for (Dengue)','Caricam for (Dengue)','Den-Go for (Dengue)','Dengue Mar for (Dengue)','WL58 drops for (Dengue)','Paplate syrup for (Dengue)']

HSNames=['INTACAL-D for (Heat stroke)','Medroxyprogesterone for (Heat stroke)','Clonazepam for (Heat stroke)','Clonazepam0.25 for (Heat stroke)','Rivotril for (Heat stroke)','Clorest0.25 for (Heat stroke)']

id=-1
Current_medicen_image=()=>{
    var myid1=-1;
    if(this.state.datagethered!=null){
        if(this.state.current_results==null){
            return (
                <Alert variant={'primary'}>
                No medicine is required currently
              </Alert>
            )
        }
        else{
      return   this.state.current_results.map(data=>{
        if(myid1==5){
          myid1=-1
        }
       myid1=myid1+1
       console.log(this.DengueNames);
       
       return(
          <div key={this.id++} style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center',marginLeft:17,marginRight:10}}>
            
            <img   src={data.mediUrl} className="Image_height2" />
            <h6>{data.disease=='Flu'?this.FluNames[myid1]: data.disease=='Cold'?this.ColdNames[myid1] : data.disease=='H-S'?this.HSNames[myid1] :data.disease=='Dengue'?this.DengueNames[myid1]: 'no name'}
            </h6>
          </div>
       )
     })  }
    }else{
        return( <div>
             <h3>Generating Medicines</h3>
               <Levels  size='25px'/>
           </div>)
       }
  }


  
Future_image_Medicine=()=>{
    var myid1=-1;
    var id=-1
    if(this.state.datagethered!=null){
        if(this.state.Future_results==null){
            return (
                <Alert variant={'primary'}>
               No Medicine is  Required for future
                
               </Alert>
            )
        }
        else{
      return   this.state.Future_results.map(data=>{
        if(myid1==5){
          myid1=-1
        }
       myid1=myid1+1
       console.log(this.DengueNames);
       
       return(
          <div  style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center',marginLeft:17}}>
            
            <img   src={data.mediUrl} className="Image_height2" />
            <h6>{data.disease=='Flu'?this.FluNames[myid1]: data.disease=='Cold'?this.ColdNames[myid1] : data.disease=='H-S'?this.HSNames[myid1] :data.disease=='Dengue'?this.DengueNames[myid1]: 'no name'}
            </h6>
          </div>
       )
     })   }
    }else{
        return( <div>
             <h3>Generating Medicines</h3>
               <Levels  size='25px'/>
           </div>)
       }
  }

















    render() {
        console.log('current medi',this.state.current_results);
        console.log('future medi',this.state.Future_results);
        return (
            <article style={{marginTop:'4rem'}}>
							<div className="image round">
								<img src={MedicineTrend} className='logo'alt="Disease Perdiction Logo" />
							</div>
							<header>
								<h3>Medicine Trend</h3>
							</header>
							{this.state.showError==true? <this.AlertDismissibleExample />:
								   this.state.datagethered==null? this.PerdictionMaking():
                                   this.state.Precaution!=null? this.ShowPrecautions():
                                   <>
                                     <Container style={{marginTop:'1rem'}}>
                                     <Row className="justify-content-md-center " >
                                     <Col  >
                                     <h4>Currently Required Medicine</h4>
                                     <div  class='image-boundary'>
                                         
                                      <this.Current_medicen_image/>
                                      </div>
                                      </Col>
                                      <Col md="auto"></Col>
                                      <Col >
                                      <h4>Future Requirment of Medicine</h4>
                                    <div  class='image-boundary'>
                                    <this.Future_image_Medicine/>
                                    </div>
                                    </Col>
                                    </Row>
                                    </Container>
                                     <button onClick={()=>{this.getCurrentMedi( this.props.MaxTemp, this.props.MinTemp,this.props.Humidity,this.props.WindSpeed);this.setState({showError:false});this.setState({Error:null})}} className="button">Reload</button>
                                </>
									}
								     
						</article>
        )
    }
}

export default Medicine
