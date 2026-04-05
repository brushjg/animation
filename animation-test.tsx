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
                translateX: '-20px',
                scaleX: .4,
                scaleY: .35,
                })
            utils.set('.stem', {
                transformOrigin: 'center',
                translateY: '-130px',
                translateX: '-235px',
                })
            utils.set('.pompom', {
                transformOrigin: 'center',
                translateY: '15px',
                translateX: '90px',
                })
                utils.set('.stem path', {
                    d: 'M526.5,294C526.5,294 570.5,208 648.5,227',
                })
            animate('.eyes', {
                scaleX: [
                    { to: .41, ease: 'inOut(3)', duration:200 },
                    { to: .4, ease: (spring({bounce: .7}))}
                ],
                loop: true,
                loopDelay: 250,
            })
            const pompom = createDraggable('.pompom', {
                container: [-20, 120, 100, 0],
                containerFriction: .95,
                onDrag: (e) => {
                    const { x, y } = e
                    console.log('dragging pompom', x, y)
                    utils.set('.stem svg', {
                        viewBox: `${-235 + x} ${-130 + y} 100 100`
                    })
                },
                releaseEase: spring({bounce: .8})
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
                scaleY: !smallEyes ? .15 : .35,
                translateY: !smallEyes ? '-460px' : '-440px',
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
rescope eyes into the head so they rotate with the head
resize the pomppm handle dynamically based on where the  pomppom is dragged
look into why the import is underlined
*/