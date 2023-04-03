import React, { useState } from "react";
import agent from "../../../api/agent";
import Input from "../../../components/common/input/Input";
import { useAppDispatch } from "../../../store";
import { addFile, setPopupDisplay } from "../../../store/file/actions";
import { useCurrentDir, usePopupDisplay } from "../../../store/file/hooks";

const Popup = () => {
  const { createDir } = agent.files;
  const popupDisplay = usePopupDisplay();
  const currentDir = useCurrentDir();
  const dispatch = useAppDispatch();
  const [dirName, setDirName] = useState("");

  const createDirHandler = async () => {
    const res = await createDir(currentDir, dirName);
    dispatch(addFile(res));
    setDirName("");
    dispatch(setPopupDisplay("none"));
  };

  return (
    <div
      className="popup"
      onClick={() => dispatch(setPopupDisplay("none"))}
      style={{ display: popupDisplay }}
    >
      <div
        className="popup__content"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="popup__header">
          <div className="popup__title">Создать новую папку</div>
          <button
            className="popup__close"
            onClick={() => dispatch(setPopupDisplay("none"))}
          >
            X
          </button>
        </div>
        <Input
          type="text"
          placeholder="Введите название папки..."
          value={dirName}
          setValue={setDirName}
        />
        <button className="popup__create" onClick={() => createDirHandler()}>
          Создать
        </button>
      </div>
    </div>
  );
};

export default Popup;
