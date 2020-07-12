import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import 'moment/locale/pt-br';

import globalStyles from './../styles/globalStyles';

export default function Task(props) {
  const item = props.item;

  function isDone() {
    return item.done_date !== null;
  }

  function getStatusIcon() {
    if (isDone()) {
      return (
        <Icon name="check-circle" size={20} solid={true} color="#4d7031" />
      );
    }

    return <Icon name="circle" size={20} color="#aaa" />;
  }

  function getTaskHelper() {
    const date = isDone() ? item.done_date : item.estimate_date;
    return moment(date)
      .locale('pt-br')
      .format('ddd[,] D [de] MMMM');
  }

  function getTextDecoration() {
    return isDone() ? {textDecorationLine: 'line-through'} : {};
  }

  function getTaskDescription() {
    const maxChars = 38;
    return item.description.length > maxChars
      ? item.description.substring(0, maxChars) + '...'
      : item.description;
  }

  function getSwipeableContent(side) {
    if (side === 'left') {
      return (
        <View style={[styles.swipeableContent, styles.leftSwipeableContent]}>
          <Icon name="trash-alt" size={20} color="#fff" />
          <Text style={styles.swipeableText}>Excluir</Text>
        </View>
      );
    } else {
      return (
        <View style={[styles.swipeableContent, styles.rightSwipeableContent]}>
          <Icon name="check" size={20} color="#fff" />
          <Text style={styles.swipeableText}>Concluir</Text>
        </View>
      );
    }
  }

  return (
    <Swipeable
      renderLeftActions={() => getSwipeableContent('left')}
      renderRightActions={() => getSwipeableContent('right')}
      onSwipeableLeftOpen={() => props.onDelete(item)}
      onSwipeableRightOpen={() => props.markAsDone(item)}>
      <View style={styles.container}>
        <View>
          <Text style={[styles.dataText, getTextDecoration()]}>
            {getTaskDescription()}
          </Text>
          <Text style={styles.dataTextSmall}>{getTaskHelper()}</Text>
        </View>
        <View style={styles.statusContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => props.markAsDone(item)}>
            {getStatusIcon()}
          </TouchableOpacity>
        </View>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopColor: '#aaa',
    borderTopWidth: 0.7,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  statusContainer: {
    width: '12%',
    alignItems: 'center',
  },
  dataText: {
    fontFamily: globalStyles.fontFamily,
    fontSize: 14,
    color: globalStyles.colors.primary,
  },
  dataTextSmall: {
    fontFamily: globalStyles.fontFamily,
    fontSize: 11,
    color: globalStyles.colors.smallText,
  },
  swipeableContent: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  leftSwipeableContent: {
    backgroundColor: '#dc1515',
    justifyContent: 'flex-start',
  },
  rightSwipeableContent: {
    backgroundColor: '#4d7031',
    justifyContent: 'flex-end',
  },
  swipeableText: {
    fontFamily: globalStyles.fontFamily,
    color: '#fff',
    marginLeft: 10,
  },
});
