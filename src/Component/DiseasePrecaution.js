import React, { Component } from 'react'
import './assets/css/main.css';
import { render } from 'react-dom';
import { Spinner } from 'react-activity';
import 'react-activity/dist/react-activity.css';
import {Alert} from 'react-bootstrap'
import 'react-bootstrap'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

export class DiseasePrecaution extends Component {
constructor(props) {
    super(props)

    this.state = {
         Error:null,
         showError:false,
         datagethered:false,
         Precaution:[]
    }
    this.AlertDismissibleExample=this.AlertDismissibleExample.bind(this)
}
 GetPrecautions=()=>{
     
    fetch(`https://weather-care.herokuapp.com/Precaution?Disease=${this.props.Disease}`)
    .then(response=>response.json())
    .then(myjson=>{
          this.setState({Precaution:myjson.Precautions})
          this.setState({datagethered:true})
          console.log(this.state.Precaution);
    }).catch(err=>{
        this.setState({Error:`We are sorry there is an error while Getting Precautions for ${this.props.Disease} try again by Pressing Reload Perdiction button or by reloading the app`})
        this.setState({showError:true})
    })
 }

 GetDressingPrecautions=()=>{
     var weather;
     if(this.props.Disease=='Very hot'){
         weather='Veryhot'
     }
     else{
         weather=this.props.Disease
     }
    fetch(`https://weather-care.herokuapp.com/dressingDiscription?Weather=${this.props.Disease}`)
    .then(response=>response.json())
    .then(myjson=>{
          this.setState({Precaution:myjson.Precautions})
          this.setState({datagethered:true})
          console.log('Dressing discription'+this.state.Precaution);
    }).catch(err=>{
        this.setState({Error:`We are sorry there is an error while Getting Precautions for ${this.props.Disease} try again by Pressing Reload Perdiction button or by reloading the app`})
        this.setState({showError:true})
    })
 }




componentDidMount(){
    if(this.props.Request=='Disease'){
    this.GetPrecautions();}
    else if (this.props.Request=='Dressig'){
     this.GetDressingPrecautions();
    }
}

PerdictionMaking=()=>{
	return (<div>
				<h3>Generating Precautions  for {this.props.Request=='Disease'? ` ${this.props.Disease} `: `${this.props.Disease} weather`}</h3>
				  <Spinner  size='25px'/>
			</div>)
 }





CreateTimeLine=()=>{
    return this.state.Precaution.map(data=>{
          
        return(
            
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              contentArrowStyle={{ borderRight: '8px solid  rgb(33, 150, 243)' }}
              iconStyle={{ background: 'rgb(33, 150, 243)', color: 'rgb(33, 150, 243)' }}
             
            >
              <h6 className="vertical-timeline-element-title" >{data.title}</h6>
              
              <p className="vertical-timeline-element-title" style={{fontSize:'.7rem'}}>
                {data.description}
              </p>
            </VerticalTimelineElement>
           
             )
      })  
    
    
    
    
    
}



 //error message
 AlertDismissibleExample() {
    
    return (
      <Alert variant="danger">
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          {this.state.Error}
        </p>
        <button onClick={()=>{this.GetPrecautions();this.setState({showError:false});this.setState({Error:null})}} >Reload Suggestion</button>
      </Alert>
    );
}


    render() {
        return (
            <div  className="column">
                <h4>{this.props.Request=='Disease'?`Precautions For ${this.props.Disease}`:`Dressing Suggestions For ${this.props.Disease} Weather`}</h4>
                <div class='Precation-boundary'>
                 {this.state.showError==true?<this.AlertDismissibleExample />:
                                   this.state.datagethered==false? this.PerdictionMaking():
                                   <VerticalTimeline  ><this.CreateTimeLine/></VerticalTimeline  >
									}

                 </div>
                <button className='button' onClick={()=>this.props.HidePrecaution()}>Go Back</button>
            </div>
        )
    }
}

export default DiseasePrecaution
