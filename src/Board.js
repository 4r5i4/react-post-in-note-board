import React, { Component } from "react";
import Note from "./Note";

// we add a board to hold our notes
// the board will have its own collection of notes

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   collection of notes that the board holds
      board_notes: [
        // we will give it some static notes
        {
          // apparently changing the id makes no difference to the index that gets printed based on console.log() on L:39
          id: 10,
          content: "Call Alex"
        },
        {
          id: 1,
          content: "Pick up the laundry"
        },
        {
          id: 2,
          content: "Light up the candle to cover the smell of bad chicken"
        },
        {
          id: 3,
          content: "Read one linkedin article that you have posted, everyday!"
        }
      ]
    };

    this.placeNotes = this.placeNotes.bind(this);
    this.update = this.update.bind(this);
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
      <Note key={id} index={id} onChange={this.update}>
        {note.content}
      </Note>
    );
  }

  render() {
    return (
      <div className="board">
        {/* for every note in the board_notes array, do the placeNotes operation */}
        {this.state.board_notes.map(this.placeNotes)}
      </div>
    );
  }
}

export default Board;
