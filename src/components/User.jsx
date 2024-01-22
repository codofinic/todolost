import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const User = () => {
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const logutHandler = () => {
    navigate("/");
  };
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    axios
      .get("http://localhost:3001")
      .then((result) => setUser(result.data))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleDelete = (id) => {
    axios.delete("http://localhost:3001/deleteuser/" + id).then(() => {
      window.location.reload();
    });
    console.log("error").catch((err) => setError(err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-90 bg-white rounded p-3">
        <button
          onClick={logutHandler}
          className="btn btn-danger"
          style={{ marginRight: "20px" }}
        >
          Logout
        </button>
        <Link to="/create" className="btn btn-success">
          ADD ITEMS
        </Link>

        {isLoading && <p>Loading users...</p>}
        {error && <p>Error fetching users: {error.message}</p>}

        {user.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th>ITEM</th>
                <th>QTY</th>
                {/* <th>Age</th> */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {user.map((user) => (
                <tr key={user._id}>
                  <td>{user.item}</td>
                  <td>{user.qty}</td>
                  {/* <td>{user.age}</td>  */}
                  <td>
                    <Link
                      to={`/update/${user._id}`}
                      className="btn btn-success"
                      style={{ margin: "10px" }}
                    >
                      UPDATE
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={(e) => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default User;
