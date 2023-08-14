import { React, useState, useEffect } from "react";

const UpdateNoteModal = ({ editNote, setEditNote, handleClick, refClose }) => {
  const [isValid, setIsValid] = useState(false);

  // validate form when editNote changes
  useEffect(() => {
    validateForm(editNote);  
  }, [editNote]);

  // update editNote when input changes
  const onChange = (e) => {
    const updatedNote = { ...editNote, [e.target.name]: e.target.value };
    setEditNote(updatedNote);
  };
  // validate form
  const validateForm = (updatedNote) => {
    if (
      updatedNote.etitle.length >= 3 &&
      updatedNote.edescription.length >= 6
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  return (
    <div
      className="modal fade"
      id="updateModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Edit Note
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form className="my-3">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="etitle"
                  name="etitle"
                  value={editNote.etitle}
                  aria-describedby="emailHelp"
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="edescription"
                  name="edescription"
                  value={editNote.edescription}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="tag" className="form-label">
                  Tag
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="etag"
                  name="etag"
                  value={editNote.etag}
                  onChange={onChange}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              ref={refClose}
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              onClick={handleClick}
              type="button"
              className="btn btn-primary"
              disabled={!isValid}
            >
              Update Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateNoteModal;
