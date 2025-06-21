'use client'

import { Modal, ModalContent, ModalBody, ModalFooter, Button } from '@heroui/react'

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
}: {
  open: boolean
  onOpenChange: (o: boolean) => void
  title: string
  description: string
  onConfirm: () => void
}) {
  return (
    <Modal
      isOpen={open}
      onOpenChange={onOpenChange}
      size="md"
      backdrop="blur"
      placement="center"
    >
      <ModalContent>
        <ModalBody className="space-y-4">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <p className="text-gray-300">{description}</p>
        </ModalBody>
        <ModalFooter className="justify-end space-x-2">
          <Button variant="ghost" color="default" onPress={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="flat" color="primary" onPress={onConfirm}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
