import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { heroesFetching, heroesFetched, heroesFetchingError, deleteHero } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
	const { heroes, heroesLoadingStatus } = useSelector(state => state);
	const dispatch = useDispatch();
	const { request } = useHttp();
	const activeFilter = useSelector(state => state.activeFilter);

	useEffect(() => {
		dispatch(heroesFetching());
		request("http://localhost:3001/heroes")
			.then(data => dispatch(heroesFetched(data)))
			.catch(() => dispatch(heroesFetchingError()))

		// eslint-disable-next-line
	}, []);

	const removeHero = (id) => {
		dispatch(deleteHero(id))
		request(`http://localhost:3001/heroes/${id}`, 'DELETE')
	}

	if (heroesLoadingStatus === "loading") {
		return <Spinner />;
	} else if (heroesLoadingStatus === "error") {
		return <h5 className="text-center mt-5">Ошибка загрузки</h5>
	}

	const renderHeroesList = (arr) => {
		if (arr.length === 0) {
			return <h5 className="text-center mt-5">Героев пока нет</h5>
		}
		const filteredHeroes = arr.filter(({ element }) => activeFilter === 'all' ? true : activeFilter === element);
		return filteredHeroes.map(({ id, ...props }) => {
			return (
				<CSSTransition  key={id} timeout={500} classNames='item'>
					<HeroesListItem  {...props} deleteHero={() => removeHero(id)} />
				</CSSTransition>
			)
		})
	}

	const elements = renderHeroesList(heroes);
	return (
		<TransitionGroup component='ul'>
			{elements}
		</TransitionGroup>
	)
}

export default HeroesList;