let requiredSkills = ["HTML", "CSS", "JS"];

let candidates = JSON.parse(localStorage.getItem("candidates")) || [];

const table = document.getElementById("tableBody");

function calculateMatch(skills){
  let matched = skills.filter(skill =>
    requiredSkills.includes(skill)
  ).length;

  return Math.round((matched / requiredSkills.length) * 100);
}

function getColor(match){
  if(match >= 80) return "green";
  if(match >= 50) return "yellow";
  return "red";
}

function addCandidate(){
  let name = document.getElementById("name").value;
  let skills = document.getElementById("skills").value
                .split(",")
                .map(s => s.trim());

  if(!name || skills.length === 0){
    alert("Enter valid data");
    return;
  }

  let match = calculateMatch(skills);

  candidates.push({name, skills, match});

  localStorage.setItem("candidates", JSON.stringify(candidates));

  document.getElementById("name").value = "";
  document.getElementById("skills").value = "";

  render();
}

function removeCandidate(index){
  candidates.splice(index,1);
  localStorage.setItem("candidates", JSON.stringify(candidates));
  render();
}

function updateStats(){
  document.getElementById("total").innerText = candidates.length;

  let top = Math.max(0, ...candidates.map(c => c.match));
  document.getElementById("top").innerText = top + "%";

  let avg = candidates.length 
    ? Math.round(candidates.reduce((a,b)=>a+b.match,0)/candidates.length)
    : 0;

  document.getElementById("avg").innerText = avg + "%";
}

function render(){
  let search = document.getElementById("search").value.toLowerCase();

  table.innerHTML = "";

  candidates
    .filter(c => c.name.toLowerCase().includes(search))
    .forEach((c, index) => {
      let row = `
        <tr>
          <td>${c.name}</td>
          <td>${c.skills.join(", ")}</td>
          <td>
            ${c.match}%
            <div class="progress ${getColor(c.match)}" style="width:${c.match}%"></div>
          </td>
          <td>
            <button class="btn shortlist">Shortlist</button>
            <button class="btn reject" onclick="removeCandidate(${index})">Reject</button>
            <button class="btn view">View</button>
          </td>
        </tr>
      `;
      table.innerHTML += row;
    });

  updateStats();
}

render();