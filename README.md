# Port Scanner  

*It Scans the ports for the given IP address in our given Port range and tells open ports and their service name.*  

## Project Structure
```
Port_Scanner
    |--app.py
    |--main.py
    |--scanner.py
    |--utils.py
    |--README.md
    |--frontend/
        |--src/
            |--App.js
            |--light-bg.jpg
```

## Tech Stack
```
Python 3.12.4
Built-in : socket, threading
External : flask, flask-cors

Frontend : React 18
External : axios
```

## Workflow
```
1. Takes input ip address from user
    |
    \/
2. Inputs start and end port number for a range from user
    |
    \/
3. In given range of ports scan_worker() is called with threading and it scans the ports
    |
    \/
4.threading is stored in threads list and then it is started and then all threads are joined
    |
    \/
5. If any port is open then port no. with service name (service name is return from utils.py-> get_service_name()) then it is stored in open_ports list as tuple of (port, service_name) with thread lock to prevent race condition
    |
    \/
6. Print_results() is called to print all the results of scanning ports of given IP Address
```
## Two ways for Installing and Running the Project  
  
## CLI Mode
1. Clone the repo on the system by running following command:  
        ```git clone https://github.com/Wizard1803/Port-Scanner.git```

2. No API keys or dependencies required. All libraries are Python built-ins. 
    Run the program from the project folder path by following command:  
    ```python main.py```


  
## Web UI Mode

Terminal 1 — start Flask backend:
```
python app.py
```
Terminal 2 — start React frontend:
```
cd frontend
npm start
```
Then open `http://localhost:3000`

## Install Dependencies
```
pip install flask flask-cors
cd frontend && npm install
```

## Sample Output:

```
Port_Scanner> python main.py
Enter Target IP Address : 127.0.0.1
Starting Port : 1
Ending Port : 6000
Open Ports Found on : 127.0.0.1
--------------------       
Port 135 --> epmap
Port 445 --> microsoft-ds  
Port 623 --> Unknown       
Port 3260 --> Unknown      
Port 3306 --> MySQL        
Port 5040 --> Unknown      
Port 5357 --> wsd
--------------------       
Total no. of open Ports : 7
```