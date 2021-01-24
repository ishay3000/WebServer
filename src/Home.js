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
          var currentSession = Object.values(session)[0]
          brochure[index] = {
            SessionName: currentSession.Name,
            SessionType: currentSession.Type,
            Bandwidth: { Rate: currentSession.Bandwidth.Rate },
            SyncDirectory: { Path: currentSession.SyncDirectory.Path }
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

  storeChangedSession(session, modification, sessionNameChangedProps) {
    let tmpChangedSessions = this.state.changedSessions;
    tmpChangedSessions.push({
      modification: modification,
      session: session,
      sessionNameChangedProps: sessionNameChangedProps
    })
    this.setState({ changedIndexes: tmpChangedSessions });
  }

  saveModalDetails(item) {
    const requiredItem = this.state.requiredItem;
    let tempbrochure = this.state.brochure;
    let currentName = tempbrochure[requiredItem].SessionName;
    item.SessionType = tempbrochure[requiredItem].SessionType;
    const sessionNameChanged = {
      'sessionNameChanged':
        (currentName !== item.SessionName), 'oldName': currentName
    }

    tempbrochure[requiredItem] = item;

    this.storeChangedSession(item, 'modified', sessionNameChanged);
    this.setState({ brochure: tempbrochure });
  }

  deleteItem(index) {
    let tempBrochure = this.state.brochure;
    let tmpSessionName = tempBrochure[index].SessionName;
    tempBrochure.splice(index, 1);

    this.storeChangedSession(tmpSessionName, 'deleted')
    this.setState({ brochure: tempBrochure });
  }

  saveChangesToFile() {
    console.log('Saving changes to filesystem...')

    // console.log(JSON.stringify(this.state.changedSessions))

    axios.post('https://localhost:1337/sessions', {
      data: JSON.stringify(this.state.changedSessions)
    }).then(res => {
      // console.log(res)
    })

    this.state.changedSessions = []
  }

  showModal() {
    return (
      <Modal
        SessionName={''}
        SessionType={''}
        SyncDirectory={''}
        Bandwidth={''}
        saveModalDetails={this.saveModalDetails}
      />
    )
  }


  render() {
    const brochure = this.state.brochure.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.SessionName}</td>
          <td>{item.SessionType}</td>
          <td>{item.SyncDirectory.Path}</td>
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
    var tmpModal;

    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <h1>Sessions configuration</h1>
          <button className="btn btn-warning"
            onClick={() => this.saveChangesToFile()
            }>Save changes</button> {" "}
          <button className='btn btn-info' data-toggle="modal" data-target="#exampleModal"
            onClick={() => {
              tmpModal = true;
            }}>Add new session</button> {" "}
        </div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Session Name</th>
              <th scope="col">Session Type</th>requiredItem
            </tr>
          </thead>
          <tbody>
            {brochure}
          </tbody>
        </table>

        {tmpModal ? <Modal
          SessionName={''}
          SessionType={''}
          SyncDirectory={''}
          Bandwidth={''}
          saveModalDetails={this.saveModalDetails}
        />
          :
          (modalData ? <Modal
            SessionName={modalData.SessionName}
            SessionType={modalData.SessionType}
            SyncDirectory={modalData.SyncDirectory}
            Bandwidth={modalData.Bandwidth}
            saveModalDetails={this.saveModalDetails}
          /> : null)}

        {/* { modalData ?
          <Modal
            SessionName={modalData.SessionName}
            SessionType={modalData.SessionType}
            SyncDirectory={modalData.SyncDirectory}
            Bandwidth={modalData.Bandwidth}
            saveModalDetails={this.saveModalDetails}
          />
          :
          null} */}

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

