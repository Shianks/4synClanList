let members = [];

const adminMembers = document.getElementById("adminMembers");

fetch("members.json")
  .then(response => response.json())
  .then(data => {
    members = data;
    renderMembers();
  });

function renderMembers() {
  adminMembers.innerHTML = "";

  members.forEach((member, index) => {
    const div = document.createElement("div");
    div.classList.add("admin-member");

    div.innerHTML = `
      <div>
        <strong>${member.name}</strong><br>
        ${member.role} • ${member.status}
      </div>
      <button class="delete-btn" onclick="deleteMember(${index})">
        Delete
      </button>
    `;

    adminMembers.appendChild(div);
  });
}

function addMember() {
  const name = document.getElementById("name").value;
  const role = document.getElementById("role").value;
  const status = document.getElementById("status").value;

  if (name.trim() === "") {
    alert("Please enter a member name.");
    return;
  }

  members.push({
    name,
    role,
    status
  });

  renderMembers();

  document.getElementById("name").value = "";
}

function deleteMember(index) {
  members.splice(index, 1);
  renderMembers();
}

function downloadJSON() {
  const dataStr = JSON.stringify(members, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "members.json";
  a.click();
}
