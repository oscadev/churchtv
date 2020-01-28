import React from 'react'
import {StyleSheet, TVMenuControl} from 'react-native';
import Video from 'react-native-video';
import { VideoPlayer } from '../components/VideoPlayer'

const VideoScreen = (props) => {

    React.useEffect(()=>{
        TVMenuControl.enableTVMenuKey()
    },[])

    return (
        <Video source={{uri: props.navigation.getParam('video')}}   // Can be a URL or a local file.
       ref={(ref) => {
         this.player = ref
       }}                                      // Store reference
       onBuffer={this.onBuffer}                // Callback when remote video is buffering
       onError={this.videoError}               // Callback when video cannot be loaded
       style={styles.backgroundVideo} 
       fullscreen={false}
       fullscreenOrientation={'landscape'}
       />
    )
}



var styles = StyleSheet.create({
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  });

export default VideoScreen;
