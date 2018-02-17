import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import FaceRecongnition from './components/FaceRecongnition/FaceRecongnition';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Clarifai from 'clarifai';

import './App.css';

// initialize with your api key. This will also work in your browser via http://browserify.org/

const app = new Clarifai.App({
 apiKey: 'b049a5a360694a899ec4df89c9b3d9ac'
});

// You can also use the SDK by adding this script to your HTML:

//<script type="text/javascript" src="https://sdk.clarifai.com/js/clarifai-latest.js"></script>


const particleOptions = {
  particles: {
    number: {
      value: 200,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width -(clarifaiFace.right_col * width),
      bottomRow: height -(clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) =>{
      this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl:this.state.input})
    console.log("click");
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout'){
        this.setState({isSignedIn: false});
    }else if(route === 'home'){
        this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, imageUrl, box, route } = this.state;
    return (
      <div className="App">
        <Particles className='particles'
              params={particleOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {
          route === 'home'
          ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecongnition box={box} imageUrl={imageUrl}/>
           </div>

          : (
              route === 'signin'
              ? <Signin onRouteChange={this.onRouteChange}/>
              : <Register onRouteChange={this.onRouteChange}/>
          )

        }
      </div>
    );
  }
}

export default App;
