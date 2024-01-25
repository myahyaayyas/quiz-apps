import React from "react";
import PropTypes from "prop-types";
import NoteItemBody from "./NoteItemBody";

function NoteItem({ id, title, body, createdAt }) {
  return (
    <div className="note-item">
      <NoteItemBody id={id} title={title} body={body} createdAt={createdAt} />
    </div>
  );
}

NoteItem.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
};

export default NoteItem;
