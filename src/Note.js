import React, { Component } from "react";
// import { FaBeer } from "react-icons/fa";
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
    this.randomStyle = this.randomStyle.bind(this);
  }

  componentWillMount() {
    this.style = {
      right: this.randomStyle(0, window.innerWidth - 150, "px"),
      top: this.randomStyle(0, window.innerHeight - 150, "px"),
      transform: `rotate(${this.randomStyle(-25, 25, "deg")})`,
      backgroundColor: this.randomStickyColor()
    };
  }

  // we wanna void rendering everytime we click on a Note
  componentDidUpdate() {
    if (this.state.editing) {
      // alert("you changed something");
      // var text;
      // text = this._newText;
      // ** You don't really need a separate variable to do this focusing and selecting!
      this._newText.focus();
      this._newText.select();
      // text.select();
    }
  }
  /**
   * give a random style to each note, a different position (dynamic based on the window size, not sure if it'll be 'responsive')
   *
   */
  randomStyle(x, y, s) {
    return x + Math.ceil(Math.random() * (y - x)) + s;
  }

  /**
   * customize the color
   */
  randomStickyColor() {
    var color = ["DeepPink", "lime", "yellow", "white"];
    var index = Math.floor(Math.random() * 4);
    return color[index];
  }

  onEdit() {
    console.log("edit clicked");
    this.setState({
      editing: true
    });
  }

  onRemove() {
    // console.log("remove clicked");
    // this doesnt have to be like this, we have passed in an object in to the setState() before, but it is recommended to calculate the next state based on the previous state like so https://medium.com/@wisecobbler/using-a-function-in-setstate-instead-of-an-object-1f5cfd6e55d1
    this.props.onRemove(this.props.index);
    this.setState(function(prevState, props) {
      return {
        removed: !prevState.removed
      };
    });
  }

  // we need to mention 'props' cuz this is coming from the parent component and thats how we pass info down the child cmoponent. Props
  // to pass up informaiton we use events
  // and the parent component has its own state
  // for 'this.props.onChange(<args>), the args are defined in the signature of update(newText, i)
  onSave(e) {
    e.preventDefault();
    // alert(this._newText.value);
    this.props.onChange(this._newText.value, this.props.index);
    // setting the editing state to false in order to fire the correct render function, which is renderDisplay() not renderForm() based on the ternary condition on L:97
    this.setState({
      editing: false
    });
  }

  // to capture whatever the user puts as input, we use 'ref'
  renderForm() {
    return (
      <div className="note" style={this.style}>
        <form onSubmit={this.onSave}>
          {/* we use 'ref' and we put a callback function...
        'input' is staandard and is from TextAreaElement */}
          <textarea
            ref={input => (this._newText = input)}
            defaultValue={this.props.children}
          />
          <button id="save">
            <FaSave />
          </button>
        </form>
      </div>
    );
  }

  renderDisplay() {
    return (
      <div className="note" style={this.style}>
        <p>{this.props.children}</p>
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
    // a side note on the double '!!'
    //   you're converting a value to a boolean, then inverting it, then inverting it again
    return !!this.state.editing ? this.renderForm() : this.renderDisplay();
  }
}

export default Note;
