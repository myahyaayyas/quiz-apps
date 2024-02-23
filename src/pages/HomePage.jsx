import React from "react";
import { useSearchParams } from "react-router-dom";
import { getActiveNotes } from "../utils/network-data.js";
import NoteList from "../components/NoteList.jsx";
import NoteSearch from "../components/NoteSearch.jsx";
import LocaleContext from "../contexts/LocaleContext.js";

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = React.useState([]);
  const [keyword, setKeyword] = React.useState(() => {
    return searchParams.get("keyword") || "";
  });
  const { locale } = React.useContext(LocaleContext);

  React.useEffect(() => {
    getActiveNotes().then(({ data }) => {
      setNotes(data);
    });
  }, []);

  function onKeywordChangeHandler(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }

  const activeNotes = notes.filter((note) => !note.archived);

  const notesToShow = keyword
    ? activeNotes.filter((note) => note.title.toLowerCase().includes(keyword.toLowerCase()))
    : activeNotes;

  return (
    <div className="note-app__body">
      <h2>{locale === "id" ? "Catatan Aktif" : "Active Notes"}</h2>
      <NoteSearch keyword={keyword} keywordChange={onKeywordChangeHandler} />
      <NoteList notes={notesToShow} />
    </div>
  );
}

export default HomePage;
