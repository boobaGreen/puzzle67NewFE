// FILE: SwitchSelection.tsx
import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import { useSwitch } from "../contexts/SwitchContext";
import Modal from "react-modal";

const SwitchSelection = () => {
  const { enabled, setEnabled } = useSwitch();
  const [isFreeModalOpen, setIsFreeModalOpen] = useState(false);
  const [isNormalModalOpen, setIsNormalModalOpen] = useState(false);

  const openFreeModal = () => setIsFreeModalOpen(true);
  const closeFreeModal = () => setIsFreeModalOpen(false);

  const openNormalModal = () => setIsNormalModalOpen(true);
  const closeNormalModal = () => setIsNormalModalOpen(false);

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="flex items-center space-x-4">
        <span className="text-lg cursor-pointer" onClick={openFreeModal}>
          Free
        </span>
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`${enabled ? "bg-black" : "bg-black"}
            relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span className="sr-only">Enable Free Mode</span>
          <span
            className={`${enabled ? "translate-x-6" : "translate-x-1"}
              inline-block h-4 w-4 transform rounded-full bg-amber-300 transition`}
          />
        </Switch>
        <span className="text-lg cursor-pointer" onClick={openNormalModal}>
          Normal
        </span>
      </div>

      <Modal
        isOpen={isFreeModalOpen}
        onRequestClose={closeFreeModal}
        contentLabel="Free Mode Info"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h3 className="flex justify-center">
          <p className="font-bold">Free Mode</p>
        </h3>
        <p className="my-4">
          In free mode, you can enjoy unlimited scans at no cost, with a fully
          open range, though always confined within the boundaries of Puzzle67
        </p>
        <div className="flex justify-end">
          <button onClick={closeFreeModal}>X Close</button>
        </div>
      </Modal>

      <Modal
        isOpen={isNormalModalOpen}
        onRequestClose={closeNormalModal}
        contentLabel="Normal Mode Info"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h3 className="flex justify-center">
          <p className="font-bold">Normal Mode</p>
        </h3>
        <p className="my-4">
          With over 65,000 unique opportunities to win, all for just a small
          service fee, the possibilities are endless! Choose exclusively from a
          fresh range of keys and scan 65,536 keys at a time for each chip
        </p>
        <div className="flex justify-end">
          <button onClick={closeNormalModal}>X Close</button>
        </div>
      </Modal>
    </div>
  );
};

export default SwitchSelection;
