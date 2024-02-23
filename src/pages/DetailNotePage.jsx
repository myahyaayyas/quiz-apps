import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteNote, getNote, archiveNote, unarchiveNote } from "../utils/network-data.js";
import { showFormattedDate } from "../utils/index.js";
import DeleteButton from "../components/DeleteButton.jsx";
import ArsipButton from "../components/ArsipButton.jsx";
import { LocaleConsumer } from "../contexts/LocaleContext.js";

function DetailNotePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [notes, setNotes] = useState(() => []);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const noteData = await getNote(id);
        setNote(noteData.data);
      } catch (error) {
        console.error("Error fetching note:", error);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      navigate("/");
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleToggleArchive = async (id, isArchived) => {
    try {
      if (isArchived) {
        await unarchiveNote(id);
      } else {
        await archiveNote(id);
      }

      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === id ? { ...note, archived: !isArchived } : note))
      );

      navigate("/");
    } catch (error) {
      console.error("Error toggling archive:", error);
    }
  };

  if (!note) {
    return (
      <LocaleConsumer>
        {({ locale }) => {
          return (
            <div>
              <h2>404</h2>
              <p>{locale === "id" ? "Halaman tidak ditemukan" : "Page not found"}</p>
            </div>
          );
        }}
      </LocaleConsumer>
    );
  }

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
