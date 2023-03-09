import React, { ReactNode, createContext } from "react";
import ModalContainer from "../components/Modal/modal";
import useModal from "../hooks/useModal";
import { IModalContext } from "../utils/types";

const ModalContext = createContext<IModalContext>({
  modal: false,
  modalType: null,
  modalText: "",
  handleModal: () => {},
});
ModalContext.displayName = "ModalContext";

const ModalContextProvider = ({ children }: { children: ReactNode }) => {
  const { modal, modalType, modalText, handleModal } = useModal();

  return (
    <ModalContext.Provider value={{ modal, modalType, modalText, handleModal }}>
      <ModalContainer />
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalContextProvider };
