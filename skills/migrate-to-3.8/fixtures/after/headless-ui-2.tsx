import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import React from "react";

export const ConfirmDialog = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
    <Transition show={isOpen} as="div">
        <Dialog onClose={onClose}>
            <TransitionChild enter="transition-opacity" enterFrom="opacity-0" enterTo="opacity-100">
                <DialogBackdrop className="fixed inset-0 bg-black/40" />
            </TransitionChild>
            <DialogPanel className="fixed inset-x-0 top-20 mx-auto w-96 rounded bg-white p-4">
                <DialogTitle>Delete item</DialogTitle>
                <button type="button" onClick={onClose}>
                    Cancel
                </button>
            </DialogPanel>
        </Dialog>
    </Transition>
);
