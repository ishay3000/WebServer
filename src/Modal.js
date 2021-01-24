import React, { Component } from 'react';
import './modal.css'

class Modal extends Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            SessionName: '',
            SyncDirectory: {},
            Bandwidth: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            SessionName: nextProps.SessionName,
            SyncDirectory: { 'Path': nextProps.SyncDirectory.Path },
            Bandwidth: { 'Rate': nextProps.Bandwidth.Rate }
        });
    }

    stateHandler(stateName, e) {
        this.setState({ [stateName]: e.target.value })
    }

    innerStateHandler(stateName, innerStateName, e) {
        this.setState({ [stateName]: { [innerStateName]: e.target.value } })
    }

    handleSave() {
        const item = this.state;
        this.props.saveModalDetails(item)
    }

    render() {
        return (
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Editing session</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div>
                            <div className="content">
                                <span className="modal-lable">Session Name:</span>
                                <input value={this.state.SessionName} onChange={(e) => this.stateHandler('SessionName', e)} />
                            </div>
                            {/* <div className="content">
                                <span className="modal-lable">Type:</span>
                                <input value={this.state.sessionType} onChange={(e) => this.stateHandler('sessionType', e)} />
                            </div> */}
                            <div className="content">
                                <span className="modal-lable">Sync Directory:</span>
                                <input value={this.state.SyncDirectory.Path} onChange={(e) => this.innerStateHandler('SyncDirectory', 'Path', e)} />
                            </div>
                            <div className="content">
                                <span className="modal-lable">Bandwidth:</span>
                                <input value={this.state.Bandwidth.Rate} onChange={(e) => this.innerStateHandler('Bandwidth', 'Rate', e)} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => { this.handleSave() }}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;