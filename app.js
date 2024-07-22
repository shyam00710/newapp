// Check for MetaMask installation
if (typeof window.ethereum === 'undefined') {
    alert('MetaMask is not installed. Please install MetaMask to use this app.');
} else {
    const web3 = new Web3(window.ethereum);
    let userAccount = null;

    document.getElementById('connectWalletBtn').addEventListener('click', async () => {
        try {
            // Request account access
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            userAccount = accounts[0];
            document.getElementById('userAddress').innerText = `Connected: ${userAccount}`;
            document.getElementById('connectMessage').innerText = 'Wallet connected!';
        } catch (error) {
            console.error('User denied account access', error);
            document.getElementById('connectMessage').innerText = 'Failed to connect wallet.';
        }
    });

    // Create Profile Form
    document.getElementById('profileForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!userAccount) return alert('Please connect your wallet first.');

        const name = document.getElementById('name').value;
        const profession = document.getElementById('profession').value;
        const skills = document.getElementById('skills').value;

        // Handle profile creation (example function, implement actual logic)
        console.log(`Creating profile: ${name}, ${profession}, ${skills}`);
        // Call smart contract method to create profile here
    });

    // Update Profile Form
    document.getElementById('updateProfileForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!userAccount) return alert('Please connect your wallet first.');

        const name = document.getElementById('updateName').value;
        const profession = document.getElementById('updateProfession').value;
        const skills = document.getElementById('updateSkills').value;

        // Handle profile update (example function, implement actual logic)
        console.log(`Updating profile: ${name}, ${profession}, ${skills}`);
        // Call smart contract method to update profile here
    });

    // Post Job Form
    document.getElementById('jobForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!userAccount) return alert('Please connect your wallet first.');

        const jobTitle = document.getElementById('jobTitle').value;
        const jobDescription = document.getElementById('jobDescription').value;

        // Handle job posting (example function, implement actual logic)
        console.log(`Posting job: ${jobTitle}, ${jobDescription}`);
        // Call smart contract method to post job here
    });

    // Apply for Job Form
    document.getElementById('applyForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!userAccount) return alert('Please connect your wallet first.');

        const jobId = document.getElementById('jobId').value;

        // Handle job application (example function, implement actual logic)
        console.log(`Applying for job ID: ${jobId}`);
        // Call smart contract method to apply for job here
    });

    // View Profile Form
    document.getElementById('viewProfileForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!userAccount) return alert('Please connect your wallet first.');

        const profileAddress = document.getElementById('profileAddress').value;

        // Handle viewing profile (example function, implement actual logic)
        console.log(`Viewing profile for address: ${profileAddress}`);
        // Call smart contract method to view profile here
    });

    // View Applicants Form
    document.getElementById('viewApplicantsForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!userAccount) return alert('Please connect your wallet first.');

        const jobId = document.getElementById('applicantsJobId').value;

        // Handle viewing applicants (example function, implement actual logic)
        console.log(`Viewing applicants for job ID: ${jobId}`);
        // Call smart contract method to view applicants here
    });
}
