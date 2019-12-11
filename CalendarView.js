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

          
          <CalendarList
            horizontal={true}
            calendarWidth={320}
            hideArrows={false}
            //pagingEnabled={true}
            
            current={this.props.reducer.currentDate.toString()}
            minDate={this.props.reducer.minDate.toString()} //first date of entry
            maxDate={this.props.reducer.currentDate.toString()}
            onDayPress={(day) => this.props.navigation.navigate(' ')}

            style={{
              borderWidth: 1,
              borderColor: 'gray',
              height: 350,
              width: 321,
              alignSelf: 'center',
              overflow: 'hidden',
              marginVertical: 20
            }}
          />

        <View
          style={{alignSelf: 'center' }}>
          <Button
            style={{margin: 20}}
            title="View All Notes!"
            onPress={() => this.props.navigation.navigate(' ')}
          />
        </View>

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