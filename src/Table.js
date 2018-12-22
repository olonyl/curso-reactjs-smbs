import React, { Component } from 'react'

class Table extends Component {
    printTable = () => {
        return this.props.data.map((item) => {
            return <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td><a href="" onClick={this.props.editRecord(item)}><i className="fas fa-edit"></i></a></td>
                <td><a href="" onClick={this.props.deleteRecord(item.id)}><i className="fas fa-trash-alt"></i></a></td>
            </tr>
        })
    }


    render() {
        return (
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

        )
    }
}

export default Table;