import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addNote, setNote, setImage } from './Actions';
import Image from './imagePicker'
import types from './Types'


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
    margin: 10,
    alignSelf: 'center'
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
    //console.log(this.props)
    return (
      <View style={styles.container}>
        
        <TextInput 
            style={styles.input} 
            onChangeText={this.props.setNote} 
            value={this.props.reducer.note}
            placeholder="Note"
        />

        <View>

          <Image/>
              
          <View style={styles.button}>
            <Button 
                title="Add to Notes"
                onPress={this.props.addNote}
                disabled={!this.props.reducer.note && this.props.reducer.image == types.EMPTY_IMAGE}
            />
          </View>

        </View>

      <View style={styles.spacing}/>
    </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { reducer } = state
  return { reducer }
};


const mapDispatchToProps = dispatch => (
    bindActionCreators({
      addNote,
      setNote, 
      setImage,
    }, dispatch)
  );
  
export default connect(mapStateToProps, mapDispatchToProps)(Input);