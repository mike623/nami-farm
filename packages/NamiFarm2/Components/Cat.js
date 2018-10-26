import React, { Component } from 'react';
import { Body } from 'react-game-kit/native'; 
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Cow extends Component {

static contextTypes = {
    loop: React.PropTypes.object,
  };
  update = () => {
    //Logic goes here
    console.log("cow")
  }

  componentDidMount() {
      this.context.loop.subscribe(this.update);
    // Matter.Events.on(this.context.engine, 'afterUpdate', this.update);
  }

  componentWillUnmount() {
    // Matter.Events.off(this.context.engine, 'afterUpdate', this.update);
  }
  render() {
      return (
          <Body>
            <View></View>
          </Body>
      )
  }
}