import React from 'react'
import { Link } from 'react-router-dom'

function Preview({ setValid, setUser, initialUserState, user }) {
    const tech = Object.keys(user.technology).filter(t => user.technology[t])

    const handleCancel = () => {
        setValid(false)
    }

    const handleSave = () => {
        if (!localStorage.getItem("MyForm")) {
            localStorage.setItem("MyForm", JSON.stringify([user]));
        } else {
            const obj = JSON.parse(localStorage.getItem("MyForm"))

            obj.push(user)

            localStorage.setItem("MyForm", JSON.stringify(obj));
        }
        setValid(false)
        setUser(initialUserState)
    }
    return (
        <div className="container2">
            <h1 className="jumbotron" style={{ textAlign: "center" }}>Preview</h1>
            <h4>Name : {user.name}</h4>
            <h4>Gender : {user.gender}</h4>
            <h4>Email : {user.email}</h4>
            <h4>Mobile : {user.mobile}</h4>
            <h4>Category : {user.category}</h4>
            <h4>Technology :</h4>
            <ul>
                {tech.map(t => (
                    (t === "Cplus" ? <li key={t}>C++</li> : <li key={t}>{t}</li>)
                ))}
            </ul>
            <div>
                <h2>Profile Picture</h2>
                <img src={user.file} alt="" height="150px" />
            </div>
            <button onClick={handleCancel} className="btn btn-warning">Cancel</button>
            <Link to='/view'><button onClick={handleSave} className="btn btn-success"> Save</button></Link>

        </div>
    )
}

export default Preview
