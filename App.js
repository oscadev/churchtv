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
  const [locat, setLocat] = useState('top')
  const [XML, setXML] = useState([]);
  const XMLParser = require('react-xml-parser');
  const [video, setVideo] = useState(null);

  

  const getXML = (url, tag) =>
  {
    
    axios.get(url).then(d=>{
      
      var xmlfile = new XMLParser().parseFromString(d.data);    // Assume xmlText contains the example XML
      console.log(xmlfile);
      // console.log(xmlfile.getElementsByTagName(tag)[0].children,"yeet");
      setXML(xmlfile.getElementsByTagName(tag)[0].children)
      
      
     

    })
      
      
  }

  const getXMLSub = (url, tag) =>
  {
    console.log('ran sub 1')
    axios.get(url).then(d=>{
      console.log('ran sub 2')
      var xmlfile = new XMLParser().parseFromString(d.data);    // Assume xmlText contains the example XML
      console.log('sub',xmlfile.children);
      // console.log(xmlfile.getElementsByTagName(tag)[0].children,"yeet");
      setXML(xmlfile.children)
      
      
     

    }).catch(e=>console.log('error is:', e))
      
      
  }

  const playVideo = (vid) =>
  { 
    setVideo(<VideoPlayer url={vid}/>)
  }

  useEffect(()=>
  {
    setPage(<HomePage data={XML} getSub={getXMLSub} type={locat}/>)
    getXML('https://streamingchurch.tv/roku/sctv/xml/categories_new.xml', 'categories')
    // getXMLSub('https://admin.streamingchurch.tv/roku/sctv/xml/church1.xml', 'feed')
  },[])

  useEffect(()=>
  {
    console.log('data 1', XML)
    setPage(<HomePage data={XML} getSub={getXMLSub} type={locat} setLocation={setLocat} playVideo={playVideo}/>)
    
  },[XML, locat])

  if(video===null){
    return (
      <>
        <SafeAreaView style={styles.view}>
          <NavBar/>
          {page}
          {video}
          {/* <VideoPlayer url={'https://5d00db0e0fcd5.streamlock.net:443/7410/7410/playlist.m3u8'}/>  */}
          
        </SafeAreaView>
      </>
    );
  }else{
    return (
      <>
       
         
          {video}

          
        
      </>
    );
    
  }
  
};



const styles = StyleSheet.create({
  view: {
    backgroundColor: Colors.lighter,
    justifyContent:'center',
    alignItems:'center',
    overflow:'visible',
  
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
