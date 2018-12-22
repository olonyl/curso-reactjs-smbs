import React, { Component } from 'react';

const uuidv4 = require('uuid/v4');

class App extends Component {

  INITIAL_STATE = {
    id: 0,
    name: '',
    lastName: '',
    email: '',
    phone: ''
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

  saveData = (event) => {
    event.preventDefault();
    if (this.state.id == 0)
      this.createRecord();
    else
      this.updateRecord()

  }

  deleteRecord = (id) => (e) => {
    e.preventDefault();
    this.setState((prevState, props) => {
      return { data: prevState.data.filter((item) => item.id != id) }
    })
  }

  createRecord = () => {
    const record = { id: uuidv4(), name: this.state.name, lastName: this.state.lastName, email: this.state.email, phone: this.state.phone }

    this.setState((prevState, props) => {
      return {
        data: prevState.data.concat(record),
        ...this.INITIAL_STATE
      }
    })
  }

  editRecord = (item) => (e) => {
    e.preventDefault();
    this.setState((prevState, props) => {
      return { ...item }
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

  clearInputs = (e) => {
    e.preventDefault();
    this.setState({ ...this.INITIAL_STATE })
  }
  printTable = () => {
    return this.state.data.map((item) => {
      return <tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.lastName}</td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
        <td><a href="" onClick={this.editRecord({ ...item })} ><i className="fas fa-edit"></i></a></td>
        <td><a href="" onClick={this.deleteRecord(item.id)}><i className="fas fa-trash-alt"></i></a></td>
      </tr>
    })
  }
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
                  <form onSubmit={this.saveData}>
                    <div className="row">
                      <div className="col-md-3">
                        <label htmlFor="">Name</label>
                        <input type="text" name="name" className="form-control" value={this.state.name} onChange={this.onChange} required />
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="">Last Name</label>
                        <input type="text" name="lastName" className="form-control" value={this.state.lastName} onChange={this.onChange} required />
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="">Email</label>
                        <input type="email" name="email" className="form-control" value={this.state.email} onChange={this.onChange} required />
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="">Phone</label>
                        <input type="text" name="phone" className="form-control" value={this.state.phone} onChange={this.onChange} required />
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-md-12">
                        <button type="submit" className="btn btn-success" >
                          Save
                         </button>
                        <button type="submit" className="btn btn-danger ml-3" onClick={this.clearInputs} >
                          Clear
                         </button>
                      </div>

                    </div>
                  </form>
                </div>
              </div>
              <div className="col-md-12">
                <table className="table table-responsive">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.printTable()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default App;
