import React, { Component } from 'react';
import logo from './logo.svg';
import Table from './Table';
import Form from './Form'
import firebase from 'firebase';

const uuidv4 = require('uuid/v4');

class App extends Component {
  INITIAL_STATE = {
    name: '',
    lastName: '',
    email: '',
    phone: '',
    id: 0
  }

  constructor() {
    super();
    this.state = {
      data: [],
      ...this.INITIAL_STATE
    }
  }
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  editRecord = (item) => (e) => {
    e.preventDefault();
    this.setState({ ...item })
  }
  deleteRecord = (id) => (e) => {
    e.preventDefault();

    firebase.database().ref(`/users/employees/${id}`)
      .remove()
      .then(() => {

      })

  }
  saveData = (event) => {
    event.preventDefault();
    if (this.state.id == 0)
      this.createNewRecord();
    else
      this.updateRecord();
  }
  createNewRecord = () => {
    const record = { name: this.state.name, lastName: this.state.lastName, email: this.state.email, phone: this.state.phone }

    firebase.database().ref(`/users/employees`)
      .push(record)
      .then((data) => {
        this.setState({ ...this.INITIAL_STATE })
      }).catch(error => console.log(error))
  }
  updateRecord = () => {
    var newRecord = {
      name: this.state.name,
      lastName: this.state.lastName,
      email: this.state.email,
      phone: this.state.phone
    }
    firebase.database().ref(`/users/employees/${this.state.id}`)
      .set(newRecord)
      .then(() => {
        this.setState({ ...this.INITIAL_STATE })
      })
  }


  clearInputs = () => {
    this.setState({ ...this.INITIAL_STATE })
  }

  componentWillMount() {
    this.configConnection();
    this.fetchData();
  }

  configConnection = () => {
    var config = {
      apiKey: "AIzaSyChSGpKwG4kejslh9MZ3-eFGoVzCFnlUZI",
      authDomain: "mcurso-a6b81.firebaseapp.com",
      databaseURL: "https://mcurso-a6b81.firebaseio.com",
      projectId: "mcurso-a6b81",
      storageBucket: "mcurso-a6b81.appspot.com",
      messagingSenderId: "1037002527642"
    };
    firebase.initializeApp(config);
  }

  fetchData = () => {
    firebase.database().ref(`/users/employees`)
      .on('value', snapshot => {
        this.setState({ data: this.snapshotToArray(snapshot) })
      })
  }
  snapshotToArray = (snapshot) => {
    var returnArr = [];

    snapshot.forEach(childSnapshot => {
      var item = childSnapshot.val();
      item.id = childSnapshot.key;

      returnArr.push(item);
    });

    return returnArr;
  };

  render() {
    return (
      <div className="App">
        <div className="container mt-2">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h5>Form</h5>
                </div>
                <div className="card-body">
                  <Form saveData={this.saveData} onChange={this.onChange} clearInputs={this.clearInputs} {...this.state} />
                </div>
              </div>
              <div className="col-md-12">
                <Table editRecord={this.editRecord}
                  deleteRecord={this.deleteRecord}
                  data={this.state.data}></Table>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default App;