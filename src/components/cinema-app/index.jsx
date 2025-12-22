import { useRef } from 'react'
import BackButton from './BackButton'
import CinemaAppHero from './Hero'
import ProblemGoal from './ProblemGoal'
import MarketResearch from './MarketResearch'
import UXPatterns from './UXPatterns'
import InformationArchitecture from './InformationArchitecture'
import WireframesSection from './WireframesSection'
import PrototypesSection from './PrototypesSection'

const CinemaAppDetail = () => {
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const problemGoalRef = useRef(null)
  const marketResearchRef = useRef(null)
  const uxPatternsRef = useRef(null)
  const iaRef = useRef(null)
  const wireframesRef = useRef(null)
  const prototypesRef = useRef(null)
  const mainImageRef = useRef(null)

  return (
    <div className="w-full min-h-screen bg-black text-white relative overflow-x-hidden">
      <BackButton />
      <CinemaAppHero
        titleRef={titleRef}
        subtitleRef={subtitleRef}
        mainImageRef={mainImageRef}
      />
      <ProblemGoal problemGoalRef={problemGoalRef} />
      <MarketResearch marketResearchRef={marketResearchRef} />
      <UXPatterns uxPatternsRef={uxPatternsRef} />
      <InformationArchitecture iaRef={iaRef} />
      <WireframesSection wireframesRef={wireframesRef} />
      <PrototypesSection prototypesRef={prototypesRef} />
    </div>
  )
}

export default CinemaAppDetail

