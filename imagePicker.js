import * as React from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setImage, setNote } from './Actions';
import types from './Types';


class ImagePickerItem extends React.Component {

  render() {

    return (
      <View style={{justifyContent: 'center', alignContent: 'center' }}>
          
        {this.props.friends.image === types.EMPTY_IMAGE ? false : true &&
          <Image source={{ uri: this.props.friends.image }} style={{ width: 200, height: 200}} />}

        <Button
          style={{margin: 20}}
          title="Upload an image!"
          onPress={this._pickImage}
        />
      </View>
    );
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('If you\'d like to upload a photo, please enable camera roll permissions!');
        return false
      }
      return true
    }
  }

  _pickImage = async () => {
    if (this.getPermissionAsync()){
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
          });
          
          
      
          if (!result.cancelled) {
            // console.log("result.uri", result.uri)
            this.props.setImage(result.uri)
            // console.log("result\n\n", this.props.friends.image);
          }
    };
  };
}


const mapStateToProps = (state) => {
    const { friends } = state
    return { friends }
  };
  
  
  const mapDispatchToProps = dispatch => (
      bindActionCreators({
        setImage, 
      }, dispatch)
    );
    
  export default connect(mapStateToProps, mapDispatchToProps)(ImagePickerItem);