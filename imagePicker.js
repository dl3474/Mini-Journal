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
      <View style={{alignSelf: 'center' }}>
          
        {this.props.reducer.image === types.EMPTY_IMAGE ? false : true &&
          <Image source={{ uri: this.props.reducer.image }} style={{ width: 200, height: 200}} />}

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
            this.props.setImage(result.uri)
          }
    };
  };
}


const mapStateToProps = (state) => {
    const { reducer } = state
    return { reducer }
  };
  
  
  const mapDispatchToProps = dispatch => (
      bindActionCreators({
        setImage, 
      }, dispatch)
    );
    
  export default connect(mapStateToProps, mapDispatchToProps)(ImagePickerItem);