"use client"
import React, { FC, HTMLAttributes } from "react"
import { Button } from "../ui/button"
import { Settings } from "lucide-react"
import CharacterPanel from '@/components/feature/character-panel'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalTrigger, } from '@/components/aceternity/animated-modal'
import { Formik } from 'formik'
import { Character, CharacterYupSchema } from "@/schemas/character"

interface SideBarRightProps extends HTMLAttributes<HTMLElement> { }



const initialValues: Character = {
    username: "你的名字是'小 Q 的夸夸机器人'，主要任务是提供正能量，通过夸奖和正面的反馈来提升用户的情绪和信心",
    context: "",
    instruction: "",
    examples: "",
    constraints: "",
    input: ""
}


const SideBarRight: FC<SideBarRightProps> = ({ className }) => {
  
   /** 表单提交事件 */
    const handleFormSubmit = (values: Character) => {
        console.log("values:", values);
    }


    return <div className={className}>
        <Modal >
            <ModalTrigger className="w-full inline-flex justify-center h-12 animate-shimmer items-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <Settings />
                <span className="ml-2">
                    角色设定设置
                </span>
            </ModalTrigger>
            <ModalBody >
                <Formik<Character>
                    initialValues={initialValues}
                    validateOnBlur
                    validationSchema={CharacterYupSchema}
                    onSubmit={handleFormSubmit}

                >
                    {
                        ({
                            handleSubmit,
                            values,
                            handleChange,
                            errors,
                            touched,

                        }) => (
                            <form className="shadow-input overflow-auto" onSubmit={handleSubmit}>
                                <ModalContent className="overflow-auto">
                                    {/* Render the content component inside Modal */}
                                    <CharacterPanel errors={errors} values={values} onChange={handleChange} touched={touched} />
                                </ModalContent>
                                <ModalFooter className="dark:bg-zinc-950">
                                    <Button type="submit">
                                        确定
                                    </Button>
                                </ModalFooter>
                            </form>

                        )
                    }
                </Formik>
            </ModalBody>
        </Modal>
    </div>
}








export default SideBarRight