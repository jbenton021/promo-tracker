import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

axios.defaults.baseURL = "http://localhost:9000";

function App() {

  const [data, setData] = useState([]);

  const [filterValue, setFilterValue] = useState("");

  const [form, setForm] = useState({});

  useEffect(() => {
    axios
    .get('/promos')
    .then(res => res.data)
    .then(data => setData(data));
  }, []);

  const promoTypes = ['Food', 'Hygeine', 'Other', 'Gaming'];

  const filteredPromos = data.filter(promo => filterValue !== 'All' 
    ? promo.promo_category.toLowerCase().includes(filterValue.toLowerCase())
    : data
  );


  const handleFilterSelect = e => {
    console.log(e)
    setFilterValue(e);
  }

  const setField = (field, value) => {
    console.log(field);
    console.log(value);
    console.log(form);
    setForm({
      ...form,
      [field]: value
    })
    console.log(form);
  }

  const handleFormSubmit = e => {
    e.preventDefault()
    console.log(form);
    axios.post('/add', form)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    e.target.reset();
    setForm({});
  }

  return (
    <>
      <Dropdown onSelect={handleFilterSelect}>
        <Dropdown.Toggle variant="success">
            Filter
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {promoTypes.map(type =>
              <Dropdown.Item href="#" eventKey={type}>
                {type}
              </Dropdown.Item>
            )}
            <Dropdown.Item href="#" eventKey="All">
              All
            </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3" controlId="formPromoDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" placeholder="Enter promo description" onChange={ e => setField('description', e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPromoCode">
          <Form.Label>Code</Form.Label>
          <Form.Control type="text" placeholder="Enter new promo code" onChange={ e => setField('promoCode', e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formStartingDate">
          <Form.Label>Starting Date</Form.Label>
          <Form.Control type="date" placeholder="Starting Date" onChange={ e => setField('date', e.target.value)}/>
        </Form.Group>

        <Form.Select aria-label="Select Promo Category" onChange={ e => setField('category', e.target.value)}>
          <option>Select a category</option>
          { promoTypes.map(type => (
            <option value={type}>{type}</option>
          ))}
        </Form.Select>

        
        <Button variant="primary" type="submit">
          Add
        </Button>
      </Form>
    
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Code</th>
            <th>Category</th>
            <th>Starting Date</th>
            <th>Ending Date</th>
          </tr>
        </thead>
        <tbody>
          { filteredPromos.map(promo => (
            <tr key={promo.promo_id}>
              <td>{promo.promo_id}</td>
              <td>{promo.descrip}</td>
              <td>{promo.code}</td>
              <td>{promo.promo_category}</td>
              <td>{promo.starting_date}</td>
              <td>{promo.ending_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )};

export default App;
