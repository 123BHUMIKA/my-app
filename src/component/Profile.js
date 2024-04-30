import React, { Component, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./Profile.css";
import { deleteDoc, getDocs } from "firebase/firestore";
import { db, auth } from "./FireBase";
import { addDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { query } from "firebase/firestore";
import { where } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { setTitle, setTodos } from "./slice2";
import { userData } from "./slice2";

function Profile() {
  const Storage = getStorage();
  const { title, todos } = useSelector((state) => state.profile);
  const { userData } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const user = auth.currentUser;
  const onLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  useEffect(() => {
    fetchTodo();
  }, []);

  const addTodo = async () => {
    try {
      await addDoc(collection(db, "tasks"), {
        title: title,
        uid: user.uid,
      });
      setTitle("");
      fetchTodo();
    } catch (err) {
      alert(err);
    }
  };
  const fetchTodo = async () => {
    const q = query(collection(db, "tasks"), where("uid", "==", userData.uid));
    const querySnapshot = await getDocs(q);
    const newData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch(setTodos(newData));
  };

  const handleDeleteClick=(id)=>{
    try {
       deleteDoc(doc(db, "tasks",id), {
        fetchTodo
      });
      setTitle("");
      fetchTodo();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div class="MainCont">
      <div class="navbar">
        <h4>
          <Link to="/Home" style={{ color: "white" }}>
            Home
          </Link>
        </h4>
        <h4>
          <Link to="/Contact" style={{ color: "white" }}>
            Contact
          </Link>
        </h4>
        <h4>
          <p
            onClick={() => {
              onLogout("hello", "akshay");
            }}
            style={{ color: "white" }}
          >
            logout
          </p>
        </h4>
      </div>
      <div class="mainContainer">
        <div class="Container">
          <input
            id="title"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              dispatch(setTitle(e.target.value));
            }}
          ></input>

          <button
            id="btn"
            onClick={(e) => {
              addTodo();
            }}
          >
            Add Task
          </button>
        </div>
      </div>

      <table class="tb" cellspacing="0">
        <tr class="title" style={{}}>
          <th>
            {" "}
            <button id="btn1" onClick={() => {}}>
              TITLE
            </button>
          </th>
          <th>Status</th>
          <th>Change Status</th>
          <th>Delete</th>
        </tr>

        {todos?.map((Todo) => {
          return (
            <tr key={Todo.id} class="tableData">
              <td>{Todo?.title}</td>
              <td>{Todo?.completed ? "Completed" : "Not Completed"}</td>
              <td>
                <input
                  id="checkbox"
                  type="checkbox"
                  checked={Todo?.completed}
                ></input>
              </td>
              <td onClick={() => handleDeleteClick(Todo.id)}>Delete</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
export default Profile;
