import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import { useState } from "react";

import CardForm from "./CardForm";

type Props = {
  title: string;
  description: string;
  triggerContent: React.ReactNode;
  handleAction?: () => void;
  inputFields: {
    id: string;
    type?: string;
    label: string;
    defaultValue?: string;
  }[];
};


function CardDialogFormEdit({
  title,
  description,
  triggerContent,
  inputFields,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen} >
        <DialogTrigger data-cy="dialog-trigger" asChild>{triggerContent}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle >{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          <CardForm
            mode='edit'
            inputFields={inputFields}
            afterSave={() => setIsOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CardDialogFormEdit;
