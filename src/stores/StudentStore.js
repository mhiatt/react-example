import { EventEmitter } from 'events';
import dispatcher from '../dispatcher/dispatcher';
import { findIndex } from 'lodash';

class StudentStore extends EventEmitter {
  constructor() {
    super();

    this.students = {};
  }

  createStudent(text) {

    this.emit('change');
  }

  getAll() {
    return this.students;
  }

  getOne(id, cb) {
    if (cb) {
      return cb(this.students[id]);
    }

    return this.students[id];
  }

  handleActions(action) {
    switch (action.type) {
      case 'CREATE_STUDENT': {
        this.emit('change');
        break;
      }
      case 'UPDATE_STUDENT': {
        this.emit('change');
        break;
      }
      case 'RECEIVE_STUDENTS': {
        this.students = action.students;
        this.emit('change');
        break;
      }
      case 'DELETE_STUDENT': {
        this.emit('change');
        break;
      }
    }
  }

}

const studentStore = new StudentStore;
dispatcher.register(studentStore.handleActions.bind(studentStore));

export default studentStore;
