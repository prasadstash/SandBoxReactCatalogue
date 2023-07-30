import React, {useEffect, useState} from "react";
import axios from 'axios';
import DataTable from "react-data-table-component";

export default function Products() {

  const [data, setData]= useState([])

  
  const [usersData, setUsersData] = useState([]);

  // Function to fetch the images and convert them to base64
  const fetchAndConvertImages = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/photos');
    const json = await response.json();

    // Fetching all the images and converting to base64
    const promises = json.map(async (item) => {
      const imageResponse = await fetch(item.thumbnailUrl);
      const buffer = await imageResponse.arrayBuffer();
      const base64String = btoa(
        new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
      );

      return { ...item, thumbnailUrlBase64: `data:image/jpeg;base64,${base64String}` };
    });

    // Waiting for all the promises to resolve and updating the state
    const updatedData = await Promise.all(promises);
    setUsersData(updatedData);
  };

  useEffect(() => {
    fetchAndConvertImages();
  }, []);

  useEffect(()=>{
    // axios.get('https://jsonplaceholder.typicode.com/photos')
    // .then(res => console.log(res))
    // .catch(err => console.log(err));
    //fetchImage();
    axios.get('https://jsonplaceholder.typicode.com/photos')
    .then(res => setData(res.data))
    .catch(err => console.log(err));

  },[])

  return (
    <div className="table_container">
      <table>
        <thead>
          <tr className="table_header">
            <th>id</th>
            <th>albumId</th>
            <th>url</th>
            <th>thumbnailUrl</th>
            <th>thumbnail</th>
            <th>title</th>
          </tr>
        </thead>
        <tbody className="table_body">
            {
              data.map((user, index) => (
              <tr key={index} className="table_row">
                <td>{user.id}</td>
                <td>{user.albumId}</td>
                <td>{user.url}</td>
                <td>{user.thumbnailUrl}</td>
                <img src={user.thumbnailUrl} alt="Thumbnail" className="logo" />
                
                <td>{user.title}</td>
              </tr>
              )) 
            }
        </tbody>
      </table>
    </div>
  );
}
