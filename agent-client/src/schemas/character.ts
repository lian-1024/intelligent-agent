import { z } from "zod";
import * as yup from "yup";


export const CharacterSchema = z.object({
    username: z.string().min(2, { message: "角色必须大于 2 个字符" }).max(50, { message: "不能大于 50 个字符" }),
    context: z.string({ message: "必填项" }),
    instruction: z.string({ message: "必填项" }),
    input: z.string({ message: "必填项" }),
    // outputFormat: z.string({ message: "必填项" }), // Use quotes for keys with hyphens
    examples: z.string({ message: "必填项" }),
    constraints: z.string({ message: "必填项" }),
})

export const CharacterYupSchema = yup.object({
    username: yup.string().min(2, "角色必须大于 2 个字符").max(50, "不能大于 50 个字符").required("必填项"),
    context: yup.string().required("必填项"),
    instruction: yup.string().required("必填项"),
    input: yup.string().required("必填项"),
    // outputFormat: yup.string().required("必填项"),
    examples: yup.string().required("必填项"),
    constraints: yup.string().required("必填项"),
});


export type Character = z.infer<typeof CharacterSchema>