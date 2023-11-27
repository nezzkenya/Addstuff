// script.js
function addPhoto() {
    const titleInput = document.getElementById('title');
    const imageUrlInput = document.getElementById('image-url');
    const descriptionInput = document.getElementById('description');

    const newPhoto = {
        title: titleInput.value,
        image: imageUrlInput.value,
        description: descriptionInput.value,
    };

    // Add the new photo to the pages array
    pages.push(newPhoto);

    // Clear the form inputs
    titleInput.value = '';
    imageUrlInput.value = '';
    descriptionInput.value = '';

    // Update the hh.html file on GitHub
    const accessToken = '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';
    const repoOwner = 'nezzkenya';
    const repoName = 'main'; // Updated repository name to 'main'
    const filePath = 'hh.html';

    // Fetch the current content of hh.html
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
