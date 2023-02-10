import "../../../context/Modal.css";
import React, { useState } from "react";
import { Modal } from "../../../context/Modal.js";
import { useSelector } from "react-redux";
import AskQuestionForm from "./AskQuestionModal.js";

function AskQuestionModal() {
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.session.user);

  return (
    <>
      <button className="ask-question-btn" onClick={() => setShowModal(true)}>
        Ask a Question
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AskQuestionForm setShowModal={setShowModal} user={user} />
        </Modal>
      )}
    </>
  );
}

export default AskQuestionModal;
