import socket
from utils import get_service_name

def scan_port(ip, port):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.settimeout(1)
        result = s.connect_ex((ip, port))
        return result == 0

def scan_worker(ip, port, open_ports, lock):
    condition = scan_port(ip, port)
    if condition == True:
        with lock:
            open_ports.append((port, get_service_name(port)))