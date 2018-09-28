/**
 * as the final step , we build our application:
 * npm run build
 *
 * we serve it using serve
 * npm install serve
 *
 * to serve a <folder>
 * serve -s <folder>
 * in our case, to serve our build: serve -s build
 */

import React, { Component } from "react";
import Note from "./Note";
import { FaPlus } from "react-icons/fa";

// we add a board to hold our notes
// the board will have its own collection of notes

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   collection of notes that the board holds
      board_notes: [
        // we will give it some static notes
        // {
        //   // apparently changing the id makes no difference to the index that gets printed based on console.log() on L:39
        //   //   when adding the remove functionality, it is imperative for the id to start at the right digit, since removing it makes the condition on L:46 false, it doesn't evaluate to true: why cuz the index coming from the DOM is 0 for the first element, and yet we are setting that number to 10.
        //   id: 0,
        //   content: "index 0"
        // },
        // {
        //   id: 1,
        //   content: "index 1"
        // },
        // {
        //   id: 2,
        //   content: "index 2"
        // },
        // {
        //   id: 3,
        //   content: "index 3"
        // }
      ]
    };

    this.placeNotes = this.placeNotes.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
    this.add = this.add.bind(this);

    // this.updateIndex = this.updateIndex.bind(this);
  }

  /**
   * Right now there is a problem:
   * as i delete a note, other's shift accordingly to fit the size of the array and therefore the Notes 'move' their content does, but they don't physically move.
   * The problem MAY be the updateIndex()
   * Result: yes, the problem is in fact the updateIndex() that's becuase it doesn't allow each Note to maintain their unique id. Looking into the placeNotes(note, i), if we 'note' in the key and index attributes, this fun issue is fixed.
   */

  /** 
  // this is a solution I found but since we always have the length for the array, we dont need to use a function!,
  // I'll try removing the hard coded array elements in the board_notes now!
  // result: i was right! it wrx
  nextId() {
    this.uniqueId = this.uniqueId || 0;
    return this.uniqueId++;
  }
  */
  updateIndex() {
    var id_reset = 0;
    this.setState(prevState => ({
      board_notes: prevState.board_notes.map(note => ({
        ...note,
        id: id_reset++
      }))
    }));
  }

  componentWillMount() {
    var self = this;
    // alert("component will mount");
    fetch(
      `https://baconipsum.com/api/?type=all-meat&sentences=${this.props.count}`
    )
      .then(response => response.json())
      .then(jsonResponse =>
        jsonResponse[0]
          .split(". ")
          .forEach(sentence => self.add(sentence.substring(0, 20)))
      );
  }

  //   the remove functionality
  // this worked but only for the first item, cuz the items in the DOM would maintain their
  remove(id) {
    console.log("removing item at index ", id);
    //   using the Array.splice(), remove the item at index, only 1 element:
    // splice returns the element that was removed, not the rest of the array.
    // the correct function is filter()
    this.setState(prevState => ({
      board_notes: prevState.board_notes.filter(note => note.id !== id)
    }));
    // this.updateIndex();
  }

  update(newText, i) {
    console.log("updating item at index ", i, "with content ", newText);
    // setting the state based on the previous state
    // the board_notes will be a new array (cuz of the map()), if it's not the right index, return the same note, and if not, return a new note with all of it's keys but a new 'content'
    this.setState(prevState => ({
      board_notes: prevState.board_notes.map(
        note => (note.id !== i ? note : { ...note, content: newText })
      )
    }));
  }

  //   now i need to handle the displaying of these notes
  // we need a function that will go over the array and add those onto the board
  // the tempting thing to do is to pass in the array of notes, but then you will have to figure out how to graphically place those items
  // better thing to do is to let the CSS for the component take care of the positioning.
  // so, we pass in as arguments one note at a time with its id
  // what are Key and Index as the attributes here?
  // ans: I dont know about index, but keys are to help react keep track of which elemts have changed
  //   also when removing the 'key' , i got this warning: 'Each child in an array or iterator should have a unique "key" prop.'
  placeNotes(note, id) {
    return (
      // adding onChange event listener to fire up update(newText, i)
      <Note
        key={note.id}
        index={note.id}
        onChange={this.update}
        onRemove={this.remove}
      >
        {note.content}
      </Note>
    );
  }

  // i will try changing the style of the notes here.. watch the bhaviour and check the response time and then I will do the same in the note component and compare
  // randomStyle(){
  // ok right here, if I say this, then im referring to the board and I can't access the style for a single Note. So i will have to do this in Note Component.
  // this.
  // }

  add(text) {
    this.setState(prevState => ({
      board_notes: [
        ...prevState.board_notes,
        {
          content: text,
          id: prevState.board_notes.length
        }
      ]
    }));
  }

  render() {
    return (
      <div className="board">
        {/* for every note in the board_notes array, do the placeNotes operation */}
        {this.state.board_notes.map(this.placeNotes)}
        <div>
          <button id="add" onClick={this.add.bind(null, "New Note")}>
            <FaPlus />
          </button>
        </div>
      </div>
    );
  }
}

export default Board;
