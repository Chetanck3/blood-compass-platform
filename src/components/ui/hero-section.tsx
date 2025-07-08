
'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import { cn } from '@/lib/utils'
import { Menu, X, ChevronRight, Heart } from 'lucide-react'
import { useScroll, motion } from 'framer-motion'

interface HeroSectionProps {
  onAuthClick: (type: 'donor' | 'patient' | 'hospital') => void;
}

export function HeroSection({ onAuthClick }: HeroSectionProps) {
    return (
        <>
            <HeroHeader onAuthClick={onAuthClick} />
            <main className="overflow-x-hidden">
                <section>
                    <div className="py-24 md:pb-32 lg:pb-36 lg:pt-72">
                        <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-6 lg:block lg:px-12">
                            <div className="mx-auto max-w-lg text-center lg:ml-0 lg:max-w-full lg:text-left">
                                <h1 className="mt-8 max-w-2xl text-balance text-5xl md:text-6xl lg:mt-16 xl:text-7xl">
                                    Connecting Hearts,
                                    <span className="text-red-500"> Saving Lives</span>
                                </h1>
                                <p className="mt-8 max-w-2xl text-balance text-lg text-blue-700">
                                    B-Donor is the comprehensive platform that bridges the gap between blood donors and patients in need. 
                                    Join our community and help save lives with every donation.
                                </p>

                                <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                                    <Button
                                        size="lg"
                                        className="h-12 rounded-full pl-5 pr-3 text-base bg-red-500 hover:bg-red-600"
                                        onClick={() => onAuthClick('donor')}
                                    >
                                        <Heart className="mr-2 h-5 w-5" />
                                        <span className="text-nowrap">Become a Donor</span>
                                        <ChevronRight className="ml-1" />
                                    </Button>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="h-12 rounded-full px-5 text-base border-2 border-blue-500 text-blue-700 hover:bg-blue-50"
                                        onClick={() => onAuthClick('patient')}
                                    >
                                        <span className="text-nowrap">Find a Donor</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="aspect-[2/3] absolute inset-1 overflow-hidden rounded-3xl border border-black/10 sm:aspect-video lg:rounded-[3rem] dark:border-white/5">
                            <div className="size-full bg-gradient-to-br from-red-50 via-white to-blue-50 opacity-50 flex items-center justify-center">
                                <div className="text-center">
                                    <Heart className="h-24 w-24 text-red-500 mx-auto mb-4 animate-pulse" />
                                    <p className="text-2xl font-bold text-blue-900">Saving Lives Together</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-background pb-2">
                    <div className="group relative m-auto max-w-7xl px-6">
                        <div className="flex flex-col items-center md:flex-row">
                            <div className="md:max-w-44 md:border-r md:pr-6">
                                <p className="text-end text-sm text-blue-700">Trusted by healthcare facilities</p>
                            </div>
                            <div className="relative py-6 md:w-[calc(100%-11rem)]">
                                <InfiniteSlider
                                    durationOnHover={20}
                                    duration={40}
                                    gap={112}>
                                    <div className="flex">
                                        <div className="mx-auto h-12 w-32 bg-gradient-to-r from-red-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                                            City Hospital
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="mx-auto h-12 w-32 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center text-white font-bold">
                                            Care Center
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="mx-auto h-12 w-32 bg-gradient-to-r from-green-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                                            Med Institute
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="mx-auto h-12 w-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold">
                                            Blood Bank
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="mx-auto h-12 w-32 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg flex items-center justify-center text-white font-bold">
                                            Health Plus
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="mx-auto h-12 w-32 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
                                            Life Care
                                        </div>
                                    </div>
                                </InfiniteSlider>

                                <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
                                <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>
                                <ProgressiveBlur
                                    className="pointer-events-none absolute left-0 top-0 h-full w-20"
                                    direction="left"
                                    blurIntensity={1}
                                />
                                <ProgressiveBlur
                                    className="pointer-events-none absolute right-0 top-0 h-full w-20"
                                    direction="right"
                                    blurIntensity={1}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

const menuItems = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Impact', href: '#impact' },
    { name: 'About', href: '#about' },
]

const HeroHeader = ({ onAuthClick }: { onAuthClick: (type: 'donor' | 'patient' | 'hospital') => void }) => {
    const [menuState, setMenuState] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)
    const { scrollYProgress } = useScroll()

    React.useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            setScrolled(latest > 0.05)
        })
        return () => unsubscribe()
    }, [scrollYProgress])

    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="group fixed z-20 w-full pt-2">
                <div className={cn('mx-auto max-w-7xl rounded-3xl px-6 transition-all duration-300 lg:px-12', scrolled && 'bg-background/50 backdrop-blur-2xl')}>
                    <motion.div
                        key={1}
                        className={cn('relative flex flex-wrap items-center justify-between gap-6 py-3 duration-200 lg:gap-0 lg:py-6', scrolled && 'lg:py-4')}>
                        <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
                            <div className="flex items-center space-x-2">
                                <Heart className="h-8 w-8 text-red-500" />
                                <span className="text-2xl font-bold text-blue-900">B-Donor</span>
                            </div>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>

                            <div className="hidden lg:block">
                                <ul className="flex gap-8 text-sm">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <a
                                                href={item.href}
                                                className="text-blue-700 hover:text-blue-900 block duration-150">
                                                <span>{item.name}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <a
                                                href={item.href}
                                                className="text-blue-700 hover:text-blue-900 block duration-150">
                                                <span>{item.name}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-blue-300 text-blue-700 hover:bg-blue-50"
                                    onClick={() => onAuthClick('donor')}
                                >
                                    <span>Sign In</span>
                                </Button>
                                <Button
                                    size="sm"
                                    className="bg-red-500 hover:bg-red-600"
                                    onClick={() => onAuthClick('donor')}
                                >
                                    <span>Get Started</span>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </nav>
        </header>
    )
}
