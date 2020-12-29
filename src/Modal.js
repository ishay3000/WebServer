import React, { Component } from 'react';
import './modal.css'

class Modal extends Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            sessionName: '',
            sessionType: '',
            syncDirectory: '',
            syslogIP: '',
            snmpIP: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            sessionName: nextProps.sessionName,
            sessionType: nextProps.sessionType,
            syncDirectory: nextProps.syncDirectory,
            syslogIP: nextProps.syslogIP,
            snmpIP: nextProps.snmpIP,
        });
    }

    stateHandler(stateName, e) {
        this.setState({ [stateName]: e.target.value })
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
                            <div class="content">
                                <span className="modal-lable">Session Name:</span>
                                <input value={this.state.sessionName} onChange={(e) => this.stateHandler('sessionName', e)} />
                            </div>
                            <div class="content">
                                <span className="modal-lable">Session Type:</span>
                                <input value={this.state.sessionType} onChange={(e) => this.stateHandler(this.state.sessionType.name, e)} />
                            </div>
                            <div class="content">
                                <span className="modal-lable">Session Sync Directory:</span>
                                <input value={this.state.syncDirectory} onChange={(e) => this.stateHandler(this.state.syncDirectory, e)} />
                            </div>
                            <div class="content">
                                <span className="modal-lable">syslogIP:</span>
                                <input value={this.state.syslogIP} onChange={(e) => this.stateHandler(this.state.syslogIP, e)} />
                            </div>
                            <div class="content">
                                <span className="modal-lable">SNMP IP:</span>
                                <input value={this.state.snmpIP} onChange={(e) => this.stateHandler(this.state.snmpIP, e)} />
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