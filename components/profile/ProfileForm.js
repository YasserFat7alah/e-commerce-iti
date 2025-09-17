import { getCurrentUser } from "../../data/authentication.js";
import { getInitials } from "../../scripts/utils/dashboardUtils.js";
import { localStore, sessionStore } from "../../scripts/utils/storage.js";
import View from "../core/view.js";
import Toast from "../ui/toast.js";




export default class ProfileForm extends View {
    

    template() {

        const userData = getCurrentUser();

        return `
            <div class="card shadow-none px-4 py-3 ">
            
            <form id="profile-form" class="row g-3 needs-validation" novalidate>
                        <div class="col col-12 d-flex align-items-center justify-content-start flex-md-column pb-4">
                            <div class="col col-4 col-md-12 col-lg-5 mb-2" >
                                <div class=" col col-4 profile-avatar  mb-1">
                                    ${getInitials(userData.name)}
                                </div>
                            </div>
                            
                            <div class="col col-8 col-md-12 col-lg-9 d-flex flex-column align-content-center justify-content-center">
                                <h5 class="mb-3 text-center user-name">${userData?.name}</h5>
                                <button id="edit-btn" type="button" class="btn brand-bg text-white ">Update Profile</button>
                                <button id="save-btn" type="submit" class="btn btn-success ">Save Changes</button>
                            </div>
                            
                        </div>

                        <h6 class="mb-3 mt-0">Personal Information</h6>
                        <div class="col-12">
                            <label class="form-label">Name</label>
                            <input type="text" class="form-control" id="name" placeholder="Name" value="${userData?.name}" required  disabled >
                            <div class="invalid-feedback">
                                Please enter your name.
                            </div>
                        </div>

                        <div class="col-12">
                            <label class="form-label">Date of Birth</label>
                            <input type="date" class="form-control" id="birth" max="2009-12-31" value="${userData?.birth && `${userData?.birth}`}" required disabled >
                            <div class="invalid-feedback">
                                Please select your date of birth.
                            </div>
                        </div>

                        <div class="col-12">
                            <label class="form-label">Gender</label>
                            <div>
                                <input type="radio" name="gender" id="male" value="male" required disabled ${ ((userData?.gender || '').toString().trim().toLowerCase() === 'male') ? 'checked' : '' } > 
                                <label for='male'>Male</label>
                                <input type="radio" name="gender" class="ms-3" id="female" value="female" required disabled ${ ((userData?.gender || '').toString().trim().toLowerCase() === 'female') ? 'checked' : '' } > 
                                <label for='female'>Female</label>
                                <div class="invalid-feedback ">
                                    Please select your gender.
                                </div>
                            </div>
                        </div>

                        <div class="col-12">
                            <label class="form-label">Phone Number</label>
                            <input type="text" class="form-control" id="phone" placeholder="Phone Number" value="${userData?.phone}" required disabled  pattern="[0-9]{11}">
                            <div class="invalid-feedback">
                                Please enter a valid phone number (11 digits).
                            </div>
                        </div>

                        ${ userData?.city && userData?.state ?`
                            <div class="col-md-12">
                                <label class="form-label">Address</label>
                                <input type="text" class="form-control" id="adrs" placeholder="Address" value="${userData.city ? userData.city +" , " + userData.state : ' '} "  disabled required">
                                <div class="invalid-feedback">
                                    Please enter your address.
                                </div>
                            </div>       
                        ` : ""}

                        <div class="col-md-12">
                            <label class="form-label">Email</label>
                            <input type="email" class="form-control" value="${userData?.email}" id="email" placeholder="Email Address" disabled  required>
                            <div class="invalid-feedback">
                                Please enter a valid email.
                            </div>
                        </div>
                    </form>

                </div>
        `
    }

    script() {
        const userData = sessionStore.read("currentUser");

        const editBtn = document.getElementById('edit-btn');
        const saveBtn = document.getElementById('save-btn');
        const inputeArr = document.querySelectorAll("form input");
        const form = document.querySelector('.needs-validation');

        saveBtn.style.display='none';


        editBtn.addEventListener('click' , ()=>{
            //show save changes button and hidden edit button
            editBtn.style.display = 'none';
            saveBtn.style.display='block';

            //active inputs
            inputeArr.forEach((input , i)=>{
                input.disabled = false;
                if (i === 0) {
                    input.focus(); 
                }
            });


        });

        saveBtn.addEventListener('click', (e) => {
            e.preventDefault();

            if (!form.checkValidity()) {
                form.classList.add('was-validated'); 
                return; 
            }

            const adrsEl = document.getElementById('adrs');
            let city = "";
            let state = "";


            if (adrsEl && adrsEl.value.trim() !== "") {
                const parts = adrsEl.value.trim().split(",");
                city = parts[0]?.trim() || "";
                state = parts[1]?.trim() || "";
            }

            const selectedGenderEl = document.querySelector('input[name="gender"]:checked');
            const genderValueToSave = selectedGenderEl ? selectedGenderEl.value : (userData?.gender || "");


            const updatedUser = {
                name: document.getElementById('name').value.trim(),
                Name: document.getElementById('name').value.trim(),
                birth: document.getElementById('birth').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                email: document.getElementById('email').value.trim(),
                city ,
                state ,
                address : city + state,
                gender: genderValueToSave
            };

            const newData = {...userData , ...updatedUser} ;
            
            sessionStore.write("currentUser" , newData);

           const users = localStore.read("users", []); 

            const updatedUsers = users.map(user => {
                if (user.id === userData.id) {
                    return { ...user, ...newData };
                }
                return user; 
            }); 

            localStore.write("users", updatedUsers);

            const initialsEl = document.querySelector(".profile-avatar");
            if (initialsEl) {
                initialsEl.textContent = getInitials(newData.name);
            }

            const nameHeading = document.querySelector(".user-name");
            if (nameHeading) {
                nameHeading.textContent = newData.name;
            }

            inputeArr.forEach((input , i)=>{
                input.disabled = true;
            })
            
            form.classList.remove('was-validated'); 
            editBtn.style.display = 'block';
            saveBtn.style.display = 'none';
            Toast.notify("Your Info is Updated" , "success");
            setTimeout(()=>{
                location.reload();
            } , 1000)
        });
    }
    
}