import React, { Component } from 'react'
import { v4 as uuid } from 'uuid'

const INITIALSTATE = {
	name: '',
	number: '',
}

class ContactForm extends Component {
	state = INITIALSTATE

	handleChange = ({ target }) => {
		const { name, value } = target
		this.setState({ [name]: value })
	}

	handleSubmit = (e) => {
		e.preventDefault()

		const { name, number } = this.state
		const { onAdd } = this.props
		const isValidate = this.validateForm()

		if (!isValidate) return

		onAdd({ id: uuid(), name, number })

		this.reset()
	}

	validateForm = () => {
		const { name, number } = this.state
		const { onCheckUnique } = this.props

		if (!name || !number) {
			alert('Some filed is empty')
			return false
		}
		return onCheckUnique(name)
	}

	reset = () => {
		this.setState(INITIALSTATE)
	}

	render() {
		const { name, number } = this.state
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					Name
					<input
						value={name}
						onChange={this.handleChange}
						type="text"
						name="name"
						placeholder="Enter name"
						pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
						title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
						required
					/>
				</label>

				<label>
					Number
					<input
						value={number}
						onChange={this.handleChange}
						type="tel"
						name="number"
						placeholder="Enter number"
						pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
						title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
						required
					/>
				</label>
				<button type="submit">Add contact</button>
			</form>
		)
	}
}

export default ContactForm
