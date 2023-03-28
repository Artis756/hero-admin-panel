

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addHero } from "../../actions";
import { v4 } from "uuid";
import { useHttp } from "../../hooks/http.hook";

const HeroesAddForm = () => {
	const [inputValue, setInputValue] = useState('')
	const [textareaValue, setTextareaValue] = useState('')
	const [selectValue, setSelectValue] = useState('')
	const filters = useSelector(state => state.filters);

	const dispatch = useDispatch();
	const { request } = useHttp();

	const sendCharData = (e) => {
		e.preventDefault();

		const hero = {
			id: v4(),
			name: inputValue,
			description: textareaValue,
			element: selectValue
		}

		dispatch(addHero(hero))

		request("http://localhost:3001/heroes", 'POST', JSON.stringify(hero))

		setInputValue('')
		setTextareaValue('')
		setSelectValue('')
	}

	return (
		<form className="border p-4 shadow-lg rounded"
			onSubmit={sendCharData}>
			<div className="mb-3">
				<label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
				<input
					required
					type="text"
					name="name"
					className="form-control"
					id="name"
					placeholder="Как меня зовут?"
					value={inputValue}
					onChange={e => setInputValue(e.target.value)} />
			</div>

			<div className="mb-3">
				<label htmlFor="text" className="form-label fs-4">Описание</label>
				<textarea
					required
					name="text"
					className="form-control"
					id="text"
					placeholder="Что я умею?"
					style={{ "height": '130px' }}
					value={textareaValue}
					onChange={(e) => setTextareaValue(e.target.value)} />
			</div>

			<div className="mb-3">
				<label htmlFor="element" className="form-label">Выбрать элемент героя</label>
				<select
					required
					className="form-select"
					id="element"
					name="element"
					value={selectValue}
					onChange={(e) => setSelectValue(e.target.value)}>
					{filters.map(({ filter, label }) => {
						if (filter === 'all') return;
						return <option value={filter} key={filter}>{label}</option>
					})}
				</select>
			</div>

			<button type="submit" className="btn btn-primary">Создать</button>
		</form>
	)
}

export default HeroesAddForm;