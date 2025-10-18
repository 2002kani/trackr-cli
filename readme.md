<img width="680" height="320" alt="Bildschirmfoto 2025-10-18 um 13 59 20" src="https://github.com/user-attachments/assets/4e79607f-2d5b-4b54-8804-4337334df94d" />

# trackr cli
Trackr is an interactive CLI to create, delete and manage your project tickets directly in the terminal. Its still under implementation but you can try the beta version out yourself!

## Features
### Create a Ticket

Since this project is still in beta, you cant personalize the tags yet.

<img width="425" height="213" alt="Bildschirmfoto 2025-10-18 um 13 50 18" src="https://github.com/user-attachments/assets/afbb796b-7503-45fa-aa2b-b295a45356c8" />


### Show all Tickets

To delete a finished ticket, just check it and hit enter.

<img width="630" height="222" alt="Bildschirmfoto 2025-10-18 um 13 50 42" src="https://github.com/user-attachments/assets/ff7e7598-b215-4d15-b901-9092024caf2f" />

## Data persistence
Tickets are stored in a local JSON file for persistent access between sessions. No external database or server connection is required.

## Installation & Start
Clone this repository
  ```bash
   git clone https://github.com/2002kani/trackr-cli.git
   cd ticket-cli
  ```

Install dependencies
```bash
   npm install

Create a "tickets.json" file in root

Start the cli
```bash
   node .

## Feedback & Contributions

Feedback, suggestions, and contributions are very welcome!  
If you find a bug or have an idea for improvement, feel free to open an issue or submit a pull request.
