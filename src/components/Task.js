import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import 'moment/locale/pt-br';

import globalStyles from './../globalStyles';

export default function Task(props) {
  const item = props.item;

  const formatedDate = moment(item.doneAt)
    .locale('pt-br')
    .format('ddd[,] D [de] MMMM');

  function isDone() {
    return item.doneAt !== undefined && item.doneAt !== null;
  }

  function getStatusIcon() {
    if (isDone()) {
      return (
        <Icon name="check-circle" size={20} solid={true} color="#4d7031" />
      );
    }

    return <Icon name="circle" size={20} color="#aaa" />;
  }

  function getTextDecoration() {
    return isDone() ? {textDecorationLine: 'line-through'} : {};
  }

  function getSwipeableContent() {
    return (
      <View style={styles.swipeableContent}>
        <Icon name="trash-alt" size={20} color="#fff" />
        <Text style={styles.swipeableText}>Excluir</Text>
      </View>
    );
  }

  return (
    <Swipeable
      renderLeftActions={getSwipeableContent}
      onSwipeableLeftOpen={() => props.onDelete(item)}>
      <View style={styles.container}>
        <View>
          <Text style={[styles.dataText, getTextDecoration()]}>
            {item.desc}
          </Text>
          <Text style={styles.dataTextSmall}>
            {isDone() ? formatedDate : 'Não concluído'}
          </Text>
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
    borderBottomColor: '#aaa',
    borderBottomWidth: 0.6,
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
    backgroundColor: '#dc1515',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  swipeableText: {
    fontFamily: globalStyles.fontFamily,
    color: '#fff',
    marginLeft: 10,
  },
});
