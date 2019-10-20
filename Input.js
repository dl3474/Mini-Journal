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

  inputRow: {
      flexDirection: 'row',
      padding: 5
  },

  todos: {
      flexDirection: 'column', 
  },

  button: {
      flex: 1
  },

  spacing: {
      flex: 10
  }

})

class Input extends React.Component {

  render() {
    // console.log('STATE\n\n', this.props);
    // const {addNote, setNote, note,} = this.props;
    return (
      <View style={styles.container}>
        <TextInput 
            style={styles.input} 
            onChangeText={this.props.setNote} 
            value={this.props.friends.note}
            placeholder="Note"
        />
        <Image/>

        <Button 
            style={styles.button}
            title="Add Todo"
            onPress={this.props.addNote}
            disabled={!this.props.friends.note && this.props.friends.image == types.EMPTY_IMAGE}
        />
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