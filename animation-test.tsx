import anime, { animate, createScope, spring, createDraggable, utils, waapi } from 'animejs'
import { useEffect, useState, useRef } from 'react'
import RobotHead from './SVGexport/RobotHead3.svg?react'
import RobotEyes from './SVGexport/Robothead-eyes.svg?react'
import './styles.scss'

export default function AnimationPage() {
    const scope = useRef<anime | null>(null)
    const eyeRoot = useRef(null)
    const [rotations, setRotations] = useState(0)
    const [ smallEyes, setSmallEyes ] = useState(false)

    useEffect(()=> {
        scope.current = createScope({eyeRoot }).add( self => {
             utils.set('.eyes', {
                transformOrigin: 'center',
                translateY: '-440px',
                scale: .5,
                })
            animate('.eyes', {
                scale: [
                    { to: .51, ease: 'inOut(3)', duration:200 },
                    { to: .5, ease: (spring({bounce: .7}))}
                ],
                loop: true,
                loopDelay: 250,
            })
            createDraggable('.pompom', {
                container: [-20, 50, 100, 0],
                containerFriction: 1,
                releaseEase: spring({bounce: .7})
            })
            self.add('rotateHead', (i)=> {
                console.log('rotating logo', i)
                console.log(self)
                animate('.logo', {
                    rotate: i * 360,
                    ease: 'out(4)',
                    duration: 1500,
                })
            })
            self.add('blinkEyes', (smallEyes) => {
            animate('.eyes', {
                scaleY: !smallEyes ? .25 : 1,
                scaleX: !smallEyes ? .75 : 1,
                duration: 1000,
                ease: 'inOut(6)',
            })
             })
        })
        return () => scope.current.revert()
    }, [])

    const handleClick = () => {
        const newRotations = rotations + 1
        scope.current.methods.rotateHead(newRotations)
        setRotations(newRotations)
    }

    const handleEyes = () => {
        console.log('animating eyes')
        scope.current.methods.blinkEyes(smallEyes)
        setSmallEyes(!smallEyes)
    }
    
    return (
        <div ref={eyeRoot} className="animations">
            <div className="svg-wrapper" >
                <RobotHead className='logo' />
                <RobotEyes className='eyes' /> 
            </div>

            <div className='button row'>
                <button onClick={handleClick}>
                    rotations: {rotations}
                </button>
                <button onClick={handleEyes}>
                    eyes: {!smallEyes ? 'open' : 'closed'}
                </button>
            </div>
        </div>
    )
}

//TODO
/*
dials for animating eyes
switch eye tracking to mouse position, pulsing is triggered manually
do we really need multiple roots
rescope them into the head so they move with the head
cleanup code, cleanup SCSS
make the pom-pom waggle somehow.
*/