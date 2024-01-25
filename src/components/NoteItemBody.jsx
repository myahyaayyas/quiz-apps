import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { showFormattedDate } from "../utils/index.js";

function NoteItemBody({ id, title, body, createdAt }) {
  return (
    <div className="note-item__content">
      <h3 className="note-item__title">
        <Link to={`/note/${id}`}>{title}</Link>
      </h3>
      <p className="note-item__date">{showFormattedDate(createdAt)}</p>
      <p className="note-item__body">{body}</p>
    </div>
  );
}

NoteItemBody.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
};

export default NoteItemBody;
