"use client"
import React, { FC } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Textarea } from '@/components/ui/textarea'
import { Character } from "@/schemas/character";
import { FormikErrors, FormikTouched } from 'formik'
const prompt = `
Role: {角色名称}

Background: {背景描述}

Objectives:
1. {任务1}
2. {任务2}

Behavioral Guidelines:
- {行为规范1}
- {行为规范2}

Tone & Style: {语气要求}

Constraints: {限制条件}

Example:
- User: {示例用户提问}
- Assistant: {示例 AI 回答}

`

interface CharacterPanelProps {
    values: Character,
    onChange: any,
    errors: FormikErrors<Character>,
    touched: FormikTouched<Character>
}


const CharacterPanel: FC<CharacterPanelProps> = ({
    values,
    onChange,
    errors,
    touched
}) => {
    return <div className=" min-w-3xs">
        <LabelInputContainer className="mb-4">
            <Label htmlFor="username">角色/身份</Label>
            <Input onChange={onChange} value={values.username} id="username" placeholder="指定模型扮演的角色，如“你是一名拥有十年经验的资深前端开发工程师”" type="text" />
            {errors.username && touched.username && <FailedField text={errors.instruction}/>}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
            <Label htmlFor="context">背景/上下文</Label>
            <Textarea onChange={onChange} value={values.context} id="context" placeholder="提供与任务相关的必要信息，如数据来源、时间范围等" />
            {errors.context && touched.context && <FailedField text={errors.context}/>}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
            <Label htmlFor="instruction">任务/指令</Label>
            <Textarea onChange={onChange} value={values.instruction} id="instruction" placeholder="明确要求模型执行的具体任务，例如“请对以下文本进行情感分类”" />
            {errors.instruction && touched.instruction && <FailedField text={errors.instruction}/>}     

        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
            <Label htmlFor="input">输入数据</Label>
            <Textarea onChange={onChange} value={values.input} id="input" placeholder="待处理的数据本身，如新闻稿、对话内容或产品描述" />
            {errors.input && touched.input && <FailedField text={errors.input}/>}

        </LabelInputContainer>
        {/* <LabelInputContainer className="mb-4">
            <Label htmlFor="output-format">输出格式</Label>

            <Textarea onChange={onChange} value={values.outputFormat} placeholder="待处理的数据本身，如新闻稿、对话内容或产品描述" />
            {errors.outputFormat && touched.outputFormat && <FailedField text={errors.outputFormat}/>}

        </LabelInputContainer> */}
        <LabelInputContainer className="mb-4">
            <Label htmlFor="examples">示例</Label>
            <Textarea onChange={onChange} value={values.examples} id="examples" placeholder="提供 1–2 个输入与输出示例，以帮助模型理解预期" />
            {errors.examples && touched.examples && <FailedField text={errors.examples}/>}

        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
            <Label htmlFor="constraints">约束条件</Label>
            <Textarea onChange={onChange} value={values.constraints} id="constraints" placeholder="对输出内容进行限制，如字数上限、禁止使用特定词汇或风格要求" />
            {errors.constraints && touched.constraints && <FailedField text={errors.constraints}/>}

        </LabelInputContainer>

    </div>
}



const FailedField:FC<{text:string | undefined}> = ({text}) => {
   return <span className="text-sm text-red-600">{text}</span>  
}

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex w-full flex-col space-y-2", className)}>
            {children}
        </div>
    );
};


export default CharacterPanel