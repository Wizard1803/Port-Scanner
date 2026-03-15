import socket

def get_service_name(port):

    service = {
        21 : "ftp",
        22 : "ssh",
        23 : "telnet",
        25 : "smtp",
        53 : "domain",
        80 : "http",
        110 : "pop3",
        143 : "imap",
        443 : "https",
        445 : "microsoft-ds",
        3306 : "MySQL",
        3389 : "RDP",
        8080 : "HTTP-alt",
        139 : "netbios-ssn"
    }

    name = service.get(port, "Unknown")

    if name == "Unknown":
        try:
            service1 = socket.getservbyport(port)
            return service1
        except:
            return "Unknown"
    else:
        return name
