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

import {useFocusEffect} from '@react-navigation/native';

// import AsyncStorage from '@react-native-community/async-storage';

import Icon from 'react-native-vector-icons/Feather';

import moment from 'moment';
import 'moment/locale/pt-br';

import {api, getAuthHeader} from './../services/api';
import globalStyles from './../styles/globalStyles';

import todayImage from './../../assets/images/today.jpg';
import tomorrowImage from './../../assets/images/tomorrow.jpg';
import weekImage from './../../assets/images/week.jpg';
import monthImage from './../../assets/images/month.jpg';

import Task from './../components/Task';
import AddTask from './AddTask';

export default function TaskList({navigation, route}) {
  const {params} = route;

  const today = moment().locale('pt-br');

  const pages = [
    {
      name: 'today',
      header: 'Hoje',
      backgroundImage: todayImage,
      date: today.format('ddd[,] D [de] MMMM'),
      theme: globalStyles.colors.theme.today,
    },
    {
      name: 'tomorrow',
      header: 'Amanhã',
      backgroundImage: tomorrowImage,
      date: today.add(1, 'day').format('ddd[,] D [de] MMMM'),
      theme: globalStyles.colors.theme.tomorrow,
    },
    {
      name: 'week',
      header: 'Semana',
      backgroundImage: weekImage,
      date: '',
      theme: globalStyles.colors.theme.week,
    },
    {
      name: 'month',
      header: 'Mês',
      backgroundImage: monthImage,
      date: '',
      theme: globalStyles.colors.theme.month,
    },
  ];

  const pageData = pages.find(page => page.name === params.name);

  const [tasks, setTasks] = useState([]);

  // states
  const [visibleTasks, setVisibleTasks] = useState(tasks);
  const [showDoneTasks, setShowDoneTasks] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    const filterTasks = () => {
      if (showDoneTasks) {
        setVisibleTasks(tasks);
      } else {
        setVisibleTasks(tasks.filter(task => !task.done_date));
      }
    };

    const persistTasks = () => {
      // AsyncStorage.setItem('@tasks', JSON.stringify(tasks));
    };

    filterTasks();
    persistTasks();
  }, [showDoneTasks, tasks]);

  useFocusEffect(
    React.useCallback(() => {
      // when the screen is focused
      const loadTasks = async () => {
        const {minDate, maxDate} = getDateRange();

        const data = (await api.get('/tasks', {
          headers: getAuthHeader(),
          params: {
            minDate,
            maxDate,
          },
        })).data;

        setTasks(data || []);
      };

      loadTasks();

      return () => {
        // when the screen is unfocused
      };
    }, []),
  );

  function toggleFilter() {
    setShowDoneTasks(!showDoneTasks);
  }

  function markAsDone(task) {
    const newTasks = [...tasks];

    newTasks.forEach(t => {
      if (t === task) {
        t.done_date = t.done_date ? null : new Date();
      }
    });

    api.put(`/tasks/${task.id}/done`, null, {
      headers: getAuthHeader(),
    });

    setTasks(newTasks);
  }

  async function saveTask(task) {
    const newTasks = [...tasks];
    const newTask = (await api.post('/tasks', JSON.stringify(task), {
      headers: getAuthHeader(),
    })).data;

    newTasks.push(newTask);

    setShowAddTask(false);
    setTasks(newTasks);
  }

  function deleteTask(task) {
    const newTasks = [...tasks];

    newTasks.splice(newTasks.indexOf(task), 1);

    api.delete(`/tasks/${task.id}`, {
      headers: getAuthHeader(),
    });

    setTasks(newTasks);
  }

  function closeAddTaskModal() {
    setShowAddTask(false);
  }

  function getDateRange() {
    const minDate = moment().toJSON();
    let maxDate;

    switch (pageData.name) {
      case 'today':
        maxDate = moment().toJSON();
        break;
      case 'tomorrow':
        maxDate = moment()
          .add(1, 'day')
          .toJSON();
        break;
      case 'week':
        maxDate = moment()
          .add(1, 'week')
          .toJSON();
        break;
      default:
        maxDate = moment()
          .add(1, 'month')
          .toJSON();
    }

    return {minDate, maxDate};
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <AddTask
          visible={showAddTask}
          onCancel={closeAddTaskModal}
          onSave={saveTask}
          theme={pageData.theme}
        />

        <ImageBackground
          source={pageData.backgroundImage}
          style={styles.backgroundImage}>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              activeOpacity={0.7}>
              <Icon
                name="menu"
                size={20}
                color={globalStyles.colors.secondary}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleFilter} activeOpacity={0.7}>
              <Icon
                name={showDoneTasks ? 'eye' : 'eye-off'}
                size={20}
                color={globalStyles.colors.secondary}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>{pageData.header}</Text>
            <Text style={styles.headerDescription}>{pageData.date}</Text>
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
          style={[styles.addButton, {backgroundColor: pageData.theme}]}
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
    backgroundColor: '#fff',
  },
  backgroundImage: {
    flex: 2,
    padding: 8,
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});
