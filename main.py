from scanner import scan_port, scan_worker
from utils import get_service_name
import threading

open_ports = []

lock = threading.Lock()

def print_results(open_ports, ip):
    print(f"Open Ports Found on : {ip}")
    print("-" *20)
    for port, service in open_ports:
        print(f"Port {port} --> {service}")
    print("-" *20)
    print(f"Total no. of open Ports : {len(open_ports)}")

def main():
    ip = input("Enter Target IP Address : ")
    start_port, end_port = int(input("Starting Port : ")), int(input("Ending Port : "))
    threads = []
    for port in range(start_port, end_port+1):
        t = threading.Thread(target=scan_worker, args=(ip, port, open_ports, lock))
        threads.append(t)
        t.start()

    for i in threads:
        i.join()

    print_results(open_ports, ip)
    
if __name__== "__main__":
    main()
