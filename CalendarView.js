import React from 'react';
import { StyleSheet, Text, View, Button, Image, FlatList, SectionList } from 'react-native';
import { connect } from 'react-redux';
import Constants from 'expo-constants';
import types from './Types'
import { Calendar, CalendarList } from 'react-native-calendars';



class CalendarView extends React.Component {

  render() {

    return (
      
      <View style={styles.container}>
          <Button
            style={{margin: 20, alignSelf: 'flex-end'}}
            title="View All Notes!"
            onPress={() => this.props.navigation.navigate(' ')}
        />
          <CalendarList
            horizontal={true}
            calendarWidth={320}
            hideArrows={false}
            //pagingEnabled={true}

            current={'2012-03-01'}
            minDate={'2012-02-10'} //first date of entry
            maxDate={'2012-05-30'} //current date
            onDayPress={(day) => {console.log('selected day', day)}} //navigate to list view of the selected date
            markedDates={{
              '2012-05-16': {selected: true, marked: true, selectedColor: 'blue'},
              '2012-05-17': {marked: true},
              '2012-05-18': {marked: true, dotColor: 'red', activeOpacity: 0},
              '2012-05-19': {disabled: true, disableTouchEvent: true}
            }} //mark the dates that have entries

            style={{
              borderWidth: 1,
              borderColor: 'gray',
              height: 350,
              width: 321,
              alignSelf: 'center',
              overflow: 'hidden',

            }}
          />

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink'
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


export default connect(mapStateToProps)(CalendarView);