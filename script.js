// script.js
const pages = [
    // Existing page data...
];

function createPageCard(page) {
    // Existing function...
}

function populateGallery() {
    // Existing function...
}

function addPhoto() {
    // Existing function...

    // New: Update the GitHub Pages file (hh.html) using GitHub API
    const accessToken = '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';
    const repoOwner = 'nezzkenya';
    const repoName = 'nezzkenya.github.io';
    const filePath = 'hh.html';

    fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
    .then(response => response.json())
    .then(data => {
        const content = atob(data.content);
        const updatedContent = `${content}\n{ title: '${newPhoto.title}', image: '${newPhoto.image}', description: '${newPhoto.description}' },`;

        // Update the file content
        fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: 'Add new photo',
                content: btoa(updatedContent),
                sha: data.sha,
            }),
        })
        .then(() => console.log('Photo added successfully'))
        .catch(error => console.error('Error adding photo:', error));
    });
}

window.onload = populateGallery;


