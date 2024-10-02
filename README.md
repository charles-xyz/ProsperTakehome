
# Assessment Slots Service

This service provides assessment slots for clients based on the details provided by the user. It uses mock clinician data to return available time slots.

## Getting Started

### Prerequisites

To start the server, ensure that you have the following installed:

- Node.js (v14 or higher recommended)
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```sh
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

### Starting the Server

Compile and run the server using ts-node:

```sh
npx ts-node server.ts
```

The server will start and listen on the default port 3008 (or the specified PORT environment variable).

You should see a message in the terminal:

```arduino
[server]: Server is running at http://localhost:3008
```

### Testing the API

You can test the /assessment-slots endpoint using the following curl command:

```sh
curl -X POST http://localhost:3008/assessment-slots \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "state": "NY",
    "insurance": "AETNA"
  }'
```

The above command sends a request to the server to get assessment slots and uses jq to pretty print the JSON response.

## Notes

### Modifications
- **MODIFICATION**: Instead of using the `AvailableSlot` model specified, I will use `SimplifiedSlot` which better fits the mock JSON provided to me.
- **MODIFICATION**: I will use simplified appointments for ease of use during testing.

### Assumptions
- **ASSUMPTION**: Since psychologists only have 90-minute sessions with clients, we do not need to filter the eligible psychologist's time slots since they will all be 90 minutes.
- **ASSUMPTION**: Time slots will always be given to us in chronological order. **Reasoning**: All mock data is given in chronological order.

### Potential Improvements
- **Optimization**: The filtering of clinicians could be optimized using a set or by tuning the query.
- **Date Calculations**: If I had more time, I would probably switch the date calculations to a library like `date-fns`, as I think it is a little more readable and easier to work with in production.
