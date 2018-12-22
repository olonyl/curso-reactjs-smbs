import React, { Component } from 'react';
import logo from './logo.svg';
import Table from './Table';
import Form from './Form'

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
    this.setState((prevState) => {
      return { data: prevState.data.filter(item => item.id != id) }
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
    const record = { id: uuidv4(), name: this.state.name, lastName: this.state.lastName, email: this.state.email, phone: this.state.phone }

    //this.setState({ data: this.datos })
    this.setState((prevState, props) => {
      return { data: prevState.data.concat(record), ...this.INITIAL_STATE }
    })
  }
  updateRecord = () => {
    var newRecord;
    var newData = [];
    newData = this.state.data.map(item => {
      newRecord = { ...item }
      if (item.id == this.state.id) {
        newRecord = {
          name: this.state.name,
          lastName: this.state.lastName,
          email: this.state.email,
          phone: this.state.phone,
          id: item.id
        }
      }

      return newRecord;
    })
    this.setState((prevState, props) => {
      return { data: newData, ...this.INITIAL_STATE }
    })
  }


  clearInputs = () => {
    this.setState({ ...this.INITIAL_STATE })
  }


  render() {
    console.log(this.state)
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