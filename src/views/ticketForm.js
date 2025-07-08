function generateTicketForm(types) {
  const options = types.map(type => `<option value="${type.id}">${type.name}</option>`).join('')
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Submit Ticket</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                max-width: 500px;
                margin: 50px auto;
                padding: 20px;
            }
            .form-group {
                margin-bottom: 15px;
            }
            #result {
                margin-top: 15px;
                padding: 10px;
                border-radius: 4px;
            }
        </style>
    </head>
    <body>
        <h1>Submit a Ticket</h1>
        <form id="ticketForm">
            <div class="form-group">
                <label for="type_id">Type:</label>
                <select id="type_id" name="type_id" required>
                    <option value="">Select type...</option>
                    ${options}
                </select>
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="message">Message:</label>
                <textarea id="message" name="message" rows="4" required></textarea>
            </div>
            <button type="submit">Submit Ticket</button>
        </form>
        <div id="result"></div>
        <script>
            document.getElementById('ticketForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const formData = new FormData(e.target);
                const data = Object.fromEntries(formData);
                try {
                    const response = await fetch('/', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                    });
                    if (response.ok) {
                        document.getElementById('result').innerHTML = 'Ticket submitted successfully!';
                        document.getElementById('result').style.backgroundColor = '#d4edda';
                        document.getElementById('result').style.color = '#155724';
                        e.target.reset();
                    } else {
                        document.getElementById('result').innerHTML = 'Error submitting ticket';
                        document.getElementById('result').style.backgroundColor = '#f8d7da';
                        document.getElementById('result').style.color = '#721c24';
                    }
                } catch (error) {
                    document.getElementById('result').innerHTML = 'Error submitting ticket';
                    document.getElementById('result').style.backgroundColor = '#f8d7da';
                    document.getElementById('result').style.color = '#721c24';
                }
            });
        </script>
    </body>
    </html>
  `
}

function generateTicketsList(tickets) {
  const ticketsHtml = tickets.map(ticket => `
    <tr>
      <td>${ticket.id}</td>
      <td>${ticket.type}</td>
      <td>${ticket.email}</td>
      <td>${ticket.message}</td>
    </tr>
  `).join('')
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Tickets List</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
        </style>
    </head>
    <body>
        <h1>Tickets List</h1>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Type</th>
                    <th>Email</th>
                    <th>Message</th>
                </tr>
            </thead>
            <tbody>
                ${ticketsHtml}
            </tbody>
        </table>
    </body>
    </html>
  `
}

module.exports = {
  generateTicketForm,
  generateTicketsList
} 