import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import {toApiFormat} from './../utils';
import globalStyles from './../styles/globalStyles';

export default function AddTask(props) {
  const [text, setText] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  function saveTask() {
    const task = {
      description: text,
      estimateDate: toApiFormat(date.toLocaleDateString()),
      notify: true,
    };

    props.onSave(task);

    // clear state (text inputs)
    setText(null);
    setDate(new Date());
  }

  function getDatePicker() {
    const dateAsString = moment(date).format('dddd[,] D [de] MMMM [de] yyyy');

    let picker = (
      <DateTimePicker
        value={date}
        mode="date"
        onChange={(_, value) => {
          setShowDatePicker(false);
          setDate(value || date);
        }}
      />
    );

    if (Platform.OS === 'android') {
      picker = (
        <View>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateText}>{dateAsString}</Text>
          </TouchableOpacity>
          {showDatePicker && picker}
        </View>
      );
    }

    return picker;
  }

  return (
    <Modal
      styles={styles.modal}
      transparent={true}
      visible={props.visible}
      onRequestClose={props.onCancel}
      animationType="slide">
      <TouchableWithoutFeedback onPress={props.onCancel}>
        <View style={styles.overlayContainer} />
      </TouchableWithoutFeedback>

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.headerText, {backgroundColor: props.theme}]}>
            Nova tarefa
          </Text>
        </View>

        <View style={styles.content}>
          <TextInput
            style={styles.input}
            placeholder="Descrição da tarefa..."
            value={text}
            onChangeText={value => setText(value)}
          />

          {getDatePicker()}

          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.5}
              onPress={props.onCancel}>
              <Text style={[styles.buttonText, {color: props.theme}]}>
                Cancelar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.5}
              onPress={saveTask}
              disabled={text === null || text.trim().length === 0}>
              <Text style={[styles.buttonText, {color: props.theme}]}>
                Salvar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableWithoutFeedback onPress={props.onCancel}>
        <View style={styles.overlayContainer} />
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {},
  overlayContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  container: {
    // flex: 1,
    backgroundColor: '#fff',
  },
  header: {},
  headerText: {
    color: globalStyles.colors.secondary,
    fontFamily: globalStyles.fontFamily,
    padding: 10,
    textAlign: 'center',
  },
  content: {
    padding: 5,
  },
  input: {
    fontFamily: globalStyles.fontFamily,
  },
  dateText: {
    fontFamily: globalStyles.fontFamily,
    color: globalStyles.colors.smallText,
    textAlign: 'center',
  },
  buttons: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    margin: 8,
  },
  buttonText: {
    fontFamily: globalStyles.fontFamily,
  },
});
