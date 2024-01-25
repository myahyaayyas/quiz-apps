import React from "react";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import { getArchivedNotes } from "../utils/local-data.js";
import NoteList from "../components/NoteList.jsx";
import NoteSearch from "../components/NoteSearch.jsx";

function ArsipPageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  return <ArsipPage defaultKeyword={keyword} keywordChange={changeSearchParams} />;
}

class ArsipPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getArchivedNotes(),
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
    const notes = this.state.notes.filter((note) => {
      return note.title.toLowerCase().includes(this.state.keyword.toLowerCase());
    });

    return (
      <div className="note-app__body">
        <h2>Catatan Aktif</h2>
        <NoteSearch keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler} />
        <NoteList notes={notes} />
      </div>
    );
  }
}

ArsipPage.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func.isRequired,
};

export default ArsipPageWrapper;
