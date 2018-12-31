import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: '371ff9bd3e2d4057af2720ebf431cb1e'
 });

const particlesOption = {
  particles: {
    number:{
      value:150,
      density:{
        enable:true,
        value_area:800
      }
    }
  }
}
class App extends Component {
  constructor(){
    super();
    this.state ={
      input:'',
      imageUrl: ''
    }
  }
  calculateFaceBox = (data) =>{
    const clarifaiface = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiface.left_col *width,
      topRow: clarifaiface.top_row *height,
      rightCol: width -(clarifaiface.right_col * width),
      bottomRow: height -(clarifaiface.bottom_row *height)
    }
  
  }
  displayFaceBox = (box)=>{
    console.log(box);
    this.setState({box:box})
  }
  onInputChange = (event) =>{
    this.setState({input: event.target.value})
  }
  onButtonSubmit = () =>{
    this.setState({imageUrl: this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL,
     this.state.input)
     .then(response =>this.displayFaceBox(this.calculateFaceBox(response)))
     .catch(err=>console.log(err))
  }
  render() {
    return (
      <div className="App">
      <Particles className="particles" params={particlesOption} />
       <Navigation />
       <Logo />
       <Rank />
       <ImageLinkForm 
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
       />
       <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
