from flask import Flask, request, jsonify
from flask_cors import CORS
from scanner import scan_port, scan_worker
from utils import get_service_name
import threading

app = Flask(__name__)
CORS(app)


@app.route('/scan', methods=['POST'])
def scan():
    threads = []
    data = request.get_json()
    ip = data['ip']
    start_port = int(data['start_port'])
    end_port = int(data['end_port'])
    open_ports = []
    lock = threading.Lock()

    for port in range(start_port, end_port+1):
        t = threading.Thread(target=scan_worker, args=(ip, port, open_ports, lock))
        threads.append(t)
        t.start()

    for i in threads:
        i.join()

    results = [{"port": p, "service": s} for p, s in open_ports]
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True) 