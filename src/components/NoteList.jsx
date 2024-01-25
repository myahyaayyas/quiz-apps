import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import NoteItem from "./NoteItem";

function NoteList({ notes }) {
  return (
    <div className="notes-list">
      {notes.length === 0 ? (
        <p className="notes-list-empty">Tidak ada catatan.</p>
      ) : (
        notes.map((note, index) => (
          <NoteItem key={`${note?.id}_${index}`} id={note?.id} {...note} />
        ))
      )}
      <div className="homepage__action">
        <Link to="/note/add">
          <button className="action">+</button>
        </Link>
      </div>
    </div>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string,
      body: PropTypes.string,
      createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    })
  ).isRequired,
};

export default NoteList;
