import React, { Component } from 'react'
import './assets/css/main.css';
import logo from './images/splash.png';
import disease_prediction from './images/disease_prediction.png'
import dressing_suggestions from './images/dressing_suggestions.png'
import Perdiction from './Perdiction.js'
import Form from './Form.js'
import { Link,Scroll } from "react-scroll";
import {Navbar,Nav,Button,FormControl} from 'react-bootstrap'
export class Header extends Component {
	
	constructor(props) {
		super(props)
	
		this.state = {
			 Selection:''
		}
	}
	
    render() {
        return (
            <div style={{width:'100%'}}>
                
				<Navbar collapseOnSelect  fixed="top" variant="light" bg="light" style={{zIndex:'50000'}}>
						<Navbar.Brand href="#home" > Weather Care +</Navbar.Brand >
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
					<Nav style={{alignSelf:'flex-end'}}>
					<Nav.Link href="https://www.linkedin.com/in/chaudary-suleman-53656219a" target="__blank"><i class="fa fa-linkedin icon" style={{fontSize:'20px'}} ></i></Nav.Link>
					<Nav.Link href="https://www.facebook.com/alx.salman" target="__blank"><i class="fa fa-facebook icon"  style={{fontSize:'20px'}} ></i></Nav.Link>
					<Nav.Link href="https://github.com/SULEMAN-SHOUKAT?tab=repositories" target="__blank"><i class="fa fa-github icon" style={{fontSize:'20px'}}></i></Nav.Link>
					</Nav>
  </Navbar.Collapse>
</Navbar>
                <header id="header">
				
				<div className="inner">
					<img className="logo" src={logo} alt="Logo Image"/>
				</div>
			</header>
              
             
            <section id="banner">
			
				<div className="inner">
					<header>
						<h1>Welcome to Weather Care +</h1>
					</header>

					<div className="flex ">

						<div>
							<img src={disease_prediction} className='logo'alt="Disease Perdiction Logo" />
							<h3>Disease Prediction</h3>
							<p>Perdict chances of accurance of current diseases</p>
							<p>and give precautions to prevent them.</p>
						</div>

						<div>
							<img src={dressing_suggestions} className='logo'alt="Disease Perdiction Logo" />
							<h3>Dressing Suggestion</h3>
							<p>Suggest appropriate dressing according to weather</p>
							<p>and give some extra details on suggestion.</p>
						</div>



					</div>

					<footer>
						 <Link to="option" href="#" spy={true}  smooth={true}    offset={-70}   duration= {500}  onClick={()=>this.setState({Selection:'Perdiction'})}  className="button">Generate  Auto  Prediction</Link>
						 
					</footer>
					
					<Link  to="option" href="#" onClick={()=>this.setState({Selection:'Form'})} spy={true} smooth={true}    offset={-70}   duration= {500}  className="button" style={{marginTop:'2rem'}}>Generate Manual Prediction</Link>
				
					{this.state.Selection==''?
				<div className='copyright_margin'>
						<div className="copyright">
						&copy;Weather Care +
                        
					</div>
            <div className="copyright" >
			Developed by <a href='https://suleman-shoukat.github.io/Myportfolio/' target="_blank">Suleman Shoukat</a>
			
					</div>  
					<a href='https://drive.google.com/open?id=15diD8koJVU4qrNaPr6CJVOYKNWWHumv8' target="_blank">Get our Android App for free</a>
					</div>
					:null}
				
				</div>
				
			</section>
			
              {this.state.Selection=='Perdiction' ? <Perdiction Process='Auto Perdiction'/>:this.state.Selection=='Form'? <Form />:null}
			
			  <div id='option'></div>
			
            </div>
        )
    }
}

export default Header
