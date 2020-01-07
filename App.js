/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  
} from 'react-native';

import axios from 'axios';


import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { HomePage } from './components/HomePage';
import { NavBar } from './components/NavBar';
import { VideoPlayer } from './components/VideoPlayer';

const App = () => {
  const [page, setPage] = useState([])
  const [XML, setXML] = useState([]);
  const XMLParser = require('react-xml-parser');

  

  const getXML = (url, tag) =>
  {
    
    let stuff = axios.get(url).then(d=>{
      
      var xmlfile = new XMLParser().parseFromString(d.data);    // Assume xmlText contains the example XML
      // console.log(xmlfile);
      // console.log(xmlfile.getElementsByTagName(tag)[0].children,"yeet");
      setXML(xmlfile.getElementsByTagName(tag)[0].children)
      
      
     

    })
      
      
  }

  useEffect(()=>
  {
    setPage(<HomePage data={XML}/>)
    getXML('http://streamingchurch.tv/roku/sctv/xml/categories_new.xml', 'categories')
  },[])

  useEffect(()=>
  {
    setPage(<HomePage data={XML}/>)
    
  },[XML])

  return (
    <>
      <SafeAreaView style={styles.view}>
        <NavBar/>
        {/* {page} */}
        <VideoPlayer/>
        
      </SafeAreaView>
    </>
  );
};



const styles = StyleSheet.create({
  view: {
    backgroundColor: Colors.lighter,
    justifyContent:'center',
    alignItems:'center',
    overflow:'visible'
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
