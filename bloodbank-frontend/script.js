// Save donors in localStorage
document.addEventListener("DOMContentLoaded", () => {
    const donorForm = document.querySelector("#donor-form");
    const requestForm = document.querySelector("#request-form");
    const searchForm = document.querySelector("#search-form");
    const donorList = document.querySelector("#donor-list");

    // Handle donor registration
    if (donorForm) {
        donorForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const donor = {
                name: donorForm.querySelector("[name='name']").value,
                email: donorForm.querySelector("[name='email']").value,
                phone: donorForm.querySelector("[name='phone']").value,
                blood: donorForm.querySelector("[name='blood']").value,
                address: donorForm.querySelector("[name='address']").value
            };
            let donors = JSON.parse(localStorage.getItem("donors")) || [];
            donors.push(donor);
            localStorage.setItem("donors", JSON.stringify(donors));
            alert("Donor registered successfully!");
            donorForm.reset();
        });
    }

    // Handle search donor
    if (searchForm) {
        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const group = searchForm.querySelector("[name='blood']").value;
            let donors = JSON.parse(localStorage.getItem("donors")) || [];
            const filtered = donors.filter(d => d.blood === group);
            donorList.innerHTML = "";

            if (filtered.length === 0) {
                donorList.innerHTML = "<p>No donors found for this blood group.</p>";
                return;
            }

            filtered.forEach(d => {
                const div = document.createElement("div");
                div.className = "donor-card";
                div.innerHTML = `
                    <h3>${d.name} (${d.blood})</h3>
                    <p><strong>Email:</strong> ${d.email}</p>
                    <p><strong>Phone:</strong> ${d.phone}</p>
                    <p><strong>Address:</strong> ${d.address}</p>
                `;
                donorList.appendChild(div);
            });
        });
    }

    // Handle blood request
    if (requestForm) {
        requestForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Blood request submitted! (This is a demo)");
            requestForm.reset();
        });
    }
});
