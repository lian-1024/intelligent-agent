import React from "react";
import {Metadata} from 'next'
import { BackgroundLines } from "@/components/aceternity/background-lines";
import { TextGenerateEffect } from "@/components/aceternity/text-generate-effect";
import { MacbookScroll } from "@/components/aceternity/macbook-scroll";
import { ContainerScroll } from '@/components/aceternity/container-scroll-animation'
import Link from "next/link";
import { PrimaryButton } from '@/components/ui/button'
import { Github } from "lucide-react";
import GridBackground from '@/components/ui/grid-background'


// 常量配置
const HERO_TITLE = "基于Multi Agent + RAG 驱动的 AI 问答引擎";
const HERO_DESCRIPTION = "基于大语言模型和检索增强生成技术，结合多智能体系统，为您提供准确、可靠的知识问答服务。支持多种数据源接入，打造专属于您的智能助手。";

export const metadata:Metadata = {
    title: HERO_TITLE,
    description: HERO_DESCRIPTION,
}



// GitHub 登录按钮组件
const GithubButton = () => {
    return (
        <Link href="/login" className="dark:bg-black bg-white cursor-pointer">
            <button className="relative inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                    <Github className="size-4 mr-1" />
                    Login With Github
                </span>
            </button>
        </Link>
    );
};

// Hero 部分组件
const HeroSection = () => {
    return (
        <section className="relative h-screen w-screen flex justify-center items-center flex-col z-50">
            <GridBackground />
            <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
                <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
                    <TextGenerateEffect
                        words={HERO_TITLE}
                        className="text-2xl md:text-4xl lg:text-5xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight"
                    />
                </h2>
                <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 z-50 dark:text-neutral-400 text-center">
                    {HERO_DESCRIPTION}
                </p>
                <div className="flex gap-5 justify-center z-50 mt-10">
                    <Link href="/chat" className="cursor-pointer">
                        <PrimaryButton>快速开始</PrimaryButton>
                    </Link>
                    <GithubButton />
                </div>
            </BackgroundLines>
        </section>
    );
};

// 特性展示部分组件
const FeatureSection = () => {
    return (
        <div className="flex flex-col overflow-hidden z-50 relative">
            <ContainerScroll
                titleComponent={
                    <>
                        <h1 className="text-4xl font-semibold text-black dark:text-white">
                            支持 RAG、角色设计系统 <br />
                            <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                                多种功能任你选择
                            </span>
                        </h1>
                    </>
                }
            >
                <img
                    src="/features.png"
                    alt="features"
                    height={720}
                    width={1400}
                    className="mx-auto rounded-2xl object-cover h-full object-left-top"
                    draggable={false}
                />
            </ContainerScroll>
        </div>
    );
};

// Macbook 展示部分组件
const MacbookSection = () => {
    return (
        <div className="overflow-hidden dark:bg-[#0B0B0F] bg-white w-full ">
            <MacbookScroll
            className="relative z-50"
                title={
                    <span>
                        精心打造的用户界面 <br /> 流畅的交互体验
                    </span>
                }
                src="/image.png"
                showGradient={false}
            />
        </div>
    );
};

// 页脚部分组件
const FooterSection = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-6 relative z-50">
            <h1 className="relative z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
                开启智能对话新时代
            </h1>
            <p className="text-neutral-500 max-w-2xl mx-auto my-2 text-sm md:text-lg text-center relative z-10">
                无论是知识问答、文档处理，还是智能助手定制，我们都能为您提供专业的解决方案。
                立即体验由 RAG 和多智能体驱动的下一代 AI 问答系统。
            </p>
            <div className="flex gap-4 mt-4">
                <Link href="/chat" className="cursor-pointer">
                    <PrimaryButton>免费开始使用</PrimaryButton>
                </Link>
                <GithubButton />
            </div>
        </div>
    );
};

// 主页面组件
const Home = () => {
    return (
        <div className="relative w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
            <HeroSection />

            <section className="w-screen relative">
                <GridBackground >
                    <FeatureSection />
                </GridBackground>
            </section>

            <section className="w-screen  relative">
                <GridBackground >
                    <MacbookSection />
                </GridBackground>
            </section>

            <section className="w-screen h-screen flex items-center justify-center">
                <GridBackground >
                    <FooterSection />
                </GridBackground>
            </section>
        </div>
    );
};

export default Home;