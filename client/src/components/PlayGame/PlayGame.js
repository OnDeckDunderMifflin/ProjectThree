import React from "react";
import "./PlayGame.css";

const PlayGame = props =>

<form className="playgame">
    <div className="form-group">
      <h2> Join a game</h2>
      <input
        type="text"
        className="form-control"
        placeholder="GAME CODE"
        id="joingame-input"
      />

      <button
        type="submit"
        className="join-btn"
      >
        Play!
      </button>

      <h2> Start a new game </h2>
      <input
        type="text"
        className="form-control"
        placeholder="# of players"
        id="startgame-input"
      />
      <input
        type="text"
        className="form-control"
        placeholder="# of cards"
        id="startgame-input"
      />
      <input
        type="text"
        className="form-control"
        placeholder="display discard Y/N"
        id="startgame-input"
      />
      <button
        type="submit"
        className="start-btn"
      >
        Play!
      </button>
    </div>
  </form>;

export default PlayGame;