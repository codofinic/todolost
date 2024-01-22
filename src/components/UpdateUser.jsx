import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const UpdateUser = () => {
  const { id } = useParams();
  const [item, setItem] = useState();
  const [qty, setQty] = useState();
  const [age, setAge] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/getUser/" + id)
      .then((result) => {
        console.log(result);
        setItem(result.data.name);
        setQty(result.data.email);
        // setAge(result.data.age);
      })
      .catch((err) => console.log(err));
  }, []);
  const Update = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3001/updateUser/" + id, { item, qty })
      .then((result) => {
        console.log(result);
        navigate("/user");
      })

      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-80 bg-white rounded p-3">
        <form onSubmit={Update}>
          <h2>UPDATE ITEM</h2>
          <div className="mb-2">
            <label htmlFor="">ITEM NAME</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">QTY</label>
            <input
              type="text"
              placeholder="Enter QTY"
              className="form-control"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />
          </div>
          {/* <div className="mb-2">
            <label htmlFor="">Age</label>
            <input
              type="text"
              placeholder="Enter Age"
              className="form-control"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div> */}
          <button className="btn btn-success">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
