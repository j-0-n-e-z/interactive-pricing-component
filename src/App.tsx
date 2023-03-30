import { useState } from 'react'
import './App.css'
import iconCheck from './assets/images/icon-check.svg'
import backgroundPattern from './assets/images/bg-pattern.svg'
import patternCircles from './assets/images/pattern-circles.svg'
import { Billing, discount, monthsCount } from './data/billings'
import { switcherCircleStyles, switcherStyles } from './data/additionalStyles'

const rangeInput = {
	min: 1,
	max: 32,
	step: 0.25,
	defaultValue: 16
} as const

function App() {
	const [price, setPrice] = useState<number>(rangeInput.defaultValue)
	const [billing, setBilling] = useState<Billing>('month')
	const [pageviews, setPageviews] = useState(100)

	const checkIcon = (
		<img className='inline-block mr-4' src={iconCheck} alt='check' />
	)

	return (
		<div className='bg-mainBackground w-full h-screen grid content-start place-items-center'>
			<img
				className='absolute top-0 z-0'
				src={backgroundPattern}
				alt='bg-pattern'
			/>
			<img
				className='absolute top-7 z-0 scale-125'
				src={patternCircles}
				alt='bg-pattern'
			/>
			<header className='flex flex-col items-center mt-16 mb-20 z-10'>
				<h1 className='text-4xl font-extrabold text-darkBlue mb-4'>
					Simple, traffic-based pricing
				</h1>
				<p className='text-grayBlue text-xl'>
					Sign-up for our 30-day trial. No credit card required.
				</p>
			</header>
			<div className='w-[700px] p-12 bg-white rounded-xl shadow-lg z-10'>
				<div className='flex items-center mb-12'>
					<div className='text-grayBlue uppercase text-xl tracking-widest leading-tight font-extrabold'>
						{pageviews}k pageviews
					</div>
					<div className='text-darkBlue text-[50px] font-extrabold ml-auto'>
						${(price * monthsCount[billing]).toFixed(2)}
					</div>
					<small className='text-grayBlue text-xl ml-2'>/ {billing}</small>
				</div>

				<input
					className='range-input w-full mb-16'
					type='range'
					value={price}
					step={rangeInput.step}
					min={rangeInput.min}
					max={rangeInput.max}
					onChange={e => {
						setPrice(+e.target.value)
						setPageviews(() => {
							if (price <= rangeInput.max * (1 / 4)) return 50
							else if (price <= rangeInput.max / 2) return 100
							else if (price <= rangeInput.max * (3 / 4)) return 250
							return 500
						})
					}}
					style={{
						background: `linear-gradient(to right, hsl(var(--light-cyan)) ${
							((price - rangeInput.min) * 100) /
							(rangeInput.max - rangeInput.min)
						}%, hsl(var(--light-gray)) 0`
					}}
				/>

				<div className='flex mb-12 gap-5 justify-center items-center'>
					<p
						className='text-grayBlue cursor-pointer'
						onClick={() => setBilling('month')}
					>
						Monthly Billing
					</p>
					<div
						className={`cursor-pointer rounded-full w-12 h-6 flex items-center transition ${switcherStyles[billing]}`}
						onClick={() =>
							setBilling(prev => (prev === 'month' ? 'year' : 'month'))
						}
					>
						<div
							className={`w-4 h-4 bg-white rounded-full ml-1 transition ${switcherCircleStyles[billing]}`}
						></div>
					</div>
					<div className='flex relative items-center'>
						<p
							className='text-grayBlue cursor-pointer'
							onClick={() => setBilling('year')}
						>
							Yearly Billing
						</p>
						<div className='absolute -right-32 rounded-full bg-lightRed text-darkRed px-3 py-1 text-sm'>
							{discount}% discount
						</div>
					</div>
				</div>
				<hr className='mb-12' />
				<div className='flex justify-between items-center'>
					<ul className='text-grayBlue space-y-2'>
						<li>{checkIcon}Unlimited websites</li>
						<li>{checkIcon}100% data ownership</li>
						<li>{checkIcon}Email reports</li>
					</ul>
					<button className='rounded-full px-16 h-12 bg-darkBlue text-paleBlue hover:text-white transition'>
						Start my trial
					</button>
				</div>
			</div>
		</div>
	)
}

export default App
