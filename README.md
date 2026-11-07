Adventure Escape SA — Cross-Platform Web Application (XHAW-WEBAPP)

A cross-platform web and mobile application built with React Native, Expo, and TypeScript for Adventure Escape SA. Hosted at github.com/theboyaphile/XHAW-WEBAPP, this application enables users in South Africa's Western Cape to browse outdoor adventures, dynamically add experiences to an interactive quote state, and submit validated booking requests through a bottom-tab interface.

📁 Repository Architecture (XHAW-WEBAPP)

XHAW-WEBAPP/
├── Assets/                # Local brand logos, activity photography, and icons
├── src/                   # Core screens, navigation components, and shared state/context
├── App.js                 # Main application entry point & bottom-tab navigator setup
├── app.json               # Expo configuration (app name, slug, web & mobile settings)
├── package.json           # Project dependencies (Expo, React Native, React Navigation)
├── package-lock.json      # Locked dependency tree for consistent builds
├── tsconfig.json          # TypeScript compiler configuration
└── README.md              # Project documentation and setup guide


⚙️ How the Web Application Operates

1. Bottom-Tab Navigation Architecture (App.js & src/)

Persistent Tab Bar: Uses a fixed bottom navigation bar with three primary tabs: Home, Quote, and Contact.

Consistent Brand Header: Displays the dark forest-green Adventure Escape SA header across all views to maintain visual continuity between mobile and desktop web viewports (localhost:19006).

2. Activity Discovery & Interactive State Management (Home Tab)

Hero Section & Activity Cards: Features a split-column hero banner ("Discover Guided Outdoor Experiences in Western Cape") followed by a responsive card grid of outdoor packages (Canopy Ziplining – R850, Coastal Kayaking – R1,200, Guided Rock Climbing – R1,450, and Table Mountain Hike – R950).

One-Click Quote Selection: Each card displays duration, safety/gear highlights, pricing badges, and an interactive Add to Quote toggle button that pushes selected activities into global application state.

3. Real-Time Quote Builder (Quote Tab)

Dynamic Summary Panel: Displays all activities selected from the Home tab. If no items are chosen, it prompts the user ("No activities selected yet. Visit the Home tab to build your quote.").

Live Cost Calculation: Automatically tallies the Subtotal, total number of Activities, and Final Total (in ZAR), allowing users to review, remove items, click Add More Activities, or Continue to Contact.

4. Booking Request & Form Validation (Contact Tab)

Synchronized Quote Summary: Carries over the user's selected activities and calculated total directly to the top of the booking screen so users know what they are inquiring about.

Interactive Form Controls: Captures Full Name, Email Address, Group Type (selectable pill buttons for Solo, Couple, Family, and Corporate), Preferred Date (YYYY-MM-DD), and Additional Notes, complete with client-side input validation.

🚀 How to Run the Application Locally

Clone the Repository:

git clone https://github.com/theboyaphile/XHAW-WEBAPP.git
cd XHAW-WEBAPP


Install Dependencies:

npm install


Start the Expo Web Server:

npx expo start --web


View in Browser: The application will compile and open locally at http://localhost:19006.

📚 Harvard-Style References

Expo (2026) Expo Documentation: Develop, Review, and Deploy Cross-Platform Apps, Available at: https://docs.expo.dev/ (Accessed: November 5, 2026).

Meta Platforms, Inc. (2026) React Native: Learn Once, Write Anywhere, Available at: https://reactnative.dev/docs/getting-started (Accessed: November 5, 2026).

React Navigation (2026) Bottom Tabs Navigator Documentation, Available at: https://reactnavigation.org/docs/bottom-tab-navigator/ (Accessed: November 4, 2026).

Microsoft (2026) TypeScript Documentation: JavaScript With Syntax For Types, Available at: https://www.typescriptlang.org/docs/ (Accessed: November 2, 2026).

Programming with Mosh (2024) React Native Tutorial for Beginners - Build a React Native App, YouTube. Available at: https://www.youtube.com/watch?v=0-S5a0eXPoc (Accessed: November 5, 2026).

Net Ninja (2024) React Native Tutorial for Beginners, YouTube. Available at: https://www.youtube.com/playlist?list=PL4cUxeGkcC9ixPU-QkScoRBVxtPPzVjrQ (Accessed: November 5, 2026).
