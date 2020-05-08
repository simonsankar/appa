import React, {useState, useContext} from 'react';
import {
  Button,
  Datepicker,
  Divider,
  Input,
  Layout,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import {KeyboardAvoidingView} from 'react-native';
import DetailTopBar from '../components/DetailTopBar';
import {TasksContext} from '../../model/context';

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-2',
  },
  form: {
    flex: 1,
    paddingHorizontal: 4,
    paddingVertical: 24,
  },
  input: {
    marginHorizontal: 12,
    marginVertical: 8,
  },
  middleContainer: {
    flexDirection: 'row',
  },
  middleInput: {
    width: 128,
  },
  addButton: {
    marginHorizontal: 16,
    marginVertical: 24,
  },
});

export default ({navigation, route, getTask, onSave}) => {
  const styles = useStyleSheet(themedStyles);
  const id = route.params?.id;
  const task = getTask(id);
  const [title, setTitle] = useState(task.title);
  const [timeEstimate, setTimeEstimate] = useState();
  const [timeUnit, setTimeUnit] = useState();
  const [project, setProject] = useState();
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate);

  const {section} = useContext(TasksContext);

  const onSubmit = () => {
    onSave(title, description, dueDate, section === 'agenda').then(() =>
      navigation.goBack(),
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <DetailTopBar navigation={navigation} section={section} />
      <Layout style={styles.form}>
        <Input
          style={styles.input}
          label="Task Title"
          placeholder="Enter title here"
          value={title}
          onChangeText={setTitle}
        />
        {/*<View style={styles.middleContainer}>*/}
        {/*  <Input*/}
        {/*    style={[styles.input, styles.middleInput]}*/}
        {/*    label="Estimated Time"*/}
        {/*    placeholder="30"*/}
        {/*    onChangeText={setTimeEstimate}*/}
        {/*    keyboardType="numeric"*/}
        {/*    value={timeEstimate}*/}
        {/*  />*/}
        {/*  <Select selectedIndex={timeUnit} onSelect={setTimeUnit}>*/}
        {/*    <SelectItem title="Minutes" />*/}
        {/*    <SelectItem title="Hours" />*/}
        {/*  </Select>*/}
        {/*</View>*/}
        <Input
          multiline={true}
          textStyle={{minHeight: 64}}
          placeholder=""
          label="Description"
          onChangeText={setDescription}
          value={description}
        />
        <Datepicker
          style={[styles.input, styles.middleInput]}
          label="Due Date"
          date={dueDate}
          onSelect={setDueDate}
        />
      </Layout>
      <Divider />
      <Button
        style={styles.addButton}
        size="giant"
        onPress={onSubmit}
        testID={'SubmitButton'}>
        Submit
      </Button>
    </KeyboardAvoidingView>
  );
};
