import { useContext } from 'react'
import CartContext from '../store/CartContext'
import { currencyFormatter } from '../util/formatting'
import Modal from './UI/Modal.jsx'
import Button from './UI/Button'
import UserProgressContext from '../store/UserProgressContext'

export default function Cart() {
	const cartCtx = useContext(CartContext)
	const userProgressCtx = useContext(UserProgressContext)
	const totalPrice = cartCtx.items.reduce((acc, items) => acc + items.quantity * items.price, 0)

	function handleHideCart() {
		userProgressCtx.hideCart()
	}

	function handleShowCheckout() {
		userProgressCtx.showCheckout()
	}

	return (
		<Modal
			className='cart'
			open={userProgressCtx.progress === 'cart'}
			onClose={userProgressCtx.progress === 'cart' ? handleHideCart : null}>
			<h2>Your Cart</h2>
			{cartCtx.items.length === 0 && <p>No items in cart!</p>}
			{cartCtx.items.length > 0 && (
				<ul>
					{cartCtx.items.map(item => {
						return (
							<li
								className='cart-item'
								key={item.id}>
								<div>
									<span>{item.name}</span>
									<span> ({currencyFormatter.format(item.price)})</span>
								</div>
								<div className='cart-item-actions'>
									<button onClick={() => cartCtx.updateItemQuantity(item.id, -1)}>-</button>
									<span>{item.quantity}</span>
									<button onClick={() => cartCtx.updateItemQuantity(item.id, 1)}>+</button>
								</div>
							</li>
						)
					})}
				</ul>
			)}
			<p className='cart-total'>Cart Total: {currencyFormatter.format(totalPrice)}</p>
			<p className='modal-actions'>
				<Button
					textOnly
					onClick={handleHideCart}>
					Close
				</Button>
				{cartCtx.items.length > 0 && <Button onClick={handleShowCheckout}>Go to Checkout</Button>}
			</p>
		</Modal>
	)
}
