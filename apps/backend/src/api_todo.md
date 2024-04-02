## API Features:

### File Processing

Routes:

- importMap
  - accept map csv files (node + edge csv) and populate DB\_
- exportMap
  - query DB and export csv files (node + edge csv) to frontend for download
- readMap
  - serve up node and edges from DB to frontend tables

### Service Requests

Routes:

- addServiceRequest
  - accept service request form data and populate DB
- getServiceRequests
  - serve up service requests from DB to frontend
