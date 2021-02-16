//import Modal from './Modal.js';
import React from 'react';
import axios from 'axios';
import './stats.css'
import { colors } from '@material-ui/core';


class Stats extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
          requiredItem: 0,
          collectionOfstats: [],
        }

        // This exampleState is for demonstration only. 
        this.exampleState = {
            requiredItem: 0,
            collection: [
              {
                actionName: 'File',
                sessionName: 'Ishay session',
                date: '31/1/2021',
                sessionType: 'RX',
                nameOfFile: '/home/Ishay/Ishayhamaniac.txt',
                syncDirectory: '/home/Ishay',
                result: 'Success'
              }, 
              {
                actionName: 'File',
                sessionName: 'Ishay session',
                date: '31/1/2021',
                sessionType: 'RX',
                nameOfFile: '/home/Ishay/Ishayhamaniac.txt',
                syncDirectory: '/home/Ishay',
                result: 'Success'
              }, 
              {
                actionName: 'Folder',
                sessionName: 'Ishay session',
                date: '31/1/2021',
                sessionType: 'RX',
                nameOfFile: '/home/Ishay/Ishayhamaniac',
                syncDirectory: '/home/Ishay',
                result: 'Success'
              }
            ]
          }
      }

    componentDidMount() 
    {
        // This method will ask server for stats.
        // Each time client will refresh the web page, collection will grow and new stats will be shown. 
    }

    render(){
        // This collection will be shown inside the <div> that is being returned in render().
        // 
        const collection = this.exampleState.collection.map((item, index) => {
            return(
                <tr key={index}>
                    <td>{item.actionName}</td>
                    <td>{item.sessionName}</td>
                    <td>{item.date}</td>
                    <td>{item.sessionType}</td>
                    <td>{item.nameOfFile}</td>
                    <td>{item.syncDirectory}</td>
                    <td>{item.result}</td>
                </tr>)
        })

        return(
            <div>
                <div style={{ textAlign: "center"}}>
                    <h1>Pillar of Salt Statistics</h1>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">Type</th>
                        <th scope="col">Session name</th>
                        <th scope="col">Date</th>
                        <th scope="col">Session Type</th>
                        <th scope="col">Name of File/Directory</th>
                        <th scope="col">Sync Directory</th>
                        <th scope="col">result</th>
                        </tr>
                    </thead>
                    <tbody>
                    { collection } 
                    </tbody>
                </table>
            </div>)
    }
}

export default Stats;
