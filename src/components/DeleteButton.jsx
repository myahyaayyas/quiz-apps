import React from "react";
import PropTypes from "prop-types";
import { FiDelete } from "react-icons/fi";

function DeleteButton({ id, onDelete }) {
  return (
    <button className="action" onClick={() => onDelete(id)}>
      <FiDelete />
    </button>
  );
}

DeleteButton.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteButton;
