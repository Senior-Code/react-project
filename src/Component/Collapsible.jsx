import React, { useState } from "react";
import "./Collapsable.css";
import { FiEdit2, FiDelete, FiChevronDown, FiCheck, FiX } from "react-icons/fi";

function Collapsable() {
  const [visible, setVisible] = useState(true);
  const showContent = () => {
    setVisible(!visible);
  };
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [Age, setAge] = useState("");
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
      Age: 30,
    },
  ]);
  const addItems = () => {
    firstName === "" || lastName === "" || Age === ""
      ? alert("Please enter the empty field")
      : setList([
          ...list,
          {
            firstName,
            lastName,
            Age,
          },
        ]);
    setFirstName("");
    setLastName("");
    setAge("");
  };
  const removeItem = (removeIndx) => {
    setList(list.filter((_, index) => index !== removeIndx));
  };

  const [dropdown, setDropdown] = useState(false);
  const onDropdownClicked = () => {
    setDropdown(!dropdown);
  };

  function DropdownList(props: DropdownListItem) {
    return (
      <div className="dropdown-section">
        <button id="btn" className="btn-dropdown" onClick={onDropdownClicked}>
          <FiChevronDown />
        </button>
        {dropdown && <div className="dropdown-parent">{props.children}</div>}
      </div>
    );
  }

  function EditableItem({ person, onRemove, onChange }) {
    const [isEditing, setEditing] = useState(false);
    const [firstName, setFirstName] = useState(person.firstName);
    const [lastName, setLastName] = useState(person.lastName);
    const [age, setAge] = useState(person.Age);

    if (isEditing) {
      return (
        <tr>
          <td>
            <input
              className="inputField"
              type="text"
              onChange={(e) => setFirstName(e.currentTarget.value)}
              value={firstName}
            />
          </td>
          <td>
            <input
              className="inputField"
              type="text"
              onChange={(e) => setLastName(e.currentTarget.value)}
              value={lastName}
            ></input>
          </td>
          <td>
            <input
              className="inputField"
              type="text"
              onChange={(e) => setAge(e.currentTarget.value)}
              value={age}
            ></input>
          </td>
          <td>
            <button
              className="btn-edit"
              onClick={() => {
                onChange({ firstName, lastName, Age: age });
                setEditing(false);
              }}
            >
              <FiCheck></FiCheck>
            </button>
          </td>
          <td>
            <button className="btn-remove" onClick={() => setEditing(false)}>
              <FiX></FiX>
            </button>
          </td>
        </tr>
      );
    }

    return (
      <tr>
        <td>{person.firstName}</td>
        <td>{person.lastName}</td>
        <td>{person.Age}</td>
        <td>
          <button className="btn-edit" onClick={() => setEditing(true)}>
            <FiEdit2></FiEdit2>
          </button>
        </td>
        <td>
          <button className="btn-remove" onClick={onRemove}>
            <FiDelete></FiDelete>
          </button>
        </td>
      </tr>
    );
  }

  function DropdownListItem(props) {
    return (
      <div className="dropdown-item">
        <li>{props.children}</li>
      </div>
    );
  }
  const [onEdit, setOnEdit] = useState(null);
  const updateItem = (personindex) => {
    setList(
      ...(list[personindex] = {
        firstName,
        lastName,
        Age,
      })
    );
  };
  const onChangeItem = (personindex) => {
    setOnEdit(personindex);
  };

  return (
    <div className="collapse-content">
      <button id="btn" className="btn-collapse" onClick={showContent}>
        Collapse
      </button>
      <div className={visible ? "content-show" : "content-hide"}>
        <div className="text-input">
          <input
            className="text-edt"
            type="text"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.currentTarget.value)}
          />
          <input
            className="text-edt"
            type="text"
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.currentTarget.value)}
          />
          <input
            className="text-edt"
            type="text"
            placeholder="Enter your age"
            value={Age}
            onChange={(e) => setAge(e.currentTarget.value)}
          />
          <button id="btn" className="btn-submit" onClick={addItems}>
            Add
          </button>
        </div>
        <div className="table-content">
          <table className="table-data">
            <tbody className="tbody">
              <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Age</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
              {list.map((person, personindex) => (
                <EditableItem
                  person={person}
                  key={personindex}
                  onRemove={() => removeItem(personindex)}
                  onChange={(v) => {
                    list[personindex] = v;
                    setList([...list]);
                  }}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <DropdownList>
        <DropdownListItem>C++</DropdownListItem>
        <DropdownListItem>JavaScript</DropdownListItem>
        <DropdownListItem>Java</DropdownListItem>
        <DropdownListItem>TypeScript</DropdownListItem>
      </DropdownList>
    </div>
  );
}

export default Collapsable;
