import React, { useState } from "react";
import './Collapsable.css'

function Collapsable() {
  const [visible, setVisible] = useState(false);
  const showContent = () => {
    setVisible(!visible);
  };
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [Age, setAge] = useState("")
  const [list, setList] = useState([
    {
      firstName: "Yang",
      lastName: "Akriya",
      Age: 25,
    },
    {
      firstName: "Sok",
      lastName: "Chan",
      Age: 27,
    },
    {
      firstName: "John",
      lastName: "Dose",
      Age: 30
    }
  ]);
  const addItems = () => {
    (firstName === "" || lastName === "" || Age === "") ? alert("Please enter the empty field") :
      setList([
        ...list,
        {
          firstName,
          lastName,
          Age
        }
      ])
    setFirstName("")
    setLastName("")
    setAge("")

  }
  const removeItem = (removeIndx) => {
    setList(list.filter((_, index) => index !== removeIndx));
  };


  return (
    <div className="collapse-content" >
      <button id="btn" className="btn-collapse" onClick={showContent}>Collapse</button>
      <div className={visible ? "content-show" : "content-hide"} >
        <div className="text-input">
          <input className="text-edt" type="text" placeholder="Enter first name" value={firstName}
            onChange={(e) => setFirstName(e.currentTarget.value)} />
          <input className="text-edt" type="text" placeholder="Enter last name" value={lastName}
            onChange={(e) => setLastName(e.currentTarget.value)} />
          <input className="text-edt" type="text" placeholder="Enter your age" value={Age}
            onChange={(e) => setAge(e.currentTarget.value)} />
          <button id="btn" className="btn-submit" onClick={addItems}>Add</button>
        </div>
        <div className="table-content">
          <table className="table-data">
            <tbody className="tbody">
              <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Age</th>
                <th></th>
              </tr>
              {list.map((person, personindex) => (
                <tr key={person.firstName}>
                  <td>{person.firstName}</td>
                  <td>{person.lastName}</td>
                  <td>{person.Age}</td>
                  <td>
                    <button id="btn" className="btn-remove" onClick={() => removeItem(personindex)}>
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Collapsable;

