'use client'

// todo
// when dissapears do a splash effect
// 

import { useEffect } from "react"

// icons
import { IoWaterOutline } from "react-icons/io5";
import { Cloud } from "./Cloud";


import { renderToStaticMarkup } from 'react-dom/server'


export function BackgroundRain() {

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
		snowflake.innerHTML = renderToStaticMarkup(<IoWaterOutline className="text-white w-full h-full self-center linear" />)

		const duration = Math.floor((1 + (Math.random() * 2)) * 500).toString()
		const size = Math.floor(5 + Math.random() * 10).toString() // size 5 - 15
		const opacity = Math.floor(30 + Math.random() * 30).toString() // opacity 30 - 80

		snowflake.style.transitionDuration = duration + "ms"
		snowflake.style.width = size + "px"
		snowflake.style.height = size + "px"
		snowflake.style.opacity = opacity + "%"

		snowflake.classList.add("absolute", "z-50", "flex", "justify-center", "self-center", "ease-linear", "transform", "rotate-0")
		snowflake.style.top = "-20px"
		const left = Math.floor(Math.random() * 100)
		snowflake.style.left = left + "%"

		document.getElementById("container").appendChild(snowflake)

		setTimeout(() => {
			snowflake.style.top = "120%"
			snowflake.style.left = left - 8 + "%"
		}, 100)

		setTimeout(() => {
			snowflake.remove()
		}, duration)
	}

	const cloud = () => {
		const cloud = document.createElement("div")
		cloud.innerHTML = renderToStaticMarkup(<Cloud />)

		const duration = Math.floor((60 + (Math.random() * 10)) * 1000).toString()
		const opacity = Math.floor(30 + Math.random() * 30).toString() // opacity 30 - 80

		cloud.style.transitionDuration = duration + "ms"
		cloud.style.opacity = opacity + "%"

		cloud.classList.add("absolute", "z-50", "flex", "justify-center", "self-center", "ease-linear", "transform", "rotate-0")
		cloud.style.left = "-500px"
		const top = Math.floor(60 + Math.random() * 40)
		cloud.style.bottom = top + "%"

		document.getElementById("container").appendChild(cloud)

		setTimeout(() => {
			cloud.style.left = "250%"
		}, 100)

		setTimeout(() => {
			cloud.remove()
		}, duration)

	}

	useEffect(() => {
		console.log('i fire once')
		
		const result = setRandomInterval(() => snow(), 100, 300)
		const cloudResult = setRandomInterval(() => cloud(), 1000, 5000)
	}, [])

	return (
		<div id="container" className="absolute w-full h-full bg-gray-700 overflow-hidden" >

		</div>
	)
}