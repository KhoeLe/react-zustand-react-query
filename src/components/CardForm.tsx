import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "./ui/form";
import { Input } from "./ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useUpdateUser, useUser } from "@/hooks/useUsers";

const formSchema = z.object({
  id: z.string(),
  name: z.string().min(2).max(50),
  avatar: z.string().url(),
  password: z.string().min(8).max(50),
});

type FormValues = z.infer<typeof formSchema>;
type InputFieldId = "id" | "name" | "avatar" | "password";

type Props = {
  afterSave: () => void;
  inputFields: {
    id: string;
    type?: string;
    label: string;
    defaultValue?: string | undefined;
  }[];
};

function CardForm({ afterSave, inputFields }: Props) {
  const [saving, setSaving] = useState(false);
  const updateUser = useUpdateUser()

  const { data: getUser } = useUser(!saving ? (inputFields[0].defaultValue ?? '').toString() : '');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: inputFields[0].defaultValue || "",
      name: inputFields[1].defaultValue || "",
      avatar: inputFields[2].defaultValue || "",
      password: inputFields[3].defaultValue || "",
    }
  })

  const onSubmit =async (values: FormValues) => {
    setSaving(true);
    const updatedUser = { ...getUser, ...values, id: parseInt(values.id) };
    await updateUser(updatedUser);
    console.log(values);
    afterSave();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <fieldset disabled={saving}>
          {inputFields.map((input, index) => (
            <div key={index} className={`${input.type === "hidden" ? 'hidden' : ''}`}>
              <FormField
                control={form.control}
                name={input.id as InputFieldId}
                render={({ field }) => (
                  
                  <FormItem>
                    <FormLabel>{input.label}</FormLabel>
                    <FormControl>
                      <Input type={`${input.type === "password" ? 'password' : ''}`} placeholder="Please input name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
          <Button  className="my-5" type="submit">Submit</Button>
        </fieldset>
      </form>
    </Form>


  );
}

export default CardForm;
