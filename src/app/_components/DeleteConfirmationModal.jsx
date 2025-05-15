"use client";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import LoadingSpinner from "./LoadingSpinner";

export default function DeleteConfirmationModal({ show, onClose, onConfirm ,isLoading}) {
  return (
    <Modal show={show} onClose={onClose} popup size="md">
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
          <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this post?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={onConfirm} disabled={isLoading}>
              {isLoading ? (
                <LoadingSpinner size={20} color="#fff" />
              ) : (
                "Yes, I'm sure"
              )}
            </Button>
            <Button color="gray" onClick={onClose} disabled={isLoading}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
