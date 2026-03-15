import anime, { animate, createScope, spring, createDraggable, utils, waapi } from 'animejs'
import { useEffect, useState, useRef } from 'react'
import RobotHead from './SVGexport/RobotHead2.svg?react'
import RobotEyes from './SVGexport/Robothead-eyes.svg?react'
import './styles.scss'

export default function AnimationPage() {
    const root = useRef(null)
    const scope = useRef<anime | null>(null)
    const eyeRoot = useRef(null)
    const [rotations, setRotations] = useState(0)
    const squares = eyeRoot

    useEffect(()=> {
        const eyeSelector = document.querySelector('.eyes')
        console.log(eyeRoot.current)
        console.log(squares)
        let setter
        setter = utils.set(squares, {
                transformOrigin: 'center',
                translateY: '-400px',
                })
        scope.current = createScope({eyeRoot }).add( self => {
             utils.set('.eyes', {
                transformOrigin: 'center',
                translateY: '-400px',
                scale: .5,
                })

            animate('.eyes', {
                scale: [
                    { to: .75, ease: 'inOut(3)', duration:200 },
                    { to: .5, ease: (spring({bounce: .7}))}
                ],
                loop: true,
                loopDelay: 250,
            })
            createDraggable('.logo', {
                container: [0,0,0,0],
                releaseEase: spring({bounce: .7})
            })
            self.add('rotateLogo', (i)=> {
                console.log('rotating logo')
                console.log(self)
                animate('.logo', {
                    rotate: i * 360,
                    ease: 'out(4)',
                    duration: 1500,
                })
            })
        })
        return () => scope.current.revert()
    }, [])

    const handleClick = () => {
        const newRotations = rotations + 1
        scope.current.methods.rotateLogo(newRotations)
        setRotations(newRotations)
    }

    const handleEyes = () => {
        console.log('animating eyes')
        console.log(document.querySelector('.eyes'))
        waapi.animate('.eyes', {
            scaleY: .25,
            scaleX: .75,
            duration: 1000,
            direction: 'alternate',
            ease: 'inOut(6)',
            translateY: '-1200px',
        })
    }
    return (
        <div ref={root} className="animations">
            <div className="svg-wrapper" >
                <RobotHead className='logo' />  
            </div>
                <RobotEyes className='eyes' ref={eyeRoot} />
            <div className='medium row'>
            <button onClick={handleClick}>
                rotations: {rotations}
            </button>
            <button onClick={handleEyes}>
                eyes: {rotations}
            </button>
            </div>

        </div>
    )
}

//TODO
/*
//Eyes need to be centered, otherwise the scaling breaks
dials for animating eyes
pom-pom is dragable, spring follows along and is dynamic based on distrance from the top of head.
*/