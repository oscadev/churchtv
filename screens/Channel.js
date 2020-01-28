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


const ChannelScreen = (props) => {
    const [page, setPage] = useState([])
    const [locat, setLocat] = useState('top')
    const [XML, setXML] = useState([]);
    const XMLParser = require('react-xml-parser');
    const [video, setVideo] = useState(null);
    const [items, setItems] = useState([]);
    const [focused, setFocused] = useState(2);
    const [description, setDescription] = useState('');

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
                props.navigation.navigate('Video', {video: 'https' + arr[i].children[5].children[2].value.slice(4)})
                // props.playVideo('https' + arr[i].children[5].children[2].value.slice(4), "video")
            }}
            
            hasTVPreferredFocus={focused===i?true:false} 
            activeOpacity={1.0} 
            onFocus={()=>{
                console.log('focused channel', i)
                setFocused(i);
                setDescription(arr[i].attributes.title)
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
  },[])

  useEffect(()=>{
      if(XML.length>0)
      makeSubItems(XML, [2,30])
  },[XML])

    return (
        <SafeAreaView style={styles.view}>
            <Button title="GO BACK" onPress={()=>props.navigation.navigate('Home')}></Button>
            <ScrollView removeClippedSubviews={false} style={styles.page} horizontal={true} contentContainerStyle={{display: 'flex', justifyContent: 'center',
            alignItems: 'center',}}>
                {items}
                
            </ScrollView>
            
        </SafeAreaView>
    );
  
    
  
  
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
    fontFamily: 'Menlo',
    fontSize: 35,
    color: 'lightblue',
    position:'absolute',
    top:200
}
});

export default ChannelScreen;
