// export async function fetchAvailableMeals() {
// 	const response = await fetch('http://localhost:3000/meals')
// 	const meals = await response.json()

// 	if (!response.ok) {
// 		throw new Error('Failed to fetch meals')
// 	}
// 	return meals
// }

// export async function postOrder(orders) {
// 	const response = await fetch('http://localhost:3000/orders', {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json',
// 		},
// 		body: JSON.stringify(orders),
// 	})
// 	const resData = await response.json()
// 	console.log(resData.message)

// 	if (!response.ok) {
// 		throw new Error('Failed to update user data.')
// 	}
// }
