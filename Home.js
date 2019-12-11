import React from 'react';
import { StyleSheet, Text, View, Button, Image, FlatList, SectionList } from 'react-native';
import { connect } from 'react-redux';
import Constants from 'expo-constants';
import types from './Types'
import { Calendar, CalendarList } from 'react-native-calendars';

/*
setItemRef= (itemId) => (element) => 
{
 const {selectedItemId} = this.props.navigation.state.params;
 if(selectedItemId === itemId & !this.itemRef)
    this.itemRef = element;
}

setScrollViewRef = (element) => {
  this.scrollViewRef = element;
};

scrollToItem = () => {
  this.productCardRef.measureLayout(
    ReactNative.findNodeHandle(this.scrollViewRef),
    (x, y) => {
      this.scrollViewRef.scrollTo({x: 0, y: y, animated: true});
    }
  );
 }

 scrollToItem = () => {
  requestAnimationFrame(() => {
    if (this.itemCardRef && this.scrollViewRef) {
     this.itemCardRef.measureLayout(
       findNodeHandle(this.scrollViewRef),(x, y) => {
         this.scrollViewRef.scrollTo({x: 0, y: y,  animated:true});
     });
    }
  });
 }*/

class Home extends React.Component {

  render() {
    //let arrayOfNotes = Object.keys(this.props.reducer.notes).map(key => this.props.reducer.notes[key])

    return (
      
      <View style={styles.container}>
        <SectionList
          ref={this.setScrollViewRef}
          sections={this.props.reducer.notes}
          renderItem={({ item }) =>          
           (
           <View style={styles.item}>
              <Text>Time: {item.timestamp}</Text>

              {item.note === '' ? false : true && 
                <Text>Note: {item.note}</Text> }

              {item.image === types.EMPTY_IMAGE ? false : true &&
                <Image source={{ uri: item.image }} style={{ width: 200, height: 200 }} />}

            </View>
            )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
          keyExtractor={(item, index) => index.toString()}
        />

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white'
  },
  item: {
    backgroundColor: 'pink',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 20,
  },
  title: {
    fontSize: 24,
  },
});


const mapStateToProps = (state) => {
  const { reducer } = state
  return { reducer }
};


export default connect(mapStateToProps)(Home);