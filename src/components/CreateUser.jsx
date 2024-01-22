import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [item, setItem] = useState();
  const [qty, setQty] = useState();
  const [age, setAge] = useState();
  const navigate = useNavigate();
  // submit function
  const Submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/createuser", { item, qty })
      .then((result) => {
        console.log(result);
        navigate("/user");
      })

      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-80 bg-white rounded p-3">
        <form onSubmit={Submit}>
          <h2>ADD ITEMS</h2>
          <div className="mb-2">
            <label htmlFor="">ITEM NAME</label>
            <input
              type="text"
              placeholder="Enter ITEM NAME"
              className="form-control"
              onChange={(e) => setItem(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">QUANTITY</label>
            <input
              type="text"
              placeholder="Enter QUANTITY OF ITEM"
              className="form-control"
              onChange={(e) => setQty(e.target.value)}
            />
          </div>
          {/* <div className="mb-2">
            <label htmlFor="">Age</label>
            <input
              type="text"
              placeholder="Enter Age"
              className="form-control"
              onChange={(e) => setAge(e.target.value)}
            />
          </div> */}
          <button className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
