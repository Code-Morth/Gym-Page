import React from "react";
import { Dialog } from "primereact/dialog";

interface Modal {
  visible: boolean;
  closeModal: () => void;
  children?: React.ReactNode;
  widthModal?: string;
  bg?: string;
  className?: string;
}

const Modal = ({
  visible,
  closeModal,
  children,
  widthModal = "w-[auto] laptop:w-[auto]",
  bg = "bg-[#F0EFEB]",
  className,
}: Modal) => {

  return (
    <Dialog
      visible={visible}
      onHide={closeModal}
      dismissableMask={true}
      style={{backgroundColor:bg,width:widthModal}}
      className={`${className}  laptop: rounded-[2rem] z-50`}
    >
      {children}
    </Dialog>
  );
};

export default Modal;