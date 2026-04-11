<h3>Satyam SwiftTrack - Information System for Courier Service</h3>

Satyam SwiftTrack is a modern, full-stack logistics management application built using the MERN stack. It digitizes the traditional courier booking process, providing real-time tracking for customers and a comprehensive management dashboard for administrators.

<h3>Features</h3>
For Customers:
Instant Booking: Easy-to-use form to book parcels with automated cost calculation ($Weight \times 50$).
Real-time Tracking: A visual 4-stage timeline to track shipment status using a unique Tracking ID.
Booking History: Personal dashboard to view all past and active courier records.
Responsive UI: Fully optimized for Mobile, Tablet, and Desktop screens.

For Administrators:
Centralized Dashboard: Real-time stats showing Total Shipments, Revenue, and Active Users.
Status Management: Update parcel status (Booked, In-Transit, Out for Delivery, Delivered) with one click.
Revenue Analytics: Automatically calculates earnings, excluding cancelled orders.
Secure Access: Restricted access for authorized admin emails only.

<h3>Tech Stack</h3>
Frontend: React.js, CSS3/Tailwind CSS, Lucide-React (Icons)
Backend: Node.js, Express.js
Database: MongoDB Atlas (Cloud)
State Management: React Hooks (useState, useEffect)
API Testing: Postman

<h3>Project Structure</h3>

├── backend/
│ ├── models/ # MongoDB Schemas (User, Courier)
│ ├── routes/ # API Endpoints
│ └── backend.js # Entry point
├── frontend/
│ ├── src/
│ │ ├── components/# Reusable UI components
│ │ ├── pages/ # Home, Tracking, Admin, Login
│ │ └── App.js # Routing
└── README.md

<h3>Installation & Setup</h3>
Clone the repository:
git clone https://github.com/your-username/satyam-swifttrack.git

Install backend Dependencies:
cd backend
npm install

Install frontend Dependencies:
cd ../frontend
npm install

Environment Variables:
MONGO_URI=your_mongodb_connection_string
PORT=5000

Run the Application:
Start backend: npm start (inside backend folder)
Start frontend: npm start (inside frontend folder)

<h3>Contributing</h3>
Contributions are welcome! Feel free to open a pull request or report issues.

<h3>Author</h3>
Satyam Prajapati
BCA 6th Semester Student
Prof. Rajendra Singh (Rajju Bhaiya) University, Prayagraj
