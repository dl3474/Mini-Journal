import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addNote, setNote, setImage } from './Actions';
import Image from './imagePicker'
import types from './Types'
import { withNavigation } from 'react-navigation'


const styles = StyleSheet.create( {
  container: {
      flex: 1, 
      backgroundColor: 'pink',
      justifyContent: 'center',
  },

  input: {
      flex: 1,
      backgroundColor: 'white',
      fontSize: 18,
      padding: 9,
      margin: 5,
      justifyContent: 'center',

  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },

  spacing: {
      flex: 10, 
      padding: 20,
      justifyContent: 'center', 
      alignContent: 'center'
  }

})

class Input extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        
        <TextInput 
            style={styles.input} 
            onChangeText={this.props.setNote} 
            value={this.props.friends.note}
            placeholder="Note"
        />

        <View>

          <Image/>
              
          <View style={styles.button}>
            <Button 
                title="Add to Notes"
                onPress={this.props.addNote}
                disabled={!this.props.friends.note && this.props.friends.image == types.EMPTY_IMAGE}
            />
          </View>
          

        </View>

      <View style={styles.spacing}/>
    </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { friends } = state
  return { friends }
};


const mapDispatchToProps = dispatch => (
    bindActionCreators({
      addNote,
      setNote, 
      setImage
    }, dispatch)
  );
  
export default connect(mapStateToProps, mapDispatchToProps)(Input);