import React, { Component } from "react";
import { FaBeer } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

//added a Note component
// make sure to put {Component} in the import otherwise you'd need to mention in the extend: React.Component
//next we will enhance the buttons, we just do 'npm install --save react-icons',
// we also add ids to the buttons for them to inherit CSS style
// and we also add an event listener to them onRemove and onEdit . and we bind those listeners in the Constructor(props)

class Note extends Component {
  constructor(props) {
    this.onEdit = this.onEdit.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }
  onEdit() {
    console.log("edit clicked");
  }

  onRemove() {
    console.log("remove clicked");
  }

  render() {
    return (
      <div className="note">
        <p>a note component </p>
        <span>
          <button id="edit" onClick={this.onEdit}>
            <FaPencilAlt />
          </button>

          <button id="remove" onClick={this.onRemove}>
            <FaTrashAlt />
          </button>
        </span>
      </div>
    );
  }
}

export default Note;
