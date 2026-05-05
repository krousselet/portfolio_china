// src/composables/useSounds.js
export function useSounds() {
  const playClickSound = () => {
    try {
      const audio = new Audio('/sounds/click.mp3')
      audio.volume = 0.2
      audio.play().catch(() => {})
    } catch (e) {}
  }

  const playFire = () => {
    try {
      const audio = new Audio('/sounds/fire.mp3')
      audio.volume = 0.8
      audio.play().catch(() => {})
    } catch (e) {}
  }

  // ✅ BUILD UP: Speed + Pitch (PERFECT VARIATION)
  let playRate = 1.12 // START SLOW & DEEP

  const playRisingSlide = () => {
    try {
      const audio = new Audio('/sounds/slide.mp3')

      // 👇 MAIN EFFECT: progressively FASTER + HIGHER
      audio.playbackRate = Math.min(playRate, 1.6) // Cap at pleasant speed
      audio.volume = 0.65
      audio.currentTime = 0
      audio.play().catch(() => {})

      // Increase speed for next section
      playRate += 1.0
    } catch (e) {}
  }

  // Reset to slow/deep when returning to profile
  const resetRisingSound = () => {
    playRate = 0.9
  }

  const playSlide = () => {
    try {
      const audio = new Audio('/sounds/slide.mp3')
      audio.volume = 0.7
      audio.play().catch(() => {})
    } catch (e) {}
  }

  let bgMusic = null
  const toggleBackgroundMusic = () => {
    try {
      if (!bgMusic) {
        bgMusic = new Audio('/sounds/background.mp3')
        bgMusic.loop = true
        bgMusic.volume = 0.15
      }
      bgMusic.paused ? bgMusic.play() : bgMusic.pause()
    } catch (e) {}
  }

  return {
    playClickSound,
    playFire,
    playSlide,
    playRisingSlide,
    resetRisingSound,
    toggleBackgroundMusic,
  }
}
