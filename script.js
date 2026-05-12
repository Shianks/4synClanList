const memberContainer = document.getElementById("memberContainer");
const memberCount = document.getElementById("memberCount");
const searchInput = document.getElementById("searchInput");
const roleFilter = document.getElementById("roleFilter");

let members = [];

fetch("members.json")
  .then(response => response.json())
  .then(data => {
    members = data;
    displayMembers(members);
  });

function displayMembers(memberList) {
  memberContainer.innerHTML = "";

  memberList.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("member-card");

    card.innerHTML = `
      <h2>${member.name}</h2>
      <p><strong>Role:</strong> ${member.role}</p>
      <p><strong>Status:</strong> ${member.status}</p>
    `;

    memberContainer.appendChild(card);
  });

  memberCount.textContent = memberList.length;
}

function filterMembers() {
  const searchText = searchInput.value.toLowerCase();
  const selectedRole = roleFilter.value;

  const filtered = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchText);
    const matchesRole =
      selectedRole === "all" || member.role === selectedRole;

    return matchesSearch && matchesRole;
  });

  displayMembers(filtered);
}

searchInput.addEventListener("input", filterMembers);
roleFilter.addEventListener("change", filterMembers);
