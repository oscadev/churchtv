/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import DefaultPreference from 'react-native-default-preference';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  TVMenuControl,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

import axios from 'axios';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavBar} from '../components/NavBar';
import config from '../individual';

const ChannelScreen = ({
  navigation,
  route,
  setInView,
  inView,
  items,
  setItems,
}) => {
  const [XML, setXML] = useState([]);
  const XMLParser = require('react-xml-parser');
  // const [items, setItems] = useState([
  //   <ActivityIndicator
  //     key={0}
  //     size="large"
  //     color="lightblue"
  //     style={{height: '100%', width: 600}}
  //     contentContainerStyle={{width: 600}}
  //   />,
  // ]);
  const [focused, setFocused] = useState(2);
  const [description, setDescription] = useState('loading');
  // const [inView, setInView] = useState(true);

  const urlWorks = 'https://admin.streamingchurch.tv/roku/sctv/xml/church1.xml';
  const urlDoesntWork =
    'https://streamingchurch.tv/orgs_pub/church10784/caldb/2.xml';

  const logout = () => {
    DefaultPreference.set('login', JSON.stringify(null)).then(() => {
      navigation.navigate('Home');
      console.log('done');
    });
  };

  const getXMLSub = (url, tag) => {
    console.log('THE URL IS: ', url);
    fetch(url, {headers: {'Content-Type': 'application/xml; charset=utf-8'}})
      .then((response) => response.text())
      .then((str) => {
        console.log(str);
        var xmlfile = new XMLParser().parseFromString(str); // Assume xmlText contains the example XML
        setXML(xmlfile.children);
      });

    // .then((response) => {
    //   response.text().then((data) => {
    //     console.log(setXML(data));
    //     var xmlfile = new XMLParser().parseFromString(data); // Assume xmlText contains the example XML

    //     setXML(xmlfile.children);
    //   });
    // })
    // .catch((err) => console.log(err));
  };

  const makeSubItems = (arr, range) => {
    const tempItems = [];

    for (let i = range[0]; i <= range[1]; i++) {
      let link = 'https' + arr[i].attributes.hdImg.slice(4);

      tempItems.push(
        <TouchableOpacity
          removeClippedSubviews={false}
          key={i}
          style={[styles.item, {zIndex: focused === i ? 1 : 0}]}
          onPress={() => {
            if (arr[i].children[5].children[2].value.slice(0, 5) === 'https') {
              navigation.navigate('Video', {
                video: arr[i].children[5].children[2].value,
              });
              setInView(false);
            } else {
              navigation.navigate('Video', {
                video: 'https' + arr[i].children[5].children[2].value.slice(4),
              });
              setInView(false);
            }
          }}
          hasTVPreferredFocus={focused === i ? true : false}
          activeOpacity={1.0}
          onFocus={() => {
            setFocused(i);
            setDescription(arr[i].children[0].value);
          }}
          tvParallaxProperties={{
            enabled: true,
            magnification: 1.2,
          }}>
          <Text style={styles.desc3}>{arr[i].children[0].value}</Text>
          <Image
            style={{width: 'auto', height: 218}}
            resizeMode="cover"
            // source={{uri: `${arr[i].attributes.title}`}}
            source={{uri: link}}
          />
          <Text>{arr[i].attributes.description}</Text>
        </TouchableOpacity>,
      );
    }
    setItems(tempItems);
  };

  useEffect(() => {
    TVMenuControl.enableTVMenuKey();

    getXMLSub(route.params?.url ?? 'feed');
    // getXMLSub(urlDoesntWork, 'feed');

    const unsubscribe = navigation.addListener('focus', (payload) => {
      getXMLSub(route.params?.url ?? 'feed');
      setInView(true);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (XML.length > 0) makeSubItems(XML, [2, XML.length - 1]);
  }, [XML]);

  if (inView) {
    return (
      <ImageBackground
        blurRadius={0}
        style={{width: '100%'}}
        source={config.backgroundSecondScreen}>
        <NavBar />
        <SafeAreaView style={styles.view}>
          <View
            style={{
              justifyContent: 'flex-start',
              alignItems: 'center',
              padding: 64,
              width: Dimensions.get('window').width,
            }}>
            <Text style={styles.desc}>{route.params.chan}</Text>
            <Text style={styles.desc2}>{description}</Text>
          </View>
          <ScrollView
            style={styles.page}
            horizontal={true}
            ontentContainerStyle={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            {items}
          </ScrollView>
          <TouchableOpacity
            onPress={() => logout()}
            style={{width: '100%', position: 'absolute', bottom: '55%'}}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                fontWeight: '600',
                backgroundColor: config.red,
                width: 150,
                padding: 32,
                textAlign: 'center',
              }}>
              Logout
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={{
              width: Dimensions.get('window').width,
              height: 64,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{backgroundColor: 'white', padding: 16, borderRadius: 25}}>
              BACK
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    );
  } else {
    return (
      <ImageBackground
        blurRadius={0}
        style={{width: '100%'}}
        source={config.backgroundSecondScreen}>
        <NavBar />
        <SafeAreaView style={styles.view}>
          <View
            style={{
              justifyContent: 'flex-start',
              alignItems: 'center',
              padding: 64,
              width: Dimensions.get('window').width,
            }}>
            <Text style={styles.desc}>{route.params.chan}</Text>
            <Text style={styles.desc2}>{description}</Text>
          </View>
          <ScrollView
            style={styles.page}
            horizontal={true}
            ontentContainerStyle={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <ActivityIndicator
              key={0}
              size="large"
              color="lightblue"
              style={{height: '100%', width: 600}}
              contentContainerStyle={{width: 600}}
            />
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    );
  }
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: config.tanTransparent,
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: 'visible',
    minHeight: '89%',
    overflow: 'visible',
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
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    overflow: 'visible',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: config.tanDark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    // paddingRight: 12,
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
    justifyContent: 'flex-start',
    borderRadius: 10,
    // alignItems: 'center',
  },

  desc: {
    fontFamily: 'Avenir-Medium',
    color: 'white',
    fontSize: 64,
  },
  desc2: {
    fontFamily: 'Avenir-Light',
    color: config.grey,
    fontSize: 32,
    backgroundColor: config.tan,
    padding: 8,
  },
  desc3: {
    fontFamily: 'Avenir-Light',
    color: config.grey,
    fontSize: 16,
    // backgroundColor: 'white',
    fontWeight: '600',
    padding: 4,
    // width: 300,
  },
});

export default ChannelScreen;
