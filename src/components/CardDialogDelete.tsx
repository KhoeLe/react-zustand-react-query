
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"
import { User, useDeleteUser } from "@/hooks/useUsers";

type AlertDialogMesProps = {
    variant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    title: string;
    desc: string;
    text: string;
    user: User;
};

function CardDialogDelete({ variant, title, desc, text, user }: AlertDialogMesProps) {

    const deleteUser = useDeleteUser();

    const handleAction = (id: string) => {
        deleteUser(id);
    };

    return (
        <form data-cy="form-delete">
            <AlertDialog  >
                <AlertDialogTrigger data-cy="dialog-trigger-delete" asChild>
                    <Button variant={variant}>{text}</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{title}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {desc}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction data-cy="delete-button"  onClick={() => handleAction(user.id.toString())}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </form>

    )
}



export default CardDialogDelete