import React, { Component } from 'react';
import { Body, Sprite } from 'react-game-kit/native'; 
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import sprite from './galleryanimals-1.png'

import Matter from 'matter-js';

export default class Cow extends Component {

static contextTypes = {
    loop: React.PropTypes.object,
    engine: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      characterState: 2,
      loop: false,
      spritePlaying: true,
      x: 0, 
      y: 10,
    };
  }

  update = () => {
    //Logic goes here
    console.log("cow")
    this.move()
  }

  componentDidMount() {
    // this.context.loop.subscribe(this.update);
    Matter.Events.on(this.context.engine, 'afterUpdate', this.update);
    Matter.Events.on(this.body, 'collision', function(e) {
    //player.body is in e.pair, do stuff with it
    alert();
    })
  }

  componentWillUnmount() {
    // Matter.Events.off(this.context.engine, 'afterUpdate', this.update);
  }

  move = () => {
    this.setState(p => ({x: p.x+ 10}));
  }

  getWrapperStyles = () => {
    // const { characterPosition, stageX } = this.props.store;
    const { scale } = this.context;
    const { x = 0, y = 0 } = {};
    // const targetX = x + stageX;

    return {
      position: 'absolute',
      transform: `translate(${targetX * scale}px)`,
      transformOrigin: 'left top',
    };
  }

  getWrapperStyles = () => {
      return {
        backgroundColor: 'red',
        height: 32,
        width: 32,
        position: 'absolute',
        transform:[
            {translateX: this.state.x}
        ]   
    }
  }

  render() {
      return (
          <Body
              shape="rectangle"
              args={[this.state.x, 0,  32, 32]}
              density={0.003}
              friction={1}
              frictionStatic={0}
              restitution={0.5}
              ref={(b) => { this.body = b; }}
            >
        <View
            style={this.getWrapperStyles()}
          >
          <Sprite
            repeat={true}
            src={sprite}
            scale={1}
            state={0}
            tileHeight={32}
            tileWidth={32}
            steps={[2, 2]}
          />
          </View>
        </Body>
      )
  }
}