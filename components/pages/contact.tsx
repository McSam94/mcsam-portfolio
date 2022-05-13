import * as React from 'react'
import cn from 'classnames'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import useTranslation from 'next-translate/useTranslation'
import emailjs from '@emailjs/browser'

const ReCAPTCHA = dynamic(() => import('react-google-recaptcha'))

const Contact: React.FC = () => {
	const { t } = useTranslation('contact')
	const { theme } = useTheme()

	const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false)
	const [errorMessage, setErrorMessage] = React.useState<string>('')
	const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false)

	const recaptchaTheme = React.useMemo(
		() => (theme === 'system' ? 'light' : theme),
		[theme]
	)

	const contactSchema = React.useMemo(
		() =>
			yup.object().shape({
				name: yup.string().required(t('validation.name')),
				email: yup
					.string()
					.email(t('validation.emailFormat'))
					.required(t('validation.email')),
				message: yup.string().required(t('validation.message')),
				recaptcha: yup.string().required(t('validation.recaptcha')),
			}),
		[t]
	)

	const {
		control,
		handleSubmit,
		register,
		formState: { errors, isValid },
	} = useForm({
		mode: 'onChange',
		resolver: yupResolver(contactSchema),
	})

	const onSend = React.useCallback(async data => {
		setIsSubmitting(true)
		emailjs
			.send(
				'default_service',
				process.env.EMAILJS_TEMPLATE_ID ?? '',
				{ ...data, 'g-recaptcha-response': data.recaptcha },
				process.env.EMAILJS_USERID
			)
			.then(
				() => {
					setErrorMessage('')
					setIsSubmitted(true)
				},
				() => {
					setErrorMessage('Something went wrong. Please try again later.')
				}
			)
			.finally(() => {
				setIsSubmitting(false)
			})
	}, [])

	return (
		<div id="contact" className="w-full h-auto flex justify-center py-20">
			<div className="w-full lg:w-[85vw] max-w-[100rem] flex flex-col items-center py-10 px-10 lg:px-0">
				<div className="text-5xl font-bold text-slate-500 dark:text-white text-center pb-10">
					{t('title')}
				</div>
				{errorMessage ? (
					<div className="p-4 rounded-lg bg-red-700 w-full my-4 text-white flex flex-row justify-between">
						<div className="flex flex-row space-x-4">
							<span className="material-icons text-white">error</span>
							<span>{errorMessage}</span>
						</div>
						<span
							role="button"
							tabIndex={0}
							className="material-icons cursor-pointer"
							onClick={() => setErrorMessage('')}
							onKeyDown={() => setErrorMessage('')}
						>
							close
						</span>
					</div>
				) : null}
				{isSubmitted ? (
					<div className="p-4 rounded-lg bg-green-700 w-full my-4 text-white flex flex-row justify-between">
						<div className="flex flex-row space-x-4">
							<span className="material-icons text-white">check_circle</span>
							<span>{t('success')}</span>
						</div>
						<span
							role="button"
							tabIndex={0}
							className="material-icons cursor-pointer"
							onClick={() => setIsSubmitted(false)}
							onKeyDown={() => setErrorMessage('')}
						>
							close
						</span>
					</div>
				) : null}
				<form
					className="flex flex-col space-y-8 w-full h-full items-center"
					onSubmit={handleSubmit(onSend)}
				>
					<div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 justify-between w-full">
						<input
							className={cn(
								'p-4 border dark:border-gray-500 rounded-lg basis-1/2',
								{
									'border-red-400': !!errors.name,
								}
							)}
							placeholder="Name"
							{...register('name')}
						/>
						<input
							className={cn(
								'p-4 border dark:border-gray-500 rounded-lg basis-1/2',
								{
									'border-red-400': !!errors.email,
								}
							)}
							placeholder="Email"
							{...register('email')}
						/>
					</div>
					<textarea
						className={cn('p-4 border dark:border-gray-500 rounded-lg w-full', {
							'border-red-400': !!errors.message,
						})}
						rows={10}
						placeholder="Message"
						{...register('message')}
					/>
					<Controller
						key={theme}
						name="recaptcha"
						control={control}
						render={({ field: { onChange } }) => (
							<ReCAPTCHA
								className="flex justify-center"
								size="normal"
								sitekey={process.env.RECAPTCHA_SITE_KEY ?? ''}
								theme={recaptchaTheme}
								onChange={onChange}
							/>
						)}
					/>
					<button
						type="submit"
						disabled={!isValid || isSubmitting}
						className={cn(
							'py-4 bg-orange-600 rounded-lg text-white disabled:bg-orange-100 d dark:disabled:bg-gray-100 disabled:text-gray-300 w-full',
							{
								'cursor-not-allowed': !isValid,
							}
						)}
					>
						{t('send')}
					</button>
				</form>
			</div>
		</div>
	)
}

export default Contact
