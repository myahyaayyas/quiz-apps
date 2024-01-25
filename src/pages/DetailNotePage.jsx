import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getNote,
  deleteNote,
  getAllNotes,
  archiveNote,
  unarchiveNote,
} from "../utils/local-data.js";
import { showFormattedDate } from "../utils/index.js";
import DeleteButton from "../components/DeleteButton.jsx";
import ArsipButton from "../components/ArsipButton.jsx";

function DetailNotePage() {
  const { id } = useParams();

  const note = getNote(id);

  const [notes, setNotes] = useState(() => {
    return getAllNotes();
  });

  if (!note) {
    return (
      <div>
        <h2>404</h2>
        <p>Page not found</p>
      </div>
    );
  }
  const navigate = useNavigate();

  const handleDelete = (id) => {
    deleteNote(id);

    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));

    navigate("/");
  };

  const handleToggleArchive = (id, isArchived) => {
    if (isArchived) {
      unarchiveNote(id);
    } else {
      archiveNote(id);
    }

    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? { ...note, archived: !isArchived } : note))
    );

    navigate("/");
  };

  return (
    <div className="detail-page">
      <h2 className="detail-page__title">{note.title}</h2>
      <p className="detail-page__createdAt">{showFormattedDate(note.createdAt)}</p>
      <p className="detail-page__body">{note.body}</p>
      <div className="detail-page__action">
        <ArsipButton id={note.id} isArchived={note.archived} onToggleArsip={handleToggleArchive} />
        <DeleteButton id={note.id} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default DetailNotePage;
