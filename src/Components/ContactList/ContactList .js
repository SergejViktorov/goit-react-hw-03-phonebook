import React from 'react'

const ContactListItem = ({ id, name, number, onRemove }) => {
	return (
		<li>
			{name}:{number} <button onClick={() => onRemove(id)}>delete</button>
		</li>
	)
}

const ContactList = ({ contacts, onRemove }) => {
	if (contacts.lengs === 0) return null
	return (
		<ul>
			{contacts.map((contact) => (
				<ContactListItem {...contact} onRemove={onRemove} />
			))}
		</ul>
	)
}

export default ContactList
