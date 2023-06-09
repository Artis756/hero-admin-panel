
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { changeActiveFilter, filtersFetched, filtersFetching, filtersFethcingError } from "../../actions"
import { useHttp } from "../../hooks/http.hook";

const HeroesFilters = () => {
	const dispatch = useDispatch();
	const { filters, filterLoadingStatus, activeFilter } = useSelector(state => state)
	const { request } = useHttp();

	useEffect(() => {
		dispatch(filtersFetching());
		request("http://localhost:3001/filters")
			.then(data => dispatch(filtersFetched(data)))
			.catch(() => dispatch(filtersFethcingError()))
	}, [])

	return (
		<div className="card shadow-lg mt-4">
			<div className="card-body">
				<p className="card-text">Отфильтруйте героев по элементам</p>
				<div className="btn-group">
					{filterLoadingStatus === 'loading' ?<h5>Загрузка фильтров...</h5>:
						filterLoadingStatus === 'error' ? <h5>Ошибка загрузки фильтров</h5> :
							filters.map(({ filter, label, classes }) => {
								return <button
									className={`btn ${classes}${activeFilter === filter ? ' active' : ''}`}
									key={filter}
									onClick={() => dispatch(changeActiveFilter(filter))}>{label}</button>
							})}
				</div>
			</div>
		</div >
	)
}

export default HeroesFilters;