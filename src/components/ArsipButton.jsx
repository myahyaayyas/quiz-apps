import React from "react";
import PropTypes from "prop-types";
import { IoMdArchive } from "react-icons/io";
import { MdUnarchive } from "react-icons/md";

function ArsipButton({ id, isArchived, onToggleArsip }) {
  return (
    <button className="action" onClick={() => onToggleArsip(id, isArchived)}>
      {isArchived ? <MdUnarchive /> : <IoMdArchive />}
    </button>
  );
}

ArsipButton.propTypes = {
  id: PropTypes.string.isRequired,
  isArchived: PropTypes.bool.isRequired,
  onToggleArsip: PropTypes.func.isRequired,
};

export default ArsipButton;
