
export const heroesFetching = () => {
	return {
		type: 'HEROES_FETCHING'
	}
}

export const heroesFetched = (heroes) => {
	return {
		type: 'HEROES_FETCHED',
		payload: heroes
	}
}

export const heroesFetchingError = () => {
	return {
		type: 'HEROES_FETCHING_ERROR'
	}
}

export const deleteHero = (id) => {
	return { type: 'DELETE_HERO', payload: id }
}

export const addHero = (hero) => ({ type: 'ADD_HERO', payload: hero })

export const filtersFetched = (filters) => ({ type: 'FILTERS_FETCHED', payload: filters })
export const filtersFethcingError = () => ({ type: 'FILTERS_FETCHING_ERROR' })
export const filtersFetching = () => ({ type: 'FILTERS_FETCHING' })
export const changeActiveFilter = (filter) => ({ type: 'CHANGE_ACTIVE_FILTER', payload: filter })