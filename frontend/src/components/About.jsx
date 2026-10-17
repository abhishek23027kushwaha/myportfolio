import React, { useState, useEffect } from 'react'

// ── EDIT YOUR SKILLS HERE ──
const skills = [
  'React', 'Node.js', 'Express', 'MongoDB',
  'JavaScript', 'Java', 'C', 'Tailwind CSS',
  'MySQL', 'Git', 'GitHub', 'Postman',
  'Figma', 'Redis', 'Docker', 'RAG',
  'LangChain', 'LangGraph', 'Socket.io', 'PostgreSQL',
  'Next.js'
]

const prefix = "Hi! I'm "
const name = "ABHISHEK K"
const suffix = " — Full Stack Developer & AI/ML Enthusiast"
const fullText = prefix + name + suffix

export default function About() {
  const [displayedLength, setDisplayedLength] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [activeSkillIndex, setActiveSkillIndex] = useState(0)

  // Auto-blink tech stack skills sequentially one by one from start to end continuously
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSkillIndex((prev) => (prev + 1) % skills.length)
    }, 650)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let timer

    if (!isDeleting && displayedLength < fullText.length) {
      // Typing forward
      timer = setTimeout(() => {
        setDisplayedLength((prev) => prev + 1)
      }, 50)
    } else if (!isDeleting && displayedLength === fullText.length) {
      // Pause for 2.5 seconds after full sentence is printed
      timer = setTimeout(() => {
        setIsDeleting(true)
      }, 2500)
    } else if (isDeleting && displayedLength > 0) {
      // Erasing back to the beginning
      timer = setTimeout(() => {
        setDisplayedLength((prev) => prev - 1)
      }, 20)
    } else if (isDeleting && displayedLength === 0) {
      // Pause briefly, then reprint from the start
      timer = setTimeout(() => {
        setIsDeleting(false)
      }, 500)
    }

    return () => clearTimeout(timer)
  }, [displayedLength, isDeleting])

  const renderTypedContent = () => {
    const pLen = prefix.length
    const nLen = name.length

    let renderedPrefix = ''
    let renderedName = ''
    let renderedSuffix = ''

    if (displayedLength <= pLen) {
      renderedPrefix = prefix.slice(0, displayedLength)
    } else if (displayedLength <= pLen + nLen) {
      renderedPrefix = prefix
      renderedName = name.slice(0, displayedLength - pLen)
    } else {
      renderedPrefix = prefix
      renderedName = name
      renderedSuffix = suffix.slice(0, displayedLength - pLen - nLen)
    }

    return (
      <>
        {renderedPrefix}
        {renderedName && <span className="gradient-text">{renderedName}</span>}
        {renderedSuffix}
      </>
    )
  }

  return (
    <section id="about" className="about">
      <div className="container">

        {/* ── Custom About Header ── */}
        <div className="about-header">
          <span className="about-header-label">About Me</span>
          <h2 className="about-header-title" style={{ minHeight: '1.4em' }}>
            {renderTypedContent()}
            <span className="typewriter-cursor">|</span>
          </h2>
          <div className="about-code-block">
            <div className="about-code-line">
              <span className="code-comment">// passionate about creating meaningful experiences</span>
            </div>
            <div className="about-code-line">
              <span className="code-keyword">const </span><span className="code-var">future</span><span className="code-default"> = </span><span className="code-var">present</span><span className="code-default">.</span><span className="code-method">improve</span><span className="code-default">();</span>
            </div>
          </div>
        </div>

        <div className="about-grid">
          {/* LEFT — Bio */}
          <div className="about-bio glass-card">
            {/* ── EDIT YOUR BIO HERE ── */}
            <p>
              I'm <span className="gradient-text" style={{ fontWeight: 700 }}>ABHISHEK K</span>, a passionate Full Stack Developer who loves building scalable
              web applications and exploring the intersection of software engineering
              and artificial intelligence.
            </p>
            <p>
              When I'm not coding, you'll find me contributing to open-source projects,
              solving competitive programming problems, or exploring new technologies.
            </p>
          </div>

          {/* RIGHT — Skills */}
          <div className="skills-zoom-wrap">
            <div className="about-skills-box">
              <div className="about-skills-header">
                <span className="about-skills-label">Tech Stack</span>
              </div>
              <div className="about-skills-tags">
                {skills.map((skill, i) => (
                  <span
                    key={skill}
                    className={`about-skill-pill ${i === activeSkillIndex ? 'auto-blink' : ''}`}
                    style={{ animationDelay: `${i * 0.07}s` }}
                    onMouseEnter={() => setActiveSkillIndex(i)}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
