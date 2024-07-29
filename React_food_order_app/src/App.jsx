import Header from './components/Header'
import Products from './components/Products'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import { CartContextProvider } from './store/CartContext'
import { UserProgressContextProvider } from './store/UserProgressContext'

function App() {
	return (
		<CartContextProvider>
			<UserProgressContextProvider>
				<Header
					src='../src/assets/logo.jpg'
					alt='dinner'
				/>
				<Products />
				<Cart />
				<Checkout />
			</UserProgressContextProvider>
		</CartContextProvider>
	)
}

export default App
