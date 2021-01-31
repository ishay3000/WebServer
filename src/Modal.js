import React, { Component } from 'react';
import './modal.css'
import { Modal, Button } from "react-bootstrap";


class MyModal extends Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);

        this.state = {
            SessionName: '',
            SyncDirectory: {},
            Bandwidth: '',
            modification: '',
            errors: {},
            show: false
        }
    }



    componentWillReceiveProps(nextProps) {
        this.setState({
            SessionName: nextProps.SessionName,
            SyncDirectory: { 'Path': nextProps.SyncDirectory.Path },
            Bandwidth: { 'Rate': nextProps.Bandwidth.Rate },
            modification: nextProps.Modification,
            show: true
        });
        //this.handleShow()
    }
    stateHandler(stateName, e) {
        this.setState({ [stateName]: e.target.value })
    }

    innerStateHandler(stateName, innerStateName, e) {
        this.setState({ [stateName]: { [innerStateName]: e.target.value } })
    }
    handleValidation() {
        const item = this.state;
        const errors = [];
        let formIsValid = true;
        //validate name
        if (!item.SessionName) {
            formIsValid = false;
            errors["name"] = "Cannot be empty";
        }

        if (typeof item.SessionName !== "undefined") {
            if (!item.SessionName.match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["name"] = "Only letters";
            }
        }
        this.setState({ errors: errors });
        return formIsValid
    }
    handleSave() {
        if (!this.handleValidation()) {
            console.log("Validation error")
            return;
        }
        const item = this.state;
        console.log(this.state.modification);
        this.state.show = false;
        this.props.saveModalDetails(item, this.state.modification)
        console.log(this.state.show);
        this.handleClose();
    }

    handleClose() {
        this.setState({ show: false })

    }
    handleShow() {
        this.setState({ show: true })

    }

    render() {
        console.log(this.state.show);
        return (
                <Modal
                    id="exampleModal"
                    show={this.state.show}
                    onHide={this.handleClose}
                    keyboard={false}
                    size="lg"
                >   
                    <Modal.Header closeButton>
                        <Modal.Title>Modal title</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="content">
                            <span className="modal-lable">Session Name:</span>
                            <input value={this.state.SessionName} type="text" onChange={(e) => this.stateHandler('SessionName', e)} />
                        </div>
                        <div className="content">
                            <span className="modal-lable">Sync Directory:</span>
                            <input value={this.state.SyncDirectory.Path} type="text" onChange={(e) => this.innerStateHandler('SyncDirectory', 'Path', e)} />
                        </div>
                        <div className="content">
                            <span className="modal-lable">Bandwidth:</span>
                            <input value={this.state.Bandwidth.Rate} type="text" onChange={(e) => this.innerStateHandler('Bandwidth', 'Rate', e)} />
                        </div>
                    </Modal.Body>
                    {

                        <div className="modal-footer">
                            
                            <Button variant="secondary" 
                            onClick={this.handleClose}>
                                Close
                            </Button>
                            
                            <Button variant="primary"
                            onClick={this.handleSave}>
                                Save changes
                                </Button>
                        </div>
                    }
                </Modal>
        );
    }

}

export default MyModal;