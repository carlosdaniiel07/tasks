import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ImageBackground,
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
import AddTask from './AddTask';

export default function TaskList() {
  const today = moment()
    .locale('pt-br')
    .format('ddd[,] D [de] MMMM');

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

  // states
  const [visibleTasks, setVisibleTasks] = useState(tasks);
  const [showDoneTasks, setShowDoneTasks] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    const filterTasks = () => {
      if (showDoneTasks) {
        setVisibleTasks(tasks);
      } else {
        setVisibleTasks(tasks.filter(task => !task.doneAt));
      }
    };

    filterTasks();
  }, [showDoneTasks, tasks]);

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

  function saveTask(task) {
    const newTasks = [...tasks];

    newTasks.push(task);

    setShowAddTask(false);
    setTasks(newTasks);
  }

  function deleteTask(task) {
    const newTasks = [...tasks];

    newTasks.splice(newTasks.indexOf(task), 1);

    setTasks(newTasks);
  }

  function closeAddTaskModal() {
    setShowAddTask(false);
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <AddTask
          visible={showAddTask}
          onCancel={closeAddTaskModal}
          onSave={saveTask}
        />

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
              <Task item={item} markAsDone={markAsDone} onDelete={deleteTask} />
            )}
          />
        </View>

        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.8}
          onPress={() => setShowAddTask(true)}>
          <Icon name="plus" size={22} color={globalStyles.colors.secondary} />
        </TouchableOpacity>
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
  addButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: globalStyles.colors.today,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
