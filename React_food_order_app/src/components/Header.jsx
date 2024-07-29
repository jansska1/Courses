import { useContext } from 'react'
import CartContext from '../store/CartContext'
import Button from './UI/Button'
import UserProgressContext from '../store/UserProgressContext'

export default function Header({ src, alt }) {
	const cartCtx = useContext(CartContext)
	const userProgressCtx = useContext(UserProgressContext)
	const cartQuantity = cartCtx.items.length

	function handleShowCart() {
		userProgressCtx.showCart()
	}

	return (
		<>
			<header id='main-header'>
				<div id='title'>
					<img
						src={src}
						alt={alt}
					/>
					<h1>reactfood</h1>
				</div>
				<p>
					<Button
						textOnly
						onClick={handleShowCart}>
						Cart ({cartQuantity})
					</Button>
				</p>
			</header>
		</>
	)
}
