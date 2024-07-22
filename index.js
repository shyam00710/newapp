import contractABI from "./contractABI.json";

const contractAddress = "0xYourContractAddressHere";

let web3 = new Web3(window.ethereum);
let contract = new web3.eth.Contract(contractABI, contractAddress);

async function connectWallet() {
  if (window.ethereum) {
    const accounts = await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .catch((err) => {
        if (err.code === 4001) {
          console.log("Please connect to MetaMask.");
        } else {
          console.error(err);
        }
      });
    setConnected(accounts[0]);
    if (accounts[0]) {
      console.log("We have an account");
    }
  } else {
    console.error("No web3 provider detected");
    document.getElementById("connectMessage").innerText =
      "No web3 provider detected. Please install MetaMask.";
  }
}

async function createProfile() {
  const accounts = await web3.eth.getAccounts();
  const name = document.getElementById("name").value;
  const profession = document.getElementById("profession").value;
  const skills = document.getElementById("skills").value.split(',');

  try {
    await contract.methods.createProfile(name, profession, skills).send({ from: accounts[0] });
    alert("Profile created successfully");
  } catch (error) {
    console.error("Error creating profile:", error);
  }
}

async function updateProfile() {
  const accounts = await web3.eth.getAccounts();
  const name = document.getElementById("updateName").value;
  const profession = document.getElementById("updateProfession").value;
  const skills = document.getElementById("updateSkills").value.split(',');

  try {
    await contract.methods.updateProfile(name, profession, skills).send({ from: accounts[0] });
    alert("Profile updated successfully");
  } catch (error) {
    console.error("Error updating profile:", error);
  }
}

async function postJob() {
  const accounts = await web3.eth.getAccounts();
  const title = document.getElementById("jobTitle").value;
  const description = document.getElementById("jobDescription").value;

  try {
    await contract.methods.postJob(title, description).send({ from: accounts[0] });
    alert("Job posted successfully");
  } catch (error) {
    console.error("Error posting job:", error);
  }
}

async function applyForJob() {
  const accounts = await web3.eth.getAccounts();
  const jobId = document.getElementById("jobId").value;

  try {
    await contract.methods.applyForJob(jobId).send({ from: accounts[0] });
    alert("Applied for job successfully");
  } catch (error) {
    console.error("Error applying for job:", error);
  }
}

async function viewProfile() {
  const userAddress = document.getElementById("profileAddress").value;
  try {
    const profile = await contract.methods.viewProfile(userAddress).call();
    document.getElementById("profileResult").innerHTML = `
      <p><strong>Name:</strong> ${profile[0]}</p>
      <p><strong>Profession:</strong> ${profile[1]}</p>
      <p><strong>Skills:</strong> ${profile[2].join(', ')}</p>
    `;
  } catch (error) {
    console.error("Error viewing profile:", error);
  }
}

async function viewApplicants() {
  const jobId = document.getElementById("applicantsJobId").value;
  try {
    const applicants = await contract.methods.viewApplicants(jobId).call();
    let resultHTML = '';
    applicants.forEach((applicant, index) => {
      resultHTML += `
        <div>
          <h3>Applicant ${index + 1}</h3>
          <p><strong>Name:</strong> ${applicant.name}</p>
          <p><strong>Profession:</strong> ${applicant.profession}</p>
          <p><strong>Skills:</strong> ${applicant.skills.join(', ')}</p>
        </div>
      `;
    });
    document.getElementById("applicantsResult").innerHTML = resultHTML;
  } catch (error) {
    console.error("Error viewing applicants:", error);
  }
}

function setConnected(address) {
  document.getElementById("userAddress").innerText =
    "Connected: " + shortAddress(address);
  document.getElementById("connectMessage").style.display = "none";
  document.getElementById("profileForm").style.display = "block";
  document.getElementById("updateProfileForm").style.display = "block";
  document.getElementById("jobForm").style.display = "block";
  document.getElementById("applyForm").style.display = "block";
  document.getElementById("viewProfileForm").style.display = "block";
  document.getElementById("viewApplicantsForm").style.display = "block";
}

function shortAddress(address, startLength = 6, endLength = 4) {
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
}

document.getElementById("connectWalletBtn").addEventListener("click", connectWallet);
document.getElementById("profileForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  await createProfile();
});

document.getElementById("updateProfileForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  await updateProfile();
});

document.getElementById("jobForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  await postJob();
});

document.getElementById("applyForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  await applyForJob();
});

document.getElementById("viewProfileForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  await viewProfile();
});

document.getElementById("viewApplicantsForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  await viewApplicants();
});
