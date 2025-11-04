#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Simple HTTP Server to run the Heart Disease Predictor
No Node.js needed!
"""

import http.server
import socketserver
import webbrowser
import os
import sys

# Fix encoding for Windows console
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

def start_server():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        url = f"http://localhost:{PORT}/index.html"
        
        print("=" * 60)
        print("  HEART DISEASE PREDICTOR - SERVER STARTED")
        print("=" * 60)
        print(f"\nServer running on: http://localhost:{PORT}")
        print(f"Open this link in your browser: {url}")
        print("\nKeep this window open while using the website")
        print("Press Ctrl+C to stop the server\n")
        
        # Try to open browser automatically
        try:
            webbrowser.open(url)
            print("Opening browser automatically...")
        except:
            print("Please open the URL above manually")
        
        print("=" * 60)
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\nServer stopped")

if __name__ == "__main__":
    start_server()

