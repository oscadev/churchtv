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
  TouchableOpacity,
  Image,
  Button,
  TVMenuControl,
  ImageBackground,
  Dimensions,
  TouchableHighlight,
  ActivityIndicator
  
} from 'react-native';

import axios from 'axios';


import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavBar } from '../components/NavBar';


const ChannelScreen = (props) => {
    const [page, setPage] = useState([])
    const [locat, setLocat] = useState('top')
    const [XML, setXML] = useState([]);
    const XMLParser = require('react-xml-parser');
    const [video, setVideo] = useState(null);
    const [items, setItems] = useState([<ActivityIndicator key={0} size="large" color="lightblue" style={{height:'100%', width:600}} contentContainerStyle={{width:600}}/>]);
    const [focused, setFocused] = useState(2);
    const [description, setDescription] = useState('loading');
    const [inView, setInView] = useState(true);

  const getXMLSub = (url, tag) =>
  {
    console.log('ran sub 1, url:', url)
    axios.get(url).then(d=>{
      console.log('ran sub 2')
      var xmlfile = new XMLParser().parseFromString(d.data);    // Assume xmlText contains the example XML

      // console.log(xmlfile.getElementsByTagName(tag)[0].children,"yeet");
      setXML(xmlfile.children)
      
      
     

    }).catch(e=>console.log('error is:', e))
      
      
  }

  const makeSubItems = (arr, range) => {

    const tempItems = [];

    for(let i = range[0]; i<=range[1];i++){
        let link = 'https' + arr[i].attributes.hdImg.slice(4);

       
        tempItems.push(
            <TouchableOpacity 
            
            removeClippedSubviews={false}
            key={i} 
            style={[styles.item, {zIndex:focused===i?1:0 }]} 
            onPress={()=>{

                if(arr[i].children[5].children[2].value.slice(0,5)==="https"){
                    props.navigation.navigate('Video', {video: arr[i].children[5].children[2].value})
                    setInView(false)
                }else{
                    props.navigation.navigate('Video', {video: 'https' + arr[i].children[5].children[2].value.slice(4)})
                    setInView(false)
                }

            }}
            
            hasTVPreferredFocus={focused===i?true:false} 
            activeOpacity={1.0} 
            onFocus={()=>{
                console.log('focused item in ChannelScreen is: ', i)
                setFocused(i);
                setDescription(arr[i].children[0].value)
            }}
            
            tvParallaxProperties={{
                enabled: true,
                magnification: 1.2,
                
            }}>
                <Text>
                    {arr[i].children[0].value}
                </Text>
                <Image
                    style={{width: 290, height: 218}}
                    source={{uri: `${arr[i].attributes.title}`}}
                    source={{uri: link}}
                />
                <Text>
                    {arr[i].attributes.description}
                </Text>
            </TouchableOpacity>
        )
    }
    setItems(tempItems)
}


  useEffect(()=>
  {
    TVMenuControl.enableTVMenuKey()
    console.log('focused is:', focused)
    getXMLSub(props.navigation.getParam('url')
    , 'feed')
    console.log("is chan focused?: ",props.navigation.isFocused())
    props.navigation.addListener(
      'didFocus',
      payload => {
        setInView(true)
      }
  );
    
  },[])

  useEffect(()=>{
      if(XML.length>0)
      makeSubItems(XML, [2,XML.length-1])
  },[XML])



  if(inView){
    return (
      
      <ImageBackground 
      blurRadius={0} 
      style={{width:'100%'}} 
      source={require('../assets/bible2.jpeg')}

      > 
      <NavBar/>
      <SafeAreaView style={styles.view}>
          <View style={{justifyContent:'flex-start', alignItems:'center', padding:64, width:Dimensions.get('window').width,}}>
              <Text style={styles.desc}>{props.navigation.getParam('chan')}</Text>
              <Text style={styles.desc2}>{description}</Text>
          </View>
          <ScrollView style={styles.page} horizontal={true} ontentContainerStyle={{display: 'flex', justifyContent: 'center',
                  alignItems: 'flex-start'}}>
              {items}
              
          </ScrollView>
          <TouchableOpacity onPress={()=>props.navigation.navigate('Home')} style={{width:Dimensions.get('window').width, height:64, justifyContent:'center', alignItems:'center'}}>
              <Text style={{backgroundColor:'white', padding:16, borderRadius:25}}>BACK</Text>
          </TouchableOpacity>

      </SafeAreaView>
      
      </ImageBackground>
     
  );
  } else {
    return (
      
      <ImageBackground 
      blurRadius={0} 
      style={{width:'100%'}} 
      source={require('../assets/bible2.jpeg')}

      > 
      <NavBar/>
      <SafeAreaView style={styles.view}>
          <View style={{justifyContent:'flex-start', alignItems:'center', padding:64, width:Dimensions.get('window').width,}}>
              <Text style={styles.desc}>{props.navigation.getParam('chan')}</Text>
              <Text style={styles.desc2}>{description}</Text>
          </View>
          <ScrollView style={styles.page} horizontal={true} ontentContainerStyle={{display: 'flex', justifyContent: 'center',
                  alignItems: 'flex-start'}}>
<ActivityIndicator key={0} size="large" color="lightblue" style={{height:'100%', width:600}} contentContainerStyle={{width:600}}/>
              
          </ScrollView>


      </SafeAreaView>
      
      </ImageBackground>
     
  );
    }}



const styles = StyleSheet.create({
  view: {
    backgroundColor: "rgba(39, 86, 138, .8)",
    justifyContent:'flex-start',
    alignItems:'center',
    overflow:'visible',
    minHeight:'89%',
    overflow:'visible'
  
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
  page: {
    width:'100%',
    display: 'flex',
    // flexWrap: 'wrap',
    flexDirection: 'row',
    // backgroundColor: 'blue',
    // justifyContent: 'center',
    // alignItems: 'center',
    height:'100%',
    overflow:'visible'
    
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
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    margin:32,
},

desc: {
    fontFamily: 'Avenir-Medium', color: 'white', fontSize:64
    
},
desc2: {
    fontFamily: 'Avenir-Light', color: 'white', fontSize:32, backgroundColor:'black', padding:8
    
},
});

export default ChannelScreen;
