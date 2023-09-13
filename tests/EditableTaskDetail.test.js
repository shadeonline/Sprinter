import React from 'react';
import renderer from 'react-test-renderer';
import EditableTaskDetail from '../components/EditableTaskDetail';

describe('EditableTaskDetail', () => {
  it('matches snapshot', () => {
    const task = {
      taskTitle: 'Sample Task',
      storyPoint: '3',
      taskDescription: 'This is a sample task description.',
      deadline: '30/09/23',
    };
    const editedTask = {
      taskTitle: 'Edited Task',
      storyPoint: '5',
      taskDescription: 'This is the edited task description.',
      deadline: '15/10/23',
    };
    const setEditedTask = jest.fn();
    const handleSaveChanges = jest.fn();
    const setIsEditing = jest.fn();

    const tree = renderer
      .create(
        <EditableTaskDetail
          task={task}
          editedTask={editedTask}
          setEditedTask={setEditedTask}
          handleSaveChanges={handleSaveChanges}
          setIsEditing={setIsEditing}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
