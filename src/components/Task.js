import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import 'moment/locale/pt-br';

import globalStyles from './../globalStyles';

export default function Task(props) {
  const formatedDate = moment(props.doneAt)
    .locale('pt-br')
    .format('ddd[,] D [de] MMMM');

  function isDone() {
    return props.doneAt !== undefined && props.doneAt !== null;
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

  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.dataText, getTextDecoration()]}>{props.desc}</Text>
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
