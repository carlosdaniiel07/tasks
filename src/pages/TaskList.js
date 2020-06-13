import React, {useState} from 'react';
import {
  Text,
  View,
  ImageBackground,
  StatusBar,
  FlatList,
  StyleSheet,
} from 'react-native';

import moment from 'moment';
import 'moment/locale/pt-br';

import globalStyles from './../globalStyles';
import backgroundImage from './../../assets/images/today.jpg';

import Task from './../components/Task';

export default function TaskList() {
  const today = moment()
    .locale('pt-br')
    .format('ddd, D [de] MMMM');

  const [tasks, setTasks] = useState([
    {id: 1, desc: 'Tarefa #1', doneAt: new Date()},
    {id: 2, desc: 'Tarefa #2', doneAt: new Date()},
    {id: 3, desc: 'Tarefa #3', doneAt: new Date()},
    {id: 4, desc: 'Tarefa #4', doneAt: null},
    {id: 5, desc: 'Tarefa #5', doneAt: null},
    {id: 6, desc: 'Tarefa #6', doneAt: null},
    {id: 7, desc: 'Tarefa #7', doneAt: null},
    {id: 8, desc: 'Tarefa #8', doneAt: null},
    {id: 9, desc: 'Tarefa #9', doneAt: null},
  ]);

  function markAsDone(task) {
    const newTasks = [...tasks];

    newTasks.forEach(t => {
      if (t === task) {
        t.doneAt = t.doneAt ? null : new Date();
      }
    });

    setTasks(newTasks);
  }

  return (
    <>
      <StatusBar hidden={true} />
      <View style={styles.container}>
        <ImageBackground
          source={backgroundImage}
          style={styles.backgroundImage}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Hoje</Text>
            <Text style={styles.headerDescription}>{today}</Text>
          </View>
        </ImageBackground>
        <View style={styles.tasksContainer}>
          <FlatList
            showsVerticalScrollIndicator={true}
            data={tasks}
            keyExtractor={item => String(item.id)}
            renderItem={({item}) => (
              <Task item={item} markAsDone={markAsDone} />
            )}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 2,
    padding: 8,
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  headerTitle: {
    fontFamily: globalStyles.fontFamily,
    color: globalStyles.colors.secondary,
    fontSize: 35,
    marginBottom: 8,
  },
  headerDescription: {
    fontFamily: globalStyles.fontFamily,
    color: globalStyles.colors.secondary,
  },
  tasksContainer: {
    flex: 7,
  },
});
