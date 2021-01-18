import Modal from './Modal.js';
import React from 'react';
import axios from 'axios';


export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.replaceModalItem = this.replaceModalItem.bind(this);
    this.saveModalDetails = this.saveModalDetails.bind(this);
    this.saveChangesToFile = this.saveChangesToFile.bind(this)
    this.state = {
      requiredItem: 0,
      brochure: [],
      changedSessions: []
    }
  }
  componentDidMount() {
    axios.get(`https://localhost:1337/sessions`)
      .then(res => {
        const sessions = res.data.Sessions
        var brochure = []
        this.setState({ sessions });
        var index = 0
        this.state.sessions.map(session => {
          console.log(index)
          var currentSession = Object.values(session)[0]
          brochure[index] = {
            sessionName: currentSession.Name,
            sessionType: currentSession.Type,
            syncDirectory: currentSession.SyncDirectory.Path,
            bandwidth: currentSession.Bandwidth.Rate,
          }
          ++index
          this.setState({ brochure });
        })
      })
  }

  replaceModalItem(index) {
    this.setState({
      requiredItem: index
    });
  }

  storeChangedSession(sessionName, modification) {
    let tempChangedIndexes = this.state.changedSessions;
    tempChangedIndexes.push({
      modification: modification,
      session: sessionName
    })
    this.setState({ changedIndexes: tempChangedIndexes });
  }

  saveModalDetails(item) {
    const requiredItem = this.state.requiredItem;
    let tempbrochure = this.state.brochure;
    tempbrochure[requiredItem] = item;

    this.storeChangedSession(item, 'modified');
    this.setState({ brochure: tempbrochure });
  }

  deleteItem(index) {
    let tempBrochure = this.state.brochure;
    let sessionName = tempBrochure[index].sessionName;
    tempBrochure.splice(index, 1);

    this.storeChangedSession(sessionName, 'deleted')
    this.setState({ brochure: tempBrochure });
  }

  saveChangesToFile() {
    console.log('Saving changes to file...')

    console.log(JSON.stringify(this.state.changedSessions))
    
    axios.post('https://localhost:1337/sessions', {
      data: JSON.stringify(this.state.changedSessions)
    }).then(res => {
      console.log(res)
    })

    this.state.changedSessions = []
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
              this.deleteItem(index)
            }
            }>remove</button>
          </td>
        </tr>
      )
    });

    const requiredItem = this.state.requiredItem;
    let modalData = this.state.brochure[requiredItem];

    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <h1>Sessions configuration</h1>
          <input type='button' value='Save changes to file' onClick={this.saveChangesToFile} />
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
        { modalData ?
          <Modal
            sessionName={modalData.sessionName}
            sessionType={modalData.sessionType}
            syncDirectory={modalData.syncDirectory}
            bandwidth={modalData.bandwidth}
            saveModalDetails={this.saveModalDetails}
          />
          :
          null}

      </div>
    );
  }
}














  // render() {
  //   return (
  //     <ul>
  //       Hello
  //       {
  //         this.state.sessions.map(session => {
  //           console.log(Object.values(session)[0].Type)
  //         })
  //         // console.log(this.isJson(this.state.sessions))
  //         // this.state.sessions.forEach(session => {
  //         //   console.log(session)
  //         // })
  //       }
  //     </ul>
  //   )
  // }
//}

