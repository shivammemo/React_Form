import React, { useState } from 'react';
import Preview from './Preview';

let fileExtension = ""

function CreateUser() {


    const initialUserState = {
        name: "",
        gender: "",
        email: "",
        mobile: "",
        technology: {
            C: false,
            Cplus: false,
            Java: false,
            Python: false,
            Javascript: false
        },
        category: "General",
        file: ""
    }

    const initialError = {
        nameError: "",
        emailError: "",
        mobileError: "",
        genderError: "",
        technologyError: "",
        fileError: ""
    }

    const [user, setUser] = useState(initialUserState)
    const [error, setError] = useState(initialError)
    const [valid, setValid] = useState(false)

    const handleChange = (event) => {
        const isCheckbox = event.target.type === "checkbox"
        const isFile = event.target.type === "file"
        if (isFile) {
            const file = event.target.files[0]
            fileExtension = file.name.split(".")[1]
            event.persist()
            convertBase64(file).then(base64 => {
                setUser({ ...user, [event.target.name]: base64 })
            })
        } else if (isCheckbox === true) {
            setUser({
                ...user,
                technology: {
                    ...user.technology,
                    [event.target.name]: event.target.checked
                }
            })
        } else {
            setUser({ ...user, [event.target.name]: event.target.value })
        }
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setValid(validate())
    }

    const validate = () => {
        let nameError = ""
        let emailError = ""
        let mobileError = ""
        let genderError = ""
        let technologyError = ""
        let fileError = ""

        let nameregex = RegExp(/^[A-Za-z\s]+$/)
        let emailregex = RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)
        let mobileregex = RegExp(/^[1-9]{1}[0-9]{9}$/)
        let fileExtRegex = RegExp(/^jpg|jpeg|png$/)
        let tech = Object.keys(user.technology).filter(t => user.technology[t])

        if (user.name.trim().length < 2 || user.name.trim().length > 30) {
            nameError = "* Name should be greater than 2 and less than 30"
        }

        if (!nameregex.test(user.name.trim())) {
            nameError = "* Name is invalid"
        }

        if (!emailregex.test(user.email.trim())) {
            emailError = "* Email is invalid"
        }

        if (!mobileregex.test(user.mobile.trim())) {
            mobileError = "* Mobile is invalid"
        }

        if (user.gender.length === 0) {
            genderError = "* Gender should not be empty"
        }
        if (tech.length === 0) {
            technologyError = "* Please select at least one"
        }

        if (!fileExtRegex.test(fileExtension)) {
            fileError = "* File Extension is invalid"
        }

        if (fileExtension.length === 0) {
            fileError = "* No file is chosen"
        }





        if (mobileError || nameError || emailError || genderError || technologyError || fileError) {
            setError({
                nameError: nameError,
                emailError: emailError,
                mobileError: mobileError,
                genderError: genderError,
                technologyError: technologyError,
                fileError: fileError
            })
            return false
        }

        setError(initialError)
        return true
    }
    return (
        < div >
            {!valid ?
                <form className="container2" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name : </label>
                        <input type="text" className="form-control" name="name" value={user.name} placeholder="Eg. John Smith" required onChange={handleChange} />
                        {error && (<div className="error" >{error.nameError}</div>)}
                    </div>
                    <div className="form-group">
                        <label style={{ marginRight: "10px" }}>Gender : </label>
                        <div className="form-check form-check-inline">
                            <input type="radio" className="form-check-input" name="gender" checked={user.gender === "Male"} value="Male" onChange={handleChange} />
                            <label className="form-check-label"> Male </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="radio" className="form-check-input" name="gender" checked={user.gender === "Female"} value="Female" onChange={handleChange} />
                            <label className="form-check-label"> Female </label>
                        </div>
                        {error && (<div className="error" >{error.genderError}</div>)}
                    </div>

                    <div className="form-group">
                        <label>Email : </label>
                        <input type="email" className="form-control" name="email" value={user.email} placeholder="Eg. johmsmith@gmail.com" required onChange={handleChange} />
                        {error && (<div className="error" >{error.emailError}</div>)}
                    </div>
                    <div className="form-group">
                        <label>Mobile : </label>
                        <input type="text" className="form-control" name="mobile" value={user.mobile} placeholder="Enter Mobile" required onChange={handleChange} />
                        {error && (<div className="error" >{error.mobileError}</div>)}
                    </div>
                    <div>
                        <label>
                            Category :
					<select name="category" className="form-control" value={user.category} onChange={handleChange}>
                                <option value="General">General</option>
                                <option value="OBC">OBC</option>
                                <option value="SC/ST">SC/ST</option>
                            </select>
                        </label>
                    </div>
                    <div className="form-group">
                        <label style={{ marginRight: "10px" }}>Technology : </label>
                        <div className="form-check form-check-inline">
                            <input type="checkbox" className="form-check-input" name="C" checked={user.technology.C === true} onChange={handleChange} />
                            <label className="form-check-label">C</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="checkbox" className="form-check-input" name="Cplus" checked={user.technology.Cplus === true} onChange={handleChange} />
                            <label className="form-check-label">C++</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="checkbox" className="form-check-input" name="Java" checked={user.technology.Java === true} onChange={handleChange} />
                            <label className="form-check-label">Java</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="checkbox" className="form-check-input" name="Python" checked={user.technology.Python === true} onChange={handleChange} />
                            <label className="form-check-label">Python</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="checkbox" className="form-check-input" name="Javascript" checked={user.technology.Javascript === true} onChange={handleChange} />
                            <label className="form-check-label" >Javascript</label>
                        </div>
                        {error && (<div className="error" >{error.technologyError}</div>)}
                    </div>
                    <div className="form-group">
                        <label style={{ marginRight: "10px" }}>Profile Picture : </label>
                        <input className="form-control-file" type="file" name="file" onChange={handleChange} />
                        <div style={{ fontSize: 14, color: "gray" }}>File should be .jpg, .jpeg, .png</div>
                        {error && (<div className="error" >{error.fileError}</div>)}
                    </div>
                    <div>
                        <button type="submit" className="btn btn-success" >Preview</button>
                    </div>
                </form>
                : <Preview setValid={setValid} setUser={setUser} initialUserState={initialUserState} user={user}></Preview>}
        </div >
    );
}

export default CreateUser;
