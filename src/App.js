import React, { Component } from 'react';
import logo from './logo.svg';

class App extends Component {
  state = {
    name: '',
    lastName: '',
    email: '',
    phone: '',
    data: []
  }

  datos = [];

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  saveData = (event) => {
    event.preventDefault();

    const record = { name: this.state.name, lastName: this.state.lastName, email: this.state.email, phone: this.state.phone }

    this.datos.push(record);

    //this.setState({ data: this.datos })
    this.setState((prevState, props) => {
      return { data: prevState.data.concat(record) }
    })

  }

  printTable = () => {
    return this.state.data.map((item) => {
      return <tr>
        <td>{item.name}</td>
        <td>{item.lastName}</td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
      </tr>
    })
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
                  <form action="">
                    <div className="row">
                      <div className="col-md-3">
                        <label htmlFor="">Name</label>
                        <input type="text" name="name" className="form-control" value={this.state.name} onChange={this.onChange} />
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="">Last Name</label>
                        <input type="text" name="lastName" className="form-control" value={this.state.lastName} onChange={this.onChange} />
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="">Email</label>
                        <input type="email" name="email" className="form-control" value={this.state.email} onChange={this.onChange} />
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="">Phone</label>
                        <input type="text" name="phone" className="form-control" value={this.state.phone} onChange={this.onChange} />
                      </div>
                      <div className="col-md-12">
                        <button type="submit" className="btn btn-success" onClick={this.saveData}>
                          Save
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
