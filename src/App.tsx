import { FormEvent, useState } from 'react'
import { Billing, discount, monthsCount } from './data/billings'
import { CheckIcon } from './CheckIcon'
import { rangeInput } from './data/rangeInput'

function App() {
	const [price, setPrice] = useState(rangeInput.initialValue)
	const [billing, setBilling] = useState<Billing>('month')
	const [pageviews, setPageviews] = useState(100)

	function handleInputChanged(e: React.ChangeEvent<HTMLInputElement>) {
		const currentPrice = +e.target.value
		setPrice(currentPrice)
		setPageviews(() => {
			switch (true) {
				case currentPrice <= rangeInput.max * 0.25:
					return 50
				case currentPrice <= rangeInput.max * 0.5:
					return 100
				case currentPrice <= rangeInput.max * 0.75:
					return 250
				case currentPrice > rangeInput.max * 0.75:
					return 500
				default:
					return 100
			}
		})
	}

	function handleSubmit(e: FormEvent) {
		e.preventDefault()
		alert(`Selected price: $${price}\nSelected billing: ${billing}`)
	}

	return (
		<main className='grid min-h-screen w-full place-items-center content-start bg-mainBackground bg-background bg-[length:320%] bg-no-repeat font-Manrope lg:bg-auto'>
			<div className='mb-[130px] mt-[175px] flex flex-col items-center lg:mb-[88px] lg:mt-[102px]'>
				<img
					className='absolute top-[110px] z-0 w-[300px] lg:top-[67px] lg:w-auto'
					src='./assets/images/pattern-circles.svg'
					alt='pattern-circles'
				/>
				<h1 className='z-10 mb-4 text-[40px] font-extrabold text-darkBlue lg:mb-[10px] lg:text-[28px]'>
					Simple, traffic-based pricing
				</h1>
				<p className='z-10 w-[360px] text-center text-[28px] leading-[2.7rem] tracking-tight text-grayBlue lg:w-full lg:text-[15px] lg:leading-normal lg:tracking-normal'>
					Sign-up for our 30-day trial. No credit card required.
				</p>
			</div>
			<section className='relative z-10 mb-16 w-[88%] rounded-xl bg-white px-12 pt-[70px] shadow-lg lg:static lg:w-[540px] lg:pt-10'>
				<h2 className='fixed scale-0'>Trial settings</h2>
				<form onSubmit={handleSubmit}>
					<div className='mb-[64px] flex flex-col items-center gap-y-[175px] lg:mb-[25px] lg:flex-row lg:gap-y-0'>
						<span className='-ml-1 text-2xl font-extrabold uppercase leading-tight tracking-[0.22rem] text-grayBlue lg:min-w-fit lg:text-[14px] lg:tracking-[0.125rem]'>
							{pageviews}k pageviews
						</span>
						<div className='flex w-full items-center justify-center gap-x-3 lg:gap-x-0'>
							<span className='text-[64px] font-extrabold tracking-tight text-darkBlue lg:ml-auto lg:text-[40px]'>
								${(price * monthsCount[billing]).toFixed(2)}
							</span>
							<small className='ml-2 text-[28px] text-grayBlue lg:text-base'>/ {billing}</small>
						</div>
					</div>
					<label htmlFor='range-input' />
					<input
						id='range-input'
						className='range-input absolute top-[182px] mb-[57px] w-[calc(100%-6rem)] lg:static lg:w-full'
						type='range'
						value={price}
						step={rangeInput.step}
						min={rangeInput.min}
						max={rangeInput.max}
						onChange={handleInputChanged}
						style={{
							background: `linear-gradient(to right, hsl(var(--light-cyan)) ${
								((price - rangeInput.min) * 100) / (rangeInput.max - rangeInput.min)
							}%, hsl(var(--light-gray)) 0`
						}}
					/>
					<div className='mb-20 flex lg:mb-10'>
						<label
							htmlFor='billing-toggle'
							className='ml-16 flex items-center justify-center text-2xl lg:ml-[105px] lg:text-[12px] lg:leading-normal'
						>
							<span className='mr-7 min-w-fit cursor-pointer text-grayBlue lg:mr-4 lg:w-auto'>Monthly Billing</span>
							<input
								id='billing-toggle'
								type='checkbox'
								className='peer flex h-[44px] w-[84px] cursor-pointer appearance-none items-center rounded-full bg-lightGrayBlue transition checked:bg-strongCyan hover:bg-lightCyan checked:hover:bg-strongCyan lg:h-[22px] lg:w-11'
								onClick={() => setBilling(prev => (prev === 'month' ? 'year' : 'month'))}
							/>
							<span className='relative h-7 w-7 transition before:absolute before:left-[-76px] before:h-7 before:w-7 before:cursor-pointer before:rounded-full before:bg-white peer-checked:translate-x-10 lg:h-[14px] lg:w-[14px] before:lg:-left-10 before:lg:h-[14px] before:lg:w-[14px] peer-checked:lg:translate-x-[22px]'></span>
							<span className='min-w-fit cursor-pointer text-grayBlue lg:w-auto'>Yearly Billing</span>
						</label>
						<div className='ml-4 flex items-center rounded-full bg-lightRed px-2 py-1 text-xl text-darkRed lg:ml-2 lg:px-[7px] lg:py-[1px] lg:text-[10px] lg:leading-normal'>
							<span className='block lg:hidden'>-</span>
							<span className='mr-1'>{discount}%</span>
							<span className='hidden lg:block'>discount</span>
						</div>
					</div>
					<hr className='-ml-12 mb-11 w-[calc(100%+6rem)] lg:mb-8' />
					<div className='mb-16 flex flex-col items-center justify-between lg:mb-8 lg:flex-row'>
						<ul className='-ml-1 mb-16 space-y-6 text-center text-2xl text-grayBlue lg:mb-0 lg:ml-0 lg:space-y-[9px] lg:text-start lg:text-[12px] lg:leading-normal'>
							<li>
								<CheckIcon />
								<span>Unlimited websites</span>
							</li>
							<li>
								<CheckIcon />
								<span>100% data ownership</span>
							</li>
							<li>
								<CheckIcon />
								<span>Email reports</span>
							</li>
						</ul>
						<button
							type='submit'
							className='mr-2 rounded-full bg-darkBlue px-24 py-5 text-[26px] text-paleBlue transition hover:text-white lg:-mr-1 lg:px-12 lg:py-3 lg:text-[12px]'
						>
							Start my trial
						</button>
					</div>
				</form>
			</section>
		</main>
	)
}

export default App
