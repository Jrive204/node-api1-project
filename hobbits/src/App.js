import React, { useState, useEffect } from "react";
import "./App.scss";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardTitle,
  CardText
} from "reactstrap";
import Axios from "axios";
import Loader from "react-loader-spinner";

function App() {
  const [user, setUser] = useState({ name: "", bio: "" });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:5000/api/users")
      .then(
        res =>
          console.log(res, "GET") &
          setData(res.data) &
          setTimeout(() => {
            setLoading(false);
          }, 1500)
      )
      .catch(err => console.log(err));
  }, [loading]);

  const handlesubmit = e => {
    e.preventDefault();
    Axios.post("http://localhost:5000/api/users", user)
      .then(
        res =>
          console.log(res, "post") &
          setLoading(true) &
          setUser({ name: "", bio: "" })
      )
      .catch(err => console.log(err, "error"));
  };

  const handleEdit = id => {
    Axios.put(`http://localhost:5000/api/users/${id}`, user)
      .then(
        res =>
          console.log(res, "post") &
          setLoading(true) &
          setUser({ name: "", bio: "" })
      )
      .catch(err => console.log(err, "post"));
  };
  const handleDelete = id => {
    Axios.delete(`http://localhost:5000/api/users/${id}`)
      .then(
        res =>
          console.log(res, "delete") &
          setLoading(true) &
          setUser({ name: "", bio: "" })
      )
      .catch(err => console.log(err));
  };

  const handleChange = e => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className='App'>
      <Form onSubmit={handlesubmit}>
        <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
          <Label className='mr-sm-2'>
            Hobbit Name:
            <Input
              type='text'
              name='name'
              placeholder='Name'
              value={user.name}
              onChange={handleChange}
            />
          </Label>
        </FormGroup>
        <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
          <Label className='mr-sm-2'>
            {console.log(user)}
            Hobbit Bio:
            <Input
              type='textarea'
              name='bio'
              placeholder='hobbit Bio'
              value={user.bio}
              onChange={handleChange}
            />
          </Label>
        </FormGroup>
        <Button>Submit</Button>
      </Form>
      <div
        style={{
          display: "flex",
          width: "50%",
          margin: "0 auto",
          flexWrap: "wrap"
        }}>
        {loading && (
          <div style={{ margin: "0 auto", marginTop: "10%" }}>
            <Loader
              type='Puff'
              color='#00BFFF'
              height={100}
              width={100}
              timeout={3000} //3 secs
            />
          </div>
        )}
        {data && !loading && (
          <>
            {data.map(hobbit => (
              <Card key={hobbit.id} body inverse color='secondary '>
                <CardTitle>{hobbit.name}</CardTitle>
                <CardText>{hobbit.bio}</CardText>
                <Button onClick={() => handleEdit(hobbit.id)} color='warning'>
                  Edit
                </Button>
                <Button onClick={() => handleDelete(hobbit.id)} color='danger'>
                  Delete
                </Button>
              </Card>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
