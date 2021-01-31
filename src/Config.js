import React, { Component } from 'react';
import Modal from './Modal.js';
import Axios from 'axios';


class Config extends Component {
  constructor(props) {
    super(props);

    this.replaceModalItem = this.replaceModalItem.bind(this);
    this.saveModalDetails = this.saveModalDetails.bind(this);

    Axios.get('https://localhost:1337/sessions')
      .then(res => {
        console.log(res)
      })

    this.state = {
      requiredItem: 0,
      brochure: [
        {
          sessionName: 'Lior Tembel',
          sessionType: 'RX',
          syncDirectory: '/home/Kappa',
          syslogIP: '0.0.0.0',
          snmpIP: '0.0.0.0'
        }, {
          sessionName: 'Lior Tembel',
          sessionType: 'RX',
          syncDirectory: '/home/Kappa',
          syslogIP: '0.0.0.0',
          snmpIP: '0.0.0.0'
        }, {
          sessionName: 'Lior Tembel',
          sessionType: 'RX',
          syncDirectory: '/home/Kappa',
          syslogIP: '0.0.0.0',
          snmpIP: '0.0.0.0'
        }
      ]
    }
  }

  replaceModalItem(index) {
    this.setState({
      requiredItem: index
    });
  }

  saveModalDetails(item) {
    const requiredItem = this.state.requiredItem;
    let tempbrochure = this.state.brochure;
    tempbrochure[requiredItem] = item;
    this.setState({ brochure: tempbrochure });
  }

  deleteItem(index) {
    let tempBrochure = this.state.brochure;
    tempBrochure.splice(index, 1);
    this.setState({ brochure: tempBrochure });
  }

  render() {
    const brochure = this.state.brochure.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.sessionName}</td>
          <td>{item.sessionType}</td>
          <td>{item.syncDirectory}</td>
          <td>
            <button className="btn btn-primary" data-toggle="modal" data-target="#exampleModal"
              onClick={() => this.replaceModalItem(index)}>edit</button> {" "}
            <button className="btn btn-danger" onClick={() => {
              console.log(index)
              this.deleteItem(index)
            }
            }>remove</button>
          </td>
        </tr>
      )
    });

    const requiredItem = this.state.requiredItem;
    let modalData = this.state.brochure[requiredItem];
    console.log(modalData)
    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <h1>Pillar of Salt Configuration</h1>
        </div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Session Name</th>
              <th scope="col">Session Type</th>
              <th scope="col">Sync Directory</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {brochure}
          </tbody>
        </table>
        {
         modalData ?
          <Modal
            sessionName={modalData.sessionName}
            sessionType={modalData.sessionType}
            syncDirectory={modalData.syncDirectory}
            snmpIP={modalData.snmpIP}
            syslogIP={modalData.syslogIP}
            saveModalDetails={this.saveModalDetails}
          />
          :
          null}

      </div>
    );
  }
}

export default Config;