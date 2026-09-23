let facultyData = [
    {
        name: "Dr. Yashin khan",
        dept: "HISTORY",
        post: "Professor, History",
        email: "yashin.khan@asctcollege.ac.in",
        spec: "Modern Indian History",
        photo: "Images/faculty1.jfif"
    },

    {
        name: "Dr. Sarah Khan",
        dept: "PHYSICS",
        post: "Associate Professor, Physics",
        email: "sarah.khan@asctcollege.ac.in",
        spec: "Quantum Mechanics",
        photo: "Images/faculty2.jfif"
    },

    {
        name: "Dr. Sabbir Alam",
        dept: "COMPUTER SCIENCE",
        post: "Assistant Professor, BCA",
        email: "sabbir.alam@asctcollege.ac.in",
        spec: "Data Structures, AI & ML",
        photo: "Images/faculty3.jfif"
    },

    {
        name: "Dr. Naurin Saba",
        dept: "ENGLISH",
        post: "Professor, English",
        email: "naurin.saba@asctcollege.ac.in",
        spec: "Postcolonial Literature",
        photo: "Images/faculty4.jfif"
    },

    {
        name: "Dr. Md. Arif",
        dept: "ECONOMICS",
        post: "Professor, Economics",
        email: "md.arif@asctcollege.ac.in",
        spec: "Development Economics",
        photo: "Images/faculty5.jfif"
    },

    {
        name: "Dr. Fatima Saba",
        dept: "PSYCHOLOGY",
        post: "Assistant Professor",
        email: "fatima.saba@asctcollege.ac.in",
        spec: "Cognitive Psychology",
        photo: "Images/faculty6.jfif"
    }
];

function renderFaculty(list) {
    let c = document.getElementById("facultyList");
    if (!c) return;
    c.innerHTML = "";
    list.forEach((f, idx) => {
        c.innerHTML += `
        <div class="card" style="text-align: center; padding: 20px;">
            <img src="${f.photo}" alt="${f.name}" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin-bottom: 15px; border: 3px solid #0a58ca;">
            <h3>${f.name}</h3>
            <p><b>${f.dept}</b></p>
            <p>${f.post}</p>
            <p style="font-size: 14px; color: #555;"><i>${f.spec}</i></p>
            <p style="font-size: 13px; color: #777; margin-bottom: 10px;">${f.email}</p>
            <button onclick="openFacByIndex(${idx})">View Profile</button>
        </div>`;
    });
}

if (document.getElementById("facultyList")) {
    renderFaculty(facultyData);
}

function searchFaculty() {
    let v = document.getElementById("facultySearch").value.toLowerCase();
    let filtered = facultyData.filter(f => f.name.toLowerCase().includes(v) || f.dept.toLowerCase().includes(v));
    renderFaculty(filtered);
}

function searchDept() {
    let v = document.getElementById("deptSearch").value.toLowerCase();
    let cards = document.querySelectorAll("#deptList .card");
    for (let c of cards) {
        c.style.display = c.innerText.toLowerCase().includes(v) ? "block" : "none";
    }
}

function filterDept(type) {
    let cards = document.querySelectorAll("#deptList .card");
    for (let c of cards) {
        if (type == "All") {
            c.style.display = "block";
        } else {
            c.style.display = c.dataset.type == type ? "block" : "none";
        }
    }
}

function viewDept(name) {
    document.getElementById("deptTitle").innerText = name;
    document.getElementById("deptDesc").innerText = name + " - Full details about curriculum, seats, faculty and placement.";
    document.getElementById("deptModal").classList.add("active");
}

function openFacByIndex(index) {
    let f = facultyData[index];
    document.getElementById("fName").innerText = f.name;
    document.getElementById("fDept").innerText = f.dept + " (" + f.post + ")";
    document.getElementById("fEmail").innerText = f.email;
    document.getElementById("facModal").classList.add("active");
}

// 8. General Helpers & Modals
function closeModal(id) {
    document.getElementById(id).classList.remove("active");
}

function showEvent(t) {
    alert(t);
}

function openLogin() {
    document.getElementById("loginModal").classList.add("active");
}

function closeLogin() {
    document.getElementById("loginModal").classList.remove("active");
}

function doLogin() {
    let email = document.getElementById("loginEmail").value;
    if (email == "") { alert("Enter email"); return; }
    localStorage.setItem("loggedIn", email);
    closeLogin();
    alert("Login Successfully");
}

let regForm = document.getElementById("regForm");
if (regForm) {
    regForm.addEventListener("submit", function (e) {
        e.preventDefault();
        let data = {
            name: document.getElementById("fullName").value,
            email: document.getElementById("email").value,
            mobile: document.getElementById("mobile").value,
            course: document.getElementById("course").value,
            sem: document.getElementById("sem").value,
            aadhar: document.getElementById("aadhar").value,
            regId: "ASCT/2026/REG/" + Math.floor(1000 + Math.random() * 9000),
            date: new Date().toLocaleDateString()
        };
        localStorage.setItem("lastRegistration", JSON.stringify(data));

        let all = JSON.parse(localStorage.getItem("allStudents") || "[]");
        all.push(data);
        localStorage.setItem("allStudents", JSON.stringify(all));

        window.location.href = "success.html";
    });
}

function loadSuccess() {
    let d = JSON.parse(localStorage.getItem("lastRegistration") || "{}");
    let box = document.getElementById("successDetails");
    if (!box) return;
    box.innerHTML = `
    <p><b>Registration ID:</b> ${d.regId || ''}</p>
    <p><b>Name:</b> ${d.name || ''}</p>
    <p><b>Course:</b> ${d.course || ''}, ${d.sem || ''}</p>
    <p><b>Email:</b> ${d.email || ''}</p>
    <p><b>Status:</b> <span style="background:#c8e6c9; padding:2px 8px; border-radius:10px; color:green; font-weight:bold;">Confirmed</span></p>
  `;
}

function downloadReceipt() {
    let d = JSON.parse(localStorage.getItem("lastRegistration") || "{}");
    if (!d.regId) { alert("No active registration found to download!"); return; }
    let text = `ASCT College - Registration Receipt\n\nRegistration ID: ${d.regId}\nName: ${d.name}\nCourse: ${d.course}\nSemester: ${d.sem}\nEmail: ${d.email}\nMobile: ${d.mobile}\nDate: ${d.date}\n\nStatus: Confirmed\n\nThank you for registering!`;
    let blob = new Blob([text], { type: "text/plain" });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `Receipt_${d.regId}.txt`;
    a.click();
}

function downloadDept() {
    let text = "ASCT College Department Brochure\n\nDownloaded from website";
    let blob = new Blob([text], { type: "text/plain" });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "Department_Brochure.txt";
    a.click();
}

function downloadProfile() {
    let text = "Faculty Profile Downloaded Successfully from ASCT Portal.";
    let blob = new Blob([text], { type: "text/plain" });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "Faculty_Profile.txt";
    a.click();
}