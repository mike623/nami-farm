/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import { Loop, Stage, World } from 'react-game-kit/native'; 


import Cow from './Components/Cow'

const {width, height} = Dimensions.get('window');
import Matter from 'matter-js';


export default class NamiFarm2 extends Component {
   

  physicsInit = (engine) => {
    const right = Matter.Bodies.rectangle(
      0, 0, 810, 60, { isStatic: true, render: {fillStyle: '#000', lineWidth: 1, strokeStyle: '#999', stroke: true} }
    );
    Matter.World.addBody(engine.world, right);
  }

  render() {
    return (
      <Loop>
        <Stage
          width={width/2}
          height={height/2}
        >
          <World
            onInit={this.physicsInit}
            onCollision={alert}
            >
            
          </World>
        </Stage>
      </Loop>
    );
  }
}

// <Cow x={this.state.x} />

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',

  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('NamiFarm2', () => NamiFarm2);
