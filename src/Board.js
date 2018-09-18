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
          id: 1,
          content: "Call Alex"
        },
        {
          id: 2,
          content: "Pick up the laundry"
        },
        {
          id: 3,
          content: "Light up the candle to cover the smell of bad chicken"
        },
        {
          id: 4,
          content: "Read one linkedin article that you have posted, everyday!"
        }
      ]
    };

    this.placeNotes = this.placeNotes.bind(this);
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
      <Note key={id} index={id}>
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
