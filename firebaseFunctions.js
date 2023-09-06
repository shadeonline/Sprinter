import { auth, firestore } from './firebase'; // Update the path to your firebase.js file
import { collection, addDoc } from 'firebase/firestore';

const firebaseCreateTask = async (taskTitle, taskDescription, deadline, hoursToComplete) => {
  try {
    // Create a task object
    const task = {
      userUid: auth.currentUser.uid, // Assuming you have the user's UID
      taskDescription,
      taskTitle,
      deadline,
      hoursToComplete,
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

export { firebaseCreateTask };
