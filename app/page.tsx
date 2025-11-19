'use client'

import Header from '@/components/Header'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const AUDIO_START_SECONDS = 50

export default function Home() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const audioOffsetRef = useRef(0)
  const hasAudioStartedRef = useRef(false)
  const prevVideoTimeRef = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99] as any,
        staggerChildren: 0.2,
      },
    },
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99] as any,
      },
    },
  }

  const splitText = (text: string) => text.split('')

  // Handle video/audio sync
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const audio = audioRef.current

    const handleTimeUpdate = () => {
      if (!audio || !hasAudioStartedRef.current || audio.ended || audio.paused) {
        prevVideoTimeRef.current = video.currentTime
        return
      }

      const duration = audio.duration
      const currentVideoTime = video.currentTime
      const targetTime = currentVideoTime + audioOffsetRef.current

      // Prevent rewinding audio when video loops back
      if (currentVideoTime < prevVideoTimeRef.current) {
        prevVideoTimeRef.current = currentVideoTime
        return
      }

      prevVideoTimeRef.current = currentVideoTime

      if (duration > 0) {
        // Only adjust if target time is ahead of current position and still within duration
        if (
          targetTime < duration - 0.25 &&
          targetTime > audio.currentTime &&
          targetTime - audio.currentTime > 0.3
        ) {
          audio.currentTime = targetTime
        }
      }
    }

    const handlePlay = async () => {
      setIsVideoPlaying(true)
      if (audio && hasAudioStartedRef.current && !audio.ended) {
        audio.play().catch(() => {})
      }
    }

    const handlePause = () => {
      setIsVideoPlaying(false)
      if (audio && !audio.ended) {
        audio.pause()
      }
    }

    const handleAudioEnded = () => {
      hasAudioStartedRef.current = false
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    audio?.addEventListener('ended', handleAudioEnded)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      audio?.removeEventListener('ended', handleAudioEnded)
    }
  }, [])

  // Attempt to auto-play video on mount
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const attemptPlayback = async () => {
      try {
        await video.play()
      } catch (err) {
        console.log('Autoplay blocked')
      }
    }

    attemptPlayback()
  }, [])

  // Listen for first user interaction to trigger audio
  useEffect(() => {
    if (hasInteracted) return

    const handleInteraction = () => {
      setHasInteracted(true)
    }

    window.addEventListener('pointerdown', handleInteraction, { once: true })
    window.addEventListener('keydown', handleInteraction, { once: true })

    return () => {
      window.removeEventListener('pointerdown', handleInteraction)
      window.removeEventListener('keydown', handleInteraction)
    }
  }, [hasInteracted])

  // Once interaction occurs, position audio at desired offset and start playback
  useEffect(() => {
    const audio = audioRef.current
    const video = videoRef.current
    if (!audio || !video) return

    const startAudio = () => {
      if (audio.duration > 0 && Number.isFinite(audio.duration)) {
        const offset = Math.min(AUDIO_START_SECONDS, Math.max(audio.duration - 0.5, 0))
        audioOffsetRef.current = offset
        audio.currentTime = offset
        hasAudioStartedRef.current = true
        if (!video.paused && !audio.ended) {
          audio.play().catch(() => {})
        }
      }
    }

    if (!hasInteracted) {
      audio.pause()
      return
    }

    if (audio.readyState >= 1) {
      startAudio()
    } else {
      audio.addEventListener('loadedmetadata', startAudio, { once: true })
    }

    return () => {
      audio.removeEventListener('loadedmetadata', startAudio)
    }
  }, [hasInteracted])

  return (
    <div ref={containerRef} className="min-h-screen bg-dark-primary">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden">
        {/* Left Section - Image/Video with Parallax */}
        <motion.div
          style={{ y }}
          className="lg:w-[40%] w-full h-screen lg:h-screen relative overflow-hidden order-2 lg:order-1"
        >
          <motion.div
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: [0.6, -0.05, 0.01, 0.99] as any }}
            className="w-full h-full relative"
          >
            {/* Video Element */}
            <motion.video
              ref={videoRef}
              src="/video.mp4"
              loop
              playsInline
              muted
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                isVideoPlaying ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            />

            {/* Image Element */}
            <motion.div
              className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
                isVideoPlaying ? 'opacity-0 z-0' : 'opacity-100 z-10'
              }`}
            >
              <Image
                src="/image2.jpeg"
                alt="Portrait"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </motion.div>

            {/* Hidden Audio Element */}
            <audio
              ref={audioRef}
              src="/Lana_Del_Rey_-_Young_And_Beautiful_CeeNaija.com_.mp3"
              preload="auto"
              className="hidden"
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-dark-secondary/20 z-20 pointer-events-none"
            />
          </motion.div>
        </motion.div>

        {/* Right Section - Content */}
        <motion.div
          style={{ opacity }}
          className="lg:w-[60%] w-full bg-dark-secondary flex flex-col justify-center px-8 md:px-16 py-16 lg:py-0 relative min-h-screen lg:min-h-0 order-1 lg:order-2"
        >
          {/* Animated Headline */}
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            <motion.h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 flex items-center gap-4 flex-wrap">
              {splitText("Hi, I'm").map((char, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className="inline-block"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: '200px' }}
                transition={{ delay: 0.8, duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
                className="h-px bg-gradient-to-r from-white to-transparent"
              />
            </motion.h1>
            <motion.h1
              variants={textVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white"
            >
              {splitText('Ushika').map((char, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className="inline-block"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.h1>
          </motion.div>

          {/* Body Text */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-white text-sm md:text-base lg:text-lg mb-12 max-w-2xl leading-relaxed opacity-90 font-light"
          >
            Welcome to my creative space. I craft digital experiences that blend
            artistry with innovation, creating memorable moments through design and
            technology.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            {/* Explore Now Button */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(255,255,255,0.2)' }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-dark-primary px-8 py-4 font-medium hover:bg-gray-200 transition-colors text-sm uppercase tracking-wider relative overflow-hidden group"
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
              />
              <span className="relative z-10">Explore Now</span>
            </motion.button>
          </motion.div>

          {/* Page Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-6 right-6 md:bottom-8 md:right-12 lg:right-16 text-white text-xs md:text-sm font-light"
          >
            Page | 01
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, repeat: Infinity, repeatType: 'reverse', duration: 1.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 lg:hidden"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-2"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-3 bg-white/50 rounded-full"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Additional Creative Sections */}
      <section id="aboutme" className="min-h-screen bg-dark-primary flex items-center justify-center px-8 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white mb-8"
          >
            About Me
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white text-lg md:text-xl leading-relaxed opacity-90 font-light"
          >
            I'm a creative professional passionate about bringing ideas to life through
            innovative design and cutting-edge technology. Every project is an opportunity
            to push boundaries and create something extraordinary.
          </motion.p>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen bg-dark-primary flex items-center justify-center px-8 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl w-full text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white mb-8"
          >
            Get In Touch
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white text-lg opacity-90 font-light mb-12"
          >
            Let's create something amazing together.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-dark-primary px-12 py-4 font-medium text-sm uppercase tracking-wider"
          >
            Contact Me
          </motion.button>
        </motion.div>
      </section>
    </div>
  )
}
