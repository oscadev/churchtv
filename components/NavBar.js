import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import config from '../individual';

export const NavBar = () => {
  return (
    <View style={styles.bar}>
      {/* <Image resizeMode="contain" style={{height:128, marginLeft:64}} source={config.logo}></Image> */}
      {/* <Image
        resizeMode="cover"
        style={{height: 128, width: '50%'}}
        source={config.logo}></Image>
      <Image
        resizeMode="cover"
        style={{height: 128, width: '50%'}}
        source={config.logo}></Image> */}
      <View
        style={{
          flexDirection: 'row',

          height: 128,
          justifyContent: 'center',
          alignItems: 'center',
          width: 500,
        }}>
        <Text style={styles.title}>Torah</Text>
        <Text style={{...styles.title, fontWeight: '300'}}>TV</Text>
        <Text style={styles.title}>App</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    height: '5%',
    overflow: 'visible',
  },

  item: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
    width: 300,
    height: 300,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    margin: 32,
  },
  desc: {
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Menlo',
    fontSize: 35,
    color: 'lightblue',
    backgroundColor: 'black',
  },
  bar: {
    width: '100%',
    height: 128,
    backgroundColor: config.tan,

    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 64,
    // margin: 64,
    color: config.tanDark,
    fontWeight: '700',
  },
});
