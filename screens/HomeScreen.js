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
  ImageBackground,
  TVMenuControl,
  
} from 'react-native';

import axios from 'axios';


import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { NavBar } from '../components/NavBar';
import config from '../individual';


const HomeScreen = (props) => {

    const [XML, setXML] = useState([]);
    const XMLParser = require('react-xml-parser');
    const [items, setItems] = useState([]);
    const [focused, setFocused] = useState(1);
    const [description, setDescription] = useState(' ');
    const [inView, setInView] = useState(true);

  

  const getXML = (url, tag) =>
  {
    
    axios.get(url).then(d=>{
      
      var xmlfile = new XMLParser().parseFromString(d.data);    // Assume xmlText contains the example XML


      setXML(xmlfile.getElementsByTagName(tag)[0].children)
      
      
     

    })
      
      
  }

  const chooseChannel = (url,chan) => {
    props.navigation.navigate('Channel', {url: url, chan:chan, setInView: setInView})
    setFocused(null)

  }

  const makeItems = (arr, range) => {

    const tempItems = [];

    for(let i = range[0]; i<=range[1];i++){
      console.log("XXXXXXXXMMMMMMMMMMLLLLLLLLLL 2222222222222: ", arr[i] )
        let link;
         
         if(arr[i].attributes.hd_img.slice(0,5)==="https"){
          link = arr[i].attributes.hd_img;
        } else {
          link = 'https' + arr[i].attributes.hd_img.slice(4);
        }
        let url;
        if(arr[i].children[0].attributes.feed.slice(0,5)==="https"){
          url = arr[i].children[0].attributes.feed
        } else {
          url = 'https' + arr[i].children[0].attributes.feed.slice(4)
        }
       
        tempItems.push(
            <TouchableOpacity 
            removeClippedSubviews={false}
            key={i} 
            style={[styles.item, {zIndex:focused===i?1:0 }]} 
            onPress={()=>{
                chooseChannel(url, arr[i].attributes.title.toUpperCase());
                setInView(false)
            }}
            
            hasTVPreferredFocus={focused===i?true:false} 
            activeOpacity={1.0} 
            onFocus={()=>{

                setFocused(i);
                setDescription(arr[i].attributes.title.toUpperCase())
                
            }}


            
            tvParallaxProperties={{
                enabled: true,
                magnification: 1.2,
                
            }}>
                <Text>
                    {arr[i].attributes.title}
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
            TVMenuControl.disableTVMenuKey()
            getXML(config.URL, 'categories')

            setInView(true)

            props.navigation.addListener(
              'didFocus',
              payload => {
                setInView(true)
                TVMenuControl.disableTVMenuKey()
              }
          );

        },[]);
    
    useEffect(()=>{
      console.log("XXXXXXXXMMMMMMMMMMMMLLLLLLLLLLLLLLL: ", XML)
        if(XML.length>0)
        makeItems(XML, [1,XML.length-1])
    },[XML])





    if(inView){
      return (
        <ImageBackground 
        blurRadius={0} 
        style={{width:'100%'}} 

        source={config.backgroundFirstScreen}
        > 
        <NavBar/>
        <SafeAreaView style={styles.view}>

                <Text style={styles.desc}>{description}</Text> 
               <ScrollView style={styles.page} horizontal={true} contentContainerStyle={{display: 'flex', justifyContent: 'center',
                    alignItems: 'flex-start',}}>
                    {items}
                    
                </ScrollView>
                
            

            

        </SafeAreaView>
        </ImageBackground>
    );
    } else {
      return (
        <ImageBackground 
        blurRadius={0} 
        style={{width:'100%'}} 

        source={config.backgroundFirstScreen}
        > 
        <NavBar/>
        <SafeAreaView style={styles.view}>

                <Text style={styles.desc}>{description}</Text> 
               <ScrollView style={styles.page} horizontal={true} contentContainerStyle={{display: 'flex', justifyContent: 'center',
                    alignItems: 'flex-start',}}>

                    
                </ScrollView>
                
            

            

        </SafeAreaView>
        </ImageBackground>
    );
      
    }
    
 
  
};



const styles = StyleSheet.create({
  view: {
    backgroundColor: 'rgba(39, 86, 138, .6)',
    justifyContent: 'flex-start',
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
  page: {
    width:'100%',
    display: 'flex',
    flexDirection: 'row',
    height:'100%',
    overflow:'visible',

    
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
    fontSize:48, fontFamily: 'Avenir-Medium', padding:16, color: 'white', marginVertical:64
    
},
bar: {
    width:'100%',
    height:128,
    backgroundColor:'orange',
    justifyContent:'center'
}
});

export default HomeScreen;
