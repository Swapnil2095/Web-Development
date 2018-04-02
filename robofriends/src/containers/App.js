import React, {Component} from 'react';
import CardList from '../components/CardList';
//import {robots} from '../components/robots';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state={
      robots: [],
      searchfield: ''
    }
    console.log('constructor');
  }

 componentDidMount(){
   fetch('https://jsonplaceholder.typicode.com/users')
    .then(responce => responce.json())
    .then(users => this.setState({robots : users}));

   console.log('componentDidMount');
 }
  onSearchChange = (event) => {
    this.setState({searchfield: event.target.value})
    //console.log(event.target.value);

    //console.log(filterRobots)
  }

  render(){
    const {robots, searchfield} = this.state;
    const filterRobots = robots.filter(robot=>{
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })

    return !robots.length ?
      <h1 className = 'tc'> Loading </h1> :
      (
        <div className = 'tc'>
          <h1 className ='f1'> Robo Friends </h1>
          <SearchBox searchChange={this.onSearchChange}/>
          <Scroll>
            <CardList robots = {filterRobots} />
          </Scroll>
        </div>
      );

  }
}

export default App;
