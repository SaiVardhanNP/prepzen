import React from 'react'
import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, Controller, FieldValues, Path, useForm } from "react-hook-form";

interface FormFieldProps<T extends FieldValues>{
    control:Control<T>;
    name:Path<T>;
    label:string;
    placeholder?:string;
    type?:'text'|'email'|'password'|'file'
}

const FormField = ({control,name,label,placeholder,type="text"}:FormFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} type={type} {...field} />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
              


export default FormField
