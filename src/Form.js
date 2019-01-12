import React, { Component } from 'react';

class Form extends Component {
    render() {
        return (
            <form action="" onSubmit={this.props.saveData}>
                <div className="row">
                    <div className="col-md-3">
                        <label htmlFor="">Name</label>
                        <input type="text" name="name" className="form-control" value={this.props.name} onChange={this.props.onChange} required />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="">Last Name</label>
                        <input type="text" name="lastName" className="form-control" value={this.props.lastName} onChange={this.props.onChange} required />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="">Email</label>
                        <input type="email" name="email" className="form-control" value={this.props.email} onChange={this.props.onChange} required />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="">Phone</label>
                        <input type="text" name="phone" className="form-control" value={this.props.phone} onChange={this.props.onChange} required />
                    </div>
                    <div className="col-md-12 mt-3">
                        <button type="submit" className="btn btn-success" >
                            Save
                        </button>
                        <button type="reset" className="btn btn-danger ml-3" onClick={this.props.clearInputs} >
                            Clear
                        </button>
                    </div>
                </div>
            </form>

        )
    }
}

export default Form;