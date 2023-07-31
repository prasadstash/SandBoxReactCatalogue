import { useState } from 'react'
import React, { useEffect } from 'react'

import axios from 'axios'
import DataTable from 'react-data-table-component'

function BasicTable() {

  const column = [
    {
      name: "Album Id",
      selector : row => row.albumId,
      sortable : true
    },
    {
      name: "ID",
      selector : row => row.id,
      sortable : true
    },
    {
      name: "Thumbnail URL",
      selector : row => row.thumbnailUrl
    },
    {
      name: "Title",
      selector : row => row.title,
      sortable : true
    },
 
    {
      name: "URL",
      selector : row => row.url
    }
   
  ]

  useEffect(() => {
    const fetchData = async () => {
      axios.get('https://jsonplaceholder.typicode.com/photos')
      .then(res => setRecords(res.data))
      .catch(err => console.log(err));
    }
    fetchData();
    
  }, [])
  
  const [records, setRecords] = useState([]);
  console.log(records)
  return (
    <div style={{padding: "50px 10px", backgroundColor: "grey"}}>
    <DataTable
    columns={column}
      data={records}
      pagination
      // customStyles={customStyles}
    >
      
    </DataTable>
    </div>
  )
}

export default BasicTable