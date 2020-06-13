import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ImageBackground,
  StatusBar,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
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
  const [visibleTasks, setVisibleTasks] = useState(tasks);
  const [showDoneTasks, setShowDoneTasks] = useState(false);

  useEffect(() => {
    const filterTasks = () => {
      if (showDoneTasks) {
        setVisibleTasks(tasks);
      } else {
        setVisibleTasks(tasks.filter(task => !task.doneAt));
      }
    };

    filterTasks();
  }, [showDoneTasks]);

  function toggleFilter() {
    setShowDoneTasks(!showDoneTasks);
  }

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
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={backgroundImage}
          style={styles.backgroundImage}>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={toggleFilter} activeOpacity={0.7}>
              <Icon
                name={showDoneTasks ? 'eye' : 'eye-off'}
                size={20}
                color={globalStyles.colors.secondary}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Hoje</Text>
            <Text style={styles.headerDescription}>{today}</Text>
          </View>
        </ImageBackground>
        <View style={styles.tasksContainer}>
          <FlatList
            showsVerticalScrollIndicator={true}
            data={visibleTasks}
            keyExtractor={item => String(item.id)}
            renderItem={({item}) => (
              <Task item={item} markAsDone={markAsDone} />
            )}
          />
        </View>
      </SafeAreaView>
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
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
