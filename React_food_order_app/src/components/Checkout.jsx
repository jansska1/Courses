import { useContext } from 'react'
import UserProgressContext from '../store/UserProgressContext.jsx'
import useHttp from '../hooks/useHttp.js'
import CartContext from '../store/CartContext.jsx'
import Error from './Error.jsx'
import Modal from './UI/Modal.jsx'
import Button from './UI/Button.jsx'
import { currencyFormatter } from '../util/formatting.js'

const requestConfig = {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
}

export default function Checkout() {
	const cartCtx = useContext(CartContext)
	const userProgressCtx = useContext(UserProgressContext)

	const {
		data,
		isLoading: isSending,
		error,
		sendRequest,
		clearData,
	} = useHttp('http://localhost:3000/orders', requestConfig)

	const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0)

	function handleHideCheckout() {
		userProgressCtx.hideCheckout()
	}

	function handleFinish() {
		userProgressCtx.hideCheckout()
		cartCtx.clearCart()
		clearData()
	}

	function handleSubmit(e) {
		e.preventDefault()
		const fd = new FormData(e.target)
		const data = Object.fromEntries(fd.entries())

		sendRequest(
			JSON.stringify({
				order: {
					items: cartCtx.items,
					customer: data,
				},
			})
		)
	}

	let actions = (
		<>
			<Button
				type='button'
				onClick={handleHideCheckout}
				textOnly>
				Close
			</Button>
			<Button>Submit Order</Button>
		</>
	)

	if (isSending) {
		actions = <span>Sending user data...</span>
	}

	if (data && !error) {
		return (
			<Modal
				open={userProgressCtx.progress === 'checkout'}
				onClose={handleFinish}>
				<h2>Success!</h2>
				<p>Your order was submitted successfully.</p>
				<p>We will get back to you with more details via email within the next few minutes.</p>
				<p className='modal-actions'>
					<Button onClick={handleFinish}>Okay</Button>
				</p>
			</Modal>
		)
	}

	return (
		<Modal
			open={userProgressCtx.progress === 'checkout'}
			onClose={handleHideCheckout}>
			<form onSubmit={handleSubmit}>
				<h2>Checkout</h2>
				<p>Total amount: {currencyFormatter.format(cartTotal)}</p>
				<div className='control'>
					<label htmlFor='full-name'>Full Name</label>
					<input
						id='full-name'
						type='text'
						name='full-name'
					/>
				</div>
				<div className='control'>
					<label htmlFor='email'>E-mail Address</label>
					<input
						id='email'
						type='email'
						name='email'
					/>
				</div>
				<div className='control'>
					<label htmlFor='street'>Street</label>
					<input
						id='street'
						type='text'
						name='street'
					/>
				</div>
				<div className='control-row'>
					<div className='control'>
						<label htmlFor='postal-code'>Postal Code</label>
						<input
							id='postal-code'
							type='text'
							name='postal-code'
							pattern='\d{2}-\d{3}'
							required
						/>
					</div>
					<div className='control'>
						<label htmlFor='city'>City</label>
						<input
							id='city'
							type='text'
							name='city'
						/>
					</div>
				</div>

				{error && (
					<Error
						title='Failed to submit order'
						message={error}
					/>
				)}

				<p className='modal-actions'>{actions}</p>
			</form>
		</Modal>
	)
}
