import { Button, StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, CheckBox } from 'react-native';
import { IconButton } from "react-native-paper";
import React, { useState } from 'react'

const Tasks = () => {
    const [ task, setTask ] = useState('');
    const [ tasks, setTasks ] = useState([]);
    const [ editedTasks, setEditedTasks ] = useState(null);
    const [ spacing, setSpacing ] = useState(200);

    const styles = StyleSheet.create({
      centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: '#f2f2f2',
      },
      title: {
        fontWeight: 'bold',
        fontSize: 36,
        backgroundColor: '#cc99ff',
        color: 'white',
        padding: 20,
        width: '30%',
        textAlign: 'center',
      },
      button: {
        backgroundColor: '#cc99ff', 
        height: 20,
        borderRadius: 3,
        width: 50,
      },
      buttonText: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center',
      },
      space: {
        width: 5,
      },
      taskLists: {
        flexDirection: 'row',
        width: '30%',
        alignItems: 'center',
        maxHeight: 20,
      },
      largeSpace: {
        width: 200,
        maxWidth: 200,
      }
    })

    //Adds a task with an id, text, and completed status
    const addTask = () => {
      setTasks([...tasks, {id: Date.now().toString(), text: task, completed: false}])
      setTask("");
    };

    //Creates a boolean stating the user wants to switch to edit mode
    const editTask = (ToDo) => {
      setEditedTasks(ToDo);
      setTask(ToDo.text);
    };

    //Delete method, accepts an id to delete
    const deleteTask = (id) => {
      setTasks(tasks.filter(task => task.id !== id));
    }

    //Physically updates the task for new edits, resets edit status
    const updateTasks = () => {
      const updatedTasks = tasks.map((item) => {
        if (item.id === editedTasks.id) {
          return { ...item, text: task };
        }

        return item;
      });
      setTasks(updatedTasks);
      setEditedTasks(null);
      setTask("");
    };

    //method for changing the task status
    function toggleCompleted(id) {
      setTasks(tasks.map(Todo => (Todo.id === id ? { ...Todo, completed: !Todo.completed } : Todo)));
    }

    //handle spacing
    const handleTextLayout = (e) => {
      const { width } = e.nativeEvent.layout;
      const leftOver = 200 - width;
      setSpacing(leftOver);
    }

    //method for listing out the tasks
    const renderTasks = ({item, index}) => {
      return (
        <View style={{
          backgroundColor: "#cc99ff",
          color: 'white',
          marginTop: 6,
          borderRadius: 6,
          paddingHorizontal: 6,
          paddingVertical: 8,
          marginBottom: 12,
          flexDirection: "row",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 3,
        }}>
          <CheckBox
            style={{marginRight: 10}}
            value={item.completed}
            onValueChange={() => toggleCompleted(item.id)}
          />
          <Text style={{ textDecorationLine: item.completed ? 'line-through' : 'none', fontSize: 20,  }} onLayout={handleTextLayout}>{item.text}</Text>
          <View style={styles.largeSpace}/>
          <IconButton
            icon="pencil"
            iconColor='white'
            onPress={() => editTask(item)}
          />
          <View style={styles.space} />
          <IconButton
            icon="trash-can"
            iconColor='white'
            width='10'
            onPress={() => deleteTask(item.id)}
          />
        </View>
      )
    }

    //base code
    return (
    <View style={styles.centered}>
      <Text style={styles.title}>
        My List
      </Text>
      <TextInput 
        style={{
          borderWidth: 2,
          borderColor: "#000",
          borderRadius: 6,
          paddingVertical: 8,
          paddingHorizontal: 16,
          marginTop: 30,
        }}
        placeholder="Add Task" 
        defaultValue={task} 
        onChangeText={(text) => setTask(text)} />
        {editedTasks ? ( //switches between "add" and "save" button depending on if user wants to edit or not
          <TouchableOpacity 
            onPress={() => updateTasks()}
            style={{
              backgroundColor: "#cc99ff",
              color: 'white',
              borderRadius: 6,
              paddingVertical: 12,
              marginVertical: 10,
              alignItems: "center",
              width: 50,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 3,
            }}
          >
            <Text style={styles.buttonText} >Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => addTask()}
            style={{
              backgroundColor: "#cc99ff",
              color: 'white',
              borderRadius: 6,
              width: 50,
              paddingVertical: 12,
              marginVertical: 10,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 3,
            }}
            >
            <Text style={styles.buttonText} >
              Add
              </Text>  
            </TouchableOpacity>
        )}
      <FlatList data= {tasks} renderItem={renderTasks} />
    </View>
    )
}
export default Tasks