import Modal from './Modal.js';
import React from 'react';
import axios from 'axios';


export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.replaceModalItem = this.replaceModalItem.bind(this);
    this.addSession = this.addSession.bind(this);
    this.saveModalDetails = this.saveModalDetails.bind(this);
    this.saveChangesToFile = this.saveChangesToFile.bind(this)
    this.state = {
      requiredItem: 0,
      brochure: [],
      changedSessions: [],
      modification: '',
      sessions: []
    }
  }
  componentDidMount() {
    axios.get(`https://localhost:1337/sessions`)
      .then(res => {
        const sessions = res.data.Sessions
        const brochure = [];
        this.setState({ sessions });
        this.state.sessions.map(session => {
          var currentSession = Object.values(session)[0]

          brochure.push({
            SessionName: currentSession.Name,
            SessionType: currentSession.Type,
            Bandwidth: { Rate: currentSession.Bandwidth.Rate },
            SyncDirectory: { Path: currentSession.SyncDirectory.Path }
          })
          return brochure
        })
        this.setState({ brochure });
      })
  }

  replaceModalItem(index, modification) 
  {
    this.setState({
      requiredItem: index,
      modification: modification
    });
    console.log(index)
    console.log(modification);
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

  saveModalDetails(item, modification) {
    const requiredItem = this.state.requiredItem;
    let tempbrochure = this.state.brochure;
    let currentName = tempbrochure[requiredItem].SessionName;
    item.SessionType = tempbrochure[requiredItem].SessionType;
    const sessionNameChanged = {
      'sessionNameChanged':
        (currentName !== item.SessionName), 'oldName': currentName
    }

    tempbrochure[requiredItem] = item;

    this.storeChangedSession(item, modification, sessionNameChanged);
    this.setState({ 
      brochure: tempbrochure,
      requiredItem: -1
     });
    
  }

  deleteItem(index) {
    let tempBrochure = this.state.brochure;
    let tmpSessionName = tempBrochure[index].SessionName;
    tempBrochure.splice(index, 1);

    this.storeChangedSession(tmpSessionName, 'deleted')
    this.setState({ brochure: tempBrochure });
    this.setState({requiredItem: -1})
  }

  saveChangesToFile() {
    console.log('Saving changes to filesystem...')
    if (this.state.changedSessions.length < 1) {
      return;
    }

    axios.post('https://localhost:1337/sessions', {
      data: JSON.stringify(this.state.changedSessions)
    }).then(res => {
      console.log(res);
    })
    this.setState({ changedSessions: [] })
    //this.state.changedSessions = []
  }

  addSession() 
  {
    this.state.brochure.push({
      SessionName: '',
      SessionType: 'TX',
      Bandwidth: { Rate: '' },
      SyncDirectory: { Path: '' }
    });

    this.replaceModalItem(this.state.brochure.length - 1, 'added');

  }


  render() {
    console.log('Rendering');
    const brochure = this.state.brochure.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.SessionName}</td>
          <td>{item.SessionType}</td>
          <td>{item.SyncDirectory.Path}</td>
          <td>
            <button className="btn btn-primary" data-target="#exampleModal"
              onClick={() => 
                {
                  this.replaceModalItem(index, 'modified')
                }}>
                  edit</button> {" "}

            <button className="btn btn-danger" 
            onClick={() => 
            {
              this.deleteItem(index)
            }
            }>
              remove</button>
          </td>
        </tr>
      )
    });

    const requiredItem = this.state.requiredItem;
    let modalData = this.state.brochure[requiredItem];
    if (this.state.requiredItem < 0) {
      modalData = null;
    }
    console.log(modalData);

    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <h1>Sessions configuration</h1>
          <button className="btn btn-warning" style={{outline:"none" }}
            onClick={() => {
              this.saveChangesToFile();
            }
            }>Save changes</button> {" "}
          <button className='btn btn-info' data-target="#exampleModal"
            onClick={() => {
              this.addSession()
            }}>Add new session</button> {" "}
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

        
          {modalData ? <Modal
            SessionName={modalData.SessionName}
            SessionType={modalData.SessionType}
            SyncDirectory={modalData.SyncDirectory}
            Bandwidth={modalData.Bandwidth}
            Modification={this.state.modification}
            saveModalDetails={this.saveModalDetails}
          /> : null}
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

