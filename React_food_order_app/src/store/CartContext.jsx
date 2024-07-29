import { createContext, useReducer } from 'react'

const CartContext = createContext({
	items: [],
	addItemToCart: () => {},
	updateItemQuantity: () => {},
	clearCart: () => {},
})

function shoppingCartReducer(state, action) {
	if (action.type === 'ADD_ITEM') {
		const updatedItems = [...state.items]
		const existingCartItemIndex = updatedItems.findIndex(item => item.id === action.item.id)
		const existingCartItem = updatedItems[existingCartItemIndex]

		if (existingCartItem) {
			const updatedItem = {
				...existingCartItem,
				quantity: existingCartItem.quantity + 1,
			}
			updatedItems[existingCartItemIndex] = updatedItem
		} else {
			// const product = state.items.find(item => item.id === item.action.id)
			updatedItems.push({
				...action.item,
				quantity: 1,
			})
			// console.log(product)
		}
		return {
			...state,
			items: updatedItems,
		}
	}

	if (action.type === 'UPDATE_ITEM') {
		const updatedItems = [...state.items]
		const updatedItemIndex = updatedItems.findIndex(item => item.id === action.productId)

		const updatedItem = {
			...updatedItems[updatedItemIndex],
		}

		updatedItem.quantity += action.amount

		if (updatedItem.quantity <= 0) {
			updatedItems.splice(updatedItemIndex, 1)
		} else {
			updatedItems[updatedItemIndex] = updatedItem
		}

		return {
			...state,
			items: updatedItems,
		}
	}

	if (action.type === 'CLEAR_CART') {
		return { ...state, items: [] }
	}
	return state
}

export function CartContextProvider({ children }) {
	const [shoppingCartState, shoppingCartDispatch] = useReducer(shoppingCartReducer, { items: [] })

	function addItemToCart(item) {
		shoppingCartDispatch({
			type: 'ADD_ITEM',
			item,
		})
	}

	function updateItemQuantity(productId, amount) {
		shoppingCartDispatch({
			type: 'UPDATE_ITEM',
			productId,
			amount,
		})
	}

	function clearCart() {
		shoppingCartDispatch({ type: 'CLEAR_CART' })
	}

	const cartContext = {
		items: shoppingCartState.items,
		addItemToCart,
		updateItemQuantity,
		clearCart,
	}

	return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}

export default CartContext
