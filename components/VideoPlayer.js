import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Dimensions
    
  } from 'react-native';
import Video from 'react-native-video';


export const VideoPlayer = (props) => {
    const [ref, setRef] = React.useState(0);
    const [fullscreen, setFullScreen] = React.useState(false);

    // React.useEffect(()=>{
    //   setInterval(() => {
    //     setFullScreen(!fullscreen)
    //   }, 5000);
    // })
    return (
        <View>
            <Video source={{uri: props.url}}   // Can be a URL or a local file.
      //  ref={(r) => {
      //    console.log('THIS IS REEEEEEF', r)
      //    setRef(r)
      //  }}                                      // Store reference
       onBuffer={console.log('buff')}                // Callback when remote video is buffering
       onError={e =>console.log(e)}               // Callback when video cannot be loaded
       onFullscreenPlayerWillDismiss={e=>console.log("THIS IS EEEEEEEE", e)}
       style={styles.backgroundVideo} 
       fullscreen={false}
       playInBackground={false}
                    playWhenInactive={true}
                    // hls={true}
                    
       
       />
        </View>
        
    )
}

var styles = StyleSheet.create({
    backgroundVideo: {
      position: 'absolute',
      // top: 0,
      // left: 0,
      // bottom: 0,
      // right: 0,
      width:Dimensions.get('screen').width,
      height:Dimensions.get('screen').height,
      backgroundColor: 'green'
    },
  });