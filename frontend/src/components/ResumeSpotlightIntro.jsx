import React, { useState, useEffect } from 'react'

export default function ResumeSpotlightIntro({ resumePdf, onDownload, downloading }) {
  const [showIntro, setShowIntro] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [resumeInserted, setResumeInserted] = useState(false)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    // Only trigger on mobile viewports (<= 768px)
    const isMobile = window.innerWidth <= 768
    if (!isMobile) return

    // Show only on first visit (persisted in sessionStorage)
    const hasSeen = sessionStorage.getItem('seen_resume_intro_v1')
    if (hasSeen) return

    const handleScroll = () => {
      if (window.scrollY > 25) {
        sessionStorage.setItem('seen_resume_intro_v1', 'true')
        setShowIntro(true)
        window.removeEventListener('scroll', handleScroll)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 1-second insertion sequence
  useEffect(() => {
    if (!showIntro) return

    // Lock body scroll while spotlight is active
    document.body.style.overflow = 'hidden'

    const insertTimer = setTimeout(() => {
      setResumeInserted(true)
    }, 950)

    const btnTimer = setTimeout(() => {
      setShowButton(true)
    }, 1000)

    return () => {
      clearTimeout(insertTimer)
      clearTimeout(btnTimer)
      document.body.style.overflow = ''
    }
  }, [showIntro])

  const handleClose = () => {
    setIsClosing(true)
    document.body.style.overflow = ''
    setTimeout(() => {
      setShowIntro(false)
      setIsClosing(false)
    }, 320)
  }

  const handleDownloadClick = (e) => {
    if (onDownload) {
      onDownload(e)
    }
    setTimeout(() => {
      handleClose()
    }, 1000)
  }

  if (!showIntro) return null

  return (
    <div
      className={`resume-spotlight-backdrop ${isClosing ? 'closing' : ''}`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`resume-spotlight-card ${isClosing ? 'closing' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close (X) button */}
        <button
          type="button"
          className="resume-spotlight-close"
          onClick={handleClose}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Heading: Explore My Resume */}
        <div className="resume-spotlight-header">
          <span className="resume-spotlight-badge">FIRST VISIT PREVIEW</span>
          <h3 className="resume-spotlight-title">
            Explore My <span className="gradient-text">Resume</span>
          </h3>
          <p className="resume-spotlight-subtitle">
            Abhishek Kumar • Full Stack Developer
          </p>
        </div>

        {/* Slot / Document Insertion Animation Wrapper */}
        <div className="resume-slot-wrapper">
          <div className="resume-slot-top-line" />

          <div className={`resume-paper-preview ${resumeInserted ? 'inserted' : 'inserting'}`}>
            {/* Header of digital resume sheet */}
            <div className="resume-paper-header">
              <div className="resume-paper-avatar">AK</div>
              <div className="resume-paper-meta">
                <span className="resume-paper-name">ABHISHEK KUMAR</span>
                <span className="resume-paper-role">Full-Stack &amp; AI ML</span>
              </div>
              <span className="resume-paper-format">PDF</span>
            </div>

            {/* Stylized sections */}
            <div className="resume-paper-body">
              <div className="resume-paper-row">
                <span className="resume-paper-label">TECH STACK</span>
                <div className="resume-paper-chips">
                  <span>React</span>
                  <span>Node.js</span>
                  <span>MongoDB</span>
                  <span>Next.js</span>
                </div>
              </div>

              <div className="resume-paper-row">
                <span className="resume-paper-label">EXPERIENCE &amp; PROJECTS</span>
                <div className="resume-paper-lines">
                  <div className="r-line r-line-long" />
                  <div className="r-line r-line-med" />
                </div>
              </div>
            </div>

            {/* Footer watermark */}
            <div className="resume-paper-footer">
              <span className="resume-paper-dot" />
              <span>Official Resume 2026 • Ready to Download</span>
            </div>
          </div>
        </div>

        {/* Actions: Revealed after 1 second */}
        <div className="resume-spotlight-actions">
          {showButton ? (
            <button
              type="button"
              id="spotlight-resume-btn"
              className="spotlight-btn-resume"
              onClick={handleDownloadClick}
            >
              {downloading ? 'Downloading...' : 'Resume ↓'}
            </button>
          ) : (
            <div className="spotlight-btn-placeholder">
              <span className="spotlight-loading-pulse">Inserting Resume...</span>
            </div>
          )}

          <button
            type="button"
            className="resume-spotlight-dismiss"
            onClick={handleClose}
          >
            Continue to Portfolio →
          </button>
        </div>
      </div>
    </div>
  )
}
