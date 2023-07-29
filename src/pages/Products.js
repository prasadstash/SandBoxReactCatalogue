import React, {useEffect, useState} from "react";
import axios from 'axios';

export default function Products() {

  const [data, setData]= useState([])

  useEffect(()=>{
    // axios.get('https://jsonplaceholder.typicode.com/photos')
    // .then(res => console.log(res))
    // .catch(err => console.log(err));

    axios.get('https://jsonplaceholder.typicode.com/photos')
    .then(res => setData(res.data))
    .catch(err => console.log(err));

  },[])

  return (
    <div className="table_container">
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>albumId</th>
            <th>url</th>
            <th>thumbnailUrl</th>
            <th>title</th>
          </tr>
        </thead>
        <tbody>
            {
              data.map((user, index) => (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.albumId}</td>
                <td>{user.url}</td>
                <td>{user.thumbnailUrl}</td>
                <img src={user.thumnailUrl} />
                <td>{user.title}</td>
              </tr>
              )) 
            }
        </tbody>
      </table>
    </div>
  );
}
