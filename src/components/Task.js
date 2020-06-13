import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

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
        <Icon
          name="check-circle"
          size={20}
          solid={true}
          color="#4d7031"
          onPress={() => props.markAsDone(item)}
        />
      );
    }

    return (
      <Icon
        name="circle"
        size={20}
        color="#aaa"
        onPress={() => props.markAsDone(item)}
      />
    );
  }

  function getTextDecoration() {
    return isDone() ? {textDecorationLine: 'line-through'} : {};
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.dataText, getTextDecoration()]}>{item.desc}</Text>
        <Text style={styles.dataTextSmall}>
          {isDone() ? formatedDate : 'Não concluído'}
        </Text>
      </View>
      <View style={styles.statusContainer}>{getStatusIcon()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomColor: '#aaa',
    borderBottomWidth: 0.5,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
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
});
