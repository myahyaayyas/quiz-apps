import React from "react";
import { useNavigate } from "react-router-dom";
import { addNote } from "../utils/network-data";
import NoteInput from "../components/NoteInput";

function AddPage() {
  const navigate = useNavigate();

  async function onAddNoteHandler(notes) {
    await addNote(notes);
    navigate("/");
  }

  return (
    <section>
      <NoteInput addNote={onAddNoteHandler} />
    </section>
  );
}

export default AddPage;
