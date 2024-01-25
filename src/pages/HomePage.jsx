import React from "react";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import { getAllNotes, getArchivedNotes } from "../utils/local-data.js";
import NoteList from "../components/NoteList.jsx";
import NoteSearch from "../components/NoteSearch.jsx";

function HomePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  return <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} />;
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getAllNotes(),
      keyword: props.defaultKeyword || "",
    };

    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
  }

  onAddNoteHandler({ title, body }) {
    this.setState((prevState) => {
      const newNote = {
        id: +new Date(),
        title,
        body,
        createdAt: new Date().toISOString(),
        isArchived: false,
      };

      return {
        notes: [...prevState.notes, newNote],
      };
    });
  }

  onKeywordChangeHandler(keyword) {
    this.setState(() => {
      return {
        keyword,
      };
    });

    this.props.keywordChange(keyword);
  }

  render() {
    const activeNotes = this.state.notes.filter((note) => !note.archived);
    const archivedNotes = getArchivedNotes();

    const notesToShow = this.state.keyword
      ? activeNotes.filter((note) =>
          note.title.toLowerCase().includes(this.state.keyword.toLowerCase())
        )
      : activeNotes;

    return (
      <div className="note-app__body">
        <h2>Catatan Aktif</h2>
        <NoteSearch keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler} />
        <NoteList notes={notesToShow} />

        {archivedNotes.length > 0 && (
          <div>
            <h2>Catatan Diarsipkan</h2>
            <NoteList notes={archivedNotes} />
          </div>
        )}
      </div>
    );
  }
}

HomePage.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func.isRequired,
};

export default HomePageWrapper;
