import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import EditStudentForm from './components/EditStudentForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/student-form" component={StudentForm} />
          <Route path="/students" component={StudentList} />
          <Route path="/edit-student/:id" component={EditStudentForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
nod