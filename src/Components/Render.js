import React from 'react'

function Render() {
    const objects = JSON.parse(localStorage.getItem("MyForm"))

    const getTechnology = (obj) => {
        let tech = Object.keys(obj).filter(t => obj[t])
        let s = ""
        for (let i = 0; i < tech.length; i++) {
            if (tech[i] === "Cplus") {
                s = s + "C++  "
            } else {
                s = s + tech[i] + "  "
            }
        }
        return s
    }

    const renderObj = (object, index) => (
        <tr key={index}>
            <td><img src={object.file} alt="" height="100px" width="100px" /></td>
            <td>{object.name}</td>
            <td>{object.email}</td>
            <td>{object.mobile}</td>
            <td>{object.gender}</td>
            <td>{object.category}</td>
            <td>{getTechnology(object.technology)}</td>
        </tr>
    )
    return (
        <div className="container2">
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Gender</th>
                            <th>Category</th>
                            <th>Technology</th>
                        </tr>
                    </thead>
                    <tbody>
                        {objects !== null && objects.map(renderObj)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Render
