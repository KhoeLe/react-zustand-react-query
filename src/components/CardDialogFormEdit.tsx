import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { useState } from 'react'
import { useUpdateUser, useUser } from '@/hooks/useUsers'

type Props = {
    title: string,
    description: string,
    triggerContent: React.ReactNode,
    handleAction?: () => void,
    inputFields: {
        id: string,
        type?: string,
        label: string,
        defaultValue?: string,
    }[],
}


function CardDialogFormEdit({ title, description, triggerContent, inputFields }: Props) {

    const updateUser = useUpdateUser()
    const [isOpen, setIsOpen] = useState(false);

    const [formValues, setFormValues] = useState<Record<string, string>>(
        inputFields.reduce((acc: Record<string, string>, field) => {
            acc[field.id] = field.defaultValue || '';
            return acc;
        }, {})
    );

    const { data: getUser } = useUser(isOpen ? formValues.id?.toString() : '')

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { id, name, avatar } = formValues;

        const updatedUser = { ...getUser, name, avatar, id: Number(id) };

        // Submit the updated user data
        await updateUser(updatedUser);

        setIsOpen(false);
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormValues((prevFormValues) => ({
            ...prevFormValues,
            [id]: value,
        }));

    };


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen} >
            <DialogTrigger asChild>
                {triggerContent}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleFormSubmit}>
                    <div className="grid gap-4 py-4">
                        {inputFields.map((input, index) => (
                            <div key={index} className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor={input.id} className={`text-right ${input.type ? 'hidden' : 'block'}`}>
                                    {input.label}
                                </Label>
                                <Input
                                    type={input.type || 'text'}
                                    id={input.id}
                                    // defaultValue={input.defaultValue || ''}
                                    className="col-span-3"
                                    value={formValues[input.id]}
                                    onChange={handleInputChange}
                                />
                            </div>
                        ))}
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CardDialogFormEdit