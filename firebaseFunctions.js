import { auth, firestore } from './firebase'; // Import your Firebase instance
import { collection, addDoc, query, where, getDocs, getDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';


const firebaseLogin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('Logged in with:', user.email);
    return user; // Optionally, you can return the user object
  } catch (error) {
    console.error('Login error:', error.message);
    throw error; // Re-throw the error for handling in the calling code
  }
};


// Function to create a new task in Firebase
const firebaseCreateTask = async (taskTitle, taskDescription, deadline, storyPoint) => {
  try {
    // Create a task object with user UID, task details, status, and timestamp
    const task = {
      userUid: auth.currentUser.uid, // Current user's UID
      taskDescription,
      taskTitle,
      deadline,
      storyPoint,
      status: '-',
      createdAt: new Date().toISOString(),
    };

    // Add the task to the "tasks" collection in Firebase
    const docRef = await addDoc(collection(firestore, 'tasks'), task);

    // Successfully added the task, return true
    console.log('Task added with ID: ', docRef.id);
    return true;
  } catch (error) {
    console.error('Error adding task: ', error);
    return false;
  }
};

// Function to fetch tasks for the current user from Firebase
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

// Function to edit an existing task in Firebase
const firebaseEditTask = async (editedTask) => {
  try {
    // Define the path to the task document in the Firestore collection
    const taskRef = doc(firestore, 'tasks', editedTask.id);

    // Update the task document with the edited task data
    await updateDoc(taskRef, editedTask);

    // Task updated successfully, return true
    console.log('Task updated successfully');
    return true;
  } catch (error) {
    console.error('Error updating task: ', error);
    return false;
  }
};

// Function to delete a task from Firebase and remove it from active sprints
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

    // Task deleted successfully, return true
    console.log('Task deleted successfully');
    return true;
  } catch (error) {
    console.error('Error deleting task: ', error);
    return false;
  }
};

// Function to create a new sprint in Firebase
const firebaseCreateSprint = async (sprintName, selectedTasks) => {
  try {
    // Create a sprint object with user UID, sprint name, selected tasks, status, and timestamp
    const sprint = {
      userUid: auth.currentUser.uid, // Current user's UID
      sprintName,
      tasks: selectedTasks,
      createdAt: new Date().toISOString(),
      status: 'Active'
    };

    // Add the sprint to the "sprints" collection in Firebase
    const docRef = await addDoc(collection(firestore, 'sprints'), sprint);

    // Successfully added the sprint, return true
    console.log('Sprint added with ID: ', docRef.id);
    return true;
  } catch (error) {
    console.error('Error adding sprint: ', error);
    return false;
  }
};

// Function to fetch the active sprint for the current user from Firebase
const firebaseFetchActiveSprint = async () => {
  const userUid = auth.currentUser.uid;

  const q = query(collection(firestore, 'sprints'), where('userUid', '==', userUid), where('status', '==', 'Active'));
  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size === 0) {
      // No active sprint found, return null
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

// Function to fetch tasks for a sprint from Firebase based on task IDs
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

// Function to close an active sprint in Firebase
const firebaseCloseSprint = async (sprintId) => {
  try {
    // Define the path to the sprint document in the Firestore collection
    const sprintRef = doc(firestore, 'sprints', sprintId);

    // Update the status of the sprint to 'Inactive'
    await updateDoc(sprintRef, { status: 'Inactive' });

    // Sprint closed successfully, return true
    console.log('Sprint closed successfully');
    return true;
  } catch (error) {
    console.error('Error closing sprint: ', error);
    return false;
  }
};

// Function to edit an existing sprint in Firebase
const firebaseEditSprint = async (sprintId, newSprintName, newSelectedTasks) => {
  try {
    // Define the path to the sprint document in the Firestore collection
    const sprintRef = doc(firestore, 'sprints', sprintId);

    // Update the sprint document with the new name and selected tasks
    await updateDoc(sprintRef, {
      sprintName: newSprintName,
      tasks: newSelectedTasks,
    });

    // Sprint edited successfully, return true
    console.log('Sprint edited successfully');
    return true;
  } catch (error) {
    console.error('Error editing sprint: ', error);
    return false;
  }
};

// Export all the Firebase-related functions
export {
  firebaseLogin,
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
