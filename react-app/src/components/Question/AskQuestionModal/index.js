import "../../../context/Modal.css";
import React, { useState } from "react";
import { Modal } from "../../../context/Modal.js";
import AskQuestionForm from "./AskQuestionModal.js";

function AskQuestionModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="ask-question-btn" onClick={() => setShowModal(true)}>
        Ask a Question
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AskQuestionForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default AskQuestionModal;
