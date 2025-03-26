document.addEventListener('DOMContentLoaded', function () {
    // Load guest data
    fetch('data/guests.json')
        .then(response => response.json())
        .then(data => {
            // Prepare nodes and edges for the graph
            const nodes = data.map(guest => ({
                id: guest.id,
                label: guest.name,
                title: `QR Code: ${guest.qrCode}`
            }));

            const edges = [];
            data.forEach(guest => {
                guest.relations.forEach(relationId => {
                    edges.push({ from: guest.id, to: relationId });
                });
            });

            // Create the network graph
            const container = document.getElementById('graph-container');
            const networkData = { nodes, edges };
            const options = {};
            const network = new vis.Network(container, networkData, options);
        })
        .catch(error => console.error('Error loading guest data:', error));
});
