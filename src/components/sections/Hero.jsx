import React, { useEffect } from 'react'
import gsap from 'gsap'

const Hero = ({ loading }) => {
    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl
    }, [loading])
    return (
        <></>
    )
}

export default Hero