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
  ImageBackground,
  TVMenuControl,
  Dimensions,
  TextInput,
} from 'react-native';

import axios from 'axios';
import resetSVG from '../assets/reset-password.png';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavBar} from '../components/NavBar';
import config from '../individual';

const HomeScreen = ({navigation}) => {
  const [XML, setXML] = useState([]);
  const XMLParser = require('react-xml-parser');
  const [items, setItems] = useState([]);
  const [focused, setFocused] = useState(1);
  const [description, setDescription] = useState(' ');
  const [inView, setInView] = useState(true);
  const [hasLive, setHasLive] = useState(false);
  const [email, setEmail] = useState('steve@streamingchurch.tv');
  const [password, setPassword] = useState('hello123');
  const [message, setMessage] = useState('');
  const [forgotPass, setForgotPass] = useState(false);

  const login = (em, pass) => {
    axios({
      method: 'GET',
      url: `https://streamingchurch.tv/streaming/api_torah_login.php?api_key=${config.API_KEY}&user_email=${em}&password=${pass}`,
    }).then((d) => {
      console.log('is it???????: ', d.data.xml_url);
      if (d.data.status === 'success') {
        DefaultPreference.set(
          'login',
          JSON.stringify({email: email, password: password}),
        ).then(() => {
          chooseChannel(d.data.xml_url, '');
          console.log('done');
        });
      } else if (d.data.status === 'failure') {
        console.log(d.data);
        setMessage('Incorrect email or password. Try again.');
      }
    });
  };

  const getData = () => {
    DefaultPreference.get('login')
      .then((value) => {
        console.log('Saved login val is: ', value);
        if (value === undefined || value == null) {
          console.log('got value!', value);
        } else {
          const val = JSON.parse(value);
          login(val.email, val.password);
        }
      })
      .catch((err) => console.log(err));
  };

  const getXML = (url, tag) => {
    console.log(url);
    axios
      .get(url)
      .then((d) => {
        console.log('Returned!');
        console.log(d.data);
        var xmlfile = new XMLParser().parseFromString(d.data); // Assume xmlText contains the example XML
        console.log(xmlfile.children);
        // setXML(xmlfile.getElementsByTagName(tag)[0].children);
        setXML(xmlfile.getElementsByTagName(tag)[0].children);
      })
      .catch((err) => console.log(err));
  };

  const notLiveItem = [
    <TouchableOpacity
      removeClippedSubviews={false}
      key={'notlive'}
      style={[styles.item, {zIndex: focused === 'notlive' ? 1 : 0}]}
      hasTVPreferredFocus={focused === 'notlive' ? true : false}
      activeOpacity={1.0}
      onFocus={() => {
        setFocused('notelive');
        setDescription('NOT LIVE');
      }}
      tvParallaxProperties={{
        enabled: true,
        magnification: 1.2,
      }}>
      <Image style={{width: 290, height: 218}} source={config.notLive} />
    </TouchableOpacity>,
  ];

  const chooseChannel = (url, chan) => {
    navigation.navigate('Channel', {
      url: url,
      chan: chan,
      // items: items,
      // setInView: setInView,
    });
    setFocused(null);
  };

  const makeItems = (arr, range) => {
    const tempItems = [];

    for (let i = range[0]; i <= range[1]; i++) {
      let link;

      if (arr[i].attributes.hd_img.slice(0, 5) === 'https') {
        link = arr[i].attributes.hd_img;
      } else {
        link = 'https' + arr[i].attributes.hd_img.slice(4);
      }
      let url;
      if (arr[i].children[0].attributes.feed.slice(0, 5) === 'https') {
        url = arr[i].children[0].attributes.feed;
      } else {
        url = 'https' + arr[i].children[0].attributes.feed.slice(4);
      }
      if (arr[i].attributes.title == 'Live') {
        setHasLive(true);

        tempItems.unshift(
          <TouchableOpacity
            removeClippedSubviews={false}
            key={i}
            style={[styles.item, {zIndex: focused === i ? 1 : 0}]}
            onPress={() => {
              chooseChannel(url, arr[i].attributes.title.toUpperCase());
              setInView(false);
            }}
            hasTVPreferredFocus={focused === i ? true : false}
            activeOpacity={1.0}
            onFocus={() => {
              setFocused(i);
              setDescription(arr[i].attributes.title.toUpperCase());
            }}
            tvParallaxProperties={{
              enabled: true,
              magnification: 1.2,
            }}>
            <Text>{arr[i].attributes.title}</Text>
            <Image
              style={{width: 290, height: 218}}
              source={{uri: `${arr[i].attributes.title}`}}
              source={{uri: link}}
            />
            <Text>{arr[i].attributes.description}</Text>
          </TouchableOpacity>,
        );
      } else {
        tempItems.push(
          <TouchableOpacity
            removeClippedSubviews={false}
            key={i}
            style={[styles.item, {zIndex: focused === i ? 1 : 0}]}
            onPress={() => {
              chooseChannel(url, arr[i].attributes.title.toUpperCase());
              setInView(false);
            }}
            hasTVPreferredFocus={focused === i ? true : false}
            activeOpacity={1.0}
            onFocus={() => {
              setFocused(i);
              setDescription(arr[i].attributes.title.toUpperCase());
            }}
            tvParallaxProperties={{
              enabled: true,
              magnification: 1.2,
            }}>
            <Text>{arr[i].attributes.title}</Text>
            <Image
              style={{width: 290, height: 218}}
              source={{uri: `${arr[i].attributes.title}`}}
              source={{uri: link}}
            />
            <Text>{arr[i].attributes.description}</Text>
          </TouchableOpacity>,
        );
      }
    }
    setItems(tempItems);
  };

  useEffect(() => {
    TVMenuControl.disableTVMenuKey();
    // getXML(config.URL, 'categories');

    setInView(true);

    const unsubscribe = navigation.addListener('focus', (payload) => {
      setInView(true);
      TVMenuControl.disableTVMenuKey();
    });
    getData();
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (XML.length > 0) makeItems(XML, [1, XML.length - 1]);
  }, [XML]);

  if (inView) {
    return (
      <>
        <View style={styles.modal}>
          <View style={{flexDirection: 'row', margin: 64}}>
            <Text style={styles.title}>Torah</Text>
            <Text style={{...styles.title, fontWeight: '300'}}>TV</Text>
            <Text style={styles.title}>App</Text>
          </View>

          <TextInput
            style={styles.input}
            placeholder="email"
            value={email}
            onChangeText={(e) => setEmail(e)}
          />
          <TextInput
            style={styles.input}
            placeholder="password"
            value={password}
            onChangeText={(e) => setPassword(e)}
          />
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => login(email, password)}>
            <Text style={styles.btnText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{...styles.button, margin: 0}}
            onPress={() => setForgotPass(true)}>
            <Text style={styles.btnText}>Reset Password</Text>
          </TouchableOpacity>
          <View
            style={{...styles.forgot, display: forgotPass ? 'flex' : 'none'}}>
            <Text style={{...styles.forgotMessage, margin: 0}}>
              Scan this QR Code with your phone's
            </Text>
            <Text
              style={{...styles.forgotMessage, margin: 0, marginBottom: 32}}>
              camera to reset your password
            </Text>
            <Image source={resetSVG} />
          </View>
        </View>
        <ImageBackground
          blurRadius={0}
          style={{width: '100%'}}
          source={config.backgroundFirstScreen}>
          <NavBar />
          <SafeAreaView style={styles.view}>
            <Text style={styles.desc}>{description}</Text>
            <ScrollView
              style={styles.page}
              horizontal={true}
              contentContainerStyle={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              {items}
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </>
    );
  } else {
    return (
      <ImageBackground
        blurRadius={0}
        style={{width: '100%'}}
        source={config.backgroundFirstScreen}>
        <NavBar />
        <SafeAreaView style={styles.view}>
          <Text style={styles.desc}>{description}</Text>
          <ScrollView
            style={styles.page}
            horizontal={true}
            contentContainerStyle={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}></ScrollView>
        </SafeAreaView>
      </ImageBackground>
    );
  }
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'rgba(39, 86, 138, .6)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: 'visible',
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
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
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
    fontSize: 48,
    fontFamily: 'Avenir-Medium',
    padding: 16,
    color: 'white',
    marginVertical: 64,
  },
  bar: {
    width: '100%',
    height: 128,
    backgroundColor: 'orange',
    justifyContent: 'center',
  },
  modal: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: config.tanDark,
    // position: 'absolute',
    // top: 0,
    // left: 0,
  },
  input: {
    width: 500,
    height: 64,
    margin: 12,
    fontSize: 32,
  },
  button: {
    backgroundColor: config.red,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 64,
    borderRadius: 5,
    minWidth: 200,
  },
  btnText: {
    color: 'white',
    fontSize: 24,
    padding: 16,
  },
  title: {
    fontSize: 64,
    // margin: 64,
    color: 'white',
    fontWeight: '700',
  },
  message: {
    color: 'red',
    fontSize: 24,
    height: 32,
  },
  forgot: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    padding: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: config.grey,
  },
  forgotMessage: {
    color: 'white',
    fontSize: 24,
    height: 32,
    margin: 32,
  },
});

export default HomeScreen;
