import React, { Component } from 'react';
import './App.css';
import accPressed from './images/accPressed.svg';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Car />
      </div>
    );
  }
}

class Car extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moving: false,
      stopping: false,
      accPaddle: require('./images/paddle.png'),
      brakePaddle: require('./images/paddle.png')
    };
   this.accelerate = this.accelerate.bind(this);
   this.deaccelerate = this.deaccelerate.bind(this);
  }

  accelerate() {
    this.setState(
      {
        stoping: false,
        moving: true,
        accPaddle: accPressed,
        brakePaddle: require('./images/paddle.png')
      }
    );
  }

  deaccelerate() {
    this.setState(
      {
        moving: false,
        stoping: true,
        brakePaddle: accPressed,
        accPaddle: require('./images/paddle.png')
      }
    );
  }

  _handleKeyDown(event) {
    if(event.keyCode === 65 ) {
      this.accelerate();
    }
    if(event.keyCode === 66 ) {
      this.deaccelerate();
    }
  }

  componentWillMount() {
    document.addEventListener("keydown", this._handleKeyDown.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this._handleKeyDown.bind(this));
  }

  render(){
    return(
      <div id='car' onKeyPress={this.handleKeyPress}>
        <img src={require('./images/car.jpg')} alt='car gif' width='1340px' height='490px' id='carImg'/>
        <Wheel moving={this.state.moving} stoping={this.state.stoping} />
        <Accelerator onClick={this.accelerate} src={this.state.accPaddle} />
        <Brake onClick={this.deaccelerate} src={this.state.brakePaddle}  />
      </div>
    );
  }
}

const Wheel = ({moving, stoping}) =>
<div>
  <div id='wheel1'>
    <img src={require('./images/wheel1.gif')} alt='dynamic wheel' width='200px' height='200px'
     className={(moving ? 'accelerating' : '') + (stoping ? 'deaccelerating' : '')} />
  </div>
  <div id='wheel2'>
    <img src={require('./images/wheel.gif')} alt='dynamic wheel' width='200px' height='200px'
     className={(moving ? 'accelerating' : '') + (stoping ? 'deaccelerating' : '')} />
  </div>
</div>

const Accelerator = ({onClick, src}) =>
<img src={src} alt='acceleration paddle' width='180px' height='180px' id='acc'
 className='paddle' onClick={onClick} />

const Brake = ({onClick, src}) =>
<img src={src} alt='brake paddle' width='180px' height='180px' id='brake'
 className='paddle' onClick={onClick} />

export default App;
