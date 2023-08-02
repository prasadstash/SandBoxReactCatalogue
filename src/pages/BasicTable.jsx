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
      name: "IMAGE_PATH",
      selector : row => <img width={50} height={50} src={"https://localhost:7154/api/Catalogue/download/"+row.IMAGE_PATH}/>,
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

  
  
  const [records, setRecords] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);

  const handleFilter = (event) => {
    const newData = filterRecords.filter(row => row.name.toLowerCase().includes(event.target.value.toLowerCase()));
    setRecords(newData);
  }
  
 


  useEffect(() => {
    
    const fetchData = async () => {
      axios.get('/api/Catalogue/')
      .then(res => {
        console.log(res.data)
        setRecords(res.data)
        setFilterRecords(res.data)
      })
      .catch(err => console.log(err));
    }

    const appendURL = () => {
      
    }
    fetchData();
    
  }, [])

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
        fixedHeader
        fixedHeaderScrollHeight='700px'
        
        // customStyles={customStyles}
      ></DataTable>
    </div>
  )
}

export default BasicTable