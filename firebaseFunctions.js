import { auth, firestore } from './firebase'; // Update the path to your firebase.js file
import { collection, addDoc, query, where, getDocs,getDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';


const firebaseCreateTask = async (taskTitle, taskDescription, deadline, storyPoint) => {
  try {
    // Create a task object
    const task = {
      userUid: auth.currentUser.uid, // Assuming you have the user's UID
      taskDescription,
      taskTitle,
      deadline,
      storyPoint,
      status: '-',
      createdAt: new Date().toISOString(),
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
      data.id = doc.id; // Assign the ID to data.id
      taskList.push(data);
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
    await updateDoc(taskRef, editedTask);
    // Task updated successfully
    console.log('Task updated successfully');
    return true;
  } catch (error) {
    console.error('Error updating task: ', error);
    return false;
  }
};


const firebaseDeleteTask = async (taskId) => {
  const userUid = auth.currentUser.uid;
  try {
    // Define the path to the task document in the Firestore collection
    const taskDocumentRef = doc(firestore, 'tasks', taskId);

    // Delete the task document
    await deleteDoc(taskDocumentRef);

    // Query for active sprints associated with the user
    const activeSprintsQuery = query(
      collection(firestore, 'sprints'),
      where('userUid', '==', userUid),
      where('status', '==', 'Active')
    );

    const activeSprintsSnapshot = await getDocs(activeSprintsQuery);

    if (activeSprintsSnapshot.size > 0) {
      // If there are active sprints, loop through them to remove the task ID
      activeSprintsSnapshot.forEach(async (sprintDoc) => {
        const sprintData = sprintDoc.data();

        if (sprintData.tasks && sprintData.tasks.includes(taskId)) {
          const updatedTasks = sprintData.tasks.filter((id) => id !== taskId);

          // Update the sprint document with the modified tasks list
          const updatedSprintRef = doc(firestore, 'sprints', sprintDoc.id);
          await updateDoc(updatedSprintRef, { tasks: updatedTasks });
        }
      });
    }

    // Task deleted successfully
    console.log('Task deleted successfully');
    return true;
  } catch (error) {
    console.error('Error deleting task: ', error);
    return false;
  }
};


const firebaseCreateSprint = async (sprintName, selectedTasks) => {
  try {
    // Create a sprint object
    const sprint = {
      userUid: auth.currentUser.uid, // Assuming you have the user's UID
      sprintName,
      tasks: selectedTasks,
      createdAt: new Date().toISOString(),
      status: 'Active'
    };

    // Add the sprint to the "sprints" collection in Firebase
    const docRef = await addDoc(collection(firestore, 'sprints'), sprint);

    // Successfully added the sprint, you can navigate back or perform any other action
    console.log('Sprint added with ID: ', docRef.id);
    return true;
  } catch (error) {
    console.error('Error adding sprint: ', error);
    return false;
  }
};

const firebaseFetchActiveSprint = async () => {
  const userUid = auth.currentUser.uid;

  const q = query(collection(firestore, 'sprints'), where('userUid', '==', userUid), where('status', '==', 'Active'));
  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size === 0) {
      // No active sprint found
      return null;
    }

    // Assuming there's only one active sprint at a time
    const sprintDoc = querySnapshot.docs[0];
    const sprintData = sprintDoc.data();
    sprintData.id = sprintDoc.id; // Assign the ID to sprintData.id
    return sprintData;
  } catch (error) {
    console.error('Error fetching active sprint: ', error);
    return null;
  }
};

const firebaseFetchSprintTasks = async (taskIds) => {
  try {
    const tasks = [];

    // Retrieve task documents based on taskIds
    for (const taskId of taskIds) {
      const taskDocRef = doc(firestore, 'tasks', taskId);
      const taskDocSnapshot = await getDoc(taskDocRef);

      if (taskDocSnapshot.exists()) {
        const taskData = taskDocSnapshot.data();
        taskData.id = taskId; // Assign the ID to taskData.id
        tasks.push(taskData);
      } else {
        console.error(`Task with ID ${taskId} not found`);
      }
    }
    return tasks;
  } catch (error) {
    console.error('Error fetching sprint tasks: ', error);
    return [];
  }
};


const firebaseCloseSprint = async (sprintId) => {
  try {
    // Define the path to the sprint document in the Firestore collection
    const sprintRef = doc(firestore, 'sprints', sprintId);

    // Update the status of the sprint to 'Inactive'
    await updateDoc(sprintRef, { status: 'Inactive' });

    // Sprint closed successfully
    console.log('Sprint closed successfully');
    return true;
  } catch (error) {
    console.error('Error closing sprint: ', error);
    return false;
  }
};


const firebaseEditSprint = async (sprintId, newSprintName, newSelectedTasks) => {
  try {
    // Define the path to the sprint document in the Firestore collection
    const sprintRef = doc(firestore, 'sprints', sprintId);

    // Update the sprint document with the new name and selected tasks
    await updateDoc(sprintRef, {
      sprintName: newSprintName,
      tasks: newSelectedTasks,
    });

    // Sprint edited successfully
    console.log('Sprint edited successfully');
    return true;
  } catch (error) {
    console.error('Error editing sprint: ', error);
    return false;
  }
};


export {
  firebaseCreateTask,
  firebaseFetchTask,
  firebaseEditTask,
  firebaseDeleteTask,
  firebaseCreateSprint,
  firebaseFetchActiveSprint,
  firebaseFetchSprintTasks,
  firebaseCloseSprint,
  firebaseEditSprint
};