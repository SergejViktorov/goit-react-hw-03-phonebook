import { Component } from 'react'
import ContactForm from './Components/ContactForm'
import ContactList from './Components/ContactList'
import Filter from './Components/Filter'

class App extends Component {
	state = {
		contacts: [
			{ id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
			{ id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
			{ id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
			{ id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
		],
		filter: '',
	}

	henlerAddContact = (newContact) =>
		this.setState(({ contacts }) => ({
			contacts: [...contacts, newContact],
		}))

	hendleCheck = (name) => {
		const { contacts } = this.state

		const isExistContact = !!contacts.find((contact) => contact.name === name)
		isExistContact && alert('Contact is already exist')

		return !isExistContact
	}

	hendleRemove = (id) =>
		this.setState(({ contacts }) => ({
			contacts: contacts.filter((contact) => contact.id !== id),
		}))

	filterChange = (filter) => this.setState({ filter })

	getVisibleContacts = () => {
		const { contacts, filter } = this.state
		return contacts.filter((contact) =>
			contact.name.toLowerCase().includes(filter.toLowerCase())
		)
	}

	componentDidMount() {
		console.log('App componentDidiMout')
		const contacts = localStorage.getItem('contacts')

		const parsedContacts = JSON.parse(contacts)
		// 	console.log(parsedContacts)
		this.setState({ contacts: parsedContacts })
	}

	componentDidUpdate(prevProps, prevState) {
		console.log('componentDidUpdate')
		if (this.state.contacts !== prevState.contacts) {
			localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
		}
	}

	render() {
		console.log('app')
		const { filter } = this.state
		const visiableContacts = this.getVisibleContacts()
		return (
			<div>
				<h2>Phonebook</h2>
				<ContactForm
					onAdd={this.henlerAddContact}
					onCheckUnique={this.hendleCheck}
				/>

				<h2>Contacts</h2>
				<Filter filter={filter} onChange={this.filterChange} />
				<ContactList contacts={visiableContacts} onRemove={this.hendleRemove} />
			</div>
		)
	}
}

export default App
