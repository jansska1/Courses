import useHttp from '../hooks/useHttp.js'
import { useContext } from 'react'
import CartContext from '../store/CartContext.jsx'
import Error from './Error.jsx'
import { currencyFormatter } from '../util/formatting.js'
import Button from './UI/Button.jsx'

const requestConfig = {}

export default function Products() {
	const cartCtx = useContext(CartContext)
	const { data: availableMeals, isLoading, error } = useHttp('http://localhost:3000/meals', requestConfig, [])

	function handleAddMealToCart(meal) {
		cartCtx.addItemToCart(meal)
	}

	if (error) {
		return (
			<Error
				title='Failed to fetch meals'
				message={error}
			/>
		)
	}

	return (
		<section>
			{isLoading && <p className='center'>Fetching meals...</p>}
			{!isLoading && availableMeals.length === 0 && <p>Failed to fetch meals</p>}
			{!isLoading && availableMeals.length > 0 && (
				<ul id='meals'>
					{availableMeals.map(meal => (
						<li
							className='meal-item'
							key={meal.id}>
							<article>
								<img src={`http://localhost:3000/${meal.image}`} />
								<h3>{meal.name}</h3>
								<p className='meal-item-price'>{currencyFormatter.format(meal.price)}</p>
								<p className='meal-item-description'>{meal.description}</p>
								<p className='meal-item-actions'>
									<Button onClick={() => handleAddMealToCart(meal)}>Add to Cart</Button>
								</p>
							</article>
						</li>
					))}
				</ul>
			)}
		</section>
	)
}
