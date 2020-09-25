import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

import "./directory.scss";

const Directory = () => {
  const [categories, setCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("http://localhost:9000/category");
      setCategory(data);
    };
    fetchData();
    return () => {};
  }, []);

  return (
    <div className="directory-menu">
      {categories.map((category, i) => {
        console.log(category);
        return (
          <Link to={`/category/${category._id}`}>
            <div className="menu-item" key={i}>
              <div
                className="background-image"
                style={{ backgroundImage: `url(${category.image})` }}
              />
              <div className="content">
                <h1 className="title">{category.name}</h1>
                <span className="subtitle">SHOP NOW</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Directory;
