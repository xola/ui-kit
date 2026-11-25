import { Dialog, Transition } from "@headlessui/react";
import React from "react";

export const ConfirmDialog = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
    <Transition show={isOpen} as="div">
        <Dialog onClose={onClose}>
            <Transition.Child enter="transition-opacity" enterFrom="opacity-0" enterTo="opacity-100">
                <Dialog.Overlay className="fixed inset-0 bg-black/40" />
            </Transition.Child>
            <Dialog.Panel className="fixed inset-x-0 top-20 mx-auto w-96 rounded bg-white p-4">
                <Dialog.Title>Delete item</Dialog.Title>
                <button type="button" onClick={onClose}>
                    Cancel
                </button>
            </Dialog.Panel>
        </Dialog>
    </Transition>
);
