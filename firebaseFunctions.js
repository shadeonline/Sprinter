import { auth, firestore } from './firebase'; // Update the path to your firebase.js file
import { collection, addDoc, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';

const firebaseCreateTask = async (taskTitle, taskDescription, deadline, storyPoint) => {
  try {
    // Create a task object
    const task = {
      userUid: auth.currentUser.uid, // Assuming you have the user's UID
      taskDescription,
      taskTitle,
      deadline,
      storyPoint,
    };

    // Add the task to the "tasks" collection in Firebase
    const docRef = await addDoc(collection(firestore, 'tasks'), task);

    // Successfully added the task, you can navigate back or perform any other action
    console.log('Task added with ID: ', docRef.id);
    return true;
  } catch (error) {
    console.error('Error adding task: ', error);
    return false;
  }
};

const firebaseFetchTask = async () => {
  const userUid = auth.currentUser.uid;

  const q = query(collection(firestore, 'tasks'), where('userUid', '==', userUid));
  try {
    const querySnapshot = await getDocs(q);
    const taskList = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      taskList.push({
        id: doc.id,
        taskTitle: data.taskTitle,
        taskDescription: data.taskDescription,
        storyPoint: data.storyPoint,
        deadline: data.deadline,
      });
    });
    return taskList;
  } catch (error) {
    console.error('Error fetching tasks: ', error);
    return [];
  }
};



const firebaseEditTask = async (editedTask) => {
  try {
    // Define the path to the task document in the Firestore collection
    const taskRef = doc(firestore, 'tasks', editedTask.id);
    // Create an object with the fields to update
    const updatedFields = {
      taskTitle: editedTask.taskTitle,
      taskDescription: editedTask.taskDescription,
      storyPoint: editedTask.storyPoint,
      deadline: editedTask.deadline,
    };
    // Update the task document with the new data
    await updateDoc(taskRef, updatedFields);

    // Task updated successfully
    console.log('Task updated successfully');
    return true;
  } catch (error) {
    console.error('Error updating task: ', error);
    return false;
  }
};

export { firebaseCreateTask, firebaseFetchTask, firebaseEditTask };
