import { useState } from 'react'
import React, { useEffect } from 'react'

import axios from 'axios'
import DataTable from 'react-data-table-component'



function BasicTable() {

  const column = [
    {
      name: "Id",
      selector : row => row.id,
      sortable : true
    },
    {
      name: "Image_path",
     // selector : row => row.IMAGE_PATH,
      selector : row => <img width={50} height={50} src={row.IMAGE_PATH}/>,
      sortable : true
      
    },
    {
      name: "Part Name",
      selector : row => row.PARTNAME
    },
    {
      name: "Quantity Required",
      selector : row => row.QTY_REQ,
      sortable : true
    },
 
    {
      name: "Quote File",
      selector : row => row.QUOTE_FILE
    }
   
  ]

  useEffect(() => {
    const fetchData = async () => {
      //axios.get('https://jsonplaceholder.typicode.com/photos')
      axios.get('/api/Catalogue/')
      .then(res => {
        console.log(res)
        setRecords(res.data)
        setFilterRecords(res.data)
      })
      .catch(err => console.log(err));
    }
    fetchData();
    
  }, [])
  
  const [records, setRecords] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);


  const handleFilter = (event) => {
    const newData = filterRecords.filter(row => row.name.toLowerCase().includes(event.target.value.toLowerCase()));
    setRecords(newData);
  }
  console.log(records)
  return (
    <div style={{padding: "50px 10%", backgroundColor: "grey"}}>
      <div style={{display: 'flex', justifyContent: 'right'}}>
        <input type='text' placeholder='search...' onChange={handleFilter} style={{padding:'6px 10px'}}/>
      </div>
      <DataTable
        columns={column}
        data={records}
        pagination
        selectableRows
        // customStyles={customStyles}
      ></DataTable>
    </div>
  )
}

export default BasicTable