import React from 'react';
import {StatusBar} from 'react-native';

import TaskList from './pages/TaskList';

export default function App() {
  return (
    <>
      <StatusBar hidden={true} />
      <TaskList />
    </>
  );
}
