import React, { Component } from "react";

//added a Note component
// make sure to put {Component} in the import otherwise you'd need to mention in the extend: React.Component

class Note extends Component {
  render() {
    return (
      <div className="note">
        <p>a note component </p>
        <span>
          <button>Edit</button>
          <button>Remove</button>
        </span>
      </div>
    );
  }
}

export default Note;
