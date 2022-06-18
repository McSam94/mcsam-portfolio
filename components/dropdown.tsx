import * as React from 'react'
import cn from 'classnames'
import useWindowEffect from '@/hooks/useWindowEffect'

export interface Option {
	label: string
	value: string
	[x: string]: string
}

interface DropdownProps {
	className?: string
	options: Array<Option>
	placeholder?: string
	defaultValue?: string
	onSelect?: (value: string) => void
	renderSelected?: (option: Option) => React.ReactNode
	renderOption?: (option: Option) => React.ReactNode
}

const Dropdown: React.FC<DropdownProps> = ({
	className,
	options,
	placeholder,
	defaultValue,
	onSelect,
	renderSelected,
	renderOption,
}) => {
	const dropdownRef = React.useRef<HTMLDivElement>(null)
	const optionsRef = React.useRef<HTMLDivElement>(null)

	const [value, setValue] = React.useState(defaultValue ?? options[0]?.value)
	const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)
	const [shouldAlignLeft, setShouldAlignLeft] = React.useState(false)

	const selectedOption = React.useMemo(
		() => options.find(option => option.value === value),
		[options, value]
	)

	const onDropdownClick = React.useCallback(
		() => setIsDropdownOpen(prevState => !prevState),
		[]
	)

	const onOptionSelect = React.useCallback(
		selectedValue => {
			setValue(selectedValue)
			onSelect?.(selectedValue)
			setIsDropdownOpen(false)
		},
		[onSelect]
	)

	const listenClickOutsideCb = React.useCallback(ev => {
		const path = ev?.path ?? ev.composedPath?.()

		if (
			!dropdownRef.current?.contains(ev.target) &&
			!optionsRef.current?.contains(path?.[0])
		) {
			setIsDropdownOpen(false)
		}
	}, [])

	React.useEffect(() => {
		if (isDropdownOpen)
			document.addEventListener('mousedown', listenClickOutsideCb)
		else document.removeEventListener('mousedown', listenClickOutsideCb)
	}, [isDropdownOpen, listenClickOutsideCb])

	useWindowEffect(() => {
		const dropdownClientRect = optionsRef.current?.getBoundingClientRect()

		if (!dropdownClientRect) return

		const { right, width } = dropdownClientRect

		if (right + width >= window.innerWidth) setShouldAlignLeft(true)
	}, [isDropdownOpen])

	return (
		<div className="relative">
			<div
				role="button"
				tabIndex={0}
				ref={dropdownRef}
				className={cn(
					'px-4 py-2 border rounded-lg flex flex-row items-center cursor-pointer',
					className
				)}
				onClick={onDropdownClick}
				onKeyDown={onDropdownClick}
			>
				{selectedOption ? (
					renderSelected?.(selectedOption) ?? (
						<span>{selectedOption?.label}</span>
					)
				) : (
					<span>{placeholder}</span>
				)}
				<span
					className={cn('material-icons transition-transform', {
						'rotate-180': isDropdownOpen,
					})}
				>
					keyboard_arrow_down
				</span>
			</div>
			<div
				ref={optionsRef}
				className={cn(
					'w-auto bg-white dark:bg-gray-900 rounded-lg shadow-sm absolute',
					{
						'right-0': shouldAlignLeft,
						hidden: !isDropdownOpen,
						absolute: isDropdownOpen,
					}
				)}
			>
				{options.map(option => (
					<div
						role="button"
						tabIndex={0}
						key={option.value}
						className="py-2 px-4 text-lg cursor-pointer rounded-lg hover:bg-gray-200 hover:dark:bg-gray-500"
						onClick={() => onOptionSelect(option.value)}
						onKeyDown={() => onOptionSelect(option.value)}
					>
						{renderOption?.(option) ?? option.label}
					</div>
				))}
			</div>
		</div>
	)
}

export default Dropdown
