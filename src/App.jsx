import { useEffect, useRef, useState } from 'react'
import './App.css'

function useScrollReveal(ref, options = {}) {
  useEffect(() => {
    const node = ref.current
    if (!node) return
    node.classList.remove('reveal-active')
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('reveal-active')
          observer.disconnect()
        }
      },
      { threshold: 0.18, ...options }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [ref, options])
}

function useParallax(ref, speed = 0.3) {
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const handleScroll = () => {
      const y = window.scrollY
      node.style.transform = `translateY(${y * speed}px)`
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [ref, speed])
}

function App() {
  const mountRef = useRef(null)

  useEffect(() => {
    if (!mountRef.current) return;
    console.log('mountRef.current size:', mountRef.current.clientWidth, mountRef.current.clientHeight);

    const width = mountRef.current.clientWidth
    const height = mountRef.current.clientHeight

    // レスポンシブ対応
    const handleResize = () => {
      const width = mountRef.current.clientWidth
      const height = mountRef.current.clientHeight
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])

  const aboutRef = useRef(null)
  const infoRef = useRef(null)
  const membersRef = useRef(null)
  const contactRef = useRef(null)
  useScrollReveal(aboutRef)
  useScrollReveal(infoRef, { threshold: 0.22 })
  useScrollReveal(membersRef, { threshold: 0.22 })
  useScrollReveal(contactRef, { threshold: 0.22 })

  // パララックス用ref
  const heroRef = useRef(null)
  useParallax(heroRef, 0.25)

  // 背景画像の切り替え
  const [bgClass, setBgClass] = useState('')
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY
      const h1 = document.getElementById('about-section')?.offsetTop || 400
      const h2 = document.getElementById('info-section')?.offsetTop || 900
      const h3 = document.getElementById('members-section')?.offsetTop || 1400
      if (scrollY < h2 - 200) {
        setBgClass('') // team1.png
      } else if (scrollY < h3 - 200) {
        setBgClass('bg2') // action1.png
      } else {
        setBgClass('bg3') // member1.png
      }
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="container">
      <div className={`parallax-bg ${bgClass}`} />
      {/* ヒーローセクション */}
      <header className="hero" ref={heroRef}>
        <img src="/logo.jpg" alt="JAISTロゴ" className="jaist-logo" />
        <h1 className="title">JAISAL</h1>
        <p className="subtitle">JAISTフットサルサークルOBによる社会人フットサルチーム</p>
        <a href="#contact" className="cta-btn">お問い合わせ・参加希望はこちら</a>
      </header>
      {/* チーム紹介 */}
      <section className="section-card reveal" ref={aboutRef} id="about-section">
        <div className="section-img"><img src="/team1.png" alt="チーム集合写真" /></div>
        <h2>チーム紹介</h2>
        <p>
          jaisal（ジャイサル）は、北陸先端科学技術大学院大学（JAIST）のフットサルサークルOBを中心に結成された社会人フットサルチームです。<br />
          東京・神奈川を拠点に、楽しく・真剣にフットサルを楽しんでいます。
        </p>
      </section>
      {/* 活動情報 */}
      <section className="section-card reveal" ref={infoRef} id="info-section">
        <div className="section-img"><img src="/action1.png" alt="プレー写真" /></div>
        <h2>活動情報</h2>
        <ul>
          <li>活動拠点：東京都・神奈川県</li>
          <li>活動頻度：月1～2回</li>
          <li>メンバー：20代～30代の社会人・大学院OB</li>
        </ul>
      </section>
      {/* メンバー紹介（ダミー） */}
      <section className="section-card reveal" ref={membersRef} id="members-section">
        <div className="section-img"><img src="/member1.png" alt="メンバー写真" /></div>
        <h2>メンバー</h2>
        <div className="members">
          <div className="member-card">
            <div className="avatar" style={{background:'#4fd1c5'}}>A</div>
            <div className="member-info">
              <div className="member-name">山田 太郎</div>
              <div className="member-role">キャプテン / FP</div>
            </div>
          </div>
          <div className="member-card">
            <div className="avatar" style={{background:'#1e3c72'}}>B</div>
            <div className="member-info">
              <div className="member-name">佐藤 花子</div>
              <div className="member-role">GK</div>
            </div>
          </div>
        </div>
      </section>
      {/* お問い合わせ */}
      <section className="section-card reveal" id="contact" ref={contactRef}>
        <h2>お問い合わせ</h2>
        <p>メンバー・対戦相手募集中！<br />
        <a href="mailto:jaisal.futsal@gmail.com">jaisal.futsal@gmail.com</a> までご連絡ください。</p>
      </section>
      <footer className="footer">© 2025 JAISAL</footer>
    </div>
  )
}

export default App
