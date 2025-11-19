'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface VideoPlayerProps {
  isOpen: boolean
  onClose: () => void
  videoSrc: string
  audioSrc?: string
}

export default function VideoPlayer({ isOpen, onClose, videoSrc, audioSrc }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (isOpen && videoRef.current) {
      const video = videoRef.current
      const audio = audioRef.current

      // Sync audio with video on time update
      const handleTimeUpdate = () => {
        if (audio && video && audioSrc) {
          // Keep audio in sync with video, looping audio if needed
          const videoTime = video.currentTime
          const audioDuration = audio.duration
          if (audioDuration > 0) {
            audio.currentTime = videoTime % audioDuration
          }
        }
      }

      // Handle video loop to keep audio in sync
      const handleVideoEnded = () => {
        if (audio && audioSrc) {
          audio.currentTime = 0
        }
      }

      const handlePlay = async () => {
        setIsPlaying(true)
        if (audio && audioSrc) {
          try {
            await audio.play()
          } catch (err) {
            // Auto-play might be blocked, user interaction needed
            console.log('Audio autoplay blocked')
          }
        }
      }

      const handlePause = () => {
        if (audio) {
          audio.pause()
        }
        setIsPlaying(false)
      }

      // Set up event listeners
      video.addEventListener('play', handlePlay)
      video.addEventListener('pause', handlePause)
      video.addEventListener('timeupdate', handleTimeUpdate)
      video.addEventListener('ended', handleVideoEnded)

      // Auto-play video when opened
      const playVideo = async () => {
        try {
          await video.play()
          if (audio && audioSrc) {
            // Small delay to ensure video starts first
            setTimeout(() => {
              audio.play().catch(() => {})
            }, 100)
          }
        } catch (err) {
          console.log('Video autoplay blocked')
        }
      }

      playVideo()

      return () => {
        video.removeEventListener('play', handlePlay)
        video.removeEventListener('pause', handlePause)
        video.removeEventListener('timeupdate', handleTimeUpdate)
        video.removeEventListener('ended', handleVideoEnded)
      }
    }
  }, [isOpen, audioSrc])

  useEffect(() => {
    if (!isOpen) {
      videoRef.current?.pause()
      audioRef.current?.pause()
      setIsPlaying(false)
    }
  }, [isOpen])

  const handleClose = () => {
    videoRef.current?.pause()
    audioRef.current?.pause()
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4"
            onClick={handleClose}
          >
            {/* Video Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.6, -0.05, 0.01, 0.99] }}
              className="relative w-full max-w-6xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
                aria-label="Close video"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              {/* Video Element */}
              <video
                ref={videoRef}
                src={videoSrc}
                loop
                playsInline
                className="w-full h-full object-cover"
                muted={!audioSrc}
              />

              {/* Audio Element (hidden) */}
              {audioSrc && (
                <audio
                  ref={audioRef}
                  src={audioSrc}
                  loop
                  preload="auto"
                  className="hidden"
                />
              )}

              {/* Play/Pause Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {!isPlaying && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                  >
                    <svg
                      className="w-10 h-10 text-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

