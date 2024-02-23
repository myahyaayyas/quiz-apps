import React from "react";
import { useSearchParams } from "react-router-dom";
import { getArchivedNotes } from "../utils/network-data.js";
import NoteList from "../components/NoteList.jsx";
import NoteSearch from "../components/NoteSearch.jsx";
import LocaleContext from "../contexts/LocaleContext.js";

function ArsipPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = React.useState([]);
  const [keyword, setKeyword] = React.useState(() => {
    return searchParams.get("keyword") || "";
  });
  const { locale } = React.useContext(LocaleContext);

  React.useEffect(() => {
    getArchivedNotes().then(({ data }) => {
      setNotes(data);
    });
  }, []);

  function onKeywordChangeHandler(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div className="note-app__body">
      <h2>{locale === "id" ? "Catatan Arsip" : "Archive Notes"}</h2>
      <NoteSearch keyword={keyword} keywordChange={onKeywordChangeHandler} />
      <NoteList notes={filteredNotes} />
    </div>
  );
}

export default ArsipPage;
