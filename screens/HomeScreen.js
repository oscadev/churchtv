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
  TVMenuControl
  
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


const HomeScreen = (props) => {
    const [page, setPage] = useState([])
    const [locat, setLocat] = useState('top')
    const [XML, setXML] = useState([]);
    const XMLParser = require('react-xml-parser');
    const [video, setVideo] = useState(null);
    const [items, setItems] = useState([]);
    const [focused, setFocused] = useState(0);
    const [description, setDescription] = useState('');

  

  const getXML = (url, tag) =>
  {
    
    axios.get(url).then(d=>{
      
      var xmlfile = new XMLParser().parseFromString(d.data);    // Assume xmlText contains the example XML

      // console.log(xmlfile.getElementsByTagName(tag)[0].children,"yeet");
      setXML(xmlfile.getElementsByTagName(tag)[0].children)
      
      
     

    })
      
      
  }

  const chooseChannel = (url) => {
    props.navigation.navigate('Channel', {url: url})
    setFocused(null)
    console.log('url is', url)
  }

  const makeItems = (arr, range) => {

    const tempItems = [];

    for(let i = range[0]; i<=range[1];i++){
        let link = 'https' + arr[i].attributes.hd_img.slice(4);
       
        tempItems.push(
            <TouchableOpacity 
            removeClippedSubviews={false}
            key={i} 
            style={[styles.item, {zIndex:focused===i?1:0 }]} 
            onPress={()=>{
                chooseChannel('https' + arr[i].children[0].attributes.feed.slice(4));
                // props.setLocation('sub')
                // props.getSub('https' + arr[i].children[0].attributes.feed.slice(4), "feed")
            }}
            
            hasTVPreferredFocus={focused===i?true:false} 
            activeOpacity={1.0} 
            onFocus={()=>{
                console.log('focused home', i)
                setFocused(i);
                setDescription(arr[i].attributes.title.slice(0,arr[i].attributes.title.length-11).toUpperCase())
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
            getXML('https://streamingchurch.tv/roku/sctv/xml/categories_new.xml', 'categories')

        },[]);
    
    useEffect(()=>{
        if(XML.length>0)
        makeItems(XML, [0,XML.length-1])
    },[XML])



    return (
        <ImageBackground 
        blurRadius={0} 
        style={{width:'100%'}} 
        source={{uri:'https://images.unsplash.com/photo-1499652848871-1527a310b13a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80'}}
        source={{uri:'https://images.unsplash.com/photo-1497333558196-daaff02b56d0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1949&q=80'}}
        source={{uri:'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1952&q=80'}}
        source={{uri:'https://images.unsplash.com/photo-1469228252629-cbe7cb7db2c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1566&q=80'}}
        > 
        <NavBar/>
        <SafeAreaView style={styles.view}>

                <Text style={styles.desc}>{description}</Text> 
               <ScrollView removeClippedSubviews={false} style={styles.page} horizontal={true} contentContainerStyle={{display: 'flex', justifyContent: 'center',
                    alignItems: 'flex-start',}}>
                    {items}
                    
                </ScrollView>
                
            

            

        </SafeAreaView>
        </ImageBackground>
    );
 
  
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
    // flexWrap: 'wrap',
    flexDirection: 'row',
    // backgroundColor: 'blue',
    // justifyContent: 'center',
    // alignItems: 'center',
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
    fontSize:48, fontFamily: 'Avenir-Medium', padding:16, color: 'white', marginTop:128
    
},
bar: {
    width:'100%',
    height:128,
    backgroundColor:'orange',
    justifyContent:'center'
}
});

export default HomeScreen;
