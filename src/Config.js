import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import MaterialTable from 'material-table'
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { forwardRef } from 'react';


// //JSON data from RESTful API
var user = {
    "user":
    {
        "id": 2,
        "email": "janet.weaver@reqres.in",
        "first_name": "Janet",
        "last_name": "Weaver",
    }
}

var columns = [
    // { title: "Name", field: "name", hidden: true },
    { title: "Name", field: "name" },
    { title: "Bandwidth", field: "bandwidth" }
    // { title: "Last name", field: "last_name" },
]

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const api = Axios.create({
    baseURL: `https://reqres.in/api`
})

export default function Config() {
    const [data, setData] = useState([]); //table data

    let useApi = false
    useEffect(() => {
        if (useApi) {
            api.get("/users")
                .then(res => {
                    console.log(res)
                    setData(res.data.data)
                })
                .catch(error => {
                    console.log("Error")
                })
        }
        else {
            Axios.get('https://localhost:1337/sessions')
                .then(res => {
                    setData(res.data.sessions)
                    console.log(res)
                })
        }
    }, [])

    return (
        <div className='App'>
            <MaterialTable
                title="Sessions"
                columns={columns}
                data={data}
                icons={tableIcons}
                editable={{
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            handleRowUpdate(newData, oldData, resolve);
                        }),
                    onRowAdd: (newData) =>
                        new Promise((resolve) => {
                            handleRowAdd(newData, resolve)
                        }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            handleRowDelete(oldData, resolve)
                        }),
                }}
            />
        </div>
    )
}

const handleRowAdd = (newData, resolve) => {
    // //validation
    let errorList = []
    // if (newData.first_name === undefined) {
    //     errorList.push("Please enter first name")
    // }
    // if (newData.last_name === undefined) {
    //     errorList.push("Please enter last name")
    // }
    // if (newData.email === undefined || validateEmail(newData.email) === false) {
    //     errorList.push("Please enter a valid email")
    // }
    if (errorList.length < 1) { //no error

        // api.post("/users", newData)
        //     .then(res => {
        //         let dataToAdd = [...data];
        //         dataToAdd.push(newData);
        //         setData(dataToAdd);
        //         resolve()
        //         // setErrorMessages([])
        //         // setIserror(false)
        //     })
        //     .catch(error => {
        //         // setErrorMessages(["Cannot add data. Server error!"])
        //         // setIserror(true)
        //         resolve()
        //     })
    } else {
        // setErrorMessages(errorList)
        // setIserror(true)
        resolve()
    }
}

const handleRowUpdate = (newData, oldData, resolve) => {
    // //validation
    // if (errorList.length < 1) {
    //     api.patch("/users/" + newData.id, newData)
    //         .then(res => {
    //             const dataUpdate = [...data];
    //             const index = oldData.tableData.id;
    //             dataUpdate[index] = newData;
    //             setData([...dataUpdate]);
    //             resolve()
    //             setIserror(false)
    //             setErrorMessages([])
    //         })
    //         .catch(error => {
    //             setErrorMessages(["Update failed! Server error"])
    //             setIserror(true)
    //             resolve()
    //         })
    // } else {
    //     setErrorMessages(errorList)
    //     setIserror(true)
    //     resolve()
    // }
}

const handleRowDelete = (oldData, resolve) => {
    // api.delete("/users/" + oldData.id)
    //     .then(res => {
    //         const dataDelete = [...data];
    //         const index = oldData.tableData.id;
    //         dataDelete.splice(index, 1);
    //         setData([...dataDelete]);
    //         resolve()
    //     })
    //     .catch(error => {
    //         setErrorMessages(["Delete failed! Server error"])
    //         setIserror(true)
    //         resolve()
    //     })
}