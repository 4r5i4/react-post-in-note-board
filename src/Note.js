import React, { Component } from "react";
import { FaBeer } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { FaSave } from "react-icons/fa";

//added a Note component
// make sure to put {Component} in the import otherwise you'd need to mention in the extend: React.Component
//next we will enhance the buttons, we just do 'npm install --save react-icons',
// we also add ids to the buttons for them to inherit CSS style
// and we also add an event listener to them onRemove and onEdit . and we bind those listeners in the Constructor(props)
// now we add state to our Note component
// now we wanna edit the contents of the note, so we add a Form along with a save button

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      removed: false
    };

    this.onEdit = this.onEdit.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onSave = this.onSave.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.renderDisplay = this.renderDisplay.bind(this);
  }

  onEdit() {
    console.log("edit clicked");
    this.setState({
      editing: true
    });
  }

  onRemove() {
    console.log("remove clicked");
    this.setState({
      removed: true
    });
  }

  onSave() {
    window.alert("saved...");
  }
  renderForm() {
    return (
      <div className="note">
        <form>
          <textarea />
          <button onClick={this.onSave}>
            <FaSave />
          </button>
        </form>
      </div>
    );
  }

  renderDisplay() {
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

  render() {
    return !!this.state.editing ? this.renderForm() : this.renderDisplay();
  }
}

export default Note;
