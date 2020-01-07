import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    
  } from 'react-native';
import Video from 'react-native-video';


export const VideoPlayer = (props) => {
    const [ref, setRef] = React.useState(0)
    return (
        <View>
            <Video source={{uri: 'https://s3.amazonaws.com/mfsermons.myflock2.com/church3980/201905051045.mp4'}}   // Can be a URL or a local file.
       ref={(r) => {
         setRef(r)
       }}                                      // Store reference
       onBuffer={console.log('buff')}                // Callback when remote video is buffering
       onError={e =>console.log(e)}               // Callback when video cannot be loaded
       style={styles.backgroundVideo} 
    //    fullscreen={true}
       playInBackground={true}
                    playWhenInactive={true}
       
       />
        </View>
        
    )
}

var styles = StyleSheet.create({
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width:1000,
      height:1000,
      backgroundColor: 'green'
    },
  });