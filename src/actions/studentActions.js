import dispatcher from '../dispatcher/dispatcher';
import Firebase from 'firebase';

export function createStudent(newStudent, cb) {
  const ref = new Firebase('https://dazzling-inferno-5136.firebaseio.com/' + Date.now());

  ref.set(newStudent, () => {
    dispatcher.dispatch({
      type: 'CREATE_STUDENT',
    });

    return cb();
  });
}

export function deleteStudent(id) {
  const ref = new Firebase('https://dazzling-inferno-5136.firebaseio.com/' + id);

  ref.remove(() => {
    dispatcher.dispatch({
      type: 'REMOVED_STUDENT'
    });
  });
}

export function updateStudent(id, student, cb) {
  const ref = new Firebase('https://dazzling-inferno-5136.firebaseio.com/' + id);

  ref.set(student, () => {
    dispatcher.dispatch({
      type: 'UPDATE_STUDENT',
    });

    return cb();
  });
}

export function loadStudents() {
  const ref = new Firebase('https://dazzling-inferno-5136.firebaseio.com/');

  ref.on('value', (snapshot) => {
    dispatcher.dispatch({
      type: 'RECEIVE_STUDENTS',
      students: snapshot.val() ? snapshot.val() : {},
    });
  });
}
