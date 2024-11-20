"use client";
import cn from "clsx";
import Button from "@components/ui/CustomButton";
import { IoMdClose } from "react-icons/io";
import { useCallback, useState, useEffect } from "react";

const Modal = ({
  disabled,
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      // Aggiungi un piccolo ritardo per permettere la transizione
      setTimeout(() => setShowModal(true), 10); 
    } else {
      setShowModal(false);
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) return;
    setShowModal(false);
    setTimeout(onClose, 500);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;
    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;
    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed top-0 z-50 flex h-[100vh] w-full items-center justify-center text-blue-150",
        "md:p-10",
        showModal ? "bg-neutral-800/70" : "",
      )}
    >
      <div
        className={cn(
          "translate relative flex h-[100vh] w-full flex-col items-center justify-between overflow-hidden bg-white outline-none duration-500 focus:outline-none",
          "w-full md:h-auto md:w-4/6 md:rounded-2xl",
          "lg:w-2/6",
          showModal
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0",
        )}
      >
        {/* HEADER */}
        <div
          className={cn(
            "relative flex h-10 w-full items-center justify-center shadow-lg",
          )}
        >
          <button
            className="absolute right-1 h-full p-1 hover:opacity-70"
            onClick={handleClose}
          >
            <IoMdClose className="h-full w-auto" />
          </button>
          <div className="text-lg font-semibold">{title}</div>
        </div>

        {/* BODY */}
        <div className="relative">{body}</div>

        {/* FOOTER */}
        <div className="flex w-full flex-col gap-2 px-6">
          <div className="flex w-full items-center gap-4">
            {secondaryAction && secondaryActionLabel && (
              <Button
                disabled={disabled}
                label={secondaryActionLabel}
                onClick={handleSecondaryAction}
                small
              />
            )}
            <Button
              disabled={disabled}
              label={actionLabel}
              onClick={handleSubmit}
            />
          </div>
        </div>
        {footer}
      </div>
    </div>
  );
};

export default Modal;
