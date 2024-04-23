'use client'

import { useEffect } from "react"

// icons
import { IoSnowOutline } from "react-icons/io5"
import { renderToStaticMarkup } from 'react-dom/server'


export function BackgroundSnow() {

	const setRandomInterval = (intervalFunction, minDelay, maxDelay) => {
		let timeout

		const runInterval = () => {
			const timeoutFunction = () => {
				intervalFunction()
				runInterval()
			}

			const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay

			timeout = setTimeout(timeoutFunction, delay)
		}

		runInterval()

		return {
			clear() { clearTimeout(timeout) },
		}
	}

	// add a snow flake to the screen
	const snow = () => {
		const snowflake = document.createElement("div")
		snowflake.innerHTML = renderToStaticMarkup(<IoSnowOutline className="text-white w-full h-full self-center linear" />)
		const duration = Math.floor((10 + (Math.random() * 20)) * 1000).toString()
		const size = Math.floor(5 + Math.random() * 10).toString() // size 5 - 15
		const opacity = Math.floor(0 + Math.random() * 50).toString() // opacity 25 - 75

		snowflake.style.transitionDuration = duration + "ms"
		snowflake.style.width = size + "px"
		snowflake.style.height = size + "px"
		snowflake.style.opacity = opacity + "%"

		console.log(duration)
		snowflake.classList.add("absolute", "z-50", "flex", "justify-center", "self-center", "ease-linear", "transform", "rotate-0", "animate-snowflake")
		snowflake.style.top = "0px"
		const left = Math.floor(Math.random() * 100)
		snowflake.style.left = left + "%"

		document.getElementById("container").appendChild(snowflake)

		setTimeout(() => {
			snowflake.style.top = "100%"
			snowflake.style.left = left - 8 + "%"
		}, 100)

		setTimeout(() => {
			snowflake.remove()
		}, duration)
	}

	useEffect(() => {
		console.log('i fire once')
		
		const result = setRandomInterval(() => snow(), 100, 500)
	}, [])

	return (
		<div id="container" className="absolute w-full h-full bg-blue-950 overflow-hidden" >

		</div>
	)
}