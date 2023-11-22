import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { User } from "@/hooks/useUsers";
import CardDialogFormEdit from "./CardDialogFormEdit";
import CardDialogDelete from "./CardDialogDelete";
import { Input } from "./ui/input";
import CardDialogCreate from "./cardDialogCreate";

type Props = {
  users: User[] | undefined;
  setSearchTerm: (searchTerm: string) => void;
};

function CardBox({ users, setSearchTerm}: Props) {

  return (
    <>
      {/* <div className="px-12 py-12 flex flex-1 justify-center content-center">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"></div>
      </div> */}
      <div className="my-5 flex justify-end">
            <CardDialogCreate
                    title="Create Profile"
                    description="Make changes to your profile here. Click save when you're done."
                    triggerContent={<Button className="mt-2" >Create Form</Button>}
                    inputFields={

                      [
                        {
                          label: "User ID",
                          id: "id",
                          defaultValue: "id",
                          type: "hidden"
                        },
                        {

                          label: "Name",
                          id: "name",
                          defaultValue: "name",
                        },
                        {
                          label: "Avatar",
                          id: "avatar",
                          defaultValue: "url",
                        },
                      ]}
                  />
      </div>

      <div className="my-5 flex justify-end ">
          <Input
            data-cy="search"
            placeholder="Filter name..."
            className="max-w-md w-full"
            onChange={e => setSearchTerm(e.target.value)}
          />
        
      </div>
      


      <div className="flex flex-col content-center relative">
        <div className="absolute -inset-2 rounded-lg bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-pink-600 via-violet-600 to-neutral-600 opacity-50 blur-2xl"></div>
        <div className="relative">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {users?.map((user) => (
              <Card
                key={user.id}
                className={cn(`flex flex-col justify-between ${user.status === false ? "hidden" : ""}`)}
              >
                <CardHeader>
                  <CardTitle>{user.name}</CardTitle>
                  <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="w-full sm:w-[100px] md:w-[150px] lg:w-[120px] xl:w-[250px]">
                    <img
                      className="border rounded-md w-full object-cover items-center content-center"
                      src={user.avatar}
                      alt=""
                    />
                  </div>
                </CardContent>

                <div className="flex justify-between px-2 mx-2 py-4 lg:px-4 ">
                  <CardDialogFormEdit
                    title="Edit Profile"
                    description="Make changes to your profile here. Click save when you're done."
                    triggerContent={<Button  variant="outline">Edit</Button>}
                    inputFields={

                      [
                        {
                          label: "User ID",
                          id: "id",
                          defaultValue: user.id.toString(),
                          type: "hidden"
                        },
                        {

                          label: "Name",
                          id: "name",
                          defaultValue: user.name,
                        },
                        {
                          label: "Avatar",
                          id: "avatar",
                          defaultValue: user.avatar,
                        },

                        // {
                        //   label: "Password",
                        //   id: "password",
                        //   defaultValue: "@peduarte",
                        //   type: "password",
                        // },
                        // Add more input field configurations as needed
                      ]}
                  />
                  <CardDialogDelete
                    user={user}
                    text="Delete"
                    variant="destructive"
                    title="Are you absolutely sure?"
                    desc="This action cannot be undone. This will permanently delete your
              account and remove your data from our servers."
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CardBox;
