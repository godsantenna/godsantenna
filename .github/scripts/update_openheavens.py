#!/usr/bin/env python3
import requests
import re
from pathlib import Path
from bs4 import BeautifulSoup
from datetime import datetime, timezone

HTML_FILE = Path("antenna-openheavens.html")
API_URL = "https://micromab.com/wp-json/openheavens/v1/today"

def fetch_today():
    try:
        response = requests.get(
            API_URL,
            timeout=25,
            headers={"User-Agent": "GodsAntenna-DailyUpdater/1.0"}
        )
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Failed to fetch from API: {e}")
        return None

def update_html(data):
    if not HTML_FILE.exists():
        print("Error: antenna-openheavens.html not found")
        return False

    html = HTML_FILE.read_text(encoding="utf-8")

    title = data.get("title", "Open Heavens").strip()
    # Clean common prefixes
    title = re.sub(r'^(RCCG\s+)?Open\s+Heaven(s)?\s*[-–:]?\s*', '', title, flags=re.I).strip()

    message_html = data.get("message", "")
    soup = BeautifulSoup(message_html, "html.parser")
    full_text = soup.get_text("\n")

    # Extract Memory Verse
    memory = ""
    mem_match = re.search(
        r'(?:MEMORISE|MEMORY\s+VERSE)[:\s]*["“]?(.+?)["”]?(?:\n|READ|BIBLE|$)',
        full_text, re.I | re.S
    )
    if mem_match:
        memory = mem_match.group(1).strip()

    # Update TOPIC
    html = re.sub(
        r'(<h2>\s*TOPIC\s*[-–]\s*)(.*?)</h2>',
        rf'\1{title}</h2>',
        html,
        count=1,
        flags=re.I
    )

    # Update MEMORY VERSE section
    if memory:
        html = re.sub(
            r'(<summary>MEMORY VERSE</summary>\s*<div class="answer">).*?(</div>\s*</details>)',
            rf'\1\n                MEMORISE: {memory}\n            \2',
            html,
            count=1,
            flags=re.S | re.I
        )

    # Update MESSAGE section with the full content
    if message_html:
        # Keep original HTML from API if possible, otherwise clean text
        clean_paragraphs = []
        for p in soup.find_all(["p", "div"]):
            text = p.get_text(strip=True)
            if text and len(text) > 20:
                clean_paragraphs.append(f"<p>{text}</p><br>")

        if not clean_paragraphs:
            clean_paragraphs = [f"<p>{full_text[:3000]}</p>"]

        new_message = "\n                ".join(clean_paragraphs)

        html = re.sub(
            r'(<summary>MESSAGE</summary>\s*<div class="answer">).*?(</div>\s*</details>)',
            rf'\1\n                {new_message}\n            \2',
            html,
            count=1,
            flags=re.S | re.I
        )

    HTML_FILE.write_text(html, encoding="utf-8")
    print(f"Successfully updated Open Heavens for {data.get('date', 'today')}")
    return True

def main():
    data = fetch_today()
    if data:
        update_html(data)
    else:
        print("Could not update – API unavailable. File left unchanged.")

if __name__ == "__main__":
    main()
